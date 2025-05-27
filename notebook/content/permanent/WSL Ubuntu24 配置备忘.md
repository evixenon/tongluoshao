---
title: "WSL Ubuntu24 配置备忘"
date: "2025-05-12"
tags:
---
#### WSL
nk, a9

#### vsc cpp 环境
[Using C++ and WSL in VS Code](https://code.visualstudio.com/docs/cpp/config-wsl#:~:text=In%20this%20tutorial%2C%20you%20will%20configure%20Visual%20Studio,Ubuntu%20in%20the%20Windows%20Subsystem%20for%20Linux%20%28WSL%29.)

```shell
sudo apt-get install build-essential gdb
```

The **code .** command opened VS Code in the current working folder, which becomes your "workspace". As you go through the tutorial, you will see three files created in a `.vscode` folder in the workspace:

- `c_cpp_properties.json` (compiler path and IntelliSense settings)
- `tasks.json` (build instructions)
- `launch.json` (debugger settings)

还有 task.json 简易教程 

#### python 环境

如果安装了 `python-is-python3` 包，则 `python` 会直接调用 `python3`：

```python
sudo apt install python-is-python3  # 显式建立软链接
```