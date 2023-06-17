---
title: "NTP 协议"
date: "2023-06-16"
tags:
- 安全
- 网安
- 协议
---

Network Time Protocol

网络时间协议（NTP）用于通过通信网络同步时钟。它是少数几个仍被广泛使用的不安全和未经认证的互联网协议之一。




#### 关于 NTP 的攻击
- Delay/Replay
- Man in the middle
- IP-Spoofing -> [[permanent/NTP 协议#NTP Amplification|NTP Amplification]]

为什么要同步通信时间?
- Timestamp
- Log 分析
- 网络监视 Netzmonitoring, 寻找错误, 分析事件联系等等

如果时间同步系统受到攻击……
- 用 Timestamp 的都挂了

##### NTP Amplification
Amplification factor:206
将查询数据包的地址改成受害者 IP, 返回很大的数据

相似: [[permanent/DOS, DDOS#DNS 放大攻击]]