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