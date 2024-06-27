---
title: Python Decorator, Partial
date: 2024-06-26
tags:
---
- python 中, 函数也可以作为返回值 
- 装饰器的作用是, 给任意函数加上额外功能
- 偏函数的作用是, 创建一个新的函数, 将原有的函数参数固定住

#### Decorator
```python
# 计算执行时间的装饰器
from functools import wraps
import time

def timethis(func):
    # wraps 的作用是将 被装饰的函数 的属性传递出去
    # 否则会出现如 func.__name__ 变成 wrapper
    @wraps(func) 
    def wrapper(*args, **kwargs) 
        start = time.perf_counter()
        r = func(*args, **kwargs)
        end = time.perf_counter()
        print("{}.{}: {}".format(func.__module__, func.__name__, end-start))
        return r
    return wrapper

@timethis
def ts():
    math.sqrt(2)
    time.sleep(1)

ts()
```


#### Partial function
```python
import functools
int2 = functools.partial(int, base=2)

# 等效于

def int2(x, base=2):
    return int(x, base)
```

#### lambda function
```python
>>> list(map(lambda x: x * x, [1, 2, 3, 4, 5, 6, 7, 8, 9]))
[1, 4, 9, 16, 25, 36, 49, 64, 81]
```

```python
def is_odd(n):
    return n % 2 == 1

L = list(filter(is_odd, range(1, 20)))

# 等价于

L = list(filter(lambda x: x % 2 == 1, range(1,20)))
```

#### Closure
- 使用闭包，就是内层函数引用了外层函数的局部变量

- 函数 A 返回了一个函数 B 后，A 内部的局部变量还被函数 B 引用


- 返回函数时, 函数不会马上执行, 而是在被调用的时候才会执行
- 如果包含循环变量, 可能会出现严重的问题


```python
# 错误示范
def count():
    fs = []
    for i in range(1, 4):
        def f():
             return i*i
        fs.append(f)
    return fs

f1, f2, f3 = count() # 调用三个函数的结果都是 9, 因为 i 在调用的时候是 3
```


- 内层函数**可以读取**外层函数的局部变量的值, 但**通常不能修改**外层函数的局部变量的值
- 如果要修改, 需要用 `nonlocal` 声明
```Python
def createCounter():
    ctr = 0
    def counter():
        nonlocal ctr
        ctr = ctr + 1
        return ctr
    return counter
```