---
title: "CVSS"
date: "2023-06-16"
tags:
- 安全
- 标准
---

#### CVSS
Common Vulnerability Scoring System v3
- 是可免费商用的漏洞威胁度评估标准, 量化范围\[0. 10\]
- 由 CMU(NIST) 建立, 现在由 FIRST(Forum of Incident Response and Security Teams) 维护, v3 是目前事实上(de-facto)的标准

**Input**
预先准备好的问题和选项

**Output**
CVSS Score: \[0, 10\]
CVSS Vector: compact string, 对 Input 的整体小结

#### CVSS 三组指标

##### Base Metrics
- Exploitability metrics
	- Attack vector: 入侵途径
	- Attack complexity: 入侵复杂性
	- Privileges required: 权限需求
	- User interaction: 是否需要受害者交互
 - Impact metrics
	 - Confidentiality impact 机密性影响
	 - Integrity impact 完整性影响
	 - Availability impact 可用性影响
- Scope: 波及范围, i.e. 会影响其他系统吗

##### Temporal Metrics
- Exploit code maturity: 理论阶段/理论证明/可用的exp/蠕虫或者其他可能造成大量入侵的
- Remediation level: 无解/正在处理/官方临时修复/官方长期修复
- Report confidence: 传闻/document/官方认证

##### Environmental Metrics
是涉及到实际使用情况的指标, 在不同组织不一样
- Confidentiality Requirement
- Integrity Requirement
- Availability Requirement
- Modified Base Metrics


#### CVSS Calculator
 https://nvd.nist.gov/CVSS/v3-calculator 
 https://www.first.org/cvss/calculator/3.1

#### CVSS 示例
```
CVSS:3.0/AV:A/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H/E:X/RL:X/RC:X/CR:X/IR:X/AR:X/MAV:X/MAC:X/MPR:X/MUI:X/MS:X/MC:X/MI:X/MA:X  
Cisco: CVSS v3 Base Score: 8.8
```

![[attachments/Pasted image 20230111224307.png|500]]

![[attachments/Pasted image 20230111224429.png|500]]