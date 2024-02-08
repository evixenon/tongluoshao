---
title: python 数据可视化统览
date: 2024-02-07
tags:
---

可视化核心库:
- [[permanent/python matplotlib库|python matplotlib库]]
- [[permanent/python plotly库|python plotly库]]
- [[permanent/python seaborn 库|python seaborn 库]]

使用:
- [[permanent/python pandas库|python pandas库]]
- [[permanent/python numpy库|python numpy库]]
- [[Inbox/python sklearn库|python sklearn库]]
#### 数据集的载入
- seaborn.load_dataset("iris")
- sklearn.datasets.load_iris()
- plotly.express.data.iris()
#### 散点图
推荐 seaborn
```python
import matplotlib.pyplot as plt
import numpy as np
import plotly.graph_objects as go

x1_array = np.linspace(-3, 3, 100)
x2_array = np.linspace(-3, 3, 100)

xx1, xx2 = np.meshgrid(x1_array, x2_array)
ff = xx1 * np.exp(- xx1**2 - xx2**2)

levels = dict(start=-0.5, end=0.5, size = 0.05)
data = go.Contour(x=x1_array, y=x2_array, z=ff, 
                contours_coloring='lines', line_width=2
                colorscale = 'RdYlBu_r',
                contours=levels)
fig = go.Figure(data=data)
fig.show()
```
![[attachments/Pasted image 20240207131316.png]]

- 还可以用 plotly.express.scatter() 和 plotly.graph_objects.Scatter()
- matplotlib.scatter()

![[attachments/Pasted image 20240207132414.png]]


#### 等高线图 contour

- plt.contour()
- px.Contour()

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(-2, 2, 100)
y = np.linspace(-2, 2, 100)
X, Y = np.meshgrid(x, y)
```

![[attachments/Pasted image 20240207171319.png]]

```python
import matplotlib.pyplot as plt
import numpy as np
import plotly.graph_objects as go

x1_array = np.linspace(-3, 3, 100)
x2_array = np.linspace(-3, 3, 100)

xx1, xx2 = np.meshgrid(x1_array, x2_array)
ff = xx1 * np.exp(- xx1**2 - xx2**2)

levels = dict(start=-0.5, end=0.5, size = 0.05)
data = go.Contour(x=x1_array, y=x2_array, z=ff,contours_coloring='lines', line_width=2, colorscale = 'RdYlBu_r', contours=levels)
fig = go.Figure(data=data)
fig.show()
```
![[attachments/Pasted image 20240207171538.png]]