---
title: GDB
date: 2024-03-20
tags:
---
[GDB Doc](https://sourceware.org/gdb/current/onlinedocs/gdb.html/)

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


gdb 还能反向调试!

#### howto gdb
在命令行中使用 GDB 调试时，以下是一些专业建议：
1. **使用 TUI 模式**：  
    `gdb -tui` 或 `Ctrl+X+A` 启用文本用户界面，同时查看源代码和调试信息。
2. **设置断点**：
    - `break <function>` 在函数入口设置断点。
    - `break <file>:<line>` 在指定文件的某行设置断点。
3. **条件断点**：  
    `break <location> if <condition>` 设置条件断点，仅在满足条件时中断。
    - location: line nr, function name, file.c:line nr
    - break 25 if x > 10
4. **查看变量**：
    - `print <variable>` 查看变量值。
    - `display <variable>` 每次停止时自动显示变量值。
5. **多线程调试**：
    - `info threads` 查看所有线程。
    - `thread <id>` 切换到指定线程。
6. **回溯调用栈**：  
    `bt` 查看当前调用栈，`frame <number>` 切换到指定栈帧。
7. **反汇编**：  
    `disassemble` 查看当前函数的汇编代码。
8. **使用 GDB 脚本**：  
    将常用命令写入 `.gdbinit` 文件，自动加载配置。
9. **调试核心转储**：  
    `gdb <executable> <corefile>` 分析程序崩溃时的核心转储文件。
10. **优化调试体验**：
    - `set pagination off` 禁用分页。
    - `set logging on` 记录调试输出到文件。
这些方法可以显著提高调试效率，帮助你更快定位问题。