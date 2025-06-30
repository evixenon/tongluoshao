---
title: "pyinstaller"
date: "2023-06-16"
tags:
- Python
---

#### 参数
常用参数 含义  
-i 或 -icon 生成icon  
-F 创建一个绑定的可执行文件  
-w 使用窗口，无控制台  
-C 使用控制台，无窗口  
-D 创建一个包含可执行文件的单文件夹包(默认情况下)  
-n 文件名

#### 如果打包没问题, 程序有问题
- 不要用单文件
- 看报错跟什么包有关, 把相关模块拷进 dist
- [python3 pyinstaller 打包后执行文件运行错误 No such file or directory 和 Cannot load native module 解决方法_python项目运行在windows上报错--add-binary=&quot;/opt/python3/li-CSDN博客](https://blog.csdn.net/whatday/article/details/118065649)

[PyInstaller 系列 - 单目录和单文件模式 - cocoonink - 博客园](https://www.cnblogs.com/cocoonink/p/13858062.html)

[【Python】使用pyinstaller打包exe运行报错“PackageNotFoundError”_有问必答-CSDN问答](https://ask.csdn.net/questions/7505436)

#### setup.py egg_info?

incompatible `setuptools` version and target package

`pip install --upgrade setuptools` upgrade but the new version may still unstable

know: `pip install setuptools==58.0.4` is a stable version