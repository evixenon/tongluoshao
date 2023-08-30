---
title: "Java OOP"
date: "2023-08-25"
tags:
---

## Java OOP

### Class
类名应和文件名同名, 后缀 .java 是源文件, .class 是类文件也就是编译后的文件.

类描述的是对象知道什么(属性)和执行什么(方法)

一个类可以有:
- 成员变量
- 方法
- constructor
- 子类

#### constructor
与类同名的方法, 可以多个, 可以省略不写, 不能用 static/final 修饰
构造器省略, 则 JVM 会自动创建一个无参的构造函数

### Interfaces

#### 创建 interface
```java
// A simple interface
interface In1 {
    // public, static and final  // 实现了此接口的类可以直接使用a
	final int a = 10;
    // public and abstract
    void display();
}
```

#### implements
必须实现
```java
class TestClas implements In1{
	void display() { ... }
	// some codes
}
```

### Object
Object, 有 State, 有 Behavior, 有 Identity
在 Java 中, 所有类都是 Object 的子类

### Inheritance
在 Java 中, 一个类不能继承多个类(类似的功能只能通过接口实现)
建议在 `is-a` 关系时才使用继承

#### extends
```java
class subclass extends baseclass {
	// ...
}
```

#### override 重写
子类可以重写父类的方法.
如果子类调用一个方法, 会先检查子类是否有该方法或重写了该方法, 然后检查父类中时候实现了该方法.

想要重写方法, 在子类被重写的方法前添加 `@Override` 关键字

### Polymorphism

#### Runtime polymorphism/Dynamic Method Dispatch
指调用方法时的[[permanent/多态|多态]], 也就是在运行时, 才根据变量的内容决定调用哪个函数
Rule: Runtime polymorphism can't be achieved by data members.

**Upcasting**
```java
Animal a = new Dog();
```

### Abstraction

#### Abstraction in OOP

##### Data Abstraction
使用复杂的数据结构通常会隐藏其内部细节

##### Control Abstraction
控制抽象收集了作为应用程序一部分的所有控制语句，并将它们作为一个单元公开。当我们必须使用这个控制单元执行一个工作功能时，就会用到这个功能。 控制抽象构成了结构化编程的主要单元，使用控制抽象我们可以在复杂的框架中定义简单的功能。

#### Java Abstraction Class
Java 抽象类类似于父类和接口的结合
抽象方法**不能**有 `abstract` 以外的限定修饰词, 如 `abstract static`
抽象类**可以 implements 接口且不实现接口**

```Java
//abstract class
abstract class Car{ 
    abstract void accelerate(); 
} 
//concrete class
class Suzuki extends Car{ 
    void accelerate(){
        System.out.println(`"Suzuki::accelerate"`);
    }
}
class Main{
    public static void main(String args[]){ 
        Car obj = new Suzuki();    //Car object =>contents of Suzuki
        obj.accelerate();          //call the method 
    }  
}
```

### Encapsulation

#### Java Encapsulation
指的是把数据(字段和方法)封装在一个单独的类里, 外部类不能随意修改
涉及到 private, get/set 方法

#### Getter/Setter
Getter 和 Setter 的作用并不仅仅是给属性设置读取和修改两个方法, 更重要的是执行这些行为时的检查.