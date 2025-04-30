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

![[attachments/Pasted image 20250429151716.png]]

- 标准库重要的东西
    - 容器
    - 算法
    - 高效常用操作

- 你应该知道
    - 有什么可以用的
    - 什么时候用

## C++ 11 相关的三个特性

#### C++ 11, 也就是 C++ 2.0
- 你应该了解什么版本的编译器 支持 C++ 2.0

支持测试: `cout << __cplusplus << endl;`
- ![[attachments/Pasted image 20250429152435.png]]

#### variadic templates 数量不定的模板参数
- 语法 `...` pack
- 一个 递归 print 函数
- ![[attachments/Pasted image 20250429152844.png]]

#### auto, 自动推定类型
- 例如迭代器的类型太长了, 不想写
- 但不能依赖
- ![[attachments/Pasted image 20250429153516.png]]

#### range-base `for`
- 左边是 i, 右边是 range
- 两种写法, by value(不影响原值)/ by reference(影响原值)
- ![[attachments/Pasted image 20250429153952.png]]
- 以前: 普通 for, for each 两种

## reference


#### 引用, 指针, 变量
- 引用必须设初值, 而且设了就不能再变了
- 引用是变量的别名! 对引用操作, 相当于直接操作变量
- ![[attachments/Pasted image 20250429155243.png]]

#### 效果测试
- ![[attachments/Pasted image 20250429155634.png]]

#### reference 的用途
- 很少声明一个 ref 变量, 多半用在参数传递上
- 传参数进去尽量用 ref
- 传ref 的函数签名与 传值 相同
- ![[attachments/Pasted image 20250429160345.png]]

## Object Model

#### vptr 和 vtbl
- 当一个类有虚函数(无论是一个还是多个), 就会多**一个**虚指针
- 继承是继承调用权而非内存
- 通常的 c 的调用是静态绑定(汇编 call + 地址)
- 通过指针调用虚函数是**动态绑定**, 按照地址路径找到应该调用的函数
- ![[attachments/Pasted image 20250429182447.png]]
- ![[attachments/Pasted image 20250429183025.png]]
- 用法示例: 一个容纳 `A*` 的 List, 想要遍历并 draw 每个形状, 就可以通过 虚函数 draw 实现, 不用判断指向的是哪个类型

#### 关于 this
- this object, 是调用函数的对象
- this 指针会隐式传入函数
- 子类调用父类方法时, 实际上调用,  `this->method()`
- ![[attachments/Pasted image 20250429184337.png]]

#### 动态绑定的条件
符合
- 通过指针调用
- 指针是 up-cast
- 调用的是虚函数

绑定成 `(*(p->vptr)[n])(p)`

#### Dynamic Binding
- ![[attachments/Pasted image 20250429185001.png]]
- ![[attachments/Pasted image 20250429185041.png]]


## 主题: const

#### const 修饰成员函数
- const 修饰成员函数 所表达的意思是, 我这个函数不打算修改类的数据
- ![[attachments/Pasted image 20250429185500.png]]
- 如果成员函数有 const 和 non-const 版本
    - const object 只能调用 const 版本函数
    - non-const object 只会调用 non-const 版本函数
    - 注意有无 const 的函数签名是不同的
- ![[attachments/Pasted image 20250429190053.png]]
-  COW: non-const 必须考虑 cow

## 主题: new 和 delete

#### 复习
- [[project/侯捷 - C++ 面向对象程序设计#new 的实际行为]]
- ![[attachments/Pasted image 20250430111001.png]]

#### 如何重载 operator new/delete
- 全局重载他们影响深远
- ![[attachments/Pasted image 20250430111339.png]]

#### 重载成员版
- ![[attachments/Pasted image 20250430111741.png]]
- ![[attachments/Pasted image 20250430111747.png]]

#### 重载示例
- 如果有成员函数就会优先调用(除非指定用全局)
- ![[attachments/Pasted image 20250430112113.png]]
-  `[]` 中的 size 怎么知道?  内容类型size \* 数组个数 + 4
    - 多出来这个 4 Bytes 用来记录数组个数
    - ![[attachments/Pasted image 20250430112529.png]]


#### placement operator new
- 重载的条件
    - 不和已有的重复
    - 第一个参数是 `size_t`
    - 其余参数直接在括号赋初值
- ![[attachments/Pasted image 20250430113313.png]]
- ![[attachments/Pasted image 20250430113945.png]]

#### placement operator delete
- ![[attachments/Pasted image 20250430114446.png]]
- ![[attachments/Pasted image 20250430114457.png]]

#### 例子: basic_string 使用 new() 扩充申请量
- 什么时候重载 operator new? 想悄悄地多申请一些东西时
- ![[attachments/Pasted image 20250430115129.png]]
