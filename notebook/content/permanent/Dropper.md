---
title: "Dropper"
date: "2023-06-16"
tags:
- 恶意软件
- 安全
---

#### Dropper
一种木马, 功能是将嵌入的恶意软件下载到受害者的计算机上, payload 通常是加密存储的

#### 多阶段 Dropper
为了规避反恶意软件的检测, 附带了更多的伪装, 比如下载器功能, 在受害机器 active 时才下载 payload. 比如 dropper 通过 SFTP 加载又一个 dropper.

