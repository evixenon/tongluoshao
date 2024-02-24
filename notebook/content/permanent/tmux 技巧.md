---
title: tmux 技巧
date: 2024-02-21
tags:
  - Linux
---
```tldr
tmux new -s name
C+b d (dettach)
tmux ls
tmux attach -t name
```
## 快捷键
```
Session
C+b d dettach
C+b s 列出所有会话
C+b $ 重命名当前会话

Window
C+b c 创建新窗口
C+b p 切换到上一个窗口
C+b n 切换到下一个窗口
C+b <number> 切换到指定编号的窗口 
C+b w 从列表中选择窗口
C+b , 窗口重命名

Pane
C+b % 垂直划分 pane
C+b " 水平划分 pane
C+b <arrow> 光标切换到其他 pane 
C+b ; 切换到上一个 pane
C+b o 切换到下一个 pane
C+b x 关闭当前 pane
C+b ! 将当前 pane 拆分为独立 window
C+b z 当前 pane 最大化/还原
C+b q 显示 pane 编号
```