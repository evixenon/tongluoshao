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

Java 变量是有类型的, 这意味着不能把 int 装进 char 的箱子

实例变量有初始值, 但局部变量没有
#### local, instance, static
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

primitive 和引用都可以用 == 进行同类型之间的比较, 比较的是字节上的差异

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

#### String.format
- 完整的日期与时间 %tc
- 只有时间 %tr
- 周, 月, 日 %tA %tB %td
- 同上一个格式 %\<tB

### 非原始数据类型 Non-primitive Data Type
或者说, 引用
- string
- array
- 数组是对象, 说的是 `nums[0]` 这种东西, 无论它装载什么类型

对于任意一个 Java 虚拟机来说, 所有引用的大小都一样

和 C 不同,  Java 不能对引用计算. 「Java 不是 C」念一百遍
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

## 运算符

& 和 | 是长运算符, 使用在 boolean 表达式时会强制 java 虚拟机计算两边的算式. 但更常用的时作为位运算符

## Function

Java 的方法只能有一个返回值, 如果需要返回多个, 只能通过装入数组的方式传递

Java 是 call by value


## Static, Final

### static

#### static 方法
> 想想 Math.min

- 静态方法是这个类的方法, 而不是对象的方法
- 静态的方法不能*直接*调用本类非静态的变量, 也不能*直接*调用非静态的方法
#### static 变量
static block 也是一样的

- 静态变量会在该类的任何对象创建之前完成初始化, 包括继承的子类
- 静态变量会在该类的任何静态方法执行之前初始化

#### static 类
- static 不能修饰顶级类
- 内部静态类不需要有指向外部类的引用。但非静态内部类需要持有对外部类的引用
- 非静态内部类能够访问外部类的静态和非静态成员。静态类不能访问外部类的非静态成员。他只能访问外部类的静态成员。
- 一个非静态内部类不能脱离外部类实体被创建，一个非静态内部类可以访问外部类的数据和方法，因为他就在外部类里面。

静态内部类使用场景一般是**当外部类需要使用内部类，而内部类无需外部类资源，并且内部类可以单独创建的时候**会考虑采用静态内部类的设计，在知道如何初始化静态内部类，在《Effective Java》第二章所描述的静态内部类builder阐述了如何使用静态内部类

[java中的Static class - 功夫 熊猫 - 博客园](https://www.cnblogs.com/kungfupanda/p/7239414.html)
#### static import
- static 的 import 则可以直接使用方法, 而不用带类名
- 但可能导致混乱

```java
import static java.lang.System.out;
import static java.lang.Math.*;
...
out.println("1");
sqrt(2);
```

### final
- final 表示方法类不能被继承, 方法不会被重写, 变量不会被改变

## Exception Handling

throw 的意义是, 说明这个类/方法可能会出现必须处理的问题

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
RuntimeException: 编译器不会管
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
    // 即使 try/catch block 有 return 语句, finally 也会执行
}
```

对每一种可能的 Exception, 就应该有一个对应的 catch block, 并以从子异常到父异常的顺序排列
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

### ducking
- 不想处理异常, 可以 duck 掉, 主打一个"谁调用的我谁自己处理异常", 这会让使得调用的时候必须 catch 该异常
- 踢皮球
- 这就是为什么方法会 throws Exception(ducking 也就是指方法 throws Exception)
- 如果直到 main() 都 duck 掉异常, 虚拟机只好挂了

```java
// 两种方式

// 处理
void foo() {
    try {
        laundry.doLaundry();
    } catch (ClothingException cex) {
        // do something
    }
}

// duck
// 于是乎调用 foo() 的时候就要 处理 or duck
void foo() throw ClothingException {
    laundry.doLaundry();
}

```
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
