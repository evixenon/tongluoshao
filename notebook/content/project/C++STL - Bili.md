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

#### 迭代器

- 检查容器内元素, 并遍历容器内元素的数据类型
- 作用: 提供对容器内对象的访问方法. 
    - 统一对所有容器的访问方式: 无论什么容器, 都能用迭代器自增进行访问

## vector
- 原理是动态的数组
- 尾部添加或移除 O(1), 中部O(n)

#### vector 的构造
```cpp
// 默认构造
vector<T> vecT;

// 从另一个 vector 的区间构造 左闭右开 [beg, end)
vector<T> vecT(beg, end);
vector<int> vecT(arr, arr+5); // 数组
vector<int> vecT(vecA.begin(), vecA.begin()+3); // 另一个容器

// 构造一个 n 个 elem 的数组
vector<T> vecT(n, elem);
vector<int> vecT(3, 9); // {9,9,9}

// 拷贝构造
vector<T> vecT(const vector &vec);
```

#### vector 的赋值

assign 会用传入对象的迭代器作为参数, 深拷贝

```cpp
// 1
vec.assign(beg, end); // 左闭右开
int iArr[] = {1,2,3,4,5};
vec.assign(iArr, iArr + 5);  // 数组
vec.assign(vecA.begin(), vecA.end())

// 2
vec.assign(n, elem);

// 拷贝赋值
vector& operator=(const vector& vec);

// 交换两个 vector 的内容
vec.swap(vec2) 
```

#### vector 的结构操作

```cpp
vec.size();
vec.capacity();
vec.resize(n, elem=0); // 缩小则删, 扩大则以 elem 填充
vec.empty(); // 实验结果: 全为0 -> 0, 未赋初值 -> 1
```

#### vector 的元素访问
```cpp
vec.at(index); // 如果 index 越界, 抛出 out_of_range 异常
vec[index]; // 越界时, 程序可能会中止

vec.front(); // 第一个
vec.back(); // 最后一个
```

#### vector 的添加(insert, push_back)

```cpp
// 在末尾操作很快
vec.push_back(); 
vec.pop_back();
```

```cpp
// pos 参数为指针, 比如 vec.begin() + 3
it = vec.insert(pos, elem);  // 返回新数据的位置(新的迭代器)
vec.insert(pos, n, elem); // 无返回
vec.insert(pos, beg, end); // 无返回
```

#### vector 的删除(erase)
```cpp
// 删除末尾
vec.pop_back();

// 删除指定位置, 返回下一个位置的迭代器
it = vec.erase(pos);

// 删除 vector 容器中位于迭代器 [beg,end)指定区域内的所有元素，并返回指向被删除区域下一个位置元素的迭代器
it = vec.erase(beg, end);


```

删除所有指定元素的正确写法
![[attachments/Pasted image 20250513191136.png]]

#### vector 迭代器

迭代器本质上是**指针**, 里面存的是**地址**

![[attachments/Pasted image 20250512233716.png]]

![[attachments/Pasted image 20250512233905.png]]

![[attachments/Pasted image 20250512234018.png]]


```cpp
vector<int>::iterator it=v.begin(); // 使用容器的 begin()/end()函数, 指向一个位置
for(; it!=v.end(); iter++)  // 使用自增取下一个, end() 是边界, 这也解释了左闭右开
    *it=0;
```

#### vector 迭代器失效
- 插入元素或删除元素后
- 插入可能导致扩容, 扩容可能会整体搬迁, 所以失效

## deque

- 双端队列
- 原理是动态数组
- 相比于 vector 多了一端, 其他很像
- 头尾操作快O(1), 中间操作慢O(n)

```cpp
deq.push_front(elem); //在头部插入一个
deq.pop_front(); // 删除第一个
```
## list

- 原理是双向链表
- 查找O(n)
- 插入或删除可以 O(n)
- 不支持 at() 或 下标访问
- 可以 it++,  不能 it+5

#### list 构造
```cpp
list<int> lst;

list<int> lst(n, elem);
list<int> lst(beg, end);  // 闭区间!! 注意不能地址+n
lst(const list& lst); // 拷贝构造
```

#### list 赋值
```cpp
lst.assign(beg, end); //左闭右开
lst.assign(n, elem);
list& operator= (const list& lst);
lst1.swap(lst2);
```

#### list 头尾操作
```cpp
lst.push_back();
lst.pop_back();
lst.push_front();
lst.pop_front();

lst.front() = 1; // 修改第一个节点
a = lst.back(); // 也可以直接读取
```

#### list 的反向迭代器

```cpp
// 四种迭代器
begin(), end(), rbegin(), rend()
```

反向迭代的用法
![[attachments/Pasted image 20250513203405.png]]

#### list 结构操作
```cpp
lst.reverse(); // 得到一个反的
```
其他跟 vector 一样

#### list 插入和删除

insert 一个元素, 会在插入后返回位置指针

![[attachments/Pasted image 20250513204219.png]]

erase 会返回下一个位置, 毕竟原位置是野指针了

![[attachments/Pasted image 20250513204311.png]]

#### list 迭代器注意
it++, 其实是双链的 next 实现的, 因此 erase 之后无法使用 it++
## stack

```cpp
st.push(elem);
st.pop(); 

st.top(); // 返回栈顶元素
st.empty();
st.size();

stack(const stack& st);
stack& operator= (const stack& st);
```
## queue
- FIFO 队列

```cpp
que.push(elem); // 从队尾入队
que.pop(); // 从队首出队

que.front();
que.back();

que.empty();
que.size();
```

## set

## map

