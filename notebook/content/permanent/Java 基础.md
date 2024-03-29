---
title: "Java 基础"
date: "2023-06-14"
tags:
- Java
---

## Java 入门须知

##### 编译
```cmd
javac app.java
```

##### 注释
```java
// single line comment

/* 
    multi-line comment
*/

/** 
*   doc comment 
*/
```

##### 大小写
类名大小写不敏感(这是操作系统决定的)
java 是 case-sensitive, 即方法, 包名等都大小写敏感

##### Java类 入口函数
```java
public static void main(String [] args);
```

##### Access Modifier
| |within class|within package|outside package by subclass only|outside package|
|---|---|---|---|---|
|private|Y|N|N|N|
|default|Y|Y|N|N|
|protected|Y|Y|Y|N|
|public|Y|Y|Y|Y|

##### Java keyword
abstract assert
boolean	break byte
case catch char class const continue
default do double else enum extends 
final finally float for 
goto
if implements import instanceof int interface
long
native new 
package private protected public
return
short static strictfp super switch synchronized
this throw throws transient try
void volatile
while

## 变量

#### 变量
变量其实是一块预留空间的名字, 变量的类型则指示了预留空间的大小以及解析方式

#### 变量类型
```java
class Guru99 {
    static int a = 1; //static variable  
    int data = 99; //instance variable  
    void method() {
        int b = 90; //local variable  
    }
}
```

##### 本地变量 Local Variable
在`域`范围有效的变量, 如在方法中声明的变量只在方法中有效
本地变量不能是 static 的

##### 对象变量 Instance Variable
没有用 `static` 关键字定义, 且不是在方法内部声明的变量. 是对象特有的

##### 静态变量 Static Variable
用 `static` 关键字定义, 在类被加载时初始化一次
静态变量是该类的所有对象共享的

#### Casting
向上直接兼容
向下会舍弃部分

## 数据类型

### 原始数据类型 Primitive Data Type

| Data Type | Default Value | Default Size(Byte) | 
| --------- | ------------- | ------------------ |
| byte      | 0             | 1                  |
| short     | 0             | 2                  |
| int       | 0             | 4                  |
| long      | 0L            | 8                  |
| float     | 0.0f          | 4                  |
| double    | 0.0d          | 8                  |
| boolean   | false         | 1 bit              |
| char      | '\\u0000'     | 2                  |

- 以上除了 `boolean`, 都属于Numeric
- all nemeric data types are signed
- standardized: 在所有平台上数据类型的大小是一致的
- char 是 2 Bytes, 因为使用了 Unicode, 范围是 \\u0000 到 \\uffff


### 非原始数据类型 Non-primitive Data Type
string
array
etc

## 流程控制

### Condition

#### if ... else if ... else
```java
if (con1) {
	// do somethin
} else if (con2) {
	// do something
} else {
	// do something
}
```

#### switch
```java
switch(expr) {
	case val1:
		// do something
		break; 
	case val2:
		// do something
		break;
	default:
		// do something
		break;
}
```

##### break 语句的作用
如果没有 break 语句, 程序会继续执行下一条 case
break 并不是必须的.

### Loop

#### for
两种语法
```java
// 1
for(int i = 0; i <= n; i++) {
	// do something
}

// 2 for each
int arr[] = {1, 2, 3};
for(int i:arr) {
	// do something
}
```

#### while
```java
while (condition) {
	// do something
}
```
#### do ... while
```java
do {
	// something 
} while ();
```
和 [[#while]] 的区别在于 do block 内的代码必定执行一次

## Function
好像没啥说的?

## Exception Handling

### Exception Hierarchy
- Object
	- Throwable
		- Exception
		- Error

### Exception
Exceptions are unwanted events that interupts the normal flow of program, but within control.
e.g.
- invalid user input
- loss of network connection
- unavailable file

### Error
Errors are irrecoverable conditions that the program cannot handle.
e.g.
- JVM out of memory
- memory leaking
- stack overflow
- library incompatibility
- infinite recursion

### Types of Exceptions
- User-Defined Exception
- Built-in Exception
	- Checked Exception
		- ClassNotFoundException
		- InterruptedException
		- IOException
		- InstantiationException
		- SQLException
		- FileNotFoundException
	- Unchecked Exception
		- ArithmeticException
		- ClassCastException
		- NullPointerException
		- ArrayIndexOutOfBoundsException
		- ArrayStoreException
		- IllegalThreadStateException

**Checked Exceptions**
在编译时可以被编译器发现的

**Unchecked Exceptions**
只有在运行中才会被发现的

### try ... catch ... finally
```java
try {
	int a = 5;
	int b = 0;
	int c = a/b;
} catch (ArithmeticException e) {
	System.out.println(e.getMessage());  // Out: by zero
} finally {
	// do something
}
```
### throw, throws
`throws` 在方法的头部声明(可能出现的)异常, 以便将异常传递到方法外处理
```java
returnType method_name(paramList) throws Exception 1,Exception2, ... { ... }
```

`throw` 直接手动抛出一个异常, 后接 Throwable 对象
```java
throw new IllegalArgumentException("用户名长度必须大于 8 位！");
```

使用的对比
```java
public class Test {
	public void test_throws() throws IOException {
		FileInputStream fis = new FileInputStream("a.txt");
	}

	public boolean test_throw(String username) {
		boolean res = false;
		if (username.length() < 8) {
			throw new IllegalArgumentException("用户名长度不足8位.")
		} else {
			res = true;
		}
		return res;
	}

	public static void main(String[] args) {
		// throws
		try {
			test_throws();
		} catch (IOException e) {
			System.out.println(e);  //
		}

		// throw
		Scanner scanner = new Scanner(System.in);
		System.out.println("请输入用户名：");
		String username = input.next();
		try {
			boolean con = test_throw(username);
		} catch (IllegalArgumentException e) {
			System.out.println(e);  // Out: java.lang.IllegalArgumentException: 用户名长度不足8位.
		}
	}
}
```

### 重写方法时异常声明的限制
如果父类方法声明了异常, 那么子类方法重写时只能声明该异常本身或其子类.

## Package
### Java Package 的作用
- 数据封装: 包相当于把一些类封装(encapsulate)到一起
- 建立命名空间
- access controll

### 包
包名和文件路径相关, 比如说 包`college.staff.cse` 在 /college/staff/cse, 将一个 .java 文件放在目录下, 并在开头使用 `package`关键字, 就会划入包

命名大约就是 单位.领域.子领域, 如 college.tech.cse, college.art.history

如果有同名类, 需要用全称(带包名的类名)

### import
```java
import java.util.vector;
import java.util.*; // 引入所有类, 但子包的不会
```

### import static
Java 5+
通过 `import static` 语法引入的类, 其字段和方法会在引入时被隐性 static 声明
```java
// Note static keyword after import.
import static java.lang.System.*;
class StaticImportDemo
{
   public static void main(String args[])
   {      
        // We don't need to use 'System.out' 
        // as imported using static.
        out.println("GeeksforGeeks");
   }

}
```

### 重名冲突
如果有两个 \*引入 引发了重名冲突, 如
```java
// 两者都包含 Date 类
import java.util.*;
import java.sql.*;
```
则用非\*的引入其中一个重名(Date)

### CLASSPATH
可以在使用每些shell的时候使用**临时** CLASSPATH
```text
> SET CLASSPATH=.;c:\javaproject\classes;d:\tomcat\lib\servlet-api.jar
```
or
```text
> java –classpath c:\javaproject\classes com.abc.project1.subproject2.MyClass3
```

如果希望**永久**引入, 也就是说在以后也能 import 一个 .jar 包或者 .class 文件, copy the jar file in the jre/lib/ext

### Java 项目包管理示例
![[Pasted image 20221226155535.png|260]]
```java
import package_one.ClassTwo;
import package_name.ClassOne;
public class Testing {
    public static void main(String[] args){
        ClassTwo a = new ClassTwo();
        ClassOne b = new ClassOne();
        a.methodClassTwo();
        b.methodClassOne();
    }
}
```


## Java OOP

### Class
类就是类啊, 类名应和文件名同名, 后缀 .java 是源文件, .class 是类文件也就是编译后的文件.
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

## File, I/O
> src: [Java's File API](https://www.marcobehler.com/guides/java-files#_writing_reading_files)

Java 有两个 File API,
java.io.File(Java 1.0+)
java.nio.file.Path, java.nio.file.Files(Java 1.7+ 以下使用的版本)

#### 获取文件路径

```Java
// Java < 11
Path path = Paths.get("c:/dev/readme.txt");
```

```Java
// Java 11+
Path path = Path.of("c:/dev/readme.txt");
path = Path.of("c:", "dev", "readme.txt");
path = Path.of("c:", "dev").resolve("readme.txt");
path = Path.of(new URI("file:///c:/dev/readme.txt");
```

#### 检查文件是否存在
```Java
boolean file_exists = Files.exists(path);
```

#### 文件属性
```Java
FileTime lastModifiedTime = Files.getLastModifiedTime(path);
UserPrincipal owner = Files.getOwner(path);
```

#### 创建文件或文件夹

**临时**, 但他们不会自己删除, 要记得手动删除
```Java
// 在Temp文件夹创建带固定前缀的临时文件
Path tempFile1 = Files.createTempFile("prefixOrNull", ".txt"); 

// 在指定路径创建临时文件
Path tempFile2 = Files.createTempFile(path.getParent(), "prefix", ".jpg"); 

// 在Temp文件夹创建临时目录
Path tempDir = Files.createTempDirectory("prefix");
```

一般
```Java
Path newDir = Files.createDirectory(path.getParent().resolve("newDir"));
Path tempFile1 = Files.createFile(newDir.resolve("newFile.txt")); 
```

#### 查看 Posix 权限(Unix)
```Java
Path path = Path.of("c:\\dev\\licenses\\windows\\readme.txt");
try {
    Set<PosixFilePermission> permissions = Files.getPosixFilePermissions(path);
    System.out.println("permissions = " + permissions);
} catch (UnsupportedOperationException e) {
    System.err.println("Looks like you're not running on a posix file system");
}
```

#### 文件写入

##### 写入字符串
```Java
Path utf8File = Files.createTempFile("utf8", ".txt");
Files.writeString(utf8File, "A String üü");

Path iso88591 = File.createTempFile("iso88591", ".txt");
Files.writeString(iso88591, "A String üü", StandardCharsets.ISO_8859_1);
```

##### 写入字节
```Java
Files.write(anotherIso88591File, "this is my string ää öö üü".getBytes(StandardCharsets.ISO_8859_1));
```

##### 写入时的选项
```Java
Files.write(filename, "string".getBytes(), StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING, StandardOpenOption.WRITE);
```
默认是不存在则创建, 存在则在截断(truncated)
[其他选项](https://docs.oracle.com/javase/7/docs/api/java/nio/file/StandardOpenOption.html)

##### Writer 和 OutputStream
```Java
try (BufferedWriter bufferedWriter = Files.newBufferedWriter(utfFile)) {
    // handle reader
}

try (OutputStream os = Files.newOutputStream(utfFile)) {
    // handle outputstream
}
```


#### 文件读取

##### 读取字符串
```Java
String s = Files.readString(utfFile); // utf8
s = Files.readString(utfFile, StandardCharsets.ISO_8859_1);
```
##### 读取字节
```Java
String s = new String(Files.readAllBytes(utfFile), StandardCharsets.UTF_8);
```

##### Reader and InputStream
```Java
try (BufferedReader bufferedReader = Files.newBufferedReader(utfFile)) {
	// handle reader
}
try (InputStream is = Files.newInputStream(utfFiles)) {
	// handle inputstream
}
```

#### 移动, 删除,  list 文件
```Java
// 移动 test.jpg → c:\temp\test.jpg
Files.move(filepath, Path.of(target_path_string).resolve(filepath.getFileName().toString())[,options]); 
// StandardCopyOption.REPLACE_EXISTING
// catch (FileAlreadyExistsException e)
  
// 删除 空dir
// 删除 非空文件夹, 思路是用 Files.walk(dir) 遍历
try {
	Files.delete(path);
} catch (DirectoryNotEmptyException e) {
	e.printStackTrace();
}

// list files
// 同级同目录下
try (var files = Files.list(temDir)) {
	files.forEach(System.out::println);
}
// 指定文件类型
try (var files = Files.newDirectoryStream(tmpDir, ".txt")) {
	files.forEach(System.out::println);
}
// -r
try (var files = Files.walk(tmpDir)) {
	files.forEach(System.out::println);
}
