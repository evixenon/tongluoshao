---
title: "Java 内置数据类型"
date: "2023-08-31"
tags:
---

### ArrayList
```java
ArrayList<T> myList = new ArrayList<T>();
```

注意, 从 ArrayList\<Animal> 中用 get() 方法取出的对象, 编译器只能确认是 Animal 类的, 也就是说, 即使它其实是个 Dog 类(继承 Animal), 它也无法放在 Dog 的引用里 

```java
void add(Object elem);
void remove(int index);
void remove(Object elem);
void contains(Object elem);
boolean isEmpty();
int indexOf(Object elem);
int size();
Object get(int index);
```

#### ArrayList 与[]数组相比
- 在创建时不须指定大小, 可以动态调整大小
- 不需要特殊的语法, 是个普通的对象
- 存储时不必须指定位置