---
title: Python 技巧
date: 2024-06-15
tags:
---
#### 字符串反转
```python
# 将字符串反转
s[ :: -1]

```

#### \*args, \*\*kwargs
- 这两个是约定俗成的写法, args = arguments, kw = keyword
- 用来传递不固定数量的参数
- args 本质上是一个 tuple, kwargs 是 dist(比如可用 items() 取出内容)
- \* 可用作解包
- `def print_func(x, *args, **kwargs)` 也是可以的, 但必须是这个顺序
#### 计算执行时间
```python
# 朴实计时
import time
start = time.time()
# do something
end = time.time()

result = end - start
```

```python
# timeit函数
import timeit
# statement, setup, repeat time
timeit.timeit('math.sqrt(2)', 'import math', number=100000)
```

```python
# 装饰器
from functools import wraps
import time

def timethis(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
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


#### is not 和 !=
| 运算符      | 比较目标     | 示例结果（设`a`和`b`值相同但对象不同） |
| -------- | -------- | ---------------------- |
| `!=`     | 值是否不等    | `a != b` → `False`     |
| `is not` | 是否不是同一对象 | `a is not b` → `True`  |
!= 调用的是 对象的 `__ne__` 方法

## leetcode py

- 用 if + 比较符代替 max()min()?