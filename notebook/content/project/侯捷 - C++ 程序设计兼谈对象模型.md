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

## pointer-like class, function-like classes

#### pointer-like classes: 智能指针
- 写成像指针的类
- 里面一定有一根一般的指针
- 指针允许的动作(\* 和 ->), 这个 pointer-like class 也要允许
- 这里先不讨论为什么要这么写, 先讨论语法和实现
- -> 作用下去得到的结果, -> 还会继续作用下去, 不消耗
- ![[attachments/Pasted image 20250428215913.png]]

#### pointer-like classes: 迭代器
- 主要用来遍历容器, 所以要支持更多操作(比如地址++) 
- `*ite` 应该得到一个被迭代的对象 
- `ite->method` 应该得到一个被迭代对象的方法
- ![[attachments/Pasted image 20250428221144.png]]
- ![[attachments/Pasted image 20250428221229.png]]

#### function-like classes: 仿函数 functor
- 一个类像一个函数, 主要实现`()`操作符 function call operator
- 也叫函数对象
- ![[attachments/Pasted image 20250428223422.png]]
- 实际上, 这种仿函数会继承某个类
- 标准库有很多仿函数
- ![[attachments/Pasted image 20250428223747.png]]
- ![[attachments/Pasted image 20250428223850.png]]
- 这俩大小是1

## namespace 经验谈

- 防止名称冲突
- 用 namespace 把内容包起来是一个好习惯
- 比如测试程序, 测试类很容易冲突
- ![[attachments/Pasted image 20250428224506.png]]

## Template 和 Specialization

#### class template
- 设计类时, 哪些成员的类型可以不写死以后再决定, 就可以用 class template
- ![[attachments/Pasted image 20250429131322.png]]

#### function template
- 同样的操作, 可以在不同类型上使用
- ![[attachments/Pasted image 20250429131439.png]]

#### member template
- 成员模板: 本身是模板, 又是另一个模板的成员
- ![[attachments/Pasted image 20250429131926.png]]
- 通常这么调用时, T1 T2 与 U1 U2 有继承关系, 为了兼容把子类赋给父类的动作才写成员函数
- ![[attachments/Pasted image 20250429132514.png]]
- 如果 U1 不继承 T1, `first(p.first)` 接受到的 U1 就不能放入 T1 中, 调用失败


- 另一个例子, 智能指针的 模拟 up-cast
- ![[attachments/Pasted image 20250429134802.png]]

#### specialization, 模板特化
- 特化和泛化对应
- 特化用于某些时候要对特定类做特殊处理
- 例如 Bresenham 直线算法, 用于快速计算两点之间线段路径上的像素坐标，适用于光栅化直线绘制. 这个算法在参数是整数时特别快
- ![[attachments/Pasted image 20250429135914.png]]

#### partial specialization, 偏特化
- 局部特化, 个数的偏 或 范围的偏
- **个数的偏**, 多于一个的模板参数, 但只绑定其中一部分, 另一部分灵活设置
- ![[attachments/Pasted image 20250429140552.png]]

- **范围的偏**, 例如任意类型缩小为指针类型
- ![[attachments/Pasted image 20250429140825.png]]

#### template template parameter, 模板模板参数
- 在模板的`<>`中, class 和 typename 共通 
- 用在 模板参数是 容器, 又想指定容器内装的类型时
- ![[attachments/Pasted image 20250429142149.png]]
- 更优的写法是用智能指针
- ![[attachments/Pasted image 20250429142344.png]]
- 这种不是, 看底下的例子, int 写死了
- ![[attachments/Pasted image 20250429142510.png]]
## C++ 标准库