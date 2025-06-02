---
title: GDB
date: 2024-03-20
tags:
---

[gdb debugging tutorial for beginners - linux tutorials - learn linux configuration](https://linuxconfig.org/gdb-debugging-tutorial-for-beginners)

[gdb调试入门指南 - 知乎](https://zhuanlan.zhihu.com/p/74897601)

layout src 源代码布局, 看断点上下文比较清晰
layout asm 汇编代码

info frame 可以查 arglist
infor registers 寄存器
info locals 本地变量

gdb a.out -tui 可以获得一个炫酷的调试界面
- start, r, a, p, n, q
- info locals
- starti 在第一条指令开始时调试它