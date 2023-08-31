---
title: "Java 的原理机制"
date: "2023-06-16"
tags:
- Java
---

#### 代码的编译和执行
- 源代码->编译器->输出->JVM
- .java -> 编译器 -> .class -> 交给虚拟机
- 编译器产出字节码, JVM可以读取与执行字节码.

#### 一个类的 main 函数
加载一个类的时候, 会完整执行 main 函数, main() 就是程序的起点

main() 不是每个类必须的, 一个程序只需要一个 main

#### .jar 文件
.jar 是 java archive 文件, 在 .jar 中引入 manifest 可以定义 .jar 中哪一个文件带有 main() 方法

#### call by value
Java 是值传递/拷贝传递/call by value

#### 栈与堆

- 被引用的方法会放在栈顶上
- 对象本身只存活于可垃圾回收的堆上, 被引用时在栈中创建一个引用
- 只有被创建的对象才会在堆中