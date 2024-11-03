---
title: "Java 的环境配置"
date: "2023-08-03"
tags:
---

需要三个东西
- JDK
- Java SE Runtime Environment(JRE)
- JVM
##### 下载

[Java Downloads | Oracle](https://www.oracle.com/java/technologies/downloads/)

现在安装 Oracle 官网的java17包, 装好会有三个文件夹 jdk17, jdk1.8 和 jre8

JVM 包含在里面

##### 环境变量
- 系统环境 `JAVA_HOME`, 值为 jdk17或jdk1.8的根目录
- Path 新建 `%JAVA_HOME%\bin`

##### 验证方法
java --version