---
title: TCP 三次握手
date: 2023-11-15
tags:
  - 网络
  - 协议
---
![[attachments/Pasted image 20231115054031.png]]


1. C --> S : SYN seq = x
2. C <-- S : SYN+ACK ack = x + 1, seq = y
3. C --> S : ACK ack = y + 1

Q: 为什么要有第三个数据包?

A: 
为了确认第二个包确实被接收了. 如果 Client 没有收到第二个包, Server 就不会收到第三个包, 那么 Server 就会重发第二个包. 如此可以保证连接的建立.


关联: [[permanent/TCP 四次挥手|TCP 四次挥手]]

