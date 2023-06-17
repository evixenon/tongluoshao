---
title: "EPP, EDR, XDR"
date: "2023-06-16"
tags:
- 安全
---

#### EPP, EDR, XDR
- Endpoint Protection Platform 终端防护平台
- Endpoint Detection & Respense 终端检测和响应
- Extended Endpoint Detection & Reaction

可以理解为新一代终端安全解决方案(之前是传统杀毒软件)

- EPP 预防已知威胁
- EDR 解决未知威胁
- XDR 防止域内传播

#### EDR 
**EDR 的任务和目标**
- 持续监控终端行为和网络流量
- 收集安全数据, 分析, 识别异常并报告
- 对威胁的快速反应
	- 基于规则的应对行为
	- 状况提醒
	- 黑名单生成
	- 来自意外响应团队的支援

#### XDR
XDR 是基于 [[permanent/SaaS|SaaS]], 特定于供应商的安全威胁检测和事件响应工具, 它相比 EDR 的特别之处在于将多个安全产品(如邮件系统, 云应用)原生地集成到一个统一的安全运营系统中.
- 开箱即用的通用安全产品集合
- 多种安全产品协同, 提高检测灵敏度
- 集中和规范化中央存储库中的数据以进行分析和查询

XDR 会接管部分 [[permanent/SIEM|SIEM]] 的功能