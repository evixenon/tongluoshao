# Python

## 目录

*   [核心特性](#核心特性)

*   [快速上手](#快速上手)

*   [变量](#变量)

    *   [标识符规范](#标识符规范)

    *   [Python保留字](#python保留字)

*   [运算符](#运算符)

*   [流程控制](#流程控制)

*   [内置数据类型](#内置数据类型)

    *   [数据类型的属性](#数据类型的属性)

    *   [number](#number)

    *   [string](#string)

    *   [list](#list)

    *   [dict](#dict)

    *   [tuple](#tuple)

    *   [set](#set)

*   [函数](#函数)

    *   *   [函数的参数](#函数的参数)

    *   [函数嵌套](#函数嵌套)

    *   [函数闭包](#函数闭包)

    *   [函数装饰器](#函数装饰器)

*   [I/O](#io)

*   [Exception](#exception)

*   [高级特性](#高级特性)

    *   [拆包](#拆包)

    *   [生成器](#生成器)

*   [Module](#module)

*   [class](#class)

*   [Python Standard Libs](#python-standard-libs)

    *   [random](#random)

    *   [sys](#sys)

    *   [os](#os)

*   [Python 库](#python-库)

*   [命令行参数](#命令行参数)

## 核心特性

*   编译性语言

*   强类型: 不能跳出变量系统的限制, 不能像C 一样 implicit casting

*   多范式: 指令式，函数式，面向对象，等等

*   自动垃圾回收 automatic garbage collection

*   可交互式编程

## 快速上手

`dir()`  打印参数的所有方法

`help()` 查询帮助文档

`\` 在行尾续行

`#` 注释, 或直接用多行字符串`''' '''` `""" """`，单引常用作文档说明，双引常用作函数说明

空值`None`

缩进四个空格，错一点都不行

```python
# -*- coding: utf-8 -*-
# #!/usr/bin/python3
```

## 变量

### 标识符规范

### Python保留字

```c
>>> import keyword
>>> keyword.kwlist
['False', 'None', 'True', 'and', 'as', 'assert', 'break', 'class', 'continue', 
'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 
'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 
'return', 'try', 'while', 'with', 'yield']
```

## 运算符

| 基础运算符 |         | 比较运算符 |   | 赋值运算符     |                            |
| ----- | ------- | ----- | - | --------- | -------------------------- |
| +     | 加       | ==    |   | =         |                            |
| -     | 减       | !=    |   | \[基础运算符]= | 如 +=, c += a 等效于 c = c + a |
| \*    | 乘       | <     |   | :=        | **海象运算符，**                 |
| /     | 除       | >     |   |           |                            |
| %     | 模       | <=    |   | 没有++,--   |                            |
| \*\*  | 幂       | >=    |   |           |                            |
| //    | 整除，向下取整 |       |   |           |                            |
| 布尔运算  |         |       |   |           |                            |
| and   |         |       |   |           |                            |
| or    |         |       |   |           |                            |
| not   |         |       |   |           |                            |

海象运算符：&#x20;

*   可在表达式内为变量赋值

```c
if (n := len(a)) > 10:
    print(f"List is too long ({n} elements, expected <= 10)")
```

## 流程控制

if

for

while

## 内置数据类型

判断某个对象是否某个类型或其子类

```c
>>> a = 111
>>> isinstance(a, int)
True

```

判断某个类型是否某个类型或其子类

```c
>>> issubclass(bool, int) 
True
```

打印类型

```c
>>> a, b, c, d = 20, 5.5, True, 4+3j
>>> print(type(a), type(b), type(c), type(d))
<class 'int'> <class 'float'> <class 'bool'> <class 'complex'>
```

### 数据类型的属性

**可变mutable**: 是否可内部修改

**可迭代 iterable**: 可以用如`isinstance('', Iterable)` 判断对象是否可迭代对象，`Iterable`在`collections.abc`。迭代器是可迭代对象的子集, 可迭代对象都有`__iter__` 方法

**可哈希 hashable**：可哈希约等于不可变。官方解释：如果一个对象在其生命周期内，其哈希值从未改变(这需要一个\_\_hash\_\_()方法)，并且可以与其他对象进行比较(这需要一个\_\_eq\_\_()或\_\_cmp\_\_()方法)，那么这个对象就是可哈希的。哈希对象的相等意味着其哈希值的相等。

### number

不可变，不可迭代，可哈希

**整数**

通常十进制，`0xff` 十六，`0o77` 八进制， `0b1010` 二进制

数字间的`_` 下划线不影响数字，`10_000_000_000`和`10000000000`是完全一样的

**浮点数**

`1.2`, 科学记数法 `1.5e5`, `44e-2`

python的浮点数默认是双精度，需要更高进度(如金融领域) 可以考虑 decimal 模块

### string

不可变，可迭代，可哈希

**转义字符**

`\` , 转`'` `"` `\` 等

**多行字符串**

用三个引号`''' '''` `""" """`，可换行

**raw字符串**

生字符串中的特殊符号会原原本本地输出

`r'some\tstring'`

**切片**

字符串可以切片，但不可写入

```python
print(str[2:5])            # 输出从第三个开始到第五个的字符
print(str[2:])             # 输出从第三个开始后的所有字符
print(str[1:5:2])          # 输出从第二个开始到第五个且每隔一个的字符（步长为2）
```

\*\* 字符串运算\*\*\*\*\*\*\*\* , \*\*\*\*\*\*\*\* \*\*

```python
s = "as" + "df"            # s = "asdf"
s = "as" * 2               # s = "asas"
```

### list

可变，可迭代，不可哈希

可以装不同类元素，

list方法

`append(x)` 末尾添加x

`insert(int,x)` 在指定index 插入元素x

`pop()` 无参末尾pop，有参则pop此index的元素，返回pop出的元素

`remove(x)` 移除指定元素，如果list里没有会报错

`reverse` , `sort` , `copy`

*   用`*`生成list的时候有个坑：

    ```python
    # 错误示范
    >>> l = [[0] * 3] * 3
    >>> l
    [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    >>> l[0][1] = 1
    >>> l
    [[0, 1, 0], [0, 1, 0], [0, 1, 0]]  # list三个一级元素，也就是三个指针，指向的是同一个地址

    # 正确示范
    >>> l2 = [[0] * 3 for i in range(3)]
    >>> l2
    [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    >>> l2[0][1] = 1
    >>> l2
    [[0, 1, 0], [0, 0, 0], [0, 0, 0]]

    ```

**list切片**

```python
# [start:end:step]
>>> l = [0,1,2,3,4]
>>> l2 = l[3:5]
>>> l2
[3, 4]
>>> l[3:5] = [6,7]         # 可以赋值给切片，被赋的是Iterable类型
>>> l
[0, 1, 2, 6, 7]
```

### dict

可变，可迭代，不可哈希

`keys()`, `items()`, `values()`&#x20;

```python
>>> d ={ 1:'a', 2:'b'}

>>> d.keys()
dict_keys([1, 2])

>>> d.values()
dict_values(['a', 'b'])

>>> d.items()
dict_items([(1, 'a'), (2, 'b')])

>>> d2 = {3:'c',4:'d'}
>>> d | d2                           # Dictionary merge
{1: 'a', 2: 'b', 3: 'c', 4: 'd'}

```

`setdefault()`, `get()` , `update()`

### tuple

不可变，可迭代，可哈希

```python
>>> t = (12, 34, "hello")
>>> t
(12, 34, 'hello')

>>> a, b, c = t            # 轻松拆包，还可以用_占位
>>> print(a,b,c)
12 34 hello

>>> t.count(12)
1

>>> t.index("hello")
2

```

### set

可变，可迭代，不可哈希

```python
>>> even = {0,2,4,6,8}
>>> prime = {2,3,5,7}

>>> even & prime              # Intersection
{2}

>>> even | prime              # Union
{0, 2, 3, 4, 5, 6, 7, 8}

>>> even - prime              # Difference
{0, 8, 4, 6}
```

## 函数

```python
def fn(param1, ...):
    pass

```

#### 函数的参数

定义顺序：必需参数，默认参数，可变参数，可变关键字参数的函数

```python
def foo(param1, param2, param3 = None, *args, **kwargs):
  pass

```

可变关键字：

```python
>>> def fn(**kwargs):
...     print(kwargs['name'])
...
>>> fn(name = 'bob')
bob
```

### 函数嵌套

```python
def comb(n, r):
    def factorial(n):
        if (n == 0 or n == 1):
            return 1
        else:
            return factorial(n-1) * n

    return factorial(n) / (factorial(r) * factorial(n - r))

```

### 函数闭包

*   闭包(closure)是指内层函数调用了外层函数的参数，外层函数返回内层函数

*   要正确使用闭包，就要确保引用的局部变量 在函数返回后 不能变

```python
# 如果不能正确闭包……
def count():
    fs = []
    for i in range(1, 4):
        def f():
            return i*i
        fs.append(f)
    return fs

f1, f2, f3 = count()
print(f1)
print(f1())            # 9, f1此时才计算i*i, 所以是9

```

```python
# 正确
def count():
    fs = []
    for i in range(1, 4):
        def f(j):
            def g():
                return j*j
            return g
        r = f(i)
        fs.append(r)
    return fs

f1, f2, f3 = count()
print(f1) 
print(f1())             # 1
```

### 函数装饰器

装饰器`@` 本质上是一个高阶函数，接受函数作为参数，返回一个函数

**无参数装饰器**

在函数fn前`@decorator` 相当于`fn = decorator(fn)`

```python
def log(fn):
    def foo(*args, **kwargs):
        print('[' + fn.__name__ +']')
        return fn(*args, **kwargs)
    return foo

@log
def add(x, y):
    print(x + y)

add(3,4)
```

**有参数装饰器**

`@performance('ms')` 相当于 `fn = performance('ms')(fn)`

```python
import time
from functools import reduce

def performance(unit):
    def foo(fn):
        def bar(*args, **kwargs):
            print('call:', fn.__name__)
            t1 = time.time()
            f = fn(*args, **kwargs)
            t2 = time.time()
            if (unit =='ms'):
                print('function %s finished in %fms' % (fn.__name__, (t2-t1)*1000))
            else:
                print('function %s finished in %fs' % (fn.__name__, (t2-t1)))
            return f
                
        return bar
    return foo

@performance('ms')
def factorial(n):
    return reduce(lambda x,y: x*y, range(1, n+1))

print(factorial(10))


"""
call: factorial
function factorial finished in 0.000000ms
3628800
"""
```

## I/O

文件读写

```python
file = open("a.txt", "r")
for line in file:
    print(line)
file.close()
```

```python
with open("a.txt", "r") as f:
    print(file.readline())
    print(file.readline())

```

写

```python
with open("a.txt", "w") as f:    # "a" for append mode
   f.write(str)
```

读取用户命令行输入

```python
>>> a = input()
\t123
>>> a
'\\t123'
```

To get the old behavior of [input()](https://docs.python.org/3/library/functions.html#input "input()"), use `eval(input())`

命令行参数

```python
import sys

print '参数个数为:', len(sys.argv), '个参数。'
print '参数列表:', str(sys.argv)
```

> \$ python test.py arg1 arg2 arg3&#x20;
> 参数个数为: 4 个参数。&#x20;
> 参数列表: \['test.py', 'arg1', 'arg2', 'arg3']

## Exception

Baseclass `BaseException`

```python
try:
    test = open("test.txt", "r")
except IOError:
    print("file doesn't exist")

```

```python
raise NameError("unknown name")
```

## 高级特性

### 拆包

### 生成器

## Module

在 python 用 `import` 或者 `from...import` 来导入相应的模块。

将整个模块(somemodule)导入，格式为： `import somemodule`

从某个模块中导入某个函数,格式为： `from somemodule import somefunction`

从某个模块中导入多个函数,格式为：`from somemodule import firstfunc, secondfunc, thirdfunc`

将某个模块中的全部函数导入，格式为： `from somemodule import *`

## class

## Python Standard Libs

### random

> import random

`randint(a,b)`   $\[a, b] \in \mathbf{Z}$

`random()`  $\[0.0, 1.0]$

`shuffle(list)` shuffles a list

### sys

```python
$ python test.py arg1 arg2 arg3 
print(len(sys.argv))    # 4
print(str(sys.argv))    # ['test.py', 'arg1', 'arg2', 'arg3']
```

### os

```python
print(os.getcwd())     
# 'C:\\Users\\nuohe'
print(os.listdir())
# ['1.html', 'Aufgabe3.py', 'movielist.txt']

```

## Python 库

[Manim](Manim/Manim.md "Manim")

[Pygame](Pygame/Pygame.md "Pygame")

[Pyinstaller](Pyinstaller/Pyinstaller.md "Pyinstaller")

numpy

panda

collections

matplotlib

functools

re

返回目录

## 命令行参数
