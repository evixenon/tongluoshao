---
title: jyy - 操作系统
date: 2024-02-13
tags:
---

## 绪论

[1. 操作系统概述](https://jyywiki.cn/OS/2023/build/lect1.ipynb.html)

delay lines 延迟线, 1940 时代计算机的存储器

操作系统没有传说中那么复杂 (程序视角：对象 + API，硬件视角：一个 C 程序)

- 为什么要学操作系统：解锁 “实现一切” 的系统编程能力
- 什么是操作系统：应用视角 (一组对象 + API)、机器视角 (一个程序)
- 怎么学操作系统：答案就在代码中

[GDB debugging tutorial for beginners - Linux Tutorials - Learn Linux Configuration](https://linuxconfig.org/gdb-debugging-tutorial-for-beginners)

[GDB调试入门指南 - 知乎](https://zhuanlan.zhihu.com/p/74897601)

![[attachments/Pasted image 20240220231615.png]]

[Harley Hahn's Guide to Unix and Linux](https://www.harley.com/unix-book/book/chapters/home.html)

[Linux下的终端神器Tmux的小白教学_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1da4y1p7e1/?spm_id_from=..search-card.all.click&vd_source=92451653bea4ed324c9bfc0287256aa5)

[Top (GNU make)](https://www.gnu.org/software/make/manual/html_node/index.html#SEC_Contents)

#### 阅读
```c
#include <stdio.h>
#include <unistd.h>

#define REGS_FOREACH(_)  _(X) _(Y)
#define OUTS_FOREACH(_)  _(A) _(B) _(C) _(D) _(E) _(F) _(G)
#define RUN_LOGIC        X1 = !X && Y; \
                         Y1 = !X && !Y; \
                         A  = (!X && !Y) || (X && !Y); \
                         B  = 1; \
                         C  = (!X && !Y) || (!X && Y); \
                         D  = (!X && !Y) || (X && !Y); \
                         E  = (!X && !Y) || (X && !Y); \
                         F  = (!X && !Y); \
                         G  = (X && !Y); 

#define DEFINE(X)   static int X, X##1;
#define UPDATE(X)   X = X##1;
#define PRINT(X)    printf(#X " = %d; ", X);

int main() {
  REGS_FOREACH(DEFINE);
  OUTS_FOREACH(DEFINE);
  while (1) { // clock
    RUN_LOGIC;
    OUTS_FOREACH(PRINT);
    REGS_FOREACH(UPDATE);
    putchar('\n');
    fflush(stdout);
    sleep(1);
  }
}
```

```
A = 1; B = 1; C = 1; D = 1; E = 1; F = 1; G = 0;
A = 0; B = 1; C = 1; D = 0; E = 0; F = 0; G = 0;
A = 1; B = 1; C = 0; D = 1; E = 1; F = 0; G = 1;
A = 1; B = 1; C = 1; D = 1; E = 1; F = 1; G = 0;
A = 0; B = 1; C = 1; D = 0; E = 0; F = 0; G = 0;
A = 1; B = 1; C = 0; D = 1; E = 1; F = 0; G = 1;
A = 1; B = 1; C = 1; D = 1; E = 1; F = 1; G = 0;
A = 0; B = 1; C = 1; D = 0; E = 0; F = 0; G = 0;
A = 1; B = 1; C = 0; D = 1; E = 1; F = 0; G = 1;
A = 1; B = 1; C = 1; D = 1; E = 1; F = 1; G = 0;
A = 0; B = 1; C = 1; D = 0; E = 0; F = 0; G = 0;
A = 1; B = 1; C = 0; D = 1; E = 1; F = 0; G = 1;
A = 1; B = 1; C = 1; D = 1; E = 1; F = 1; G = 0;
A = 0; B = 1; C = 1; D = 0; E = 0; F = 0; G = 0;
A = 1; B = 1; C = 0; D = 1; E = 1; F = 0; G = 1;
A = 1; B = 1; C = 1; D = 1; E = 1; F = 1; G = 0;
...
```

## 获得的资料和视野

[操作系统：教科书与参考资料](https://jyywiki.cn/OS/OS_References.html)

数字电路课 Verilog

[学习笔记：时序电路基础 - 知乎](https://zhuanlan.zhihu.com/p/150137008)

计算机系统基础(NJU 王慧妍等)

[NJUESE|《数字集成电路I》|南京大学电子科学与工程学院大三下集成电路设计与集成系统专业核心课，微电子科学与工程专业选修课 - 知乎](https://zhuanlan.zhihu.com/p/463370754)

[(29 封私信 / 80 条消息) 你在南京大学上过最牛的课是什么？ - 知乎](https://www.zhihu.com/question/356467344)

![[attachments/Pasted image 20240220221131.png]]