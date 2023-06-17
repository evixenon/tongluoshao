---
title: "Windows 注册表改键(扫描码映射)"
date: "2023-06-14"
tags:
- WIN
---

- 优点: 直接有效
- 缺点: 不能发送组合键, 需要重启生效


```text
1.
计算机\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Keyboard Layout
2.
新建一个叫"Scancode Map"的二进制文件 
```
二进制文件内容: (小端序)
1. 开头 2Byte 全 00
2. 第三个 Byte = 涉及的键数量+1
3. 第四 Byte 开始, 每组都是 (目标键码 原键码)
4. 结尾 1Byte 00

然后重启

这是个大端序的键码表
![[Pasted image 20221018230729.png]]


组合触发无法通过注册表修改, 参见[AutoHotkey](https://wyagd001.github.io/zh-cn/docs/misc/Remap.htm)