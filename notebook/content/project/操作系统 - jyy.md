---
title: 操作系统 - jyy
date: 2024-02-13
tags:
---

## 绪论: 1. 操作系统概述

[1. 操作系统概述](https://jyywiki.cn/OS/2023/build/lect1.ipynb.html)

[Yanyan's Wiki](https://jyywiki.cn/OS/2025/lect1.md)

#### 操作系统三问

操作系统没有传说中那么复杂 (程序视角：对象 + API，硬件视角：一个 C 程序)

- *为什么*要学操作系统：解锁 “实现一切” 的系统编程能力
- *什么是*操作系统：应用视角 (一组对象 + API)、机器视角 (一个程序), 软件和硬件的中间层
- *怎么学*操作系统：答案就在代码中

- *为什么需要*操作系统: 更好更快地服务更多应用
#### 熟悉 gdb

[gdb debugging tutorial for beginners - linux tutorials - learn linux configuration](https://linuxconfig.org/gdb-debugging-tutorial-for-beginners)

[gdb调试入门指南 - 知乎](https://zhuanlan.zhihu.com/p/74897601)

#### 命令行工具

<section style="display: flex; flex-direction: row; align-items: center;"><span style="color: rgb(203, 201, 202); display: flex; flex-direction: row; align-items: center; padding: 0px 0.5em; font-size: 0.824em; border-radius: 0.428em; line-height: 2.306em; background-color: rgba(203, 201, 202, 0.15);"><span style="margin-right: 0.2em; display: flex; flex-direction: row; align-items: center; justify-content: center;"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24" width="1.7133066818960596em" height="1.7133066818960596em" stroke="currentColor" aria-hidden="true" class=""><path d="m6.825 4.8749c1.8175-0.03033 2.3249 0.02869 2.25 2.0152 0.01496 1.139 0.01338 1.984-1.3875 1.9798-1.6108-0.01491-2.7285 0.30288-2.6124-1.796-0.019-1.5193-0.04171-2.2697 1.7499-2.1989zm0-2c-2.5847-0.10689-3.8882 1.4181-3.7496 3.8782-0.058825 1.6262 0.20934 2.9456 1.5713 3.7018 0.98591 0.49526 1.6843 0.40204 2.4713 0.42016 0.661-0.00557 1.2079 0.02014 1.9275-0.21866 1.051-0.35295 1.7794-1.2693 1.9533-2.3675 0.08948-0.54803 0.07327-0.95095 0.0762-1.3975-0.00196-0.42752 0.01114-0.8053-0.05632-1.306-0.24162-1.9408-1.9089-2.8188-3.6634-2.7097-0.17686-7.9441e-4 -0.35349-2.3937e-4 -0.53038-7.7934e-4z" fill="currentColor"></path><path d="m17.075 8.6749c1.8175-0.03034 2.3249 0.02868 2.25 2.0152 0.01495 1.139 0.01338 1.984-1.3875 1.9797-1.6108-0.01491-2.7285 0.30288-2.6124-1.796-0.01899-1.5193-0.04171-2.2697 1.7499-2.1989zm0-2c-2.5847-0.10689-3.8882 1.4181-3.7496 3.8782-0.05882 1.6262 0.20933 2.9457 1.5713 3.7017 0.98593 0.49528 1.6843 0.40205 2.4713 0.42017 0.66099-0.00556 1.2079 0.02015 1.9275-0.21865 1.051-0.35295 1.7794-1.2693 1.9533-2.3675 0.08949-0.54803 0.07328-0.95095 0.07621-1.3975-0.00197-0.42839 0.0112-0.80698-0.05673-1.3089-0.24288-1.9391-1.9097-2.8158-3.663-2.7068-0.17688-7.9346e-4 -0.35351-2.388e-4 -0.5304-7.7896e-4z" fill="currentColor"></path><path d="m8.4749 15.525c1.8175-0.03033 2.3249 0.02868 2.25 2.0152 0.01496 1.139 0.01338 1.984-1.3875 1.9797-1.6108-0.01491-2.7285 0.30288-2.6124-1.796-0.01899-1.5193-0.04172-2.2697 1.7499-2.1989zm0-2c-2.5847-0.10689-3.8882 1.4181-3.7496 3.8782-0.058825 1.6262 0.20934 2.9456 1.5713 3.7018 0.98591 0.49526 1.6843 0.40203 2.4713 0.42016 0.66099-0.00557 1.2079 0.02014 1.9276-0.21866 1.051-0.35294 1.7794-1.2693 1.9533-2.3675 0.08949-0.54803 0.07328-0.95095 0.07621-1.3975-0.00197-0.42753 0.01113-0.80529-0.05633-1.306-0.24162-1.9408-1.9089-2.8188-3.6634-2.7097-0.17688-7.9346e-4 -0.35351-2.4262e-4 -0.5304-7.8736e-4z" fill="currentColor"></path></svg></span>常用命令行工具</span></section>

- 文件管理 `cd`, `pwd`, `mkdir`, `rmdir`, `ls`, `cp`, `rm`, `mv`, `tar`
- 文件检索 `cat`, `more`, `less`, `head`, `tail`, `file`, `find`, `tldr`, `man`
- 输入输出控制 - 重定向 `>`, 管道 `|`, `tee`, `xargs`
- 文本处理 `vim`, `grep`, `awk`, `sed`, `sort`, `wc`, `uniq`, `cut`, `tr`
- 正则表达式
- 系统监控 `jobs`, `ps`, `top`, `kill`, `free`, `dmesg`, `lsof`

[[permanent/命令行指南#常用命令行工具|命令行指南#常用命令行工具]]


#### 阅读材料
教科书: [Operating Systems: Three Easy Pieces](https://pages.cs.wisc.edu/~remzi/OSTEP/) 1,2章
延伸阅读: [Harley Hahn's Guide to Unix and Linux](https://www.harley.com/unix-book/book/chapters/home.html)

[Top (GNU make)](https://www.gnu.org/software/make/manual/html_node/index.html#SEC_Contents)

[GitHub - jlevy/the-art-of-command-line: Master the command line, in one page](https://github.com/jlevy/the-art-of-command-line)


#### AI 时代的操作系统 2025

 - AI 会导致人的生产力断崖式的差距
 - 红利不一定每个人都能吃到, 但便利可以
 - AC 4年: Anno ChatGPT. 
 - GPT4级别可能是人类历史的转折点: 幻觉抑制非常好(尤其是常识问题), 所以可以左脚踩右脚, 把大问题分成小步骤, 每个步骤都可以用幻觉足够小的模型验证(R1就是这么来的)
 - 相信你的AI在考虑问题的时候直觉相当于专业人士 -> 适当地引导 AI, 获得一切能力

#### 历史
把时间花在再敲一遍课件上有的东西是值得的吗

#### 做一个有梦想的 CS 人
- 掌握 big pictur, 根据自己的理解补充细节, 不要沉浸在犄角旮旯
- 代码是你手中的剑, 在大语言模型的帮助下的我们什么都不怕
- 出 bug 的时候机器总是对的
- 还有更好的做法吗? 觉得麻烦想改变但没有头绪可以问问 ai

#### other notes

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


## 绪论: 2. 应用视角的操作系统

[2. 应用视角的操作系统](https://jyywiki.cn/OS/2023/build/lect2.ipynb.html)

gcc -e a.c 可以获得展开宏的代码

什么是程序
- 你需要 [Formal Semantics of Programming Languages, Fall 2021](https://cs.nju.edu.cn/hongjin/teaching/semantics/index.htm) by NJU 梁红瑾 <span style="text-decoration:line-through">不, 你不需要</span>

什么是程序(源代码版)
- 状态机, 状态=堆+栈
- 函数调用在 C 程序就是创建一个 栈帧(stack frame, 里面包含状态, pc)
- 函数调用 = push frame(frame.pc = 入口)
- ![[attachments/Pasted image 20240320224321.png|L|240]]
- return 则是把新创建的这个栈帧删除 pop frame

什么是程序(二进制版)
- 还是状态机, 状态=寄存器+内存
- 程序自身能执行的指令只有计算(的话), 甚至不能退出自己. 所以有一条特殊的 **syscall**, 将 M, R 交给 OS 任其修改

[C 语言 \#、##、__VA_ARGS__ - 知乎](https://zhuanlan.zhihu.com/p/101168748)
## 获得的资料和视野

[操作系统：教科书与参考资料](https://jyywiki.cn/OS/OS_References.html)

[GitHub - ibraheemdev/modern-unix: A collection of modern/faster/saner alternatives to common unix commands.](https://github.com/ibraheemdev/modern-unix) 介绍一些 modern unix 工具

数字电路课 Verilog

[学习笔记：时序电路基础 - 知乎](https://zhuanlan.zhihu.com/p/150137008)

计算机系统基础(NJU 王慧妍等), imooc 上的 NJU 袁春风课作为理论

[NJUESE|《数字集成电路I》|南京大学电子科学与工程学院大三下集成电路设计与集成系统专业核心课，微电子科学与工程专业选修课 - 知乎](https://zhuanlan.zhihu.com/p/463370754)

[(29 封私信 / 80 条消息) 你在南京大学上过最牛的课是什么？ - 知乎](https://www.zhihu.com/question/356467344)

![[attachments/Pasted image 20240220221131.png]]