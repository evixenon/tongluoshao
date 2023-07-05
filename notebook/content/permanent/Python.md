---
title: "Python"
date: "2023-06-16"
---

- 节省程序员时间的语言, 虽然费CPU时间, 但权衡之下大家通常乐意这个牺牲. 只有在搭建*延迟非常低*的和*资源利用率非常高*的应用时会放弃Python
- 因为 GIL(global interpreter lock) 机制, 用 Python 构建高并发多线程程序有难度, 尤其是 CPU-bound 的线程. Python C Extensions 可以不受 GIL 影响地执行并行代码

### Python 进阶
[[permanent/Python Generator, Iterator]]


### 数据分析和绘图
[[permanent/Python 数据分析|Python 数据分析]]

[[permanent/python numpy库|python numpy库]]

[[permanent/python pandas库|python pandas库]]

[[permanent/python matplotlib库|python matplotlib库]]

### GUI
[[permanent/python tkinter库|python tkinter库]]

### 文件处理
[[permanent/python unrar库|python unrar库]]

[[permanent/python json库|python json库]]

### 其他库
[[permanent/pyinstaller|pyinstaller]]
