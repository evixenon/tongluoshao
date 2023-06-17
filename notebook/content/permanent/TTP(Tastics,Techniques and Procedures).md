---
title: "TTP(Tastics,Techniques and Procedures)"
date: "2023-06-16"
tags:
---

#### TTP
- Tastics, Techniques, Procedures
- patterns of activities or methods of attackers(a special threat actor or a group of threat actors)
- 描述网络攻击的模板


##### Tactics ![[Pasted image 20230113210758.png|inlR|400]]
攻击者的目的, 策略
##### Techniques
使用的攻击技术
##### Procedures
具体是怎么实施的


#### TTP 具体实例
原文(德语): [美军攻击僵尸网络](https://www.golem.de/news/trickbot-us-militaer-greift-botnetzwerk-an-2010-151452.html)

译文:
>自9月底以来，美国军方一直在开展针对恶意软件和最大僵尸网络之一Trickbot的行动。据说有几次攻击剥夺了该网络的机器人，并在其控制服务器的数据库中填入不存在的机器人。
  根据《华盛顿邮报》的报道，该行动**旨在保护11月的美国总统选举免受攻击。恶意软件Trickbot以被感染系统的访问和银行数据为目标，随后对被感染的系统进行加密，并伴随着赎金要求。**
  据报道，美国国土安全部官员担心，这种来自各州选民登记办公室和相关系统的攻击可能会扰乱11月3日美国总统选举的准备工作，或在选举日本身造成混乱或排长队。然而，他们说，勒索软件也被视为选举之后的一个主要威胁。
  同时，美国军方网络司令部的攻击并不打算永久地拆除僵尸网络。华盛顿邮报》援引四名美国官员的话写道："相反，它们的目的是让Trickbot背后的讲俄语的团体分心并忙碌一段时间。网络司令部将这一战略称为 "持续接触"，即通过让对手团体忙于工作而对其施加累积成本。
  Konfigurationsdateien ausgetauscht交换的配置文件
  据记者布莱恩-克雷布斯（Brian Krebs）称，在攻击期间，新的配置文件被强加给了机器人。这些包含了僵尸网络命令和控制服务器的新**IP地址：127.0.0.1**。这不再是指互联网上的控制服务器，而是指本地计算机本身。**连接被切断**。同时，**指挥和控制服务器充斥着数百万台新感染的电脑，然而这些电脑都是假的。**
  然而，Krebs写道，trickbot集团可以依靠恢复机制，通过去中心化的域名系统EmerDNS恢复机器人。在这方面，这些攻击可能会让Trickbot集团忙于工作，他们可能会增加对已经加密的机器的赎金要求，以弥补他们的收入损失。
  早在7月，Trickbot在测试版本中发挥了问题，对自己发出了警告。7月底，恶意软件Emotet的服务器被黑，通过它传播的恶意软件被毫不客气地替换成GIF动画。Emotet经常搭上Trickbot的便车，例如，它对柏林上诉法院长达数月的故障负责。在那里，Trickbot也收集了访问数据。

Tactics:
削弱 Trickbot 或 "持续接触" 防止它操控美国大选
Techniqus:
更换配置文件, 把 `127.0.0.1` 作为 C&C 服务器地址(切断连接), 在真正的服务器上注册假bot(增加负载)
Procedures:
找到僵尸, 创建新的配置文件, 替换配置文件
分析 bot 的形态, 创建假bot, 在服务器注册假bot, 自动化部署
