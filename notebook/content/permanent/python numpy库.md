---
title: "python Numpy库"
date: "2023-06-24"
tags:
- Python
---
## 介绍
- short for numeric Python
- 可以用来:
    - 高维数组(矩阵), 矩阵计算
    - 快速傅立叶变换

## 使用基础
#### import
```python
# import 习惯
import numpy as np
```

#### 创建 narray
```python
# 创建 narray, 一切的基础
# narray 可以直接相加
a = np.array([[1, 2, 3], [4, 5, 6]])
```

用shape创建的方法:
- shape是一个tuple(i, j), i行j列
- np.zeros(shape) np.ones(shape) 创建全0/1的narray
- np.empty(shape) 创建未初始化的
- np.eye(n) = np.identity(n)

- np.ones_like(list) 创建和另一个 narray shape 相同的全1 narray. 同理还有 zeors_like()等


```python
# arange
# reshape
>>> a = np.arange(12).reshape(3,4)
>>> a
array([[ 0,  1,  2,  3],
       [ 4,  5,  6,  7],
       [ 8,  9, 10, 11]])
```

## 属性/特性

#### 切片
- 可以切片读值, 甚至可以切片赋值
- 索引批量赋值, 赋一行或一列
- 还能用比较复杂一点的索引实现类似框选的效果, 选中区域赋值

#### fancy indexing
```python
>>> a = np.arange(12).reshape(3,4)
>>> a
array([[ 0,  1,  2,  3],
       [ 4,  5,  6,  7],
       [ 8,  9, 10, 11]])
>>> a[[1,2], [0,3]]
array([ 4, 11])
```

和切片不同, 用 fancy index赋值**总是会复制一份数据**

#### dtype
指数组中的数据类型
- 有int/uint8~64, float16~128, complex64~256, bool, object, string_, unicode_

```python
# astype 转换类型
float_arr = arr.astype(np.float64)

# 查询类型
float_arr.dtype # out: dtype('float64')
```

#### 运算符
```python
# 数据
names = np.array(['Bob', 'Joe', 'Will', 'Bob', 'Will', 'Joe', 'Joe'], dtype='<U4')

data = np.array([[4, 7], [0, 2], [-5, 6], [0, 0], [1, 2],[-12, -4], [3, 4]])
```

```python
# 可以用各种运算符判定, 返回 bool 类型的 narray

names != "Bob"
~(names == "Bob")

"""
array([False, True, True, False, True, True, True])
"""

# 还可以用一个 array 作条件筛选另一个
data[names == "Bob"]

"""out:
array([[4, 7], 
       [0, 0]])
"""
```

两个同shape的 narray 可以直接比较, 返回一个同 shape 的 bool 类型 narray

```python
arr > arr2
data > 0
```



#### copy问题
```Python
# Python 3.10.7.
# 尝试了一下, 这两者都是复制引用, 也就是说, a 被修改的时候 b 和 c 也会同时变化
b = a
c = a[:]

# 所以需要
a[:].copy()
```

## 函数

### 矩阵相关运算

#### 直接相加
```python
arr1 + arr2
```

#### 矩阵乘法
```python
# 等价 arr1(arr2)
np.dot(arr1, arr2)
arr1 @ arr2
```

#### 实用数学运算
unary
- np.abs(arr), sqrt, exp, sign, log, log10, log2, ceil, floor, mean
    - log1p 即 log(1+x_)
- np.maximun(x, y) 在两个narray里取每个位置的最大值
- arr * n, 直接将矩阵的所有数值乘n
- remainder, whole_part = np.modf(arr) 商和余数

binary
- np.add(arr1, arr2), substract, multiply, divide, floor_divide, power, maximun, minimun, mod, logical_and
- fmax, fmin 无视 NaN

#### 转置
```python
arr.T
```

#### random
np.random 下的函数

standard_normal() 和各种 distribution
```python
# 按标准分布mean0sd1生成数字
>>> np.random.standard_normal(size=(2,2))
array([[-1.46971044,  0.38407903],
       [-0.30889103, -0.75670159]])

# binomial
# normal: Gaussian 分布
# beta
# chisquare: chi-square 分布
# uniform: uniform [0, 1) 分布
```

permutation()
```python
# 接受一个 narray 或 range
>>> np.random.permutation(range(10))
array([9, 8, 5, 2, 3, 7, 6, 4, 0, 1])
```

#### where
x if c else y, 三个参数都是 同 shape 的 narray
```python
result = np.where(cond, xarr, yarr)
```

#### sort
arr.sort()

arr.sort(axis=0)

0是行, 1是列

#### 统计方法
- arr.mean(), sum, std

np.unique(list) = sorted(set(list))

np.in1d(arr1d, list)  即 in
```python
In [230]: np.in1d(values, [2, 3, 6]) 
Out[230]: array([ True, False, False, True, True, False, True])
```

#### LinAlg
x.dot(y) = np.dot(x, y)

逆矩阵 np.linalg.inv(arr)