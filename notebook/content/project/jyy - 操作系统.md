---
title: jyy - 操作系统
date: 2024-02-13
tags:
---

## 绪论

[1. 操作系统概述](https://jyywiki.cn/OS/2023/build/lect1.ipynb.html)

delay lines 延迟线, 1940 时代计算机的存储器

操作系统没有传说中那么复杂 (程序视角：对象 + API，硬件视角：一个 C 程序)

- *为什么*要学操作系统：解锁 “实现一切” 的系统编程能力
- *什么是*操作系统：应用视角 (一组对象 + API)、机器视角 (一个程序)
- *怎么学*操作系统：答案就在代码中

[GDB debugging tutorial for beginners - Linux Tutorials - Learn Linux Configuration](https://linuxconfig.org/gdb-debugging-tutorial-for-beginners)

[GDB调试入门指南 - 知乎](https://zhuanlan.zhihu.com/p/74897601)

![[attachments/Pasted image 20240220231615.png]]

[Harley Hahn's Guide to Unix and Linux](https://www.harley.com/unix-book/book/chapters/home.html)
[Linux下的终端神器Tmux的小白教学_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1da4y1p7e1/?spm_id_from=..search-card.all.click&vd_source=92451653bea4ed324c9bfc0287256aa5) 笔记 [[permanent/tmux 技巧|tmux 技巧]]

[Top (GNU make)](https://www.gnu.org/software/make/manual/html_node/index.html#SEC_Contents)

[GitHub - jlevy/the-art-of-command-line: Master the command line, in one page](https://github.com/jlevy/the-art-of-command-line)

**Virtualizing CPU** means to turn a single into seemingly many cpus thus allowing many programs seemingly run at the same time.

Each process has its own virtual memory space(address space). OS maps the virtual memory spaces to physical memory spaces.

**DRAM** stores values in a volatile manner.

transitors -> logic gates -> assembly -> C

OS design goals:
- high performance
- minimize overheads(time/space/...)
- protection between apps(isolation)
- high degree of reliability
- other: energy-efficiency, security, mobility

trap: a spectial hardware instruction to initiate sys call

[2. 应用视角的操作系统](https://jyywiki.cn/OS/2023/build/lect2.ipynb.html)

gcc -e a.c 可以获得展开宏的代码

## 获得的资料和视野

[操作系统：教科书与参考资料](https://jyywiki.cn/OS/OS_References.html)

[GitHub - ibraheemdev/modern-unix: A collection of modern/faster/saner alternatives to common unix commands.](https://github.com/ibraheemdev/modern-unix) 介绍一些 modern unix 工具

数字电路课 Verilog

[学习笔记：时序电路基础 - 知乎](https://zhuanlan.zhihu.com/p/150137008)

计算机系统基础(NJU 王慧妍等), imooc 上的 NJU 袁春风课作为理论

[NJUESE|《数字集成电路I》|南京大学电子科学与工程学院大三下集成电路设计与集成系统专业核心课，微电子科学与工程专业选修课 - 知乎](https://zhuanlan.zhihu.com/p/463370754)

[(29 封私信 / 80 条消息) 你在南京大学上过最牛的课是什么？ - 知乎](https://www.zhihu.com/question/356467344)

![[attachments/Pasted image 20240220221131.png]]