---
title: python plotly库
date: 2024-02-07
tags:
---
```python
import plotly.express as px
import numpy as np

x = np.linspace(0, 2*np.pi, 100)
y_sin = np.sin(x)
y_cos = np.cos(x)

# 创建图表
fig = px.line(x=x, y=[y_sin, y_cos], 
              labels={'y': 'f(x)', 'x': 'x'})

# 修改图例
fig.data[0].name = 'Sine'
fig.data[1].name = 'Cosine'

fig.show()
```

```python
# 与 Pandas 结合使用
import plotly.express as px
import numpy as np
import pandas as pd

x = np.linspace(0, 2*np.pi, 100)
y_sin = np.sin(x)
y_cos = np.cos(x)

# 生成 Pandas 数据帧
df = pd.DataFrame({'x': x, 'Sine': y_sin, 'Cosine': y_cos})

# 创建图标
fig = px.line(df, x='x', y=['Sine', 'Cosine'],
             labels={'value': 'f(x)', 'X': 'x'})

fig.show()
```