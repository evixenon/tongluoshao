---
title: "python tkinter库"
date: "2023-06-16"
tags:
- Python
---

#### 框架
简版
```python
from tkinter import *
root = Tk()
tk.mainloop()
```

应用
![[attachments/Pasted image 20230526214024.png]]

[python tkinter 全部组件（widget）及事件类型（event）一览_self create widgets-CSDN博客](https://blog.csdn.net/explorer9607/article/details/82783470)
#### 浏览文件
```python
from tkinter import filedialog

# 浏览本地文件
def get_local_file():
    file_path=filedialog.askopenfilename()

# 浏览本地文件夹
def get_local_dir():
    file_path=filedialog.askdirectory()
    path.set(file_path)

```