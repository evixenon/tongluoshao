---
title: "Gradle"
date: "2023-06-16"
tags:
- Java
---

是 [[permanent/Java|Java]] 的 Build 工具.

docs.gradle.org

## Gradle 概念
Wrapper, GradleUserHome, Daemon: [来自Gradle开发团队的Gradle入门教程](https://www.bilibili.com/video/BV1DE411Z7nt/) P1前22分钟

### Gradle Build Phases
- Initialization
- Configuration
	- 会把 build.gradle 从上到下执行(当成 groovy)
- Execution
### Gradle Wrapper

`./gradlw xxx` 命令会自动下载对应版本的 gradle 

### GradleUserHome
插件, 依赖包都会缓存在这个路径.
不建议每次都用一个新的目录, 
默认路径 `Home/.gradle`, 在 IntelliJ 的 build Tools 设置中可以修改

**init.d**
脚本, 在每次用 gradle 构建时会运行的全局脚本, 最常用来加速

**cache**
缓存依赖包, 插件等

### Daemon
gradle 3.0 之后的任务处理模式

处理 gradle Task 时, 启动一个 轻量的 Client JVM, 只和 Daemon JVM 进行 socket 通信, 任务结束后销毁 Client JVM, 但保留 Daemon. 这样就避免了每次 JVM 冷启动耗费多余的时间.
Daemon 默认空闲 3 小时自动退出

相对的, Maven 每处理一个任务会跑一个 JVM, 就是 Maven 的 Lifecycle, 任务结束后销毁 JVM 

#### Daemon 的兼容性问题
client JVM 和 Daemon JVM 可能有兼容问题, 比如说版本, 比如说 Client 要求的内存 Daemon 不够, 这时候就会启动一个新的 Daemon.

#### --no-daemon
放弃 daemon 模式的参数, 3.0之前建议 CI 使用, 但4.0后 Daemon 稳定, 不需要 --no-daemon

## Gradle 实践

### 安装, 更新, 配置
https://gradle.org/install/

#### 安装
根据版本按上面的教程走

#### 配置
将 bin 目录加入环境变量 PATH
如果想可以在 IDLE 修改 [[#GradleUserHome]] 的默认路径

#### 更新
用 gradle wrapper task 更新, 指定版本号, 指定 bin 文件还是 complete
```cmd
$ ./gradlew wrapper --gradle-version=7.6 --distribution-type=bin
```

```cmd
$ ./gradlew tasks
Downloading https://services.gradle.org/distributions/gradle-7.6-bin.zip
...
```

### 开始使用 gradle

#### 创建 gradle 项目
src: [Building Java Applications Sample|Gradle Doc](https://docs.gradle.org/current/samples/sample_building_java_applications.html)

在根目录运行
```cmd
gradle init
```
然后按提示走


#### 安装 gradle 插件 
在 [plugins.gradle.org](https://plugins.gradle.org/) 上找到想要的插件, 将对应的语句复制到 `app/build.gradle` 中的 `plugins {}`


### ./gradlew 命令

**wrapper**
在项目根目录运行 `gradlew wrapper` 会将项目和 gradle 版本绑定, 下载对应版本的 wrapper, 以保证任何人 build 时都能用创建时的版本

**help**

**compileJava**

**--stop**
停止正在运行的 daemon

**build**

### build.gradle
![[Pasted image 20221218220250.png|600]]
这里的 task 第二个参数是个闭包(可以理解为函数, 是名为 deligate 的机制)
创建好的这个 helloworld, 可以用 `./gradlew helloworld` 调用