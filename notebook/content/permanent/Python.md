---
title: "Python"
date: "2023-06-16"
---

- 节省程序员时间的语言, 虽然费CPU时间, 但权衡之下大家通常乐意这个牺牲. 只有在搭建*延迟非常低*的和*资源利用率非常高*的应用时会放弃Python
- 因为 GIL(global interpreter lock) 机制, 用 Python 构建高并发多线程程序有难度, 尤其是 CPU-bound 的线程. Python C Extensions 可以不受 GIL 影响地执行并行代码

#### 检验第三方库的健康程度
最简单的办法就是通过 Synk Advisor 打分来评估 Python 库的健康情况：
https://snyk.io/advisor/python/scoring
评分在 85 分左右的 Python 库可以一试。评分如果在 95 分上下，说明 Python 库的健康程度很好

#### Pythonic
- 遵循 PEP8 规范：[PEP8](https://peps.python.org/pep-0008/) 是 Python 社区的代码风格指南，包括缩进、命名、代码结构、注释等。编写符合 PEP8 规范的代码可以提高代码的可读性和可维护性。
-  使用 Python 内置函数和数据结构：Python 提供了许多内置函数和数据结构，如列表、字典、集合、生成器、装饰器、lambda 表达式等。使用这些功能可以使代码更加简洁、高效和易于理解。
-  使用异常处理机制：Python 的异常处理机制可以使代码更加健壮和容错。在编写代码时应该预见到可能的异常情况，并使用 try/except 块来处理这些异常情况。
-  避免使用全局变量：全局变量可以使代码更加难以理解和维护，因为它们可能会被其他代码意外修改。应该尽量避免使用全局变量，而是使用函数或类来封装状态和行为。
-  使用函数式编程风格：函数式编程风格强调函数的不可变性和无状态性，使得代码更加简洁、高效和易于测试。应该尽可能使用纯函数，避免使用副作用和可变状态。
-  使用面向对象编程风格：面向对象编程风格可以使代码更加模块化和易于扩展。使用类和对象可以封装状态和行为，使代码更加结构化和易于维护。
-  编写文档和测试：编写文档和测试可以使代码更加易读、易于理解和易于维护。


### Python 进阶
[[permanent/Python Generator, Iterator]]

### 科学计算和数据分析
[[permanent/python sympy 库|python sympy 库]]

[[permanent/python numpy库|python numpy库]]

[[permanent/python pandas库|python pandas库]]

[[Inbox/python sklearn库|python sklearn库]]

### 可视化
[[permanent/python 数据可视化统览|python 数据可视化统览]]

[[permanent/python matplotlib库|python matplotlib库]]

[[permanent/python plotly库|python plotly库]]

[[permanent/python seaborn 库|python seaborn 库]]
### GUI
[[permanent/python tkinter库|python tkinter库]]

### 文件处理
[[permanent/python unrar库|python unrar库]]

[[permanent/python json库|python json库]]

[Welcome to PyPDF2 — PyPDF2 documentation](https://pypdf2.readthedocs.io/en/latest/index.html)

[[permanent/python os|python os]]

### 网页分析
[[permanent/python bs4库|python bs4库]]

### 其他库
[[permanent/pyinstaller|pyinstaller]]

[[permanent/Python 简易文件服务器|Python 简易文件服务器]]

