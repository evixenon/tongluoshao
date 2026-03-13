---
title: 侯捷 - C++ 面向对象程序设计
date: 2025-04-26
tags:
---
## 上: 面向对象程序设计
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

## C++ 文件结构, 面向对象初探

#### 为什么出现了面向对象语言
- 从前, C lang 中,  数据是全局的, 所有函数都可以处理所有数据
- C++ 可以(例如使用 Class)限制数据和函数的使用范围, 只暴露接口

#### C++ 代码基本形式
- .h/.hpp 头文件, 类声明
- .cpp 代码
- 标准库

include "" 是从当前路径开始查找, <>是系统路径.
查找顺序是当前路径 -> 设置的标准库路径 -> 环境变量

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
- **允许重复定义**：在多个翻译单元（`.cpp` 文件）中允许存在相同函数的定义（通常用于**头文件中的函数定义**，避免链接错误）。
- 头文件中建议加 `inline`, 如果函数只在 单个 .cpp 中使用则不需要加(也无优化影响)

#### access level
- public, private, protected
- 数据不要 public


## OBD: 当一个类的成员不涉及指针
Object Based Design

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

#### const 成员函数
- 重要却常被忘记: 在不改变数据的函数 要用 const 修饰
- 在这个例子中, 只是取出参数, 所以要加
- 加在函数名()后面
- ![[attachments/Pasted image 20250426181053.png]]
- 不加有什么后果?实例对象为 const 时, 非法(const 和 非 const 冲突) 详参 [[#const 修饰成员函数]]
- ![[attachments/Pasted image 20250426181748.png]]

#### 参数传递 pass by value/by reference(to const)
- by value, 实际会把值压到栈里
- 尽量不要 pass by value: c传指针, c++ 传引用
- 大原则: 可以的情况下传引用, 速度快, 如果不希望值被改, 就传引用to const
- ![[attachments/Pasted image 20250426182520.png]]

#### 返回值传递 return by value/by reference (to const)
- ![[attachments/Pasted image 20250426182828.png]]
- 其实带 & 就是返回引用, 不带就是值
- double& real() 也可以.  double 类和引用都是 4 bytes, 效率上一样

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
#### 操作符重载1, 成员函数
- operator overloading
- 作用在左数的, 实现时有用到(隐藏)参数 this 的, 例如 +=

![[attachments/Pasted image 20250426231943.png]]

#### pass by reference 的好处示例
- 传递者无需知道接收者是以什么形式接收
- 不管接收方是接 reference 还是 value, 传出去是一个对象 
![[attachments/Pasted image 20250426233624.png]]

#### global 函数
- 传类尽量用 reference
- ![[attachments/Pasted image 20250426234341.png]]

#### 操作符重载2, 非成员函数
- ![[attachments/Pasted image 20250426234603.png]]

#### 临时对象 与 typename()
- 上一节的三个函数不能 return by reference, 因为返回值是必定是 local object/临时对象(新的空间)
- typename() 语法 创建的必定是临时对象

- ![[attachments/Pasted image 20250426235935.png]]
- 而此处的正号是可以 return by reference 的, 只是标准库没有这么做

#### << 重载
- 只能写成全局函数, cout 是早就写好的
- 注意函数从左到右运行 
- ![[attachments/Pasted image 20250427154148.png]]


#### 总结类设计流程
- 防卫式声明
- class head
- private 数据, 以及数据的类型
- 构造函数, 参数传递方式, 默认值, 初始化(初值列)
- 这个类需要什么函数? -> 函数设计
- 函数可以只在 class 中声明, 在外部写成内联

#### 设计一个函数的注意事项
- 参数/返回值尽可能以 reference(to const) 来传
- 应加 const 就要加
- 构造函数尽量用初始化语法
- 是否需要重载?

#### 操作符重载的设计
- 用户会怎么使用? 会不会连用?
- 左值和右值可能是什么类型?
- 参数的传递要不要 reference? 要不要 const?
- 要返回吗? 返回可不可以用 reference?
- 成员函数? 全局函数?

#### Complex 类练习
- 实部, 虚部及封装函数
- += 重载(成员函数)
- + 重载(非成员函数)
- << 重载(连用的设计)

## OBD: 考虑一个带指针的类

#### 构造函数, 析构函数
- 带指针类的构造函数: 需要分配空间
- `new` 关键字会分配一块内存
- array new 要搭配 array delete
- ![[attachments/Pasted image 20250427173503.png]]
- 析构函数: ~Typename(), 清理空间 

#### 为什么要重写拷贝构造和拷贝赋值函数
- 如果没有手动写这两个函数, 编译器默认会生成一套浅拷贝版
- 带指针的类**必须**手动写一版深拷贝的

- 有 String a 和 b, 当我们写 b = a 时, 是希望 b 和 a 有同样的内容
- 但浅拷贝版会使 b 和 a 指向同一地址(两者一起变化), 且 b 原本指向的内容丢失(memory leak, 内容还在但没有指针指向它)
- ![[attachments/Pasted image 20250427174419.png]]

#### 深拷贝和浅拷贝
- 浅拷贝: 见上一节图片下半部分, 虽然是按值拷贝的, 但拷贝的是指针指向地址的值
- 深拷贝: 先创造新的空间, 再把内容拷贝过去

#### 拷贝构造, 拷贝赋值
- copy constructor, copy assignment operator
- 拷贝构造: 参数是自身类引用的构造函数
- ![[attachments/Pasted image 20250427175011.png]]

- 拷贝赋值: 重载=, 参数是自身类引用, 返回类型是自身类引用
- 两边本来都有东西, 所以要1先清空左值, 2分配和右值一样的空间, 3再复制内容
- 不检查自我赋值是可能会出错的! 会把自身 delete 掉
- ![[attachments/Pasted image 20250427175214.png]]

#### output 函数 <<
- ostream 可以接受 传统的 c 指针
- ![[attachments/Pasted image 20250427180238.png]]

#### 总结带指针的函数设计
- 首先是 [[#总结类设计流程]], 
- [[#设计一个函数的注意事项]], [[#操作符重载的设计]]
- 有指针的类? 通常数据是用指针的, 因为需要动态分配大小, 数组不行
- 构造函数分配空间, 析构函数释放空间
- 深拷贝版本的拷贝构造函数和拷贝赋值函数

#### String 类练习
- 数据使用的是指针
- 构造函数分配空间, 析构函数释放空间
- 深拷贝版本的拷贝构造函数和拷贝赋值函数
- 重构 <<

## 堆, 栈, 内存管理

 #### stack 和 heap
 ![[attachments/Pasted image 20250427180511.png]]

- {} 形成一个作用域, 函数本身及其参数使用的空间也取自 stack
- new 动态获得的空间来自 heap. 动态获得的内存空间, 就需要程序员自己负责管理

#### stack objects 的生命周期
- {} 形成一个作用域, 函数本身及其参数使用的空间也取自 stack
- 离开作用域后, 自动调用析构函数
- 用 new 创建的对象不属于此类!!
- ![[attachments/Pasted image 20250427181218.png]]

#### static stack objects 的生命周期
- 即使离开 scope, static object 依然存在
- static object 一直存在直到程序结束
- ![[attachments/Pasted image 20250427181409.png]]

#### global objects 的生命周期
- 全局对象: 写在任何作用域之外的
- 作用域实际上相当于整个程序
- 生命周期直到程序结束

#### heap objects 的生命周期
- 生命周期直到被 delete
- ![[attachments/Pasted image 20250427181807.png]]

#### 内存泄漏
 指针所指的空间还在, 但指针已经死亡了

#### new 的实际行为
- `new` = 1分配 memory, 2类型转换, 3调用 constructor
- `operator new` 整体是一个函数, 用来分配内存, 作用类似 `malloc`
- `static_cast<T*>` 是 C++ 中的类型转换操作
- ![[attachments/Pasted image 20250427220623.png]]

#### delete 的实际行为
- `delete` = 1 调用析构函数, 2 释放 memory
- `operator delete` 调用 `free`
- ![[attachments/Pasted image 20250427222550.png]]

#### 动态分配到底得到多大的内存(VC)?
https://www.bilibili.com/video/BV1Ef3CekE4k?t=1471.9&p=8

![[attachments/Pasted image 20250427223606.png]]


[为什么 array new 要搭配 array delete](https://www.bilibili.com/video/BV1Ef3CekE4k?t=2225.6&p=8)

![[attachments/Pasted image 20250427224415.png]]

![[attachments/Pasted image 20250427224711.png]]



## 特性补充: static, 模板, 

#### static 关键字
- `static` 关键字可以加在 data 或 function 前
- [[#static stack objects 的生命周期]] 是整个程序运行期间
- 调用 non-static 函数隐式使用 this
- ![[attachments/Pasted image 20250427232758.png]]
- static 的 data 和 function 和 非static 的部分是分开存放的
- static 数据 应该是整个类公用的数据

- static 函数 没有 this pointer, 也就是不能处理实例, 只能处理 static 数据
- static 函数 两种方式调用(示例见下):
    - 通过 object
    - 通过类名

**例: Account 类**
![[attachments/Pasted image 20250427233727.png]]

#### 单例模式中的 static
- static 这个单例 保证只有一个实例
- static getInstance 方法, 因此可以通过类名取得单例
- 将单例 放在 函数里面的好处是: 只有函数被调用时才创建单例
- ![[attachments/Pasted image 20250427234519.png]]

#### cout 是什么, 为什么能接受各种数据?
- cout 做了很多的重载, 因此可以接收很多类型的数据
- 是一种 ostream
- ![[attachments/Pasted image 20250427234922.png]]

#### class template
- template 会造成代码的膨胀
    - 什么意思: 每有一个新 T(如下面的 double, int) , 将原版的 T 全部换成这个新类型, 形成一份新代码
    - 但这种膨胀是必要的
- ![[attachments/Pasted image 20250427235423.png]]

#### function template
- 比如比大小函数, 好像所有类型的比大小都一样
- ![[attachments/Pasted image 20250428103806.png]]
- C++ 标准库里的算法(如比大小这种)很多都是 function template

#### namespace
- 避免同名
- ![[attachments/Pasted image 20250428104135.png]]

#### 更多细节
- ![[attachments/Pasted image 20250428104343.png]]

## OOD: 组合, 委托与继承
Object Oriented Design

#### 三种重要关系
- 继承 Inheritance
- 组合 Composition
- 委托 Delegation

#### 组合 Composition, has-a 关系
- ![[attachments/Pasted image 20250428110057.png]]
- 这个例子是 Adapter: 改造并开放已有的特定接口

- Compoitiom 模式下, 占用空间大小计算层层拆解

#### 组合关系下的构造和析构
- Container:
    - 构造从内而外: 先调用 Component 构造, 再调用 Container 构造
    - 析构从外而内: 先调用 Container 析构, 再调用 Component 析构
    - 红色部分是编译器会自动帮我们加的,调 默认
    - 如果不应该调默认, 就要自己写清楚
    - ![[attachments/Pasted image 20250428111256.png]]

#### 委托 Delegation, Composition by reference
- 与 Composition 的差异是: 拥有的是**指针**
- 把任务委托给一个指针对象
- 因为以指针相连, 所以会出现两者**生命周期不一致**的问题

#### Handle/Body, pImpl
- ![[attachments/Pasted image 20250428112122.png]]
- pimpl : pointer to implementation(也叫 Handle/Body 模式)
    - 左边是对外接口, 右边是实现
    - 好处
        - 具体实现可以切换
        - 可以做引用计数
    - 修改的时候: copy on write
        - 比如 a, b, c 共享, 这时候 a 想修改内容, 那就单独给一份副本给 a 改, b和c继续共享

#### 继承 Interitance, is-a 关系
- 语法是类名后加冒号
- public 继承 表示 is-a
- ![[attachments/Pasted image 20250428135643.png]]

- 父类的数据是可以完整继承的, 子类拥有的是 父类数据+子类数据
- 继承最大的价值在于和虚函数搭配

#### 继承下的构造和析构
- Derived:
    - base 会是 Derived 的一部分, 所以是内
    - 构造从内而外: 先调用 Base 构造, 再调用 Derived 构造
    - 析构从外而内: 先调用 Derived 析构, 再调用 Base 析构
    - base 类的 析构必须是 virtual
    - ![[attachments/Pasted image 20250428113637.png]]

## OOD: 虚函数与多态

#### 继承和虚函数
- 在任意成员前面加上 virtual 就可以成为虚函数 
- non-virtual 函数: 不希望被 derived class override
- virtual 函数: 希望被 override, 但也有默认定义
- pure virtual 函数: 以 ` = 0` 结尾,必须被 override
- ![[attachments/Pasted image 20250428140250.png]]

#### Template Method 模板模式, 虚函数指针
- 子类调用父类函数遇到虚函数
- ![[attachments/Pasted image 20250428141008.png]]
- 子类实例 myDoc 调用 父类 CDocument 的 OnFileOpen(), 执行到虚函数时, 前往子类寻找重写的方法

![[attachments/Pasted image 20250428142248.png]]

#### 继承+组合下的构造和析构
- 谨记从内而外构造, 从外而内析构
- ![[attachments/Pasted image 20250428142709.png]]

#### Observer 模式, Delegation+Inheritance
- 数据和视图的关系, 视图是 Observer
- ![[attachments/Pasted image 20250428160852.png]]

#### Composite 模式, Delegation+Inheritance
- 文件系统, File=Primitive, Dir=Composite
- ![[attachments/Pasted image 20250428161610.png]]

#### Prototype 模式, Delegation+Inheritance
- 原型模式: 子类在未来才被派生
- 父类容器会收集子类原型, 通过 clone() 创建新的子类实例
- ![[attachments/Pasted image 20250428164211.png]]
- ![[attachments/Pasted image 20250428164531.png]]
- ![[attachments/Pasted image 20250428164839.png]]
- 私有的构造函数会添加到父类容器, 所以还需要一个重载构造函数(int 其实是无关紧要的)

## 下: 面对对象设计兼谈对象模型
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
- 如果 ctor 没用 explicit 修饰, 编译器会自动尝试调用 non-explicit-one-arg ctor 去转换为此类型 
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
- 如果成员函数有 const 和 non-const 两个版本
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