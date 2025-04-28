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
- += 重载
- + 重载
- << 重载

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
- 数据
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

- Compoitiom 模式下, 大小计算层层拆解

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
    - base 是基础, 所以是内
    - 构造从内而外: 先调用 Base 构造, 再调用 Derived 构造
    - 析构从外而内: 先调用 Derived 析构, 再调用 Base 析构
    - base 类的 析构必须是 virtual
    - ![[attachments/Pasted image 20250428113637.png]]

## OOD: 虚函数与多态

#### 继承和虚函数
- 在任意成员前面加上 virtual 就可以成为虚函数 
- non-virtual 函数: 不希望被 derived class override
- virtual 函数: 希望被 override, 但也有默认定义
- pure virtual 函数: 必须被 override
- ![[attachments/Pasted image 20250428140250.png]]

#### Template Method 模板模式, 虚函数指针
- 子类调用父类函数遇到虚函数
- ![[attachments/Pasted image 20250428141008.png]]
- 子类实例 myDoc 调用 父类 CDocument 的 OnFileOpen(), 执行到虚函数时, 前往子类寻找重写的方法

![[attachments/Pasted image 20250428142248.png]]

#### 继承+组合下的构造和析构
- 谨记从内而外构造, 从外而内析构
- ![[attachments/Pasted image 20250428142709.png]]

#### Observer 模式 案例, Delegation+Inheritance
- 数据和视图的关系, 视图是 Observer