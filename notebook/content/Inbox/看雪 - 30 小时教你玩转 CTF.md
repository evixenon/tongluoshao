---
title: 看雪 - 30 小时教你玩转 CTF
date: 2024-06-27
tags:
---
实体编码
![[attachments/Pasted image 20240627182449.png]]

![[attachments/Pasted image 20240627172559.png]]

JPG 文件头 FFD8

![[attachments/Pasted image 20240627172945.png]]

[abeluck/stegdetect: UNMAINTAINED. USE AT OWN RISK. Stegdetect is an automated tool for detecting steganographic content in images.](https://github.com/abeluck/stegdetect)

![[attachments/Pasted image 20240627173547.png]]

GIF 考察:
- GIF89a / GIF87a
- 每帧之间的时间间隔
- 逐帧查看
![[attachments/Pasted image 20240627180301.png]]

#### LSB 隐写
- Least Significant Bit
- 用颜色的二进制最后一位藏数据
- StegSolve