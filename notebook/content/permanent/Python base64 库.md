---
title: Python base64 库
date: 2024-06-28
tags:
---
#### examples
```python
# 解码(两段)
print(base64.b85decode(base64.b16decode(enc)))
```