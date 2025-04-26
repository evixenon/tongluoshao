---
title: "侯捷 - C++ 面向对象程序设计"
date: "2025-04-26"
tags:
---
## C++ Intro

#### 编程习惯
- 课程分成两段, object based 或 object 两种不一样的编程习惯
- 以复数类和 String 类为例 

![[attachments/Pasted image 20250426163050.png]]

#### 历史

- B lang
- C lang
- new C -> C with Class -> C++

#### 版本
- C++ 98 (1.0)
- C++ 03 (TR1, Technical Report 1)
- C++ 11 (2.0)
- C++ 14
- C++ 20

#### C++ 学习内容
- 语言
- 标准库

#### 经典书籍
- C++ Prime
- The C++ Programming Language
- Effective C++, (More Effective C++,) Effective Modern C++
- The C++ Standard Library
- C++ 对象模型
- STL 源码剖析

## C++ 面向对象简单探索

#### 为什么出现了面向对象语言
- 从前, C lang 中,  数据是全局的, 所有函数都可以处理所有数据
- C++ 可以(例如使用 Class)限制数据和函数的使用范围, 只暴露接口

#### C++ 代码基本形式
- .h/.hpp 头文件, 类声明
- .cpp 代码
- 标准库

include "" 是当前路径, <>是系统路径

#### 防卫式声明

```cpp
#ifndef __COMPLEX__
#define __COMPLEX__
...
#endif
```
这样就不会有重复的引入,

> **重复定义错误（Multiple Definition Error）**
> 若头文件被多次包含（直接或间接），且包含以下内容时，会触发错误：
> - **非内联函数定义**
> - **全局变量定义**
> - **类/结构体的重复定义**
#### 头文件的格式

![[attachments/Pasted image 20250426170800.png]]

#### 模板
- 模板: 我不想把成员的类型在定义 class 时就写死啊
- ![[attachments/Pasted image 20250426172254.png]]

#### inline 内联函数
- inline function: 函数在 class 内完成定义
- 比较快
- 函数若太复杂, 编译器无法让函数 inline
- `inline`关键字: 在 class body 外 定义内联函数

#### access level
- public, private, protected
- 数据不要 public


## 构造函数 Constructor
#### 构造函数 constructor
- 可默认实参
- 没有返回类型
- 要用构造函数的专门初始化语法!

![[attachments/Pasted image 20250426175151.png]]

前者是初始化阶段(效率更高), 后者是普通赋值

- 可重载 overloading

#### Overloading 重载
- 重载的函数看似同名, 但编译后实际上是不同名的

![[attachments/Pasted image 20250426175714.png]]

- ?! 是不行的, 因为另一个重载里有默认参数, 编译器不知道调用哪个

#### private 区的 constructor
- 什么情况下: 单例模式
- ![[attachments/Pasted image 20250426180753.png]]

## 语法?

#### const 成员函数
- 重要却常被忘记: 在不改变数据的函数 要用 const 修饰
- 在这个例子中, 只是取出参数, 所以要加
- ![[attachments/Pasted image 20250426181053.png]]
- 不加有什么后果?实例对象为 const 时, 非法(const 和 非 const 冲突)
- ![[attachments/Pasted image 20250426181748.png]]

#### 参数传递 pass by value/by reference(to const)
- by value, 实际会把值压到栈里
- 尽量不要 pass by value: c传指针, c++ 传引用
- 大原则: 可以的情况下传引用, 速度快, 如果不希望值被改, 就传引用to const
- ![[attachments/Pasted image 20250426182520.png]]

#### 返回值传递 return by value/by reference (to const)
- ![[attachments/Pasted image 20250426182828.png]]
- 其实带 & 就是返回引用, 不带就是值

#### 什么情况下能/不能 return by reference

可以传的情况
- 例: c1 += c2, ths 是 c1, r 是 c2
- ![[attachments/Pasted image 20250426184514.png]]
- c1 放在本来已经有的空间, 所以可以传


不能传引用的情况: 
- 参数在函数结束后已经没有意义, 返回值是新的空间, 如 add
#### 友元函数 friend
- 声明了的友元函数 可以自由取得 private 成员的数据(效率上会比函数快一点)
- 相同 class 的各个 object 互为友元
- 外部 class 的友元函数实际上打破了封装
- ![[attachments/Pasted image 20250426183738.png]]
#### 设计一个类的注意事项
- 数据一定放在 private 
- 参数/返回值尽可能以 reference(to const) 来传
- 应加 const 就要加
- 构造函数尽量用初始化语法