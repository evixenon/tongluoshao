---
title: python 数据可视化统览
date: 2024-02-07
tags:
---

主要使用:
- [[permanent/python matplotlib库|python matplotlib库]]
- [[permanent/python plotly库|python plotly库]]
- [[permanent/python seaborn 库|python seaborn 库]]
- [[permanent/python pandas库|python pandas库]]

#### 数据集的载入
- seaborn.load_dataset("iris")
- sklearn.datasets.load_iris()
- plotly.express.data.iris()
#### 散点图
推荐 seaborn
```python
sns.scatterplot(data=df, x="x_var", y = "y_var")
```
![[attachments/Pasted image 20240207131316.png]]

- 还可以用 plotly.express.scatter() 和 plotly.graph_objects.Scatter()
- matplotlib.scatter()

![[attachments/Pasted image 20240207132414.png]]


