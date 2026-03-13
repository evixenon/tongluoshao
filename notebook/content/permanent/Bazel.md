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

ps: tun 模式好用哇

<section style="display: flex; flex-direction: row; align-items: center;"><span style="color: rgb(235, 171, 55); display: flex; flex-direction: row; align-items: center; padding: 0px 0.5em; font-size: 0.824em; border-radius: 0.428em; line-height: 2.306em; background-color: rgba(235, 171, 55, 0.15);"><span style="margin-right: 0.2em; display: flex; flex-direction: row; align-items: center; justify-content: center;"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24" width="1.9988577955454025em" height="1.9988577955454025em" stroke="currentColor" aria-hidden="true" class=""><path d="m15.385 10.538c-0.52922 1.222-0.74082 3.1121-1.2852 4.3107-0.06906-2e-5 -0.24102-0.40954-0.40553-0.85764-0.54849-1.4968-0.91293-3.7816-1.4977-5.2179-0.49825-1.7178-2.7313-2.8836-3.8104-0.24557-0.55221 1.2498-0.75261 3.2793-1.3921 4.4683-0.45354 0.09492-0.79418 0.49706-0.79418 0.9788 0 0.5523 0.4477 1 1 1 0.77414 0 1.3844-0.52246 1.8137-1.5529 0.50969-1.1819 0.73444-2.9587 1.2241-4.138 0.07175 2e-5 0.14687 0.33291 0.23664 0.59492 0.20698 0.60425 0.39119 1.3477 0.58618 2.1349 0.2657 1.0724 0.54043 2.1814 0.90899 3.0557 0.87212 2.2985 3.1123 2.7586 4.0452 0.39202 0.55283-1.2608 0.75203-3.309 1.3936-4.5083 0.4522-0.0959 0.7915-0.49744 0.7915-0.97823 0-0.55229-0.4477-1-1-1-0.7755 0-1.3861 0.526-1.8148 1.5634z" fill="currentColor"></path><path d="m15.802 6.9697c-0.1557 0.1946-0.1882 0.58884 0.1331 0.60533 1.2616 0.02168 2.5193 0.48654 3.5913 1.2655 0.2705 0.19453 0.6808 0.05368 0.7176-0.30435 0.0793-0.76097 0.0572-1.5713-0.086-2.401-0.1456-0.82752-0.4109-1.6736-0.8018-2.5036-0.1536-0.34251-0.6624-0.55548-0.9204-0.23779l-0.7238 0.98277c-3.8989-2.9446-9.692-2.2836-12.827 1.4659-6.4518 7.8165 1.8281 18.818 11.123 14.783 1.8924-0.8564 3.4853-2.3528 4.4507-4.1927 0.0679-0.1218 0.1291-0.2481 0.1823-0.377 0.1017-0.2304 0.1549-0.518-0.0557-0.7052-0.1162-0.1043-0.2646-0.1628-0.4074-0.221-0.1475-0.0577-0.2953-0.116-0.4439-0.1706-0.2042-0.0713-0.4475-0.1531-0.6498-0.0358-0.0846 0.0496-0.1444 0.131-0.1982 0.2109-0.0747 0.1157-0.1266 0.2445-0.1952 0.3636-0.4837 0.9276-1.1717 1.74-1.9925 2.3831-0.8208 0.6431-1.7745 1.1169-2.7897 1.3673-7.0612 1.7198-12.182-6.5444-7.5021-12.107 2.4634-2.9539 7.0543-3.4782 10.119-1.154" fill="currentColor"></path></svg></span>bazel No repository visible as '@rules_cc' from main repository</span></section>

Ensure `rules_cc` is properly added via Bzlmod 

If your project uses [Bzlmod](https://bazel.build/external/module) (the modern external dependency system), you must declare `rules_cc` in your `MODULE.bazel` file. 

- Add the following line to your `MODULE.bazel` file:
    ```
    bazel_dep(name = "rules_cc", version = "0.2.17") # Use the appropriate version
    ```