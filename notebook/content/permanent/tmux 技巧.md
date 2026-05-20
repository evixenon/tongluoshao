---
title: tmux 技巧
date: 2024-02-21
tags:
  - Linux
---

[Linux下的终端神器Tmux的小白教学_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1da4y1p7e1/?spm_id_from=..search-card.all.click&vd_source=92451653bea4ed324c9bfc0287256aa5)

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
C+b s 列出所有会话 可切换
C+b $ 重命名当前会话
tmux kill-session -t 会话名 关闭会话
tmux kill-server 关闭所有会话

Window
C+b c 创建新窗口
C+b p 切换到上一个窗口
C+b n 切换到下一个窗口
C+b <number> 切换到指定编号的窗口 
C+b w 从列表中选择窗口
C+b , 窗口重命名
C+b & 关闭当前窗口
C+b . 指定窗口编号

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