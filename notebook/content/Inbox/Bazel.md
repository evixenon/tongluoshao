---
title: "Bazel"
date: "2026-03-12"
tags:
---
# Bazel：Google 开源的构建和测试工具

## 基本介绍

**Bazel** 是 Google 开源的**快速、可扩展、多语言**的构建系统，主要用于管理大型代码库的构建和测试。

## 核心特点

### 1. **多语言支持**
```python
# 支持多种编程语言
- C++, Java, Python, Go, Rust, JavaScript/TypeScript
- Android, iOS 移动开发
- 协议缓冲区 (Protocol Buffers)
- 自定义规则扩展
```

### 2. **高性能构建**
```python
# 关键性能特性
- 增量构建：只重新编译修改的部分
- 并行执行：充分利用多核 CPU
- 分布式构建：在多台机器上并行构建
- 缓存机制：本地和远程缓存构建结果
```

### 3. **可重现性**
```python
# 确保每次构建结果一致
- 声明式构建描述
- 沙箱执行：隔离构建环境
- 确定性构建：相同输入产生相同输出
```

## 基本概念

### **WORKSPACE 文件**
```python
# WORKSPACE - 定义工作空间和外部依赖
workspace(name = "my_project")

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

http_archive(
    name = "rules_cc",
    urls = ["https://github.com/bazelbuild/rules_cc/archive/main.zip"],
)
```

### **BUILD 文件**
```python
# BUILD - 定义构建目标
# C++ 示例
cc_library(
    name = "hello_lib",
    srcs = ["hello.cc"],
    hdrs = ["hello.h"],
    deps = ["//other:lib"],
)

cc_binary(
    name = "hello",
    deps = [":hello_lib"],
)

# Python 示例
py_binary(
    name = "main",
    srcs = ["main.py"],
    deps = [":my_lib"],
)

py_library(
    name = "my_lib",
    srcs = ["utils.py"],
)
```

### **Starlark 语言**
```python
# Bazel 使用 Starlark（类似 Python 的配置语言）
def custom_rule(name, srcs, **kwargs):
    native.cc_binary(
        name = name,
        srcs = srcs,
        **kwargs
    )
```

## 与 Make/CMake 的对比

| 特性 | Bazel | Make | CMake |
|------|-------|------|-------|
| **构建描述语言** | Starlark (Python-like) | Makefile 语法 | CMakeLists.txt (自定义) |
| **依赖管理** | 自动、精确 | 手动指定 | 手动指定 |
| **增量构建** | ✅ 精细粒度 | ✅ 文件级别 | ✅ 文件级别 |
| **并行构建** | ✅ 自动优化 | ✅ 需要配置 | ✅ 需要配置 |
| **多语言支持** | ✅ 原生支持 | ❌ 需要扩展 | ✅ 良好支持 |
| **分布式构建** | ✅ 内置支持 | ❌ 不支持 | ❌ 不支持 |
| **沙箱执行** | ✅ 安全隔离 | ❌ 无隔离 | ❌ 无隔离 |
| **学习曲线** | 较陡峭 | 中等 | 中等 |

## 实际项目结构示例

```
my_project/
├── WORKSPACE              # 工作空间定义
├── .bazelrc              # Bazel 配置文件
├── MODULE.bazel          # Bazel 模块文件（Bazel 6.0+）
├── src/
│   ├── BUILD
│   ├── main.cc
│   └── lib/
│       ├── BUILD
│       ├── utils.cc
│       └── utils.h
├── tests/
│   ├── BUILD
│   └── test_utils.cc
└── third_party/          # 外部依赖
    └── BUILD
```

## 常用命令

```bash
# 构建目标
bazel build //src:hello

# 运行目标
bazel run //src:hello

# 运行测试
bazel test //tests:all

# 查看依赖图
bazel query 'deps(//src:hello)'

# 清理构建
bazel clean

# 查看构建输出位置
bazel info output_path

# 远程构建缓存
bazel build //src:hello --remote_cache=grpc://cache.example.com
```

## 优势场景

### 1. **大型代码库**
```python
# Google、Twitter、Uber 等公司使用
- 代码库数百万行
- 数千个模块
- 多团队协作
```

### 2. **微服务架构**
```python
# 每个服务独立构建
- 清晰的依赖边界
- 独立的版本管理
- 快速增量构建
```

### 3. **多平台部署**
```bash
# 交叉编译支持
bazel build //app:ios_app --ios_multi_cpus=arm64,x86_64
bazel build //app:android_app --android_cpu=arm64-v8a
```

## 缺点和挑战

### 1. **学习成本高**
```python
# 需要理解的概念较多
- 工作空间 (Workspace)
- 包 (Package)
- 目标 (Target)
- 规则 (Rule)
- 工具链 (Toolchain)
```

### 2. **生态系统**
```python
# 相比传统工具
- 社区相对较小
- 第三方库支持需要适配
- IDE 集成不如 CMake 成熟
```

### 3. **配置复杂**
```python
# 需要维护多个文件
WORKSPACE
BUILD
.bazelrc
工具链配置
```

## 现代 C++ 项目示例

```python
# C++20 项目配置示例
load("@rules_cc//cc:defs.bzl", "cc_binary", "cc_library", "cc_test")

cc_library(
    name = "core",
    srcs = glob(["src/**/*.cc"]),
    hdrs = glob(["include/**/*.h"]),
    copts = [
        "-std=c++20",
        "-Wall",
        "-Wextra",
    ],
    visibility = ["//visibility:public"],
)

cc_binary(
    name = "main_app",
    srcs = ["main.cc"],
    deps = [":core"],
)

cc_test(
    name = "core_test",
    srcs = ["test/core_test.cc"],
    deps = [
        ":core",
        "@googletest//:gtest_main",
    ],
)
```

## 何时选择 Bazel？

### ✅ **适合使用 Bazel**
- 大型、多语言项目
- 需要快速增量构建
- 多平台部署需求
- 团队协作，需要一致的构建环境
- 对构建可重现性要求高

### ❌ **不适合使用 Bazel**
- 小型个人项目
- 只需要简单构建
- 依赖大量非 Bazel 管理的第三方库
- 团队不熟悉 Bazel 生态

## 学习资源

1. **官方文档**: https://bazel.build/
2. **示例项目**: https://github.com/bazelbuild/examples
3. **规则仓库**: https://github.com/bazelbuild/rules_*
4. **Bazel 会议**: BazelCon

Bazel 特别适合需要**大规模、高性能、可重现构建**的企业级项目，是 Google 内部 Blaze 构建系统的开源版本。

# 基础使用笔记

#### 构建和运行 .cpp 文件
在根目录中运行
```
bazel run
//codingStyleIdioms/1_classInitializers:1.2_nodefault_ctor
```

这是直接跑 .cpp 程序

如果把 run 换成 build, 就是只构建不运行

#### VS Code 插件
拓展名: **Bazel**

这个插件依赖[buildifier](https://github.com/bazelbuild/buildtools.git)
