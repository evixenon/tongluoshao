---
title: "python pandas库"
date: "2023-06-16"
tags:
- Python
---

## 读写 Dataframe

```python
from pandas import DataFrame

data = { 'name': ['zs', 'ls', 'ww'], 'age': [11, 12, 13], 'gender': ['man', 'man', 'woman']}
df = DataFrame(data)

# 保存为 xlsx 格式
df.to_excel('new.xlsx') # will erase

# 保存为 csv 格式
df.to_excel('new.csv')
```

修改某列的所有性别
```python
df = pd.read_excel(file_path)
df['gender'][df['gender'] == 'girl'] = 'female'
df['gender'][df['gender'] == 'boy'] = 'male'
```

新增行列
```python
# 新增一行
df.loc[6] = [5, 'Eric', 'male', 20, '2021-5-18']

# 新增一列
df['favorite'] = None
```