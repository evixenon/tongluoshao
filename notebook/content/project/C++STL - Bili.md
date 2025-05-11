---
title: "C++STL"
date: "2025-05-10"
tags:
---
## 概念

#### 什么是stl

- Standard Template Library, 惠普实验室开发的一系列软件
- 分为 algorithm, container, iterator
    - 容器和算法通过迭代器连接
- 几乎所有代码都使用了模板类和模板函数实现 -> 更好的代码重用
- 组织为 13 个头文件
    - algorithm, deque, functional, iterator, vector, list, map ,memory, numeric, queue, set, stack, utility

#### 使用 stl 有什么好处
- 方便: 内置, 不用额外安装
- stl 一个重要特点是数据结构和算法的分离 -> 非常通用
    - 比如 vector 可以放各种类型, sort() 可以排各种类型
- 不需要考虑实现, 直接就能使用这些高效的现成库

#### stl 的特点
- 高可重用性: 几乎所有代码都使用了模板和模板类实现
- 高性能
- 高移植性: 在项目a用stl 开发的模块可以直接移植到项目b
- 跨平台

#### 容器的分类

序列式容器 sequence container
- 元素位置与插入方式有关
- vector, deque, list, stack, queue

关联式容器 associated containers
- 元素位置与插入方式无关, 与特定排序准则有关
- set, multiset, map, multimap

## vector

## deque

## list

## stack

## queue

## set

## map

