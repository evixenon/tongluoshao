---
title: "IEEE 802.1X"
date: "2023-06-16"
tags:
- 计网
- 协议
---

- 局域网部分

#### IEEE 802.1X 家族
- 802.1Q Virtual Bridged LANs (VLAN)  
- 802.3 CSMA/CD (Ethernet)  
- 802.5 Token Ring  
- 802.6 Metropolitan Area Network  
- 802.11 Wireless LAN  
- 802.15 Wireless PAN (Personal Area Network)  
- 802.15.1 Bluetooth

#### 协议中的角色
- Supplicant
- Authenticator: Supplicant 希望连接的设备
- Authentication Server: 执行认证的设备 e.g.RADIUS-Server mit LDAP-Backend
- Port-Access-Entity(PAE): Supplicant 所连接的端口
    - uncontrolled port: 允许设备认证
    - controlled port: 允许经过身份验证的设备与 LAN 通信

#### 协议流程
- 可能的流程： 
    1. Supplicant请求受控端口 
    2. Authenticator请求认证 
    3. 认证成功后，端口被激活
- Supplicant 或 authenticator 可以发起认证
- 802.1X 没有定义自己的安全协议，而是使用现有协议：
    - 可扩展身份验证协议 (EAP) \[RFC 3748] 用于设备身份验证
    - EAP-TLS \[RFC 5216] 例如协商会话密钥
    - RADIUS 作为 AAA 协议 (Authentication, Autorization, Accounting)