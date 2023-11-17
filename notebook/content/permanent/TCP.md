---
title: TCP
date: 2023-06-15
tags:
  - 协议
  - 网络
---

### 三次握手
![[attachments/Pasted image 20231115054031.png]]


1. C --> S : SYN seq = x
2. C <-- S : SYN+ACK ack = x + 1, seq = y
3. C --> S : ACK ack = y + 1

Q: 为什么要有第三个数据包?

A: 
为了确认第二个包确实被接收了. 如果 Client 没有收到第二个包, Server 就不会收到第三个包, 那么 Server 就会重发第二个包. 如此可以保证连接的建立.

### 四次挥手

![[attachments/Pasted image 20231115054731.png]]

1. C --> S : FIN seq = x
2. C <-- S : ACK ack = x + 1, seq = y
3. C <-- S : FIN ack = x + 1, seq = y + 1
4. C --> S : ACK seq = x + 1, ack = y + 2

Q: 为什么有 TIME_WAIT 状态, 而不是直接 CLOSED

A: 为了保证第四个包被收到了. TIME_WAIT 状态会持续 2 MSL(Maximum Segment Lifetime, 默认2分钟, 超过这个时间没到达目标的包会被丢弃),  如果 Server 没收到第四个包, 就会重发第三个包, 重发的包会在 2MSL 内到达 Client.


Q: 为什么 三次握手 就不需要 四次挥手 的 TIME_WAIT ?  

A: 握手时, Client 是会接收包的. 如果挥手不等, Client 就收不到包了.


Q: CLOSED_WAIT 状态在做什么?

A: Server 收到关闭请求之后, 会先通知正在进行的进程, 如果还有要发送的数据, 还可以继续发送 (TCP 的特性, 半连接). 发送结束后, 开始结束对话
### TCP Header
- ![[Pasted image 20230227131720.png|500]]
