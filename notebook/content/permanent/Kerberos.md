---
title: "Kerberos"
date: "2023-06-16"
tags:
- 协议
- 网安
---

src: [Kerberos - 知乎](https://zhuanlan.zhihu.com/p/266491528), lmu - IT Security

#### Kerberos
- 以 Needham-Schroeder 为基础的可信第三方协议
- TTP: 由 Kerberos 服务器 和 票据授权服务器组成
- 为 TCP/IP 网络设计
- 使用对称加密
- 发生在一个 Kerberos 域中
- 缺点: 单点故障: 需要服务器保持可用; 需要时间同步
- RFC 4120

#### 名词解释
- Principal：大致可以认为是 Kerberos 世界的用户名，用于标识身份
- AS（Authentication Server）= 认证服务器
- KDC（Key Distribution Center）= 密钥分发中心
- TGT（Ticket Granting Ticket）= 票据授权票据，票据的票据
- TGS（Ticket Granting Server）= 票据授权服务器
- SS（Service Server）= 特定服务提供端

![[Pasted image 20230224115802.png|inline|440]]![[Pasted image 20230224120159.png|inline|180]]
K\[]: 用 K 加密的什么数据

1. Client 向 AS(图上的KS) 请求服务, AS 检查用户是否在列表
    1. Client, Time, Adresse, Server (明文), 用户不发送密钥,而是 AS 在自己的数据库中查
2. AS 发回 TGS
    1. 返回两条消息 $K_c[K_{c,tgs}], K_{tgs}[T_{c,tgs}]$
    2. 其中 $T_{c,tgs} = tgs, c, a, t, v, K_{c, tgs}$
    3. ![[Pasted image 20230224151114.png|L|500]]
3. 请求 Server Ticket
    1. s(要通信的server 地址), $K_{c, tgs}[A_{c,tgs}]$, $K_{tgs}[T_{c,tgs}]$
    2. $A_{c,tgs} = c, a,t$ (Authenticator)
4. TGS 返回 Server Ticket
    1. $K_{c,tgs}[K_{c,s}], K_s[T_{c,s}]$
    2. $T_{c,s} = s, c, a, t, v, K_{c,s}$
    3. ![[Pasted image 20230224151820.png|L|500]]
5. 请求服务
    1. $K_{c,s}[A_{c,s}], K_s[T_{c,s}]$
    2. $A_{c,s} = c,a,t,key,seqNo$
    3. $T_{c,s} = s,c,a,t,v,K_{c,s}$
6. Server Authentication
    1. $K_{c,s}[t,key,seqNo]$
    2. ![[Pasted image 20230224151907.png|L|400]]

跨域 Kerberos 思路
![[Pasted image 20230224123236.png||L|400]]

