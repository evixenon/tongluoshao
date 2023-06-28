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

## 使用

### pandas 数据结构

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

##### 读写 xlsx/csv

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

##### 函数
```python
# append(x)
# A.difference(B) A-B, B是set/pd.Index
# A.intersection(B)
# A.delete(i)  删掉第i个,返回一个新Index, 即不在原来上修改(也不能)
# A.drop(x) 删掉x
# A.insert(i, x) 在第i位插入x
```

#### Essential Functions

##### reindex
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


