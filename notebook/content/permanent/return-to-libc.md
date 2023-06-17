---
title: "return-to-libc"
date: "2023-06-16"
tags:
- 安全
---

#### return-to-libc
一种类似[[permanent/Buffer Overflows|缓冲区溢出]]的攻击, 通过覆盖返回地址到 libc, 以便从 libc 调用(例如系统)函数
会绕过 NX位(no-execute), 将 Stack 标记为不可执行