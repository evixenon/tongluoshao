---
title: Kotlin
date: 2023-11-20
tags:
  - Kotlin
---
## 快速入门
- Android 官方开发语言, 安卓世界的 swift
- Kotlin 可以编译成Java字节码，也可以编译成 JavaScript，方便在没有 JVM 的设备上运行。
- 简洁, 安全, 充分利用现有的 JVM, Android, 浏览器的库
- 可以用任何 Java IDE 或命令行构建

[Kotlin 教程 | 菜鸟教程](https://www.runoob.com/kotlin/kotlin-tutorial.html

```kotlin
class Greeter(val name: String) {
   fun greet() { 
      println("Hello, $name")
   }
}
 
fun main(args: Array<String>) {
   Greeter("World!").greet()          // 创建一个对象不用 new 关键字
}
```

#### 创建项目
IntelliJ 创建过程需要选择 SDK， Kotlin 与 JDK 1.6+ 一起使用。

#### 编译和运行
[命令行编译工具](https://github.com/JetBrains/kotlin/releases/)

```
$ kotlinc hello.kt -include-runtime -d hello.jar
```

- **-d**: 用来设置编译输出的名称，可以是 class 或 .jar 文件，也可以是目录。
- **-include-runtime** : 让 .jar 文件包含 Kotlin 运行库，从而可以直接运行。


编译成库: 若需要将生成的 jar 包供其他 Kotlin 程序使用，可无需包含 Kotlin 的运行库
```
$ kotlinc hello.kt -d hello.jar
```
#### 帮助

```
kontlinc -help
```

#### 交互式解释器 REPL
bin/kotlinc-jvm

## 特色语法和语法糖

#### 可变长参数函数
vararg
```kotlin
fun vars(vararg v:Int){
    for(vt in v){
        print(vt)
    }
}
```

#### lambda
```kotlin
fun main(args: Array<String>) {
    val sumLambda: (Int, Int) -> Int = {x,y -> x+y}
    println(sumLambda(1,2))  // 输出 3
}
```

#### 变量和常量
var 变量
val 常量

可以指定类型也可以不指定

#### 注释
```kotlin
// 单行
/* 这是
   多行 */
```

#### 字符串模板
```kotlin
var a = 1
// 模板中的简单名称：
val s1 = "a is $a" 

a = 2
// 模板中的任意表达式：
val s2 = "${s1.replace("is", "was")}, but now is $a"

// a was 1, but now is 2
```

#### null 机制 #todo 
- ? 可为 null
- safe (?.)
- !! 
- non-null asserted (!!.)
```kotlin
fun parseInt(str: String): Int? {
    return str.toIntOrNull()
}
```

#### 类型检测及自动类型转换
- obj is String, obj !is String

自动类型转换的案例
```kotlin
fun getStringLength(obj: Any): Int? {
  if (obj !is String)
    return null
  // 在这个分支中, `obj` 的类型会被自动转换为 `String`
  return obj.length
}

fun getStringLength(obj: Any): Int? {
  // 在 `&&` 运算符的右侧, `obj` 的类型会被自动转换为 `String`
  if (obj is String && obj.length > 0)
    return obj.length
  return null
}
```

#### 区间
```kotlin
for (i in 1..4) print(i) // 输出“1234”
for (i in 4..1) print(i) // 什么都不输出

// downTo step
for (i in 4 downTo 1 step 2) print(i) // 输出“42”

// 使用 until 函数排除结束元素
for (i in 1 until 10)   // i in [1, 10) 排除了 10
```

## Kotlin 基础语法

#### 类型
- 十进制：123
- 长整型以大写的 L 结尾：123L
- 16 进制以 0x 开头：0x0F
- 2 进制以 0b 开头：0b00001011
- 注意：8进制不支持
- - Doubles 默认写法: `123.5`, `123.5e10`
- Floats 使用 f 或者 F 后缀：`123.5f`
- 数字可以用下划线 `val oneMillion = 1_000_000`

#### 运算符
- == 比较值
- === 比较值和地址

位操作符
```kotlin
shl(bits) – 左移位 (Java’s <<)
shr(bits) – 右移位 (Java’s >>)
ushr(bits) – 无符号右移位 (Java’s >>>)
and(bits) – 与
or(bits) – 或
xor(bits) – 异或
inv() – 反向
```

#### 字符
- Char 必需是单引号 ' 包含起来的
- 不能直接进行数字的操作

```
支持这几个转义序列：\t、 \b、\n、\r、\'、\"、\\ 和 \$。 编码其他字符要用 Unicode 转义序列语法：'\uFF00'。
```

#### 字符串
- 不可变类型
- 可以用`[]`, for c in str
- 多行 `"""`
- trimMargin() 方法来删除多余的空白

#### when
- 类似于 switch
- 可以用来取代 if-elseif
```kotlin
when (x) {
    in 1..10 -> print("x is in the range")
    in validNumbers -> print("x is valid")
    !in 10..20 -> print("x is outside the range")
    is String -> print(x.startsWith("prefix"))
    else -> print("none of the above")
}
```

#### 循环
- for 类似 python
```kotlin
for ((index, value) in array.withIndex()) {
    println("the element at $index is $value")
}
```

- while, do {} while

- return, break, continue


##### break 和 continue 标签
- break 和 continue 默认作用于直接包围它的循环
- 如果指定了标签, 就作用于该标签的循环

```kotlin
loop@ for (i in 1..100) {
    for (j in 1..100) {
        if (……) break@loop
    }
}
```

##### 标签处返回 #todo
[Kotlin 循环控制 | 菜鸟教程](https://www.runoob.com/kotlin/kotlin-loop-control.html)