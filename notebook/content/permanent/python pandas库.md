---
title: "python pandas库"
date: "2023-06-16"
tags:
- Python
---
## 介绍
- 带有 来源标签 的数据结构, 自动对齐
- 灵活处理缺省
- metadata

[书签](https://wesmckinney.com/book/accessing-data.html#io_file_formats_html_xml)

## pandas 数据结构

#### Series
一维的数组, 又类似 dict
```python
# pd.Series(list, [...index=list])
# pd.Series(dict, [...index=list]) dict有list没有的会变成NaN

obj2 = pd.Series([4, 7, -5, 3], index=["d", "b", "a", "c"])

"""
Out[19]:
d 4 
b 7
a -5
c 3
dtype: int64
"""

# 修改
obj2["d"] = 6

# 运算
obj2 * 2 # 所有数乘2

# 筛选
obj2[obj2 > 0]

# in
"b" in obj2

# to_dict()
obj2.to_dict()

# 是否为 NaN 
pd.isna(obj2)  # => Series
pd.notna(obj2)
```

#### Dataframe

##### 创建 DataFrame
```python
# DataFrame()
# index 是列名
data = {
        "state": ["Ohio", "Ohio", "Ohio", "Nevada", "Nevada", "Nevada"],
        "year": [2000, 2001, 2002, 2001, 2002, 2003],
        "pop": [1.5, 1.7, 3.6, 2.4, 2.9, 3.2]
        }
df = pd.DataFrame(data)
"""
Out: 
    state  year  pop
0    Ohio  2000  1.5
1    Ohio  2001  1.7
2    Ohio  2002  3.6
3  Nevada  2001  2.4
4  Nevada  2002  2.9
5  Nevada  2003  3.2
"""

# 如果在创建时指定 columns, 表头就会按指定的顺序来
pd.DataFrame(data, columns=["year", "state", "pop"])
```

应该这样用吧
```python
frame = pd.DataFrame(data, index=[...], columns=[...])
```

##### 行列操作
```python
# 查询某一列
df["state"]
df.year

# 查询某一行
df.loc[1]

# 新增列
frame2["debt"] = np.arange(6.)

del df["year"]
df.columns

# 行名和列名
frame3.index.name = "year"
frame3.columns.name = "state"
```

##### 函数
```python
# head() 显示前五行
# tail()
df.head()

# to_numpy()
# 除去表头和index的内容转为 numpy 数组
frame3.to_numpy()

# 花活
pdata = {"Ohio": frame3["Ohio"][:-1],
         "Nevada": frame3["Nevada"][:2]}
```

#### Index Objects
Series 的 index, DataFrame 的列名, 或者其他 metadata, responsible for holding the axis labels
```python
# pd.Index()
labels = pd.Index(np.arange(3))

# 从其他地方扒
obj = pd.Series(np.arange(3), index=["a", "b", "c"])
index = obj.index

index[1:]
"""
Index(['b', 'c'], dtype='object')
"""
```

**单项immutable!!** 但可以增删

并且**不要用Integer作index或column name**, 容易出现奇奇怪怪的错误

##### 函数
```python
# append(x)
# A.difference(B) A-B, B是set/pd.Index
# A.intersection(B)
# A.delete(i)  删掉第i个,返回一个新Index, 即不在原来上修改(也不能)
# A.drop(x) 删掉x
# A.insert(i, x) 在第i位插入x
```

## Essential Functions

#### reindex
```python
# 给 index 重新排序
df.reindex(new_index_list)

# 也可以用在 columns
frame.reindex(columns=states)
frame.reindex(states, axis="columns")
```

```Python
# ffill
# 新生成的行的值, 会根据上一个(index升序往前找)不为空的值填充 
In [102]: obj3 = pd.Series(["blue", "purple", "yellow"], index=[0, 2, 4])

In [103]: obj3
Out[103]: 
0      blue
2    purple
4    yellow
dtype: object

In [104]: obj3.reindex(np.arange(6), method="ffill")
Out[104]: 
0      blue
1      blue
2    purple
3    purple
4    yellow
5    yellow
dtype: object

# bfill backwards
```

#### drop 删除项, 行, 列
```python
# drop 一个/多个
# 只能在一维这么用
new_obj = obj.drop("c") # 在多维, 相当于 drop "c" 行
obj.drop(["d", "c"])
```

```python
"""
          one  two  three  four
Ohio        0    1      2     3
Colorado    4    5      6     7
Utah        8    9     10    11
New York   12   13     14    15
"""

# drop 多行
data.drop(["Ohio", "Utah"])

# drop 一列
data.drop("two", axis=1)
data.drop(columns=["two"])
```

#### loc 和 iloc
```python
# loc 要用index名, iloc 是坐标
>>> data
          one  two  three  four
Ohio        0    1      2     3
Colorado    4    5      6     7
Utah        8    9     10    11
New York   12   13     14    15
>>> data.loc["Ohio", "two"]
1
>>> data.iloc[0, 1]
1


# 并且可以用这两个函数修改
>>> data.loc["Ohio":"Utah", "two"] = 5
>>> data
          one  two  three  four
Ohio        0    5      2     3
Colorado    4    5      6     7
Utah        8    5     10    11
New York   12   13     14    15
```


#### Filter/Selection
```python
>>> data
          one  two  three  four
Ohio        0    1      2     3
Colorado    4    5      6     7
Utah        8    9     10    11
New York   12   13     14    15

# 切片/片区选取
>>> data[:-2]
          one  two  three  four
Ohio        0    5      2     3
Colorado    4    5      6     7
>>> data[:-2][:-1] # ???
      one  two  three  four
Ohio    0    5      2     3
>>> data[:2][:1]
      one  two  three  four
Ohio    0    5      2     3

# filter1, 返回 bool阵
>>> data < 5
              0      1      2      3
Ohio       True   True  False   True
Colorado   True  False  False  False
Utah      False  False  False  False
New York  False  False  False  False

# filter2, 返回符合的数据
>>> data[data[2] > 5]
           0   1   2   3
New York  12  13  14  15
# 并且可以直接赋值
data[data < 5] = 0
```

#### Arithmetic and Data Alignment
正确的用法是
```python
# 如果 df1 + df2, 只要对应位置有任意一方是NaN, 那么结果就是 NaN
In [202]: df1 + df2
Out[202]: 
      a     b     c     d   e
0   0.0   2.0   4.0   6.0 NaN
1   9.0   NaN  13.0  15.0 NaN
2  18.0  20.0  22.0  24.0 NaN
3   NaN   NaN   NaN   NaN NaN

# 正确的用法是
In [203]: df1.add(df2, fill_value=0)
Out[203]: 
      a     b     c     d     e
0   0.0   2.0   4.0   6.0   4.0
1   9.0   5.0  13.0  15.0   9.0
2  18.0  20.0  22.0  24.0  14.0
3  15.0  16.0  17.0  18.0  19.0
```

类似的函数
```
add(), sub, div, floor, floordiv, mul, pow
```

#### df 和 Series 的联合操作
```Python
arr = pd.DataFrame(np.arange(16).reshape(4, 4))
# 会在每一行都减对应列
arr - arr[0]
```

df + Series, 也会出现 [[#Arithmetic and Data Alignment|对齐]] 问题, 双方不重合的部分变成 NaN 

#### Fuction Application and Mapping
大部分 np [[permanent/python numpy库#函数|函数]] 能直接用在 df, 比如 abs(), max() 之类的, 也有一些本身就是 df函数

##### apply
apply(函数, 范围), 范围通常是列或行
```python
# 随机生成
In [223]: frame = pd.DataFrame(np.random.standard_normal((4, 3)),
   .....:                      columns=list("bde"),
   .....:                      index=["Utah", "Ohio", "Texas", "Oregon"])

# 展示生成
In [224]: frame
Out[224]: 
               b         d         e
Utah   -0.204708  0.478943 -0.519439
Ohio   -0.555730  1.965781  1.393406
Texas   0.092908  0.281746  0.769023
Oregon  1.246435  1.007189 -1.296221

# 定义一个f1
In [226]: def f1(x):
   .....:     return x.max() - x.min()

# 对列 apply
In [228]: frame.apply(f1, axis="columns")
Out[228]: 
Utah      0.998382
Ohio      2.521511
Texas     0.676115
Oregon    2.542656
dtype: float64
```

##### applymap
和 apply 的区别是 element-wise
```python
def f2(x):
    return f"{x:.2f}"

frame.applymap(f2)
"""
            b     d      e
Utah    -0.20  0.48  -0.52
Ohio    -0.56  1.97   1.39
Texas    0.09  0.28   0.77
Oregon   1.25  1.01  -1.30
"""
```

#### Sorting, Ranking

##### Sorting
index/column
```Python
# 会对 index 升序排序
obj.sort_index()
# column 降序
frame.sort_index(axis="columns", ascending=False)
```

一维value
```python
obj.sort_values()

# NaN 在最前, 不设默认在最后
obj.sort_values(na_position="first")
```

多维value
```Python
frame.sort_values("b")

# 多级
frame.sort_values(["a", "b"])
```

##### Ranking
显示排序序号, 默认并列会用.5表示
```python
In [251]: obj = pd.Series([7, -5, 7, 4, 2, 0, 4])

In [252]: obj.rank()
Out[252]: 
0    6.5
1    1.0
2    6.5
3    4.5
4    3.0
5    2.0
6    4.5
dtype: float64
```

如果不想管并列, 先出现的排前面
```python
In [253]: obj.rank(method="first")
Out[253]: 
0    6.0
1    1.0
2    7.0
3    4.0
4    3.0
5    2.0
6    5.0
dtype: float64
```

## 统计

```python
# skipna = skip NaN 
df.sum(axis="index", skipna=False)

# idxmax, idxmin
# attain 最大值的 index+columnname
df.idxmax()

# accumulation
df.cumsum()

# describe
# 会展示一些统计数据
In [276]: df.describe()
Out[276]: 
            one       two
count  3.000000  2.000000
mean   3.083333 -2.900000
std    3.493685  2.262742
min    0.750000 -4.500000
25%    1.075000 -3.700000
50%    1.400000 -2.900000
75%    4.250000 -2.100000
max    7.100000 -1.300000

# df.unique()
# df.value_counts()
```

```python
# get indexer
In [298]: to_match = pd.Series(["c", "a", "b", "b", "c", "a"])

In [299]: unique_vals = pd.Series(["c", "b", "a"])

In [300]: indices = pd.Index(unique_vals).get_indexer(to_match)

In [301]: indices
Out[301]: array([0, 2, 1, 1, 0, 2])
```

[更多函数](https://wesmckinney.com/book/pandas-basics.html#tbl-table_descriptive_stats)

```python
# correlation
In [283]: returns["MSFT"].corr(returns["IBM"])
Out[283]: 0.49976361144151166

# covariation
In [284]: returns["MSFT"].cov(returns["IBM"])
Out[284]: 8.870655479703549e-05

# corrwith
```

## 读写文件
[Pandas 写入 Excel 的几种情形与方式,覆盖,新增,追加,对齐_pandas写入excel_小玉的小本本的博客-CSDN博客](https://blog.csdn.net/m0_46419189/article/details/123111493)

##### 读写 xlsx/csv 示例
对读成 DataFrame
```python
# 保存为 xlsx 格式
df.to_excel('new.xlsx') # will erase

# 保存为 csv 格式
df.to_excel('new.csv')
```

例: 修改某列的所有性别
```python
df = pd.read_excel(file_path)
df['gender'][df['gender'] == 'girl'] = 'female'
df['gender'][df['gender'] == 'boy'] = 'male'
```

### 读取

#### 读各种文件
```python
# read_csv()
# read_excel()
# read_clipboard()
# read_html()
# read_json()
# read_sql()
# read_xml()
```

#### CSV

##### 行名和列名
```python
# 列名 指定为参数 names
# 行名 以表里的 message列 为行名
pd.read_csv("examples/ex2.csv", names=names, index_col="message")
```

并且是可以做到 hierarchical indexing 的, 比如指定某一列为参数, 这一列上有纵向合并的单元格

##### 一些读入技巧
```python
# 不读某些行
pd.read_csv("examples/ex4.csv", skiprows=[0, 2, 3])

# 指定哪些值被当作 NaN
result3 = pd.read_csv("examples/ex5.csv", keep_default_na=False, na_values=["NA"])

# 分隔符
pd.read_csv("1.txt", sep=".") # delimiter似乎是一样的
```

- converters={"foo": f}, 对 foo列应用函数f
- decimal, 小数的分隔符, 默认是'.', 可以改成','

如果文件太长...
```python
# 只读前5行
pd.read_csv("ex6.csv", nrows=5)

# chunker, 指定 chunksize, 把一整个文件读取成多个 pieces, 返回 Iterable
chunker = pd.read_csv("ex6.csv", chunksize=1000)
for piece in chunker:
    pass
```

##### 如果是处理不了的分隔符
```python
In [57]: !cat examples/ex7.csv
"a","b","c"
"1","2","3"
"1","2","3"

In [58]: import csv

In [59]: f = open("examples/ex7.csv")

In [60]: reader = csv.reader(f)
```

[link](https://wesmckinney.com/book/accessing-data.html#io_file_formats_csv)

#### JSON

read_json() 只能处理数组长度相同的情况

更通用的处理需要[[permanent/python json库]]

#### XML, HTML
在使用read_html前, 需要安装 lxml, beautifulsoup4, html5lib

[Web Scraping](https://wesmckinney.com/book/accessing-data.html#io_file_formats_html_xml)

### 写

```python
# 写出到系统输出
# 并以|分隔,将NaN替换为"NULL"
data.to_csv(sys.stdout, sep="|", na_rep="NULL")

# 不输出行名列名
data.to_csv(sys.stdout, index=False, header=False)

# 输出时指定行名
data.to_csv(sys.stdout, index=False, columns=["a", "b", "c"])
```

## 非核心功能

##### 将日期字符串转换成日期
dayfirst 是指英式日期
```python
pd.to_datetime(str, dayfirst=True)
```