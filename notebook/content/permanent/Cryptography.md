---
title: "Cryptography"
date: "2023-06-15"
tags:
- 安全
- 密码学
---

## 密码系统

#### Cryptosystem
$$ S = (M,K,C,e,d)$$
- **M**essage 明文
- **K**ey 密钥
- **C**ipher 密文
- **e**ncrypt function $e = M \times K \rightarrow C$
- **d**ecrypt function $d = C \times K \rightarrow M$

## 密码分类
- [[permanent/对称密码|对称密码]] 与 [[permanent/非对称密码|非对称密码]]
- 区块密码 与 流密码

## 密码结构
[[permanent/Feistel 密码结构|Feistel 密码结构]]

## 分组方式
- ECB, CBC, CFB, CTR, 印象里说只有 CTR 和哪一种是比较好的

#### ECB
- Electronic CodeBook mode
- 最简单的方式
- 每个密码块用同样的密钥进行加密
- 缺点: 容易用统计学特性分析

#### CBC
- Cipher Block Chaining
- 每个密码块在加密前与前一个块进行 XOR(需要一个初始化向量 Initialization Vector)
- 优点: 没有 ECB 的缺点
- 缺点: 没有随机访问

