---
title: "Buffer Overflows"
date: "2023-06-16"
tags:
- 安全
---

#### Buffer Overflows
目的
- 程序崩溃 Absturz
- 损毁数据
- 操纵程序运行时的环境, 尤其是返回地址

#### stack smashing
 1) to write/over-allocate too much data in a given part of the stack, thereby overwriting another part of the stack, and 
 
 2) where some external source (malicious or not) overwrote another program’s stack, though this is much less common.

比如内存不安全的C, 用`strcpy`复制字符串的时候就可能改写超出给定字符串的长度
```C
	char c[12];
	strcpy(c, bar);
```
![[Pasted image 20230117160703.png|500]]

![[Pasted image 20221120152831.png|500]]

**Shellcode**
- 模仿程序call `system("/bin/sh")
- 壳程序不允许 0x00, 因此不能中断例如 `strcpy`


#### 防御措施
- Executable space protection, NX位 阻止执行堆栈
- ASLR 随机选择 Text, Data, Heap, Stack 的地址, 使得地址不能被确定地访问
- Canaries(Terminator, Random, Random XOR)
- Bounds Checking
- Testing/Fuzzing
- C lang: `strncpy`取代`strcpy`

#### 其他方式
- Heap Corruption
- Format String Attacks
- ...


类似的攻击方式: [[permanent/return-to-libc]]
