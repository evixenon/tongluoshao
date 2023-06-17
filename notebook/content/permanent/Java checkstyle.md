---
title: "Java checkstyle"
date: "2023-06-16"
tags:
- Java
---

一种检查 Java 源代码风格的方法, 通常应该检查:
- 命名规范
- 类设计(e.g. 耦合和内聚)
- [[permanent/Java Best-Practices|Java Best-Practices]]
- division by 0
- 未使用的变量/包
- 每个方法有且只有一个任务吗

### google_checks
`google_checks.xml` 似乎只能检查代码, 注释和文档中不恰当的空格

> java -jar ./checkstyle-9.1-all.jar [path of .java file to check] -c ./google_checks.xml

![[checkstyle-9.1-all.jar]]

![[google_checks.xml]]