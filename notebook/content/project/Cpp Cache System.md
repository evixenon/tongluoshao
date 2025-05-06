---
title: "Cpp Cache System"
date: "2025-05-06"
tags:
---

## CachePolicy 抽象类

#### 新的防卫式声明写法
`#pragma once`
缺点是不是所有编译器都支持

#### 基类方法
```cpp
    // 加入缓存
    virtual void put(Key key, Value value) = 0;

    // 查询 value, 成功直接返回 value
    virtual Value get(Key key) = 0;
    
    // 查询 value, value 以引用传出, 返回成功与否
    virtual bool get(Key key, Value& value) = 0;
```


## 从 LRU 开始

#### 变量名_ 区分成员变量
注意是后加下划线, 前加是 cpp 标准库的保留标识符

#### LruNode 类

成员
- key_, value_ 都是模板未定类型
- prev_, 是一个 std::weak_ptr
- value_, 是个 std::shared_ptr

问: 这个 accessCount_ 可以不要? claude 说行, 先看看

getter: key, value
setter: value

friend class LruCache

#### using 用做 Type Alias
代替 typedef 

```cpp
// 定义别名
using MyInt = int;                     // 等价于 typedef int MyInt;
using IntVector = std::vector<int>;    // 定义一个 vector<int> 的别名
using StringMap = std::map<std::string, std::string>;  // 定义 map 的别名
```

项目中用来简化代码

```cpp
using LruNodeType = LruNode<Key, Value>;
using NodePtr = std::shared_ptr<LruNodeType>;
using NodeMap = std::unordered_map<Key, NodePtr>;
```

#### make_shared 创建 shared_ptr
```cpp
#include <memory>  // 必须包含头文件

// 示例类
class MyClass {
public:
    MyClass(int a, double b) : x(a), y(b) {}
private:
    int x;
    double y;
};

int main() {
    // 创建 shared_ptr 指向 MyClass 对象
    auto obj = std::make_shared<MyClass>(10, 3.14);

    // 创建 shared_ptr 指向基础类型
    auto num = std::make_shared<int>(42);
    auto str = std::make_shared<std::string>("Hello");

    return 0;
}
```

#### lock_guard

手动管理锁（易出错）
```cpp
std::mutex mutex_;

void unsafeFunction() {
    mutex_.lock();          // 手动加锁
    // ... 临界区操作 ...
    mutex_.unlock();        // 必须手动解锁（可能忘记或异常导致未解锁）
}
```

使用 `lock_guard`（安全简洁）
```cpp
std::mutex mutex_;

void safeFunction() {
    std::lock_guard<std::mutex> lock(mutex_);  // 自动加锁
    // ... 临界区操作 ...
} // 离开作用域时自动解锁（无论是否异常）
```

`std::lock_guard` 如何保证异常安全？

**参考答案：**  
`std::lock_guard` 在构造函数中加锁，析构函数中解锁。由于析构函数在对象离开作用域时（包括异常发生时的栈展开过程）必然调用，因此无论是否抛出异常，锁都会被正确释放。
#### LruCache 类

成员
- int capacity
- NodeMap
- mutex
- dummyHead & Tail, NodePtr(shared_ptr)

构造函数初始化容量和容器

接口:
- put, get, remove

私有方法
- initializeList
- updateExistingNode
- addNewNode
