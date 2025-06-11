---
title: 操作系统 - jyy
date: 2024-02-13
tags:
---

## 获得的资料和视野

[操作系统：教科书与参考资料](https://jyywiki.cn/OS/OS_References.html)

[GitHub - ibraheemdev/modern-unix: A collection of modern/faster/saner alternatives to common unix commands.](https://github.com/ibraheemdev/modern-unix) 介绍一些 modern unix 工具

数字电路课 Verilog logisim

[学习笔记：时序电路基础 - 知乎](https://zhuanlan.zhihu.com/p/150137008)

计算机系统基础(NJU 王慧妍等), imooc 上的 NJU 袁春风课作为理论

[NJUESE|《数字集成电路I》|南京大学电子科学与工程学院大三下集成电路设计与集成系统专业核心课，微电子科学与工程专业选修课 - 知乎](https://zhuanlan.zhihu.com/p/463370754)

[(29 封私信 / 80 条消息) 你在南京大学上过最牛的课是什么？ - 知乎](https://www.zhihu.com/question/356467344)

![[attachments/Pasted image 20240220221131.png]]
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

Three Pieces:
- Virtualization: CPU and Memory
- Concurrency
- Persistency

**Virtualizing CPU** means to turn a single into seemingly many cpus thus allowing many programs seemingly run at the same time.

Each process has its own virtual memory space(address space). OS maps the virtual memory spaces to physical memory spaces.

**DRAM** stores values in a volatile manner. (易失性)

transitors -> logic gates -> assembly -> C

**OS design goals**:
- high performance
- minimize overheads(time/space/...)
- protection between apps(isolation)
- high degree of reliability
- other: energy-efficiency, security, mobility

trap: a special hardware instruction to initiate sys call


## 绪论: 2. 应用视角的操作系统

[2. 应用视角的操作系统](https://jyywiki.cn/OS/2023/build/lect2.ipynb.html)
[02 - 应用视角的操作系统 \[2025 南京大学操作系统原理\]](https://www.bilibili.com/video/BV1HTAWeTEo3/?spm_id_from=333.788.videopod.sections&vd_source=92451653bea4ed324c9bfc0287256aa5)
[Yanyan's Wiki](https://jyywiki.cn/OS/2025/lect2.md)
#### gcc gdb

[[permanent/GDB|GDB]]

#### 什么是程序
- 你需要 [Formal Semantics of Programming Languages, Fall 2021](https://cs.nju.edu.cn/hongjin/teaching/semantics/index.htm) by NJU 梁红瑾 <span style="text-decoration:line-through">不, 你不需要</span>
- 状态又是什么? 一个一个的 stack frame + 全局变量

什么是程序(源代码版)
- **状态机**, 状态=堆+栈
- 函数调用在 C 程序就是创建一个 栈帧(stack frame, 里面包含状态, pc)
- 函数调用 = push frame(frame.pc = 入口)
- ![[attachments/Pasted image 20240320224321.png|L|240]]
- return 则是把新创建的这个栈帧删除 pop frame

什么是程序(二进制版)
- 还是状态机, 状态=寄存器+内存
- 程序自身能执行的指令只有计算(的话), 甚至不能退出自己. 所以有一条特殊的 **syscall**, 将 M, R 交给 OS 任其修改

[C 语言 \#、##、__VA_ARGS__ - 知乎](https://zhuanlan.zhihu.com/p/101168748)

#### 程序是什么样的状态机

**状态**
stack\[frame 1, frame 2, ...] + global vars

**初始状态**
stack frame main(argc, argv, pc = 0)

**状态迁移**
执行 frame\[-1].pc 

其实你折腾过 od 的应该知道的

#### 最小可执行文件
实际上, 程序的入口不是 main() 而是 \_start()
```cpp
// 编译使用 gcc -nostartfiles 可以通过
// -static -nostdlic 更小了
void _start () {}
``` 
return 指令是什么? 把 sp 的 8 个字节放到 pc

这是一个可以正常退出的程序(当然, 严格来说应该 return 0才是正常)
![[attachments/Pasted image 20250602133853.png]]

#### syscall
- syscall 指令: 把状态机完全交给 os(上帝你好, 帮我干这个)
- os 会检查权限, 处理 syscall 请求, 然后交还状态机

ABI: App Binary Interface

man 2 syscalls 查看所有可能的系统调用
man 2 syscall 是另一个手册, 会讲解参数怎么用

#### GNU core utils
- unix 系统默认的工具包们, 也有简化版 toybox, busybox
- ffmpeg 真神1(jyy说直播是用它建立的), gstreamer 真神2(cmd obs)

- daemon 守护进程

#### strace
system trace
- -f 追踪创建的子进程
- 看到复杂的日志想放弃的时候, 花30秒再看看, 会进入新世界
- strace -f gcc a.c
- strace command 2>&1 | vim - 放进编辑器里, 善用编辑器的功能

#### variadic args `...`
`...` is a *variadic macro parameter* that captures any number of arguments passed to the macro. `__VA_ARGS__` expands to those captured arguments.

So with `call(...)`,  `call(x, y, z)` would expand the `__VA_ARGS__` part to `x, y, z` in the struct initialization


##  3. 硬件视角的操作系统

[Yanyan's Wiki - https://jyywiki.cn/](https://jyywiki.cn/OS/2025/lect3.md)

#### 硬件视角
- 硬件不知道有没有操作系统, 只是在执行收到的指令
- 多核, 每个 cpu 各自有寄存器

CPU reset
- 定义一个初始状态
- CPU 从 CPU reset 开始执行指令

操作系统就是一个普通的二进制程序
- 管理中断, I/O
- 硬件响应中断,  os 执行, os 给硬件发下一个任务

#### 固件
- low-level software, controls hardware components
- 在设备启动时或 reset 后执行
- 会有一个特殊的寄存器, 存储 cpu reset 后执行的代码. 在 reset 时, mmap 读取. 这就是固件. 
- 早期的 firmware readonly, 现在可以软件升级固件(请小心)
- 固件会负责加载操作系统, 通常自带设备的驱动

#### 加载操作系统
- 固件会把 磁盘的第一个 512 Bytes 加载到 0x7c00
- 如果这个 512 Bytes 结尾是 0x55aa, 说明是 bootable (MBR)

<section style="display: flex; flex-direction: row; align-items: center;"><span style="color: rgb(116, 104, 212); display: flex; flex-direction: row; align-items: center; padding: 0px 0.5em; font-size: 0.824em; border-radius: 0.428em; line-height: 2.306em; background-color: rgba(116, 104, 212, 0.15);"><span style="margin-right: 0.2em; display: flex; flex-direction: row; align-items: center; justify-content: center;"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24" width="1.9988577955454025em" height="1.9988577955454025em" stroke="currentColor" aria-hidden="true" class=""><path d="m12.006 2.4861c8.295-0.034635 12.587 10.042 6.9396 15.995 0.302-0.0792 0.5884 0.106 0.8099 0.2931 0.1763 0.1517 0.337 0.3223 0.4938 0.4938 0.1806 0.1987 0.3602 0.3999 0.5393 0.6 0.158 0.1775 0.3162 0.3571 0.4573 0.5485 0.0932 0.127 0.1803 0.2635 0.2402 0.4098 0.0591 0.1432 0.0867 0.3066 0.0463 0.4586l-0.0182 0.058c-0.0546 0.1443-0.1606 0.2646-0.2695 0.3712-0.0972 0.0941-0.2013 0.1853-0.3018 0.2759-0.1104 0.0982-0.2212 0.201-0.3417 0.287-0.1188 0.0852-0.2583 0.1531-0.4066 0.159-0.2688 9e-3 -0.5043-0.1558-0.7006-0.3227-0.1407-0.1218-0.2719-0.2564-0.3983-0.3929-0.2101-0.2279-0.4164-0.4606-0.6233-0.6914-0.1578-0.1777-0.3167-0.3566-0.4572-0.5485-0.0869-0.1186-0.1682-0.2449-0.2272-0.3799-0.06-0.136-0.0946-0.2901-0.0688-0.4385l0.0117-0.0521 0.0161-0.0498c-1.7182 1.3134-3.966 2.0444-6.2474 1.9119-12.23-1.0527-11.717-18.608 0.50643-18.986zm-6.8e-4 2c-3.9794 3.5e-4 -7.2654 3.1166-7.4809 7.0946-0.30103 4.0208 3.0533 7.76 7.0834 7.8947 4.1153 0.2383 7.6845-2.9602 7.8946-7.0833 0.319-4.1746-3.3113-8.0014-7.4964-7.9059" fill="currentColor"></path><path d="m8.2769 7.8469c0.29326 0.69532 0.64074 1.1934 1.5 1.3397 0.4567-0.53241 1.0671-0.92645 1.7212-0.97652 0.65414-0.05007 1.1756 0.26304 1.2305 0.98096 0.10016 1.3082-2.47 2.532-1.899 4.9596 0.64656 0.38624 1.7475 0.36741 2.2073 0.03029-0.36861-2.09 2.575-3.1725 2.4052-5.3901-0.16975-2.2175-1.7734-3.0416-3.7676-2.8889-1.4358 0.10991-2.597 0.87279-3.3975 1.945z" fill="currentColor"></path><path d="m12.01 14.568c-0.99198 0-1.696 0.76802-1.696 1.7601 0 0.992 0.70406 1.776 1.696 1.776 0.97603 0 1.696-0.78404 1.696-1.776 0-0.99204-0.72002-1.7601-1.696-1.7601z" fill="currentColor"></path></svg></span>如何写一个 bootable 镜像</span></section>

```shell
(printf "\xeb\xfe"; cat /dev/zero | head -c 508; printf "\x55\xaa") > a.img
```

- eb fe 是 `jmp .`
- `cat /dev/zero` outputs endless zeros, which `head -c 508` limits to exactly 508 bytes.

`xxd` is a Linux command that creates a hex dump of files or converts hex dumps back to binary

<section style="display: flex; flex-direction: row; align-items: center;"><span style="color: rgb(116, 104, 212); display: flex; flex-direction: row; align-items: center; padding: 0px 0.5em; font-size: 0.824em; border-radius: 0.428em; line-height: 2.306em; background-color: rgba(116, 104, 212, 0.15);"><span style="margin-right: 0.2em; display: flex; flex-direction: row; align-items: center; justify-content: center;"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24" width="1.9988577955454025em" height="1.9988577955454025em" stroke="currentColor" aria-hidden="true" class=""><path d="m12.006 2.4861c8.295-0.034635 12.587 10.042 6.9396 15.995 0.302-0.0792 0.5884 0.106 0.8099 0.2931 0.1763 0.1517 0.337 0.3223 0.4938 0.4938 0.1806 0.1987 0.3602 0.3999 0.5393 0.6 0.158 0.1775 0.3162 0.3571 0.4573 0.5485 0.0932 0.127 0.1803 0.2635 0.2402 0.4098 0.0591 0.1432 0.0867 0.3066 0.0463 0.4586l-0.0182 0.058c-0.0546 0.1443-0.1606 0.2646-0.2695 0.3712-0.0972 0.0941-0.2013 0.1853-0.3018 0.2759-0.1104 0.0982-0.2212 0.201-0.3417 0.287-0.1188 0.0852-0.2583 0.1531-0.4066 0.159-0.2688 9e-3 -0.5043-0.1558-0.7006-0.3227-0.1407-0.1218-0.2719-0.2564-0.3983-0.3929-0.2101-0.2279-0.4164-0.4606-0.6233-0.6914-0.1578-0.1777-0.3167-0.3566-0.4572-0.5485-0.0869-0.1186-0.1682-0.2449-0.2272-0.3799-0.06-0.136-0.0946-0.2901-0.0688-0.4385l0.0117-0.0521 0.0161-0.0498c-1.7182 1.3134-3.966 2.0444-6.2474 1.9119-12.23-1.0527-11.717-18.608 0.50643-18.986zm-6.8e-4 2c-3.9794 3.5e-4 -7.2654 3.1166-7.4809 7.0946-0.30103 4.0208 3.0533 7.76 7.0834 7.8947 4.1153 0.2383 7.6845-2.9602 7.8946-7.0833 0.319-4.1746-3.3113-8.0014-7.4964-7.9059" fill="currentColor"></path><path d="m8.2769 7.8469c0.29326 0.69532 0.64074 1.1934 1.5 1.3397 0.4567-0.53241 1.0671-0.92645 1.7212-0.97652 0.65414-0.05007 1.1756 0.26304 1.2305 0.98096 0.10016 1.3082-2.47 2.532-1.899 4.9596 0.64656 0.38624 1.7475 0.36741 2.2073 0.03029-0.36861-2.09 2.575-3.1725 2.4052-5.3901-0.16975-2.2175-1.7734-3.0416-3.7676-2.8889-1.4358 0.10991-2.597 0.87279-3.3975 1.945z" fill="currentColor"></path><path d="m12.01 14.568c-0.99198 0-1.696 0.76802-1.696 1.7601 0 0.992 0.70406 1.776 1.696 1.776 0.97603 0 1.696-0.78404 1.696-1.776 0-0.99204-0.72002-1.7601-1.696-1.7601z" fill="currentColor"></path></svg></span>我想知道到底什么汇编指令将磁盘加载进 0x7c00?</span></section>

- 使用 qemu 运行 .img 镜像
- 再用 gdb 连接并在 0x7c00 设置断点

```gdb
target remote localhost:1234
watch *0x7c00
break *0x7c00
layout asm
continue
```

<section style="display: flex; flex-direction: row; align-items: center;"><span style="color: rgb(235, 171, 55); display: flex; flex-direction: row; align-items: center; padding: 0px 0.5em; font-size: 0.824em; border-radius: 0.428em; line-height: 2.306em; background-color: rgba(235, 171, 55, 0.15);"><span style="margin-right: 0.2em; display: flex; flex-direction: row; align-items: center; justify-content: center;"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24" width="1.9988577955454025em" height="1.9988577955454025em" stroke="currentColor" aria-hidden="true" class=""><path d="m15.385 10.538c-0.52922 1.222-0.74082 3.1121-1.2852 4.3107-0.06906-2e-5 -0.24102-0.40954-0.40553-0.85764-0.54849-1.4968-0.91293-3.7816-1.4977-5.2179-0.49825-1.7178-2.7313-2.8836-3.8104-0.24557-0.55221 1.2498-0.75261 3.2793-1.3921 4.4683-0.45354 0.09492-0.79418 0.49706-0.79418 0.9788 0 0.5523 0.4477 1 1 1 0.77414 0 1.3844-0.52246 1.8137-1.5529 0.50969-1.1819 0.73444-2.9587 1.2241-4.138 0.07175 2e-5 0.14687 0.33291 0.23664 0.59492 0.20698 0.60425 0.39119 1.3477 0.58618 2.1349 0.2657 1.0724 0.54043 2.1814 0.90899 3.0557 0.87212 2.2985 3.1123 2.7586 4.0452 0.39202 0.55283-1.2608 0.75203-3.309 1.3936-4.5083 0.4522-0.0959 0.7915-0.49744 0.7915-0.97823 0-0.55229-0.4477-1-1-1-0.7755 0-1.3861 0.526-1.8148 1.5634z" fill="currentColor"></path><path d="m15.802 6.9697c-0.1557 0.1946-0.1882 0.58884 0.1331 0.60533 1.2616 0.02168 2.5193 0.48654 3.5913 1.2655 0.2705 0.19453 0.6808 0.05368 0.7176-0.30435 0.0793-0.76097 0.0572-1.5713-0.086-2.401-0.1456-0.82752-0.4109-1.6736-0.8018-2.5036-0.1536-0.34251-0.6624-0.55548-0.9204-0.23779l-0.7238 0.98277c-3.8989-2.9446-9.692-2.2836-12.827 1.4659-6.4518 7.8165 1.8281 18.818 11.123 14.783 1.8924-0.8564 3.4853-2.3528 4.4507-4.1927 0.0679-0.1218 0.1291-0.2481 0.1823-0.377 0.1017-0.2304 0.1549-0.518-0.0557-0.7052-0.1162-0.1043-0.2646-0.1628-0.4074-0.221-0.1475-0.0577-0.2953-0.116-0.4439-0.1706-0.2042-0.0713-0.4475-0.1531-0.6498-0.0358-0.0846 0.0496-0.1444 0.131-0.1982 0.2109-0.0747 0.1157-0.1266 0.2445-0.1952 0.3636-0.4837 0.9276-1.1717 1.74-1.9925 2.3831-0.8208 0.6431-1.7745 1.1169-2.7897 1.3673-7.0612 1.7198-12.182-6.5444-7.5021-12.107 2.4634-2.9539 7.0543-3.4782 10.119-1.154" fill="currentColor"></path></svg></span>常见的引导程序</span></section>

| 引导程序                     | 特点             | 适用场景                       |
| ------------------------ | -------------- | -------------------------- |
| **GRUB 2**               | 功能强大、可扩展、支持多系统 | Linux主流发行版（Ubuntu、Fedora等） |
| **Windows Boot Manager** | 专为Windows设计    | Windows单系统或双系统（由GRUB链式加载）  |
| **systemd-boot**         | 轻量快速、仅UEFI     | 简单Linux系统（如Arch Linux）     |
| **rEFInd**               | 图形化UEFI引导菜单    | 多系统（尤其是Mac+Linux+Windows）  |
<section style="display: flex; flex-direction: row; align-items: center;"><span style="color: rgb(235, 171, 55); display: flex; flex-direction: row; align-items: center; padding: 0px 0.5em; font-size: 0.824em; border-radius: 0.428em; line-height: 2.306em; background-color: rgba(235, 171, 55, 0.15);"><span style="margin-right: 0.2em; display: flex; flex-direction: row; align-items: center; justify-content: center;"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24" width="1.9988577955454025em" height="1.9988577955454025em" stroke="currentColor" aria-hidden="true" class=""><path d="m15.385 10.538c-0.52922 1.222-0.74082 3.1121-1.2852 4.3107-0.06906-2e-5 -0.24102-0.40954-0.40553-0.85764-0.54849-1.4968-0.91293-3.7816-1.4977-5.2179-0.49825-1.7178-2.7313-2.8836-3.8104-0.24557-0.55221 1.2498-0.75261 3.2793-1.3921 4.4683-0.45354 0.09492-0.79418 0.49706-0.79418 0.9788 0 0.5523 0.4477 1 1 1 0.77414 0 1.3844-0.52246 1.8137-1.5529 0.50969-1.1819 0.73444-2.9587 1.2241-4.138 0.07175 2e-5 0.14687 0.33291 0.23664 0.59492 0.20698 0.60425 0.39119 1.3477 0.58618 2.1349 0.2657 1.0724 0.54043 2.1814 0.90899 3.0557 0.87212 2.2985 3.1123 2.7586 4.0452 0.39202 0.55283-1.2608 0.75203-3.309 1.3936-4.5083 0.4522-0.0959 0.7915-0.49744 0.7915-0.97823 0-0.55229-0.4477-1-1-1-0.7755 0-1.3861 0.526-1.8148 1.5634z" fill="currentColor"></path><path d="m15.802 6.9697c-0.1557 0.1946-0.1882 0.58884 0.1331 0.60533 1.2616 0.02168 2.5193 0.48654 3.5913 1.2655 0.2705 0.19453 0.6808 0.05368 0.7176-0.30435 0.0793-0.76097 0.0572-1.5713-0.086-2.401-0.1456-0.82752-0.4109-1.6736-0.8018-2.5036-0.1536-0.34251-0.6624-0.55548-0.9204-0.23779l-0.7238 0.98277c-3.8989-2.9446-9.692-2.2836-12.827 1.4659-6.4518 7.8165 1.8281 18.818 11.123 14.783 1.8924-0.8564 3.4853-2.3528 4.4507-4.1927 0.0679-0.1218 0.1291-0.2481 0.1823-0.377 0.1017-0.2304 0.1549-0.518-0.0557-0.7052-0.1162-0.1043-0.2646-0.1628-0.4074-0.221-0.1475-0.0577-0.2953-0.116-0.4439-0.1706-0.2042-0.0713-0.4475-0.1531-0.6498-0.0358-0.0846 0.0496-0.1444 0.131-0.1982 0.2109-0.0747 0.1157-0.1266 0.2445-0.1952 0.3636-0.4837 0.9276-1.1717 1.74-1.9925 2.3831-0.8208 0.6431-1.7745 1.1169-2.7897 1.3673-7.0612 1.7198-12.182-6.5444-7.5021-12.107 2.4634-2.9539 7.0543-3.4782 10.119-1.154" fill="currentColor"></path></svg></span>vim 和 ag</span></section>

![[attachments/Pasted image 20250611133837.png]]