---
title: "DOS, DDOS"
date: "2023-06-16"
tags:
- 安全
---

##### DOS, DDOS
Denial of Service
Distributed Denial of Service

#### (D)DOS 常见原因
- 超负荷 (de. Überlastung)
- 引导 Exception
- 引导死机(代码的漏洞或协议的漏洞)

#### (D)DOS 常见类型
- 请求受限的或不可同时使用的资源 (beschränkte/unteilbare)
- 更改或毁坏配置
- 物理毁坏

#### (D)DOS 例子
- 邮件轰炸
- 内存溢出 e.g. Ping of Death
- 利用程序的缺陷
- 耗尽带宽或操作系统资源
- [[permanent/Mirai Botnet]]

#### DOS 原理
向指定服务器发送超过负荷的请求, 使其瘫痪

#### DDOS 基础流程
1. 寻找可渗透的机器(主站)
	- Scanner, Rootkits, 工具包
2. 主站自动尝试渗透其他机器，安装 DDOS 软件(Daemon)
3. 开始攻击，在预定时间启动主站的程序，通知肉鸡的Daemon, 发动 DDOS

#### DDOS 相关工具
[[permanent/LOIC]]

#### DDOS 防御措施
通常来说，一般保护是不可能的，只能针对特定的攻击种类
- DDoS 防御供应商
- 软件更新和配置调整
- 防暴力 DDoS: 
	- 防火墙规则
	- 在上行链路尽可能早地阻断攻击者
	- Blackholing/Null route
- 一般方法：
	- Overprovisioning/Load Balansing
	- 流量检测/监视开放端口
	- 遵循错误和安全警告(e.g. CERT)

#### Smurf 攻击
将 ICMP 数据包(ping包)的应答地址改成受害主机 IP,
再将数据包发送给某个网络的广播地址(放大攻击Amplifiction attack),
于是网络中所有主机都对受害主机作出应答，导致网络拥堵
解决思路：
- 设置路由不回答目标为广播地址的 Broadcast
- 设置服务器不回答 Broadcast Ping

#### DNS 放大攻击
[[permanent/DNS]] Amplification Attack
核心: 将很小的查询变成很大的负载

将查询请求的发送地址改成受害地址，
用 UDP 发送小数据包(约60B)给 DNS 服务器,
可以特意去找有长字段的服务器(e.g. TXT-Feld)
回答可以很大(理论上能到3000B)
数据包放大的倍数叫**放大因子**(de. Verstärkungsfaktor)

解决思路：
- 不回答外部的递归请求
-  限制来自同一推定 Client 的阈值 (de. Schwellenwerte)

相似: [[permanent/NTP 协议#NTP Amplification|NTP Amplification]]

#### SYN泛洪
SYN Flooding

利用 TCP 三次握手, 
发送编号不连贯的 SYN 报文，造成 SYN+ACK 回复丢失的假象
使得受害机器不断回复“丢失”报文
需要伪造大量不同的源地址，这些源地址最好不能响应 SYN+ACK

解决思路：
- 定义关闭半连接的 Timer(作用有限)
- 占用满时随机关闭半连接/设置半连接上限(作用有限)

#### SYN Cookies
- SYN Cookies: 记录回文的 SYN 值 y, 只有收到 y+1 回复才继续保留连接
- 特殊的 Sequence number
	- 1-5 Timecounter t mod 32, t 每64秒增加
	- 6-8 Max Segment Size
	- 9-32 套接字和 t 的加密哈希

缺点:
- MSS 只有 8bit
- 服务器必须拒绝包含某些TCP选项的连接请求（例如，选择性ACK，TCP window scaling）。
- extra costs

#### RST Cookies
服务器在SYN ACK中回应一个不正确的序列号（没有分配资源）
（好）客户回应RST（因为序列号不正确）
（坏）客户不向服务器发送RST包。
src: itsec U2
