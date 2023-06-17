---
title: "DES"
date: "2023-06-15"
tags:
- 安全
- 密码学
---

- Data Encryption Standard

#### 历史
- 1977NBS(前NIST), 第一个广泛使用的标准化加密方法
- 2002年被 AES 取代
- 98年 EFF 耗资 250k 美金, 搞了个 Deep Crack 针对, 直接给干碎了

#### 特点
- substitution, permutaion, modolo 2
- 密钥 64bit, 有效 56bit(8bit奇偶校验), 从现代角度看很容易破解. 改进: 3DES
- 16 次迭代
- [[permanent/Feistel 密码结构]]

- 高 diffusion: 每 bit 的明文平均导致 50% 明文变化
- 对抗分析能力强: 差分分析需要 2^58 次操作

Double-DES, 3DES
![[attachments/Pasted image 20230220122024.png|L|400]]
