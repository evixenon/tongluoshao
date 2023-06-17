---
title: "lmu - IT Security"
date: "2023-06-16"
---


## Einleitung

[[permanent/1988 Internet Wurm]]
[[permanent/2003 SQL Slammer]]
[[permanent/2009~ Stuxnet]]
[[permanent/蠕虫和蓝宝石的对比]]

[[permanent/C2 C&C]]

[[permanent/TTP(Tastics,Techniques and Procedures)#TTP]]


### Zutrittkonstroll

Verfahrensschritten:
1. **Authentisierung**, 提供 Attribute 的真实证明
2. **Authentifizierung**, 证明的检查
3. **Autorisierung**, Attribute 是否有足够获取所要求的权利. Vergabe / Spezifikation von Berechtigungen

Hilfsmittel
- Personenvereinzelung 人员分离
- Lesegeräte für Ausweise

## Grundlagen
[[permanent/2020 SolarWinds]]
[[permanent/Bell LaPadula 模型]]

### Goals of IT Security
- **C**onfidentiality
- **I**ntegrity
- **A**vailability


#### Confidentiality
**Vertraulichkeit** ist gewährleistet, wenn geschützt Daten nur von Berechtigten genutzt werden können.

bezüglich:
Transport/Speicherung/Verarbeitung von Datn

Maßnahme:
Verschlüsselung, ...

verletzt:
geschützte Daten von unautorisierten Subjekten eingesehen werden können

#### Integrity
**Integrität** ist gewährleistet, wenn geschützt Daten nicht unautorisiert und unbemerkt modifiziert werden können.
受保护的数据不能在未经授权和不被注意的情况下被修改
Integre IT-Dienste haben keine (versteckte) Schadfunktionalität.

bezüglich:
Transport/Speicherung/Verarbeitung von Datn

Maßnahme:
Kryptographische Prüfsummen

verletzt:
geschützte Daten von unautorisierten Subjekten unbemerkt verändert werden können

e.g. 中间人攻击, 邮件篡改

#### Availability
Verfügbarkeit ist gewährleistet, wenn autorisierter Subjekte störungsfrei ihre Berechtigungen wahrnehmen könnon.

bezieht sich:
nicht nur Daten, sondern auch Dienste und IT-Infrastrukturen

typische Maßnahme:
Redundanz(e.g. Backup), Overprovisioning(e.g. mehr als genug Server)

verletzt:
wenn ein Angreifer die Dienst- und Datennutzung durch legitime Anwender einschränkt.

e.g DDoS, 


#### Verbindlichkeit*
(german literature, top-level)
- Authentizität
- Beherrschebarkeit
- Revisionsfähigkeit

#### Authentizität*
- Eigenschaft der Echtheit, Überprüfbarkeit und Vertrauenswürdigkeit -> Auhentifikation des Datenursprungs
- Digital signature

### Systematik zur Einordnung von Sicherheitsmaßnahmen 系统分类

zwei Dimensionen:
- **Lebenszyklus** potentialle erfolgreicher Angriffe
- zwischen tech. und organ.

![[attachments/Pasted image 20221103205238.png]]


#### Lebenzyklus

##### Prävention
Die Kombination aller in einem Szenario eingesetzten präventiven Maßnahmen dient der Erhaltung von CIS

##### Detektion
dient dem Erkennen von unwünschten Sicherheitsereignissen

##### Reaktion
dient der Wiederherstellung des Soll-Zustands


#### Maßnamenauswahl 
- szenarienspezifisch
- Risikogetriebenes Vorgehensmodell

frage:
- welche? wann? 
- lohnt sich der?

#### ISO/IEC 27000/27001
idea ISO/IEC27000: 信息安全管理的质量衡量标准

- Standards, Richtlinien, Prozesse, Verfahren und Maßnahmen, die dazu dienen,
- IS in einer Organisation dauerhaft zu
	- definieren/plan
	- steuern
	- aufrecht zu erhalten/do
	- zu kontrollieren/check
	- kontinuierlich zu verbessern/act


##### ISMS
致力达成信息安全的以下目标的系统
	- 建立
	- 实施
	- 运营
	- 监管
	- 检查
	- 维护
	- 改进

##### Leitlinie
最高准则 Oberste Richtlinie, 规定 ISMS 的总体目标和所包含的 Richtlinie

##### Richtlinie
包含该组织的强制性规范 verpflichtende Vorgabe

##### Asset
属于该机构的有价值的东西

##### Risiko
可能导致异常状态或威胁安全目标的事件

##### Prozess
将输入转化为输出的相互作用的活动的总和 Sammlung

##### Verfahren
描述包括 organ. 和 tech. 的活动的 Ablauf

ISO/IEC 27001标准规定了所谓信息安全管理系统（ISMS）的最低要求。
Information Security Management Systems
PDCA, plan, do, check, act

##### DIN ISO/IEC 27001
2008~ auch DIN ISO/IEC 27001
- 基于 PDCA 设计, 实施, 监管, 改进 ISMS
- Risikomanagement, Dokumentation und Aufgabenverteilung 的最低要求
- control objectives/ controls

![[attachments/Pasted image 20221103213352.png]]
![[attachments/Pasted image 20221103213404.png]]


#### Grundlagen des Risikomanagements
- Risikoanalyse
- Risikobewertung
	- Eintrittswahrscheinlichkeit
	- Auswirkung/Schadenshöhe
- Risikobehandlung
	- Verminderung/Reduzierung(Ergrifen von Maßnahmen)
	- Vermeidung(Unterlassen risikobehafteter Aktivitäten))
	- Transfer/Teilen(Versicherung)
![[attachments/Pasted image 20221103213701.png]]


#### 审查的类型(check/review)
##### internal audits
由内部的独立人员审查, 确定合规性, 目标的实现, 措施的有效性
##### external audits
有外部独立组织审查
##### management review
高层管理人员审查报告

### Security & Safety

##### Security
- Zugangskontrollen
- Verschlüsselung

##### Safety
更多是物理性的
- Glatteiwarnung 黑冰警告
- Brandmeldeanlage 火灾警报系统



## Technische Schwachstellen und Angriffe

[[permanent/网络安全界张三]]
[[permanent/Security Code Review 101]]

### Technische Angriffsvarianten

#### Angriffsarten
- Auswirkung auf (C/I/A)
- Eigenschaft
	- Ziel
	- active?passive?
	- direct?
- trivial/aufwendig

#### DOS, DDOS
![[attachments/permanent/DOS, DDOS]]


### Schadsoftware 恶意软件
Viren, Würmer, Trojanische Pferde

#### 病毒 Virus
de. Viren
指令序列, 需要寄主程序(Wirtsprogramm), 无法自己运行
Selbstreplikation: 自我复制, 自行感染其他程序

##### 病毒的结构
![[attachments/Pasted image 20221112144606.png|700x300]]


##### 病毒的感染
- 在程序末尾添加病毒代码
- 将 OEP 修改为 病毒代码的开始点
- 病毒代码的结束 RET 到程序原本的入口点


#### 蠕虫 Worm
不需要寄主程序的有害程序
![[attachments/permanent/蠕虫#蠕虫]]

![[attachments/permanent/蠕虫#蠕虫的扫描方式]]

![[attachments/permanent/蠕虫#Warhol Worm]]

#### 特洛伊木马
实际功能与应有功能不一致的程序, 隐藏有恶意程序

e.g. [[permanent/Staatstrojaner]]

#### Backdoor 后门
攻击者可以随时控制被安装后门的系统

#### Mobile Code
在远程计算机上生成, 并嵌入到如网页, 邮件或文件中, 在 Client 本地执行

#### 对恶意软件的保护和应对措施
de. Schutz- und Gegenmaßnahmen

- 反病毒软件, 不要安装未知来源的软件
- 定期备份
- 禁用宏, 或者用沙盒运行

服务器端:
- 包括上面的
- 添加 Integrity-Checker(Host Intrusion Detection System)
- 谨慎授权写入 ([[permanent/信息安全的原则#Need-to-know 原则|Need-to-Know Prinzip]])
- 疫苗: 病毒签名黑名单


#### Ransomware
加密勒索软件 de. Krypto-Erpressungstrojaner

对策:
- 关闭 445/139 和 3389
- 备份, 并物理隔断
- 只打开邮件信任源的附件

复原:
- 导入备份 Einspielen von Backups


#### 关于 NTP 的攻击
[[permanent/NTP 协议#关于 NTP 的攻击]]

#### 反病毒手段的分类

##### Signaturbasierte Erkennung
- 根据病毒数据库来检测是否有发现已知的病毒(通过Opcodes)
- 优点: 低 FP; 稳定测出已知病毒
- 确定: 只能检测已知病毒；需要频繁更新

##### Heuristische/Anomalie-basierte Erkennung
- 监视系统运行, 检测异常状况, 发现异常时警报
- 优点: 能检测出最新的威胁
- 缺点: 可能会有高 FP

##### Emulations-basierte Erkennung
- 沙箱运行并观察代码
- 优点: 能检测出最新的威胁；受保护的系统与可能的病毒隔离
- 缺点: 病毒很容易发现是虚拟机并隐藏自己；高资源消耗

#### 病毒的对抗手段(过杀)
你看, 很多都是对抗病毒数据库的

##### Garbage instructions
- e.g. NOP
- 没有实际用处, 但会增加大小 -> 对抗 signatur-basierter Detektion

##### Instruction reordering
- 对抗 signatur-basierter Detektion
- 随机改变指令的顺序, 通过 label 和 跳转指令 来保证运行
- 改变 Opcode

##### Interchangeable instructions
- 以不同的代码实现同样的功能(变形病毒)
- 改变 Opcode

###### 变形病毒 Metamorphic Virus
变形病毒是一种可以凭借转换、编辑和重写自身代码的能力变换形态的病毒。


### E-Mail Security(spam)

##### SPAM
unsolicited commercial emails, UCE
unerwünschte Werbemails

##### Phishing
钓鱼页面, 通过模仿正规网站的页面, 让人误以为在正规网站中输入信息

#### Spamfilter (常规防御措施)
分类:
- blacklist/whitelist
- rergelbasiert
- Filtersoftware lernt aus Beispielen

\+ 易实现
\- 需长期维护
\- 依赖于神经训练或模型
\- FP(HAM误认为是SPAM)的必须极少

##### Greylist
收到陌生(发件人,邮箱地址,收件人)的邮件时, 第一次拒绝并给出提示过段时间再次尝试(并将该陌生元组加入已知列表)
收到已知列表的测通过

#### SPAM 过滤手段

##### DNS-basierte Blacklist
- 问一下 DNS, 这个邮件的发送地址在不在 Spamlist 上
- [[permanent/dig#spamlist 查询]](dig +short 2.0.0.127.zen.spamhaus.org)

##### RHSBL Right Hand Side Blacklists
- DNS Blacklist 的变种, 检查邮件地址的域名部分(@domain.name)
- 比 URI DNSBL 效果差一点, 因为 SPAM 可以伪造发送地址

##### Naive Bayes Classification
- 首先是大数据, 邮件如果含有某关键字, 有多大可能是 SPAM
- 分析收入邮件的全部 token, 通过 简单贝叶斯 计算邮件是 SPAM 的概率
- 需要额外处理

### Systemnahe Angriffe

#### Buffer Overflows
![[attachments/permanent/Buffer Overflows#Buffer Overflows]]

![[attachments/permanent/Buffer Overflows#stack smashing]]

![[attachments/permanent/Buffer Overflows#防御措施]]

![[attachments/permanent/Buffer Overflows#其他方式]]


#### Account/Password Cracking
也就是破解用户名和口令
- Brute Force
- 字典攻击 Dictionary Attack
- Social Engineering
- 撞哈希/破解加密算法
- 撞库

字典攻击的对抗方式: 加盐
![[attachments/permanent/加盐#加盐]]


#### Back Door, Trap Door
目的: 留通道和留权限
- 隐藏 SUID/SGID
- 隐藏的联网服务, 会在特定时间在特定端口打开任务行
- `.rhosts`(root)或`authorized_keys`(ssh)文件里留痕迹

#### Rootkits
![[attachments/Rootkit#Rootkit 的历史和典型案例]]

![[attachments/Rootkit#User-Mode/Kernel-Mode Rootkit]]

![[attachments/Rootkit#Rootkit 的反取证措施]]

#### Adobe Flash
Flash 已于 2020 年末结束服务

##### 事件: Einfallstor Adobe Flash
起因经过
- RSA Security公司除其他外，还生产在全球广泛使用的认证令牌（RSA SecurID）。 
- 针对RSA员工的鱼叉式网络钓鱼攻击：Excel附件 "2011 Recruitment Plan.xls"，估计是用Excel 2007打开。 
- 嵌入式SWF文件利用了Adobe Flash Player的漏洞。 
- 恶意代码（对 "poison ivy "的修改）监视员工的计算机，并将密码传送给攻击者，以及其他事项。 
后果
- SecurID的来源和种子被刺探出来了
- 美国国防公司洛克希德-马丁公司（Lockheed Martin）被黑客使用 "仿冒的 "SecurID令牌；其他许多公司也受到影响。 
- 约有4000万个SecurID代币被交换



### Web 攻击

#### XSS
![[attachments/XSS#XSS]]

![[attachments/XSS#XSS 对策]]


事件: Angriff auf Issue Tracking System von Apache(见 Script Kapital 3)

#### SQL 注入
emm, 没讲什么, 就是你知道那个

#### Access Token Manipulation
![[attachments/permanent/Access Token Manipulation#Access Token Manipulation]]

![[attachments/permanent/Access Token Manipulation#Access Token Manipulation 分类]]

![[attachments/permanent/Access Token Manipulation#防御措施]]

#### CSRF
![[attachments/permanent/CSRF#CSRF]]

![[attachments/permanent/CSRF#CSRF 攻击流程]]

### 基于网络的攻击

#### Sniffing 嗅探
监视网络流量

**LAN**
(Wireless) Local Area Network
- 无线使用以太网而不是交换机
- 原则上, 网卡(Netzwerk-Karten) 可以监听所有流量, 但网卡只传递给计算机的数据包 -> 在 Promiscuous Mode 下会将所有数据包都交给 OS 执行

**WAN**
Wide Area Network
- 每台交换计算机都可以读取信息(如路由器的镜像端口 Mirror Port)
- 线路窃听 Anzapfen

#### Port Scanning 端口扫描
寻找远端计算机上开放的端口, 试图建立连接
- e.g. nmap
- 有针对性地搜索具有已知弱点的服务端口
- 端口扫描常被视为攻击, 因为是隐密进行的

### Schwachstellenbewertung
- 漏洞评估 Vulnerability Assessment
- 目标: 确定优先级
- 涉及开发者和运维者两个角色
- 量化评估 (缺点: 客观性, 统一性)

#### CVSS
![[attachments/permanent/CVSS#CVSS]]

![[attachments/permanent/CVSS#CVSS 三组指标]]

![[attachments/permanent/CVSS#CVSS Calculator]]
![[attachments/permanent/CVSS#CVSS 示例]]

#### Zero Day Exploits
0day 漏洞指的是漏洞发现的当天, 相关的恶意程序就已出现并对漏洞进行攻击, 还没有相关报告评估和防御措施

---

### Endpoint Security
= Endpoint Protection System

#### Endpoint Security 的组成
- 中央管理
	- Server/Client Model
	- Reports & Alerts
	- 本地网络知识共享
- 连接 [[permanent/SIEM]] 系统
- 外设(Peripheral devices)安全策略(USB-mouse:yes, USB-stick:no)
- 高级永久线程检测
- 反病毒, 反恶意软件
- Data loss & leak Prevention
- Host Intrusion Prevention
- lokal/personal firewall
- White- & Blacklists (软件或网页)
- Logging & Monitoring
- Deployment of patches

#### Endpoint Security 和 Antivirus 的区别
- 包含关系, A < ES
- 目标是整个网络和终端的保护,
- 终端设备的安全管理(monitoring, patching, local knowledge sharing)

#### EPP, EDR, XDR
![[attachments/permanent/EPP, EDR, XDR#EPP, EDR, XDR]]

![[attachments/permanent/EPP, EDR, XDR#EDR]]

![[attachments/permanent/EPP, EDR, XDR#XDR]]

### SIEM
- 简介
- 目标
- 优缺点
- 困难
- 信息源
- 与 IDS/IPS 系统的区别

![[attachments/permanent/SIEM#SIEM]]

![[attachments/permanent/SIEM#SIEM 的目标]]

![[attachments/permanent/SIEM#SIEM 的优点/缺点]]

![[attachments/permanent/SIEM#SIEM 的困难]]

![[attachments/permanent/SIEM#SIEM 的信息源]]

![[attachments/permanent/SIEM#SIEM 与 IDS/IPS 的区别]]

### TTP
![[attachments/TTP(Tastics,Techniques and Procedures)#TTP]]

[[permanent/TTP(Tastics,Techniques and Procedures)#TTP 具体实例]]

### MITRE ATT&CK
![[attachments/MITRE ATT&CK#MITRE ATT&CK]]


### 案例: 在外网部署加密矿机
![[attachments/Pasted image 20230114002200.png]]


## Social Engineering

### 社会工程学界定
相对于技术性的攻击, 社会工程学针对的不是技术系统而是其用户.
- 利用人的特征或感受上的弱点, 例如恐惧(威胁), 好奇/贪婪(钓鱼)

谈到安全, 人们总是注重技术而忽略了人为因素

### 攻击者角度

#### 社会工程学的分类

**根本分类: 主动 vs. 被动**

##### 主动攻击
- pretexting 伪装(假冒身份骗取信息)
- phishing 网络钓鱼
##### 被动攻击(不与受害者互动)
- 窃听(belauschen)
- shoulder surfing 偷窥
- dumpster diving 翻丢弃物
- baiting 引诱(留下准备好的 U 盘)

**既定类别**
- Human-based (无技术)
- Computer-based (有技术)
- Reverse Social Engineering (受害者协助)

##### Human-based Social Engineering
- Dumpster Diving
- Shoulder Surfing
- Tailgating 尾随(例如在有安全锁的门)
- Badge Surveilance (自行打印员工凭证)
- Pretexting 伪装
- Quid pro quo 交换条件
- People Watching 看人下菜碟
- Diversion Theft 分流盗窃/转移盗窃

##### Computer-based Social Engineering
- [[permanent/Phishing]]
	- [[permanent/Phishing#Clone Phishing|Clone Phishing]] (重复真实邮件)
	- [[permanent/Phishing#Spear Phishing|Spear Phishing]] (有针对性的)
	- [[permanent/Phishing#Whaling|Whaling]] (叉大鱼)
	- CEO Fraud (冒名诈骗)
	- Vishing (Voice Phishing, 目标: 受害者给攻击者打电话)
	- Evil Twins (恶意/流氓 Wifi 接入点)
- Baiting 利用诱饵
- Forensic analysis
- Electronic badges

#### 成功的社会工程师的典型特征 
能与人很好地沟通 
- 无害的对话--攻击没有被注意到
- 掌握了受害者及其环境的技术术语
- 可靠地获得信任或被定位为权威 " 是病人的行为者 

假装的人必须显得真实。
- 年轻人很少能通过大公司的CEO。
- 任何声称在慕尼黑出生或学习的人都应该理解/说巴伐利亚语或能够描述日常的大学生活。
- 侦察和建立信任可能需要时间。
- 灵活性和适应性强，良好的事实记忆

他们对自己不太擅长
- 垃圾箱潜水不一定好玩。
- 伪装成清洁人员意味着相应的活动。

#### 一些案例

**Robin Sage**
伪造的人物获取机密?

**电子生日贺卡**
两名员工在 FB 上提到老板的生日. 攻击者冒充其中一人发电子贺卡, 实际上是恶意软件钓鱼. 计算机完全受损.

**Emily Williams**
伪造简历得到录用, 个人社交网页指向电子贺卡, 实际上是恶意软件

**银行员工的 USB**
20 个装了恶意软件的 USB "丢失" 在路上, 15 个被捡走了

#### Kevin Mitnick
- 书籍: The Art of Deception, 传记: Ghost in the Wires
- 以前是美国最受欢迎的社会工程师 ! 
- "最喜欢的武器：电话；经常冒充高级警官！"。
- 作为一项运动的黑客攻击: 
	- 没有金钱上的动机；（大部分）不显眼地从事副业.
	- 复制内部文件，电子邮件，源代码，... 只是为了好玩
- 团队合作和黑客战争: 
	- 米特尼克经常求助于友好黑客的漏洞和工具
	- 竞争和虚假的朋友最终导致了他的被捕

### 使用者角度

#### SE 攻击故事的典型特征
- 制造紧迫感
- 制造压力
- 威胁消极后果
- 要求绕过程序或例外
- 要求许多/高权限
- 非常好奇地询问
- 使用不必要的专业术语
- 给予模糊的信息
- "好得不能再好"
- 语气不寻常

#### 反制措施


##### 技术上的...

一些通用的:
- 按规定办事, 避免例外和捷径
- 识别不寻常的请求
- 记录和报告可疑事件

Pretexting
- 适度的不信任和谨慎
- 结束通话并回电/更换频道
- 咨询其他人

Dumpster Diving
- 粉碎机

Shoulder Surfing
- 如果你的工作需要, 搞个防窥屏/膜

Tailgating
- 安保措施/隔离系统
- 记得随手关门

Baiting
- 限制系统

##### (公司)组织上的
像所有与IT安全有关的事情一样，这也是一个预算问题： 
- 培训的人员和时间要求 
- 意识防止损害，但不产生利润 " 组织的边界条件。
- 必须确定保护目标和培训重点 
- 内容、教学和媒体准备需要一个跨学科的团队 
- 连续性和成功监测 " 不同方法的结合。
- 面对面的活动与基于计算机的培训 
- 海报、传单、通讯、内联网网站、... 
- 鸣谢、参与证书、比赛

### Penetration Test
渗透测试（一般）即服务：
- 目标
	- 白帽黑客在恶意攻击者得逞之前
	- 识别并报告以前未知的安全漏洞
- 风险
	- 并不保证漏洞都被发现
	- 测试会增加系统(在正常运行时的)负荷
- Penetration tester 应具备的专业能力
	- OS, DB, 网络协议等
- 调查内容 
	- 内部开发/专用软件 
	- IT 服务的组成/配置 
	- 物理安全
- 根据提供的文件（例如源文本）：黑盒与白盒测试

社会工程渗透测试作为对外部各方的命令：
- 组织内部通常不具备专业知识和常规
- “新面孔”对攻击很重要与个人接触。 
- 从“外部攻击者”（不是：“内部攻击者”）的角度关注。
- 与 Vulnerability Scan (仅能扫描已知漏洞)不同

#### 渗透测试的分类
![[attachments/Pasted image 20230124185254.png|500]]

#### 渗透测试流程
1. 计划和目标设定(与客户一起)
2. 信息获取和侦查
3. "场景" 要执行的攻击的规范
4. 隐蔽地执行攻击
5. 结果报告和客户建议

![[attachments/Pasted image 20230124183235.png|500]]

##### Planung/ 1. Vorbereitung
测试范围的定义
- 预算, 道德限制, 目标
- 时间和范围(如仅在白天, 不在某特定日子)
- 工具选择(电话, 电子邮件, 锁具), 测试方法选择
合同规定
- 紧急联系人(比如解除安全警报)
- 假的凭证, 账号
- 成功证明
- 报告方式

##### Informationsakquise
通过互联网（OSINT）：
- 组织结构图
- 年度报告、招聘广告、公司历史和使命宣言 
- 工作人员姓名及电子邮件地址和电话号码 
- 当前的项目、产品、新闻发布、客户、服务提供商 
- 术语（技术术语、缩写......） 
- 在讨论/支持网络论坛上发帖，并附上公司电子邮件地址 
- 如果适用，工作人员的社交网络资料

现场： 
- 工作人员：典型的着装、工作和休息时间、身份证、通讯/吸烟区、送货/来访者交通、... 
- 建筑物：房间平面图、监控区域（摄像头/保安）、门禁系统、值班和轮班表、功能室（打印机/邮件/服务器室、仓库......）、厕所、纸桶。

##### 2. Informationsbeschaffung
- 评估已知信息
- 执行 I-Modul
- 漏洞研究

##### 3. Risikoanalyse
- 评估威胁(Bedrohungen)
- 评估攻击成功的花费
- 定义优先级(Prioritäten)
- Systeme/Module einschränken

##### 攻击概念

哪些攻击是有希望的？
- 界定团队中的角色/责任 
- 拟定 "脚本"/人员描述 " 
确定顺序和时间表

在与客户的互动中： 
- 已批准选定的方案 
- 定义终止标准 
- 检查合同和法律许可 
- 如有必要，让第三方参与进来（如保安公司、楼房业主)

采购道具/准备材料。
- 制服
- 徽章、文件

##### 4. Aktive Eindringversuche
- 执行 E-Module

##### 执行攻击
通过电子邮件。发送并等待;-)

通过电话：做笔记，避免当地的干扰

在现场：
- 通常是团队合作（两个人，一个人当瞭望员）
- 合理利用等待时间

重要的是：不要做任何你不允许做的事情! ! 
- 遵守法律
	- 例如，使用警察制服或伪造官方照片的身份证，几乎在任何地方都是不允许的!
	- 每个国家的相关法律可能有所不同 
- 恪守合同约定
- 尽可能地坚持计划，但不要超过约定的测试。

##### 5. Abchlussanalyse
- 收集结果
- 评价结果
- 列出风险
- 协商建议的改进
- 定制改进计划

##### Berichtswesen
不太令人兴奋，但对客户来说是最重要的

书面的和/或作为演示/讨论
结构类似于技术性的五项测试报告
- 描述方法和场景（攻击计划）
- 记录执行情况和结果，必要时附上证据
- 指出行动方案，必要时提出建议

如果可能，不要指责个人

指出遗留问题，例如：
- 打开但不再上锁的锁，如橱柜上的锁
- 有贴纸作为存在证据的设备
- 攻击期间带来的设备（WLAN接入点、键盘记录器...）。


### 来吧, 怎样不会被攻击
认识不足的主要问题:
“这只会发生在其他人身上。” 
“为什么有人要关心我和我的数据？” 
“反正你也无能为力。”

注意那些要求各种权限的应用

精心设计的社会工程学攻击总是会成功的 :)

## Rechtliche Regelungen

#### 总结
- 有关IT安全的立法越来越复杂
	- 对计算机科学家很重要的基本知识
	- 根据活动情况：专业的法律支持是必不可少的
- 目标部分冲突，例如
	- 储存尽可能多的信息，以便能够澄清事件 VS. 数据保护意义上的数据规避
- 法律与正义。
	- 新法律生效前的期限，等待期
	- 说客的影响 " 执行和控制方面的不足
	- 法律的确定性与法院的意外裁决

### 问题
U6

##### Welche Grundsä tze fü r die Verarbeitung personenbezogener Daten schreibt die DSGVO vor
- Verbot mit Erlaubnisvorbehalt
- Datenvermeidung und Dartenversparsamkeit
- Zweikbindung
- Transparent

##### Was ist eine Verarbeitungstätigkeit und zu was sind Organisationen diesbezüglich verpflichtet?
- Mit oder ohne Hilfsmittel ausgeführter Vorgang im Zusammenhang mit personenbezogenen Daten  
- Führen eines Verzeichnisses der Verarbeitungstätigkeiten (VVT) gemäß Art. 30 DSGVO

##### Was ist eine Datenschutzfolgenabschätzung und wann ist sie erforderlich?

##### Passiert eine Datenpanne - was ist dann zu tun? Lassen sich existierende Prozesse in der Organisation hier nutzen?



### Strafgesetzbuch(StGB)

##### 总览
- Antragsdelikt: Tat wird nur auf Antrag (Anzeige) i.d.R. durch den „Verletzten“ (§ 77) verfolgt  
(§ 202a, 202b, 303a, 303b)  
- Offizialdelikt: Tat wird „von Amts wegen“ (Staatsanwaltschaft) verfolgt (§ 202c
- § 202a: Ausspähen von Daten 窥视数据
- § 202b: Abfangen von Daten  拦截数据
- § 202c: Vorbereiten des Ausspähens und Abfangens von Daten  
- § 202d: Datenhehlerei  数据盗窃
- § 205b: Strafantrag  刑事申诉
- § 303a: Datenveränderung  数据更改
- § 303b: Computersabotage  破坏计算机的行为
- § 303c: Strafantrag 刑事申诉

##### § 202a: Ausspähen von Daten 窥视数据
> (1) Wer unbefugt sich oder einem anderen Zugang zu Daten, die nicht für ihn bestimmt und die gegen unberechtigten Zugang besonders gesichert sind, unter Überwindung der Zugangssicherung verschafft, wird mit Freiheitsstrafe bis zu drei Jahren oder mit Geldstrafe bestraft.  
> 
> (2) Daten im Sinne des Absatzes 1 sind nur solche, die elektronisch, magnetisch oder sonst nicht unmittelbar wahrnehmbar gespeichert sind oder übermittelt werden.

1) 任何人在未经授权的情况下，让自己或他人访问不是为他或她准备的数据，而且这些 数据被特别保护以防止未经授权的访问。 通过克服访问安全问题。 将被处以三年以下监禁或罚款。
2) 第1款意义上的数据仅指那些以电子、磁力或其他不可直接感知的方式存储或传输的数据

##### § 202b: Abfangen von Daten  拦截数据
> Wer unbefugt sich oder einem anderen unter Anwendung von technischen Mitteln nicht für ihn bestimmte Daten (§ 202a Abs. 2) aus einer nichtöffentlichen Datenübermittlung oder aus der elektromagnetischen Abstrahlung einer Datenverarbeitungsanlage verschafft, wird mit Freiheitsstrafe bis zu zwei Jahren oder mit Geldstrafe bestraft, wenn die Tat nicht in anderen Vorschriften mit schwererer Strafe bedroht ist.

- 任何人，通过使用技术手段，未经授权地 (第202a条第2款)从非公开数据传输或从数据处理系统的电磁辐射中获得的信息， 应被处以不超过两年的监禁或罚款。
- 如果根据其他规定，该罪行不应受到更严厉的惩罚. 


##### § 202c: Vorbereiten des Ausspähens und Abfangens von Daten("Hackerparagraph")

> (1) Wer eine Straftat nach § 202a oder § 202b vorbereitet, indem er  
>	1. Passwörter oder sonstige Sicherungscodes, die den Zugang zu Daten (§ 202a Abs. 2) ermöglichen, oder  
>	2. Computerprogramme, deren Zweck die Begehung einer solchen Tat ist,  
> herstellt, sich oder einem anderen verschafft, verkauft, einem anderen überlässt, verbreitet oder sonst zugänglich macht, wird mit Freiheitsstrafe bis zu zwei Jahr oder mit Geldstrafe bestraft.
    
> § 149 Abs. 2 und 3 gilt entsprechend.  
> (Vorbereitung der Fälschung von Geld und Wertzeichen; längere Haftstrafen)  
> Offizialdelikt

1) 任何准备实施第202a条或第202b条规定的犯罪的人, 通过生产、为自己或他人获得、销售、给予他人、分发或以其他方式提供:
	1. 允许访问数据的密码或其他安全代码（第202a（2）条），或 
	2. 其目的是实施这种犯罪的计算机程序。
应处以不超过两 年的监禁或罚款。
- § 第149条第（2）和（3）款应比照适用
- 官方罪行

- 技术安全专家对此类工具的良性使用不在 202c 的范围内, 只有计算机犯罪的准备行为才会受到处罚

[[#如何评估一个黑客工具是否该受到法律惩罚]]

##### § 202d: Datenhehlerei  数据盗窃
> Wer Daten (§ 202a Absatz 2), die nicht allgemein zugänglich sind und die ein anderer durch eine rechtswidrige Tat erlangt hat, sich oder einem anderen verschafft, einem anderen überlässt, verbreitet oder sonst zugänglich macht, um sich oder einen Dritten zu bereichern oder einen anderen zu schädigen, wird mit Freiheitsstrafe bis zu drei Jahren oder mit Geldstrafe bestraft.  
> 
> Die Strafe darf nicht schwerer sein als die für die Vortat angedrohte Strafe.  
> 
> Absatz 1 gilt nicht für Handlungen, die ausschließlich der Erfüllung rechtmäßiger dienstlicher oder beruflicher Pflichten dienen.

- 任何人如果获得一般人无法获得的数据(第202a(2)条)，并且是由另一个人通过非法行为获得的，或将其提供给另一个人，传播或以其他方式使其获得，以使自己或第三人致富 或伤害他人，应被判处不超过三年的监禁或罚款。
- 惩罚不得超过对上游犯罪威胁的惩罚。
- 第1款不应适用于仅为履行合法的官方或专业职责而实施的行为


##### § 205: Strafantrag  刑事申诉
> In den Fällen des § 201 Abs. 1 und 2 und der §§ 202, 203 und 204 wird die Tat nur auf Antrag verfolgt. Dies gilt auch in den Fällen der §§ 201a, 202a, 202b und 202d, es sei denn, dass die Strafverfolgungsbehörde wegen des besonderen öffentlichen Interesses an der Strafverfolgung ein Einschreiten von Amts wegen für geboten hält.

- 在第201(1)和(2)条以及第202、203和204条的情况下，只有在申请的情况下才可以起诉该 罪行。这也应适用于第201a、202a、202b和202d条的情况，除非检察机关认为由于起诉的特殊公共利益而有必要依职权进行干预
- § 该清单中缺少第202c条；即202c条是一种官方罪行 Offizialdelikt
- "特殊公共利益 Besonderes öffentliches Interesse"由检方 Staatsanwaltschaft 决定。

##### 案例: Lilith Wittmann 和 CDU Connect App
- 所有帮助者的所有数据最终都在一个数据库中 
- 数据库可以通过GET调用的 "补充 "读出 
- 例如https://cdu.kampagnen
- dialog.de/api/campaigns/38?include=visits 
- 可以读出18500个活动帮助者和1350个支持者的数据 
- 负责任的披露（向当局和开发人员提供信息，有机会修复漏洞）。
- 向基民盟总部电话报告
- 几乎没有兴趣："不知道，写邮件吧"
- 向CERT Bund、BSI和国家数据保护专员报告该漏洞（11.05.21）
- 12.05.21：应用程序被下线
- 基社盟和奥地利人民党的应用程序有同样的漏洞（12.05.21）
与联邦经理Stefan Hennewig的对话
- 提供在安全部门为党工作的机会
- Wittmann拒绝，不想限制她的公民社会承诺
- Union Betriebs GmbH的律师向BKA投诉（04.06.21）
- BKA宣布自己没有责任，并建议根据《刑法》第202b条（截取数据）向LKA报告
- 根据《刑法》第202a/b/c条报告（01. 07.21）
- 3.8.21 警方与 "被告 "Wittmann联系
- 150页调查文件
- 10.08.21 CDU撤回投诉
- 17.08.21 对发现更多漏洞但发表《全面披露》的人进一步投诉
- 25.08.21 对Lilith Wittmann的诉讼被中止；部分原因。- 由于安全漏洞，没有必要克服访问保护--数据没有公布。

##### § 303a: Datenveränderung  数据更改
> (2) Wer rechtswidrig Daten (§ 202a Abs. 2)  
> (3) löscht, unterdrückt, unbrauchbar macht oder verändert,  
> wird mit Freiheitsstrafe bis zu zwei Jahren oder mit Geldstrafe bestraft.  
> (4) Der Versuch ist strafbar.  
> (5) Für die Vorbereitung einer Straftat nach Absatz 1 gilt §202c entsprechend.

2) 非法收集数据的人（第202a条第2款）。 
3) 删除、压制、使之无法使用或修改。 将被处以两年以下的监禁或罚款。
4) 这种企图是要受到惩罚的。
5) 以下内容适用于第1款所述犯罪的准备工作 相应地，§202c。


##### § 303b: Computersabotage  破坏计算机的行为
> (1) Wer eine Datenverarbeitung, die für einen anderen von wesentlicher Bedeutung ist, dadurch erheblich stört, dass er  
> 1. eine Tat nach § 303a Abs. 1 begeht,  
> 2. Daten (§ 202a Abs. 2) in der Absicht, einem anderen Nachteil zuzufügen, eingibt oder übermittelt oder  
> 3. eine Datenverarbeitungsanlage oder einen Datenträger zerstört, beschädigt,  
> unbrauchbar macht, beseitigt oder verändert, wird mit Freiheitsstrafe bis zu drei Jahren oder mit Geldstrafe bestraft.  
> (2) Handelt es sich um eine Datenverarbeitung, die für einen fremden Betrieb, ein fremdes Unternehmen oder eine Behörde von wesentlicher Bedeutung ist, ist die Strafe Freiheitsstrafe bis zu fünf Jahren oder Geldstrafe

1) 任何通过以下方式严重干扰对他人具有重大意义的数据处理操作的人
	1. 犯了第303a（1）条规定的罪行。 
	2. 输入或传输数据（第202a(2)条），意图对他人造成不利，或 
	3. 毁坏、损害、使其无法使用、移除或改变数据处理系统或数据载体。 将被处以三年以下监禁或罚款。
2) 如果数据处理对另一个公司、企业或当局具有至关重要的
意义，则将被处以五年以下的监禁或罚款

> (1) Der Versuch ist strafbar.  
> (2) In besonders schweren Fällen des Absatzes 2 ist die Strafe Freiheitsstrafe von sechs Monaten bis zu zehn Jahren. Ein besonders schwerer Fall liegt in der Regel vor, wenn der Täter  
>	1. einen Vermögensverlust großen Ausmaßes herbeiführt,  
>	2. gewerbsmäßig oder als Mitglied einer Bande handelt, die sich zur fortgesetzten Begehung von Computersabotage verbunden hat,  
>	3. durch die Tat die Versorgung der Bevölkerung mit lebenswichtigen Gütern oder Dienstleistungen oder die Sicherheit der Bundesrepublik Deutschland beeinträchtigt.  
> (3) Für die Vorbereitung einer Straftat nach Absatz 1 gilt § 202c entsprechend

1) 这种企图是要受到惩罚的。 
2) 在第2款规定的特别严重的情况下，将被处以6个月至10年的 监禁。通常情况下，如果犯罪人出现以下情况，则被视为存 在特别严重的情况
	1. 造成大规模的资产损失。 
	2. 商业行为或作为一个团伙的成员，联合起来持续进行计算机破坏。 
	3. 该行为损害了对民众的基本商品或服务的供应或德意志联邦共和国的安全。
3) 以下内容适用于第1款所述犯罪的准备工作§ 202c条。

##### § 303c: Strafantrag 刑事申诉
> In den Fällen der §§ 303, 303a Abs. 1 und 2 sowie § 303b Abs. 1 bis 3 wird die Tat nur auf Antrag verfolgt, es sei denn, dass die Strafverfolgungsbehörde wegen des besonderen öffentlichen Interesses an der Strafverfolgung ein Einschreiten von Amts wegen für geboten hält.

对于第303条、第303a(1)和(2)条以及第303b(1)至(3)条的情况，除非检察机关认为由于 起诉的特殊公共利益而有必要依职权进行干预，否则只能根据申请对犯罪进行起诉

##### 如何评估一个黑客工具是否该受到法律惩罚
来自 BITKOM-Leitfaden, dreistufige Bewertungsschema
3个阶段的评估计划 
1. 评估软件的功能 功能适合于实施犯罪（关键） 功能不适合于实施犯罪（非关键
	![[attachments/Pasted image 20230118225703.png|400]]
2. 确定软件的主要目的
	![[attachments/Pasted image 20230118225731.png|400]]
3. 确定行为人的意图, whitelist:
	- Beauftragung durch den Angegriffenen (Pentest)  
	- Erfüllung Geschäftszweck / Arbeitsmittel (Sicherheitsberater)  
	- Aufdecken Sicherheitslücken (Responsible disclosure)  
	- Austausch der Ergebnisse unter Sicherheitsexpert:innen

### Datenschutz(EU-DGSVO, BayDSG)

##### 信息自决权
- (隐含的）自行决定披露和使用个人数据的基本权利. 
- 如果有可能从数据中得出关于个人的结论，则存在个人可参考性。
	- 姓名、入学编号、电子邮件地址、账户号码、...
	- IP地址？
- 术语起源核心思想：那些不知道或无法影响收集到关于他们的什么信息以及如何处理这些信息的人 ，出于谨慎而调整自己的行为——个人的行动自由受到限制。

##### 数据保护立法
- Europäische Datenschutzgrundverordnung (EU-DSGV)  
- Bundesdatenschutzgesetz (BDSG)  
- Bayerisches Datenschutzgesetz (BayDSG)  
- Regelungen auch in anderen Gesetzen, im Umfeld von IT-Diensten besonders relevant z.B.  
	- Telekommunikationsgesetz (TKG)  
	- Telemediengesetz (TMG)

基本原则: 
- Verbot mit Erlaubnisvorbehalt
	- 法律允许适当的收集, 处理, 使用
	- 知情同意
- 数据规避和数据经济(必要性原则 Erfordernisprizip)
- 目的导向
- 数据透明(was, von wem, wozu, wie lange)


##### 个人数据如何在网上传播?
- 有意识: 个人主页, 社交媒体..
- 无意识: 服务个性化, 邮件发送到带有网络档案的分发列表
- 周围的人/组织

**潜在危险**
- 将不同来源的数据连接起来
- 画像剖析及其商业用途
- 没有「被遗忘的权利」

##### 谁会拥有个人数据
- 政府设施, 公共设施
- 公司
	- 保险, 银行
	- 电信公司
	- 交通公司
	- 零售页(会员卡)
	- 互联网服务提供者

### IT Sicherheitsgesetz
..

## Kryptographie

### 术语

##### Cryptography
- 加密解密技术

##### Cryptoanalyse
- 没有密钥进行解密的技术

##### Cryptology
- = Cryptography + Cryptoanalyse

##### Cryptography Protocol
- 加密解密使用的协议

##### 过程用语
- plaintext 明文 Klartext
- ciphertext 密文 Geheimtext
- encryption 加密 Verschlüsselung, Chiffrierung
- decryption 解密 Entschlüsselung, Dechiffrierung
- Cryptographic Algorithm/Cipher 密码算法 Chiffriersystem

##### Steganography
- 隐写术

##### Semagramme
- linguistic steganography
- 隐藏在文字作品或图像的细节中的信息

##### Masking(open code)
- 公开信息中的部分内容有事先商定的含义
- 如日本天气预报中的「東の風、雨」(higashi no kaze, ame)重复两次意为「与美国的战争」

##### Jargon, Millieu-Code
- 行话, 黑话
- 比如 "Schnee" 代表 "Kokain"
- 用得多容易被识别, 同义替换会破坏原义

##### Confusion
- 1949 Shannon
- (好的密码算法)明文和密文之间的联系越少越好

##### Diffusion
- 1949 Shannon
- (好的密码算法) 明文的细微差别 应该导致 较大的密文差别

##### Differential Analyse
- 差分密码分析

##### 课程 notation
![[attachments/Pasted image 20230221175833.png|L|400]]

### 工具
[[permanent/密码学#工具站]]

### MISC

#### 图片隐写
- 把信息写入色彩通道里最不明显的末位
![[attachments/Pasted image 20230220110026.png|L|300]]

识别: 
- 放大后+对比度增加
- ![[attachments/Pasted image 20230220110255.png|L|300]]
#### Plausible Deniability
- 可推诿性?
- 如果你有一样加密的东西(被发现了), 有时候可能会被强制要求交出密码
- 解决办法是, 第一层加密下隐藏第二层加密, 并让这个第二层加密不被发现
- 用 TrueCrypt/VeraCrypt
- 避免对第二层加密的引用(win:最近使用过的文件)

#### 隐蔽的渠道
- 通过不可察觉的渠道/媒介进行信息传输
- e.g.
    - 数据在数据包头而不是在TCP有效载荷中（如TCP SeqNr.)
    - 人为延迟传输数据包
    - 不是内容，但文件的名称和大小是相关的 
    - 大海捞针: 大量无效信息, 只有指定部分是有效的
- 特征
    - 可检测性: 只有指定接受者能识别
    - 不可辨别性: 监控/审查员应该不能识别出当前是否正在传输隐藏数据
    - 带宽：每单位时间内可隐蔽传输的数据长度

#### Skytale/栅栏密码

#### Excel 解锁宏
- 新的MS Office文件格式基本上是基于开放的OpenXML，它基于XML并使用zip压缩。 因此，人们可以简单地用包装程序解开文件（或者用Windows中集成的zip程序将文件扩展名改为.zip）。 这样就得到了一个目录树，其中只有/xl/vbaProject.bin（宏）和/xl/worksheets/sheetXXX.xml（单个电子表格）是感兴趣的。 在二进制文件中可以找到代码部分 \verb|CMG=|, \verb|DPB=| 和 \verb|GC=|。如果你把 \verb|DPB=| 改为 \verb|DPx=| ，你在下次启动时就会得到一个错误信息，但再次保存就会杀死密码。
- XML片段`<c r="A1" s="3"><f>SUM(C1:C6)/20</f><v>2.25</v></c>`直接给出公式（未加密）。如果你想完全删除密码保护，只需删除<sheetProtection .../>。

### Cryptographical System

#### Cryptosystem
![[attachments/permanent/Cryptography#Cryptosystem]]

#### 区块密码与流密码
- Blockchiffren
    - 将长度为 m 的密码分成 长度为 n 的 r 个块
    - 最后一块可能后 padding
- Stromchiffren
    - 通信双方使用同一种子初始化的伪随机数生成器

### 对称密码

#### 对称密码算法
![[attachments/permanent/对称密码#对称密码]]

#### Permutation
- 位移, 如恺撒密码
![[attachments/Pasted image 20230220114608.png]]

#### Substitution
- 类似坐标的密码, 可以在维度上变化, 
![[attachments/Pasted image 20230220114547.png|L|400]]

#### One-Time-Pad
- 一次性密码本
- 加密: c = XOR(m, k)
- 解密: m = XOR(c, k)
- 只要密钥不泄漏, 就是牢不可破的

#### DES
[[permanent/DES]]

#### AES
[[permanent/AES]]

### 分组方式
##### ECB
![[attachments/permanent/Cryptography#ECB]]

##### CBC
![[attachments/permanent/Cryptography#CBC]]

### 非对称密码

#### 非对称密码算法
![[attachments/permanent/非对称密码#非对称密码]]

#### RSA
[[permanent/RSA]]

### Hybrid
- SSL/TLS, PGP, SSH 等实际上是使用 hybrid 方法来加密的
- 非对称方法交换对称方法的密钥
- 对称方法加密内容

### 密码分析/密码破解

#### Bruteforce
- 128 bit -> 3.4e+38 种密码可能(如果计算机每秒尝试30亿次, 1000台电脑最多需要尝试3.6e+18年)
- 256 bit -> 配置同上, 1.2e+57年

#### 撞库
- 所以要[[permanent/加盐]]啊喂

### 密钥安全性/破解难度

#### 密钥长度
![[attachments/Pasted image 20230221180935.png||L|400]]

![[attachments/Pasted image 20230221181022.png|L|400]]

symmetric vs. asymmetric 同等安全性需要的 bits
![[attachments/Pasted image 20230221181936.png|L|400]]

### 电子签名
![[attachments/permanent/电子签名#电子签名技术]]

### quantensichere Kryptographie

#### Quantencomputing
![[attachments/permanent/量子计算]]

#### Mosca's inequality
![[attachments/Pasted image 20230222165355.png|L|400]]

#### Post Quanten Security
![[attachments/Pasted image 20230222165806.png|L|400]]

#### 量子计算带来的密码威胁
- 枚举的时间直接取 sqrt()
    - AES-256: safe
    - Tripple-DES: unsafe
- 寻找 n 的因数: 𝑂($(\log 𝑛)^3$)
    - 大部分 非对称算法(RSA, ECDSA, EdDSA) 在量子比特数量到一定程度后不再安全
- 大多数 
    - 加密哈希函数（如SHA2，SHA3，BLAKE2），
    - MAC算法（如HMAC和CMAK）和 
    - 密钥衍生函数（bcrypt，Scrypt，Argon2）
    是（基本上）量子安全的。-> 只受到轻微影响。256bits的还能保留128bits程度的安全性

## (crypto) HASH Function

### 哈希函数/散列函数

#### 哈希函数的特点
- 任意长的输入, 计算都得到固长的 散列值
- 单向函数, 非单射(x 能确定 y, 反过来不能) => 可能存在 collision
- compression function G, 密文分组+padding, IV
    - ![[attachments/Pasted image 20230222140636.png|L|400]]

 G 可以用比如 DES, 这样散列值就是 64bit (和 DES密钥长度一样)
- ![[attachments/Pasted image 20230222140902.png|L|400]]

#### 抗碰撞性
Eine (Einweg-)Funktion wird als kollisionsresistent bezeichnet, wenn es „schwer“ ist, verschiedene Eingaben zu finden, die auf denselben Wert abgebildet werden

#### 强哈希函数/弱哈希函数
- 弱: 给定一个 m, 基本上不可能找的一个(有意义的) m' 和它散列值相同
    - 为什么说有意义呢, 因为 md5 构造碰撞是做得到的, 只不过是一堆乱码
- 强: 基本上不可能找到一对 m 和 m', 散列值相同

帮助理解:
- 找 253 个人, 才有 50%+ 概率有人和你同生日
- 找 23 个人, 就能有 50%+ 概率有两个人同生日
- 对于长度为 k bits 的信息 m, $2^{k/2}$ 个信息里可能有撞哈希的

#### 密码学中哈希函数的应用
- 文件或信息的完整性检查 
- 密码文件中密码的混淆
- 作为数字签名的数据基础
- 作为伪随机数生成器

### MD5

#### MD5 算法
- src: [掌芝士 md5](https://www.bilibili.com/video/BV1u44y1z7t1/?spm_id_from=333.337.search-card.all.click&vd_source=92451653bea4ed324c9bfc0287256aa5)
- 128 bit 散列值, 512 bits 块
- 补位: 512\*n + 448
    - 如果源文件刚好满足, 也要补512
    - 448 = 512 - 64, 64 用来记录原始数据长度
- 每次处理 512 bits 中的 32 bits
- IV: 4\*4字节(称为ABCD), 也就是一共 128 bit
    - 对每一个 32 bits, 要经过4轮函数
    - ![[attachments/Pasted image 20230222155453.png]]
- 四个函数, 通过位移, 异或改变 A 的值
    - s, ac 是固定值, x 是当前处理的 32 bit
    - ![[attachments/Pasted image 20230222154835.png|L|400]]
    - ![[attachments/Pasted image 20230222155302.png|L|500]]
- Merkle-Damgard 结构

#### MD5 的安全性
- 对4轮函数的一轮可以做到差分密码分析
- 1993伪撞库: 可以找到散列值相同但没有意义的序列
- 2004撞库: 一个多小时可以找到同散列值

=> MD5 不再安全(SHA-1也不安全)
- 用这些替代: SHA-256, Whirlpool, SHA-3
- 仅在同时使用多种散列算法时有意义

### SHA-3
- 又是 NIST, 这次他们来找 SHA-2 的升级, Keccak 赢了

- SHA3-256: r=1152, c=448, Ausgabe abgeschnitten nach 256 Bits  
- SHA3-512: r=576, c=1024, Ausgabe abgeschnitten nach 512 Bits
- r 关系到速度, c 关系到安全性

- collision-resistent

![[attachments/Pasted image 20230222162046.png|L|400]]

#### Keccak-f

固定常数
- Breite b = r + c = 25 \* 2$^l$, w = 2$^l$
- nr = 12 + 2$^l$

变换
- ![[attachments/Pasted image 20230222162430.png|L|400]]
- ![[attachments/Pasted image 20230222162451.png|L|400]]

#### 评价
- 可变的长度, 适合做流密码


## 安全技术

### 对 C, I 的保护
- Confidentiality: 加密 Verschlüsselung
- Integrity: hash, (如果有) sequence nr

### Authentisierung

#### Authentisierung 认证了什么
- 数据来源的认证
- 用户认证
- 通过实体认证: 单方/多方(如实体token+密码)

#### Authentisierung 以什么认证
- Wissen
    - pw, PIN, ...
- Besitz
    - smartcard, token, token-App
- Eigenschaft
    - Biometrie
        - fingerabdruck
        - iris
        - Stimmerkennung  
        - Gesichtserkennung

### 一次性密码

#### S/Key
![[attachments/Pasted image 20230223164617.png|L|400]]

![[attachments/Pasted image 20230223164653.png|L|400]]

- 好的 hash 能提供保护, 否则容易遭到中间人攻击
- 会遭到重放攻击
- 被 OTP 取代

#### OTP(One Time Password system)
- RFC 2289, S/Key 的继承者
- 避免重放攻击: 每个登录者必须要自己的 OTP
- 支持不同的 hash 函数, MD4, MD5, SHA...
- 推荐使用 [[#IPSec]] 

#### S/Key 和 OTP 的攻击
- 所有内容纯文本传输
- 攻击者冒充认证服务器/中间人攻击是可能的
- 所以建议用 IPSec 对服务器进行验证

#### TOTP
- time-based OTP
- RFC 6238
- HOTP(基于 HMAC 的 OTP\[RFC 4226]) 的进一步发展
    - HOTP(K,C) = HMAC-SHA1(K,C), key K, counter C
- TOTP(K) = HOTP(K, C$_T$)
    - $C_T = \lfloor \frac{T - T_0}{T_X} \rfloor$
    - $T_0$ unix 时间 in sec, 默认 0
    - $T$ 现在的时间, 即 1970.1.1 以来的秒数

### Smartcard
- 属于通过实体认证
![[attachments/Pasted image 20230223172300.png|L|300]]

#### 分类
- Speicherkarten  
- Prozessor-Karten  
- Kontaktlose Karten

#### SecureID token
- 每分钟产生一个新号码，只能由中央认证服务器预测 
- 这个6到8位数的号码必须与用户密码一起输入（双因素认证）
- 通常是基于时间的随机数

![[attachments/Pasted image 20230223173025.png|L|500]]


### Biometry
- fingerabdruck
- iris
- Stimmerkennung  
- Gesichtserkennung

#### 生成/认证 大致流程
![[attachments/Pasted image 20230223173139.png|L|500]]

#### 指纹

##### 取指纹算法
- 定位
- 纹路方向 ridge
- 提取出微小的特征
![[attachments/Pasted image 20230223173709.png|L|400]]

##### 对指纹认证的攻击
- Lichtreflexion 比如用玻璃反光之前的指纹痕迹
- 比如指纹模具
- 大多数传感器80%符合就能过

##### 指纹扫描
- Puls
- Tiefenmuster
- Wärmebild
- ...

### Datensprung
- 对数据来源的认证

#### 认证数据来源的几种方式
- 加密信息(即知道密钥可解)
- [[permanent/电子签名|Digital Signature]]
- Message Authentication Code(MAC) = hash func + 共同密钥
- Hashed MAC
- 以上方案的组合

#### 可能的问题
- sym 加密的消息传递
    - 否认
- asym 加密的消息传递
    - 否认
    - 数据源未认证
- 数字签名
    - 接收方无法认证
    - 无法加密
- 非对称加密 + 数字签名
    - ![[attachments/Pasted image 20230223182526.png|L|400]]
    - 上述问题都解决了, 但不能确认 I (上面那些也不能)
- 还有各种各样加 hash 的, 还是有问题

#### MAC, HMAC
- (Hashed) Message Authentication Code

##### Message Authentication Code
- 用于对消息 M 的加密
- MAC(M) = A(K, M)
    - A 特定算法
    - K 密钥
- e.g. 
    - ![[attachments/Pasted image 20230224112639.png|L|400]]
- Brute Force 攻击 是有可能的
- 如果使用 Merkle-Damgard 结构的 hash 函数, 则 Length Extension Attack 是有可能的

##### hashed MAC
- MAC, der nicht symm. Verschlüsselung, sondern kryptographische Hash- Funktion zur Kompression verwendet 使用 hash func 代替 sym. 加密
- $HMAC(m) = H\left[(K^+ \oplus opad) || H[(K^+ \oplus ipad)||m]\right]$
    - $S_i$ := $K^+ \oplus ipad$ , $S_o$ = $K^+ \oplus opad$
    - b = $S_i$ 的长度
    - $K^+$ := 长度为 b 的密钥 k

#### Needham-Schroeder
- 1979, 引入 Trusted Third Party(TTP) 
- 不能防御重放攻击(=> Kerberos)
- 第三方 Trent 与每个通信伙伴共享密钥
- $E_A$ 指 Alice 与 Trent 的对称密钥
![[attachments/Pasted image 20230224115447.png||L|500]]

#### Kerberos
[[permanent/Kerberos]]

### Autorisierung und Zugriffkontrolle
- Autorisierung: 权限的分配/指定
- Zugriffskontrolle: 这些权限的执行

#### 分类

##### DAC (Discretionary Access Control) 
- 基于所有者原则
- 所有者指定其对象的权限 
- 根据对象分配访问权限
##### MAC (Mandatory Access Control) 
- 基于规则的权利说明
- 系统全局
- 例如Bell-LaPadula；规则通过安全等级(非机密、机密、秘密、最高机密)指定
##### RBAC（Role-Based Access Control） 
- 主体和任务的分离
- 授权不再与主体相关，而是与特定的任务相关
- 主体通过角色成员资格获得授权
![[attachments/Pasted image 20230224154751.png|L|500]]

#### Referenzmonitor
- 用于访问控制的系统, 也称为 Access Control Monitor
- 需要做到:
    - 必须通过 Referenzmonitor 访问对象
    - Referenzmonitor 必须能够识别访问主体
    - Referenzmonitor 可以随时中断访问

### Identification
- 现实世界的实体和数字ID的联系
- 两个步骤
    1. Personalisation: 确认现实中的身份, 并给实体分配 ID
    2. Identification: 识别, 将数字ID与只有该实体知道的信息(如密码)连接
- 问题: 伪装攻击

#### Certification Authority
- 是一个受信任的第三方 TTP 
- 颁发数字签名(Digital Signature), 效果类似于公证(Notar)
- CA的用户组:
    - 一个领域中的所有用户都 "信任 "该 CA，即CA的 "声明 "被所有用户接受为有效、正确和真实

##### Aufgabenspektrum einer CA
- Certificate Issuance
- Certificate Update
- Certificate Revocation
- Certificate Repository
- Key Generation
- Notarization
- Certificate History
- Cross-Certificate
- Attribute Certificate

#### 用户认证的流程
1. 生成密钥, 密钥只由认证方保管
2. Personalisation, 请求证书
3. 生成所需的证书
4. 颁布证书

#### X.509v3
- 证书
![[attachments/Pasted image 20230224164548.png|L|500]]

#### 证书的撤销
- *Certificate Revocation Lists (CRLs)*: 一个列表, 记录证书的有效期和证书的ID
- Zertifikat widerrufen: 
    - openssl ca -config openssl.cnf -revoke client-cert.pem  
- Revocation List erzeugen: 
    - openssl ca -config openssl.cnf -gencrl -out crl.pem

#### Online Certificate Status Protocol (OCSP)
- 协议
- 使用户能随时向 OCSP 服务器请求证书
- OCSP 服务器是由 [[#Certification Authority]] 运营的
- 流程
    - 请求证书
    - 验证证书
        - "good" 在有效期内
        - "revoked" 过期或被撤回
        - "unknown"

#### OIDC
- Open ID Connect
- 集中存储不同服务的 ID 信息

目标/解决的问题
- 对于开发者来说
    - 用户认证，无需存储和管理密码/访问数据(责任！加密，泄漏......)
    - 不同级别的认证
- 对于用户
    - "不要在这样的网站上有其他账户......"
    - 没有必要相信任何蹩脚的网络应用...
    - 所使用的身份供应商的认证安全（2FA/MFA，无密码，......），而不是应用程序的认证安全("转义")

流程
- ![[attachments/Pasted image 20230225153435.png|L|500]]
- Relying Party: 需要认证/需要使用 OIDC 服务的依赖方(你的应用)
- OIDC Provider (OP) / Identity Provider (IdP): 为信赖方提供认证和授权. 可以使用一个OP或IdP，或者自己提供IdP

OIDC token 的传递
- 生成 JWT https://jwt.io/ + base64加密

##### JWT
![[attachments/Pasted image 20230225155435.png|L|500]]


## Netzsicherheit-Schicht 2

### Visualisierung von Netzen

#### Virtual (Private) Network (VPN)
- 通过各种技术将(距离比较远的)多个终端连接到一个逻辑上的网络
- Layer 1:
    - Virtual Private Wire Service(VPWS): 供应商提供点对点的连接 
    - Virtual Private Line Service(VPLS): 供应商提供点对多点的连接
- Layer 2:
    - VLAN: 同一物理链路上的多LAN广播域, 使用 IEEE 802.1Q 标准
    - Virtual Private LAN Services(缩写又是VPLS): 连接物理上分隔的 LAN
    - [[#Point-to-Point Tunneling Protocol(PPTP)]]
    - Layer2 Tunneling Protocol
- Layer 3
    - IPSec
    - SSL/TLS
    - OpenVPN

#### Layer 2 的任务
- Frames 的无差错传输
- 流量控制
- 共用传输介质的多媒体访问
    - Ethernet: CSMA/CD (IEEE 802.3)
    - WLAN: CSMA/CA (IEEE 802.11)

#### VLAN
- 跨多个交换机的局域网
- 允许根据业务或者安全需求, 将 IT-System 分组或隔离
- 现代大学网络的标配

##### VLAN 技术
- IEEE 802.1Q
- 在 ethernet frame 的基础上, 拓展了 TAG
    - ![[attachments/Pasted image 20230225095949.png|L|400]]
    - ![[attachments/Pasted image 20230225203726.png|L|400]]
    - TPID(Tag Protocol Identifier), PRI(Priority), CFI(Canonical Format Identifier), VLAN ID

### Point-to-Point Protocol(PPP)
- 为了拨号而发展的
- RFC 1661, 1662, 1663, 2153
    - Frame Format: Delimeter(分隔符号) + checksum
    - Link Control Protocol(LCP) for 
        - Verbindungsauf-/abbau
        - test
        - Aushandlen von configuration
    - Network Control Protocol(NCP) for
        - 支持的第三层协议（如IP、IPX、Appletalk......）的配置协商，通过PPP链接可能有不同的第三层协议
- 每个 partner 都能请求 配置 的 LCP Aushandlung 的 认证, 认证协议:
    - Password Authentication Protocol ([[#PAP]])  
    - Challenge-Handshake Authentication Protocol ([[#CHAP]])  
    - Extensible Authentication Protocol ([[#EAP]])

#### PAP
- Password Authentication Protocol
- RFC 1334
- 不安全的协议, 认证实体知道所有 ID 和 密码, 客户端以明文发送 ID 和密码
- RFC 1334: 应该优先使用更安全的方法(比如CHAP)

#### CHAP
- Challenge-Handshake Authentication Protocol
- RFC 1334, RFC 1994
- 通过 3-way-handshake 定义认证
    - ![[attachments/Pasted image 20230225104030.png|L|400]]
- 安全风险: PAP 回退
    - 用户不知道区别, 只要它能工作
    - 中间人攻击: 伪装成仅 PAP 服务器, 接受明文密码

#### EAP
- Extensible Authentication Protocol
- RFC 3748, RFC 5247
- 是一个认证框架, 提供了通用方法, 支持大约40种协商技术
    - EAP-MD5 (=CHAP)
    - EAP-OTP (One-Time-Password)
    - EAP-GTC (Generic Token Card)
    - EAP-TLS
    - EAP-SIM (全球通信系统GSM(Global System for Mobile Communication) 的用户验证模块SIM(Subscriber Identity Model))

### Point-to-Point Tunneling Protocol(PPTP)
- PPP 需要物理连接, 而 PPTP 就是想做一个在互联网上用的 PPP
- 自 WIN95 以来最易于配置的 VPN协议
- Client 与 Remote Access Server(RAS) 自愿连接 (Voluntary Tunneling)
- 使用 Generic Router Encapsulation Protocol (GRE) 传输 PPP PDU
    - PPP Protocol Data Unit (PPP PDU)
    - GRE 是个 Layer 4 协议
- 微软开发, RFC2637, 作为 RAS 的一部分
- 微软改进: PPTP v2 und MS-CHAPv2

##### MS-CHAPv2
![[attachments/Pasted image 20230225132253.png|L|500]]
- 依赖好的用户密码
- 没有对攻击做综合防御措施
- 有更好的选择(但微软没用)
- 因为向下兼容, 可能被恶意软件强制回滚v1来攻击

### IEEE 802.1x
![[attachments/permanent/IEEE 802.1X#IEEE 802.1X 家族]]

![[attachments/permanent/IEEE 802.1X#协议中的角色]]

![[attachments/permanent/IEEE 802.1X#协议流程]]

### WLAN

#### IEEE
![[attachments/WiFi 技术#WiFi IEEE 标准]]

#### Fachbegriff
- Dualband-AP: 指 2.4GHz 和 5GHz 双频
- Access Point(AS): WLAN 入口点
- Station(STA): 有 WLAN配置 的设备
- Basic Service Set(BSS): 一组同频段的 STA
- Extended Service Set(ESS):
    - 多个 BSS 组成的逻辑网络
    - 通过 SSID 识别
- Portal: 与其他网络的接口

##### Infrastructure Mode
- AP, STA, BSS, ESS
- ESS 通过 DSS(Distribution System) 搭建
- ![[attachments/Pasted image 20230225202140.png|L|200]]


##### Ad-Hoc Mode
- 不需要 AP
- 所有 STA 权力平等
- 以 BSS 为基础, BSS 之间不能通信
- ![[attachments/Pasted image 20230225202410.png|L|150]]
#### WLAN 安全技术
安全要求:
- 参与者的认证
- 网络的访问控制(Autorisierung)
- 数据的 Confidentiality, Integrity
具体技术:
- Wired Equivalent Privacy([[#WEP]])
- WiFi Protected Access([[#WPA]])
- WiFi Protected Access 2([[#WPA2]])
- IEEE 802.11i
- WiFi Protected Access 3([[#WPA3]])

#### WEP
加密
- PRNG Pseudo Random Number Generator
![[attachments/Pasted image 20230227125701.png|L|400]]

解密
![[attachments/Pasted image 20230227125735.png|L|400]]

安全问题
- CRC32 在现在看来不能保证 [[#Integrity]]
- 可能的攻击: Traffic Injection, "Breaking 104-bit WEP in less than 60 seconds"
- **不安全, 不要用**

#### WPA
- 使用了 TKIP
- 密钥层次高->低: PMK, PTK, TK
    - Pairwise Muster Key
    - Pairwise Transient Key
    - Temporal Key
    - 通过上层密钥计算得到下一层密钥, 如果上层被攻破, 那下几层都被攻破了
- 还有一个 Pre-share Key, 也就是显示中的 wifi密码
- ![[attachments/Pasted image 20230227130319.png|L|500]]
- ![[attachments/Pasted image 20230227130430.png|L|500]]
- 别用, **不安全**!

#### WPA2
- CCMP 取代 TKIP
- AES 取代 RC4
- 目前是安全的, 在设备上强制标注(和WiFi标签一起)

#### WPA3
- 2018, 作为 WPA2 的补充

## Netzsicherheit-Schicht 3

### IPSec
- 在 IP 和 TCP 包之间起作用
- 作用
    - 验证 [[#Integrity]]
    - 认证 
    - 预防重放攻击

#### Transport Mode / Tunnel Mode
- AH 和 ESP 都有两种模式
- 如果需要通过 Gateway, 用 Tunnel 模式
    - ![[attachments/Pasted image 20230227131501.png|L|400]]

#### IP Authentication Header
- ![[attachments/Pasted image 20230227131820.png|L|500]]

#### IP Encapsulating Security Payload
- ![[attachments/Pasted image 20230227131910.png|L|500]]

### IKEv2
目标
- 产生IPSec所需的密钥材料
- 在IKE中已经对另一方进行了认证(不仅仅是在IPSec中)

#### Diffie-Hellman 密钥交换
- 一种安全的, 通过不可信通道交换密钥的方式
1. 选择质数 p(通常在几百以上), 质数 g(primitive Wurzel g (mod p)), 这两个是公开的
2. ![[attachments/Pasted image 20230227144404.png|L|400]]

#### IKE_INIT
- 用来建立一个双向的 IKE SA
- ![[attachments/Pasted image 20230227144722.png|L|500]]

#### IKE_AUTH
- 认证, 并建立第一个 IPSec SA
- ![[attachments/Pasted image 20230227144947.png|L|500]]
- ![[attachments/Pasted image 20230227145136.png|L|500]]

#### IKE_CHILD_SA
- 接下来的 IPSec SA
- rekey
- ![[attachments/Pasted image 20230227145016.png|L|500]]
