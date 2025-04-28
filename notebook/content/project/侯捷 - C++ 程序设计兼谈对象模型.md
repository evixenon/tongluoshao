---
title: 侯捷 - C++ 程序设计兼谈对象模型
date: 2025-04-28
tags:
---

## 内容介绍

- 这是 [[project/侯捷 - C++ 面向对象程序设计|侯捷 - C++ 面向对象程序设计]] 的后续
- 因为单独有一门课讲 C++11, 所以这里会比较少
- ![[attachments/Pasted image 20250428171738.png]]

- Generic Programming 泛型编程
- template
- Object Model
- this 指针
- vptr 虚指针 和 vtbl 虚表
- virtual mechanissm 虚机制
- 虚函数造成的 polymorphism 多态

## 类型转换函数 conversion function

#### 类型转换函数的写法
- 语法: 
    - operator typename() 
    - 不可以有参数
    - 不用写 return type
    - 通常有 const, 因为传进去的参数通常不用变
- ![[attachments/Pasted image 20250428172158.png]]
- 编译器: 
    - 1 没有+(double, Fraction诶)
    - 2 左值是 double, 那试一下能不能把右值转成 double

#### non-explicit-one-argument ctor
- 可以被调用作类型转换函数
- one argument 的意思是只要一个实参就够, 不是必须仅一个参数
- ![[attachments/Pasted image 20250428174449.png]]

#### conversion func vs. non-explicit-one argument ctor
- 如果两者都存在, 编译器反而(可能)会不知道调哪个而报错: ambiguous
- ![[attachments/Pasted image 20250428174748.png]]

#### explicit-one-argument ctor
- explicit 的意思: 除非我明确指定要转换类型, 否则编译器你不要给我隐式转换
- explicit 一般会用在构造函数的前面
- ![[attachments/Pasted image 20250428175213.png]]

