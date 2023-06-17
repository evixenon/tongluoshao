---
title: "2020 SolarWinds"
date: "2023-06-14"
tags:
- 恶意软件
---

### a. 研究并描述SolarWinds攻击的顺序 
1. 从 FireEye 获取 pentesting 软件
2. 用 pentesting 软件攻击 Orion
3. 在网管软件 Orion 的更新(可能是代码仓库)中植入木马
4. 用户下载 Orion 软件更新包后被植入木马


### b. 攻击者利用了哪些漏洞？为什么攻击会蔓延并在如此长的时间内未被发现？
- build 过程(Quellcode -> ausführbares Programm)
- "Sunburst" 特洛伊木马植入到更新, 并发布给用户
- 安静期(Ruhezeit)14天, 之后与 C&C 服务器联系

### c. 受攻击影响的公司如何恢复其正常的IT运作？ 
- 发布没有木马的更新 Neues Update den ohne Trojaner verteilt
- (完全清除了吗?只能防止已发现的木马继续发挥作用)

### d. 什么是供应链攻击(Supply-Chain-Attack)？ 
通过供应商Lieferanten(Zulieferer、Drittanbieter)或供应链 Lieferkette 访问受害者

### e. 什么预防或检测措施可以使这种攻击在未来更加困难？
- 难以发现，因为错误在于人们实际信任的所购软件。反病毒程序没有帮助，因为SolarWinds将其软件放在了病毒程序的白名单上 
- 要怀疑，即使是买来的软件也要怀疑! 
- 趋势：零信任的方法？
