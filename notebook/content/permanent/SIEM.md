---
title: "SIEM"
date: "2023-06-15"
tags:
- 安全
---

#### SIEM
Security Information and Event Management
SIEM 是系统安全管理的一种**方案**, 整合了 SIM(Security Information Management) 和 SEM(Security Event Management).

SIEM
- 从网络设备(Router, Switcher), 服务器, 域管理者, 应用(防火墙, IDS/IDP系统)等地方收集**警告, 通知, 日志**
- **集中, 即时**地*收集, 关联和评价*安全信息数据
- 各系统上的软件代理收集数据, 如有必要, 进行标准化/统一化/预处理并发给 SIEM 处理(一些变体没有代理, 直接发给 SIEM)

SIEM 结合了分布式检测能力 
- 信息不是来自 SIEM 本身，而是来自检测威胁的组件。 
- 该组件可能在其他地方报告了威胁 
在 SIEM 中的事件的相关性 
- 例如，暴力攻击 日志中的n次失败登录尝试+1次成功 → ?  
- 通过对（不显眼的）事件的关联性重建攻击链 
- 攻击者是如何进行的？他有没有攻击其他系统？

#### SIEM 的目标
- 识别异常, 模板和趋势
- 尽早发现威胁
- 启动响应
- 事后报告和取证

#### SIEM 的优点/缺点
**优点**
- 及早识别威胁
- 迅速反应
- 支持事后调查
- 合规性
**缺点**
- 无法开箱即用(大量引入性工作)
- 信息量过大, 很难找到有用信息

#### SIEM 的困难
- 大量数据(每分钟几十万很正常), 过滤相关的数据
- 异质来源信息的标准化/统一化
- 专业知识识别模式和趋势
- 数据保护和法律问题

#### SIEM 的信息源
警报, 消息, 日志文件, 关键数据, 来自
- 终端设备
- 网络组件(Router, Switcher: 网络流量)
- 服务器
- 操作系统
- 应用
	- 防火墙
	- 漏洞和病毒扫描系统
	- 终端应用
	- IDS/IDP 系统
- 外部数据源(威胁情报 Threat Intelligence)

### SIEM 与 IDS/IPS 的区别
SIEM
- 支持预防措施 
- 在一个中心位置结合不同的来源 
IDS
- 基于签名、异常或信誉来检测可疑行为（更多的现代方法是行为分析或ML/AI)
- 只检测，不阻止攻击 
- 可以作为SIEM的输入源 
IPS
- 类似于IDS
- 通过阻断网络流量检测和防止漏洞利用 
- 可能对IPS发出虚假警报或有针对性的攻击 → IPS可以通过阻断网络流量对自己的基础设施造成DoS

