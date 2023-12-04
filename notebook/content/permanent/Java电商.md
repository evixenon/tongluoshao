---
title: Java电商
date: 2023-12-04
tags:
---
## 导学
#### 一个大型电商的架构
![[attachments/Pasted image 20231204162540.png]]
- 还有一些看不到的, 如高并发, 容灾

####
数据库表设计：  
**账号ID，邮箱，生成的随机激活Key，有效验证时间**

发送邮件（SMTP协议之类，邮件格式为HTML），  
附带一个A标签的链接地址：  
**[http://XXX.XXX.XXX/XXX.XXX?id=](https://link.segmentfault.com/?enc=0OIXMSJgp3NmVEtlWW5xnA%3D%3D.qpRIdLH2PPUoqCn0JJAn2wLjboRlXoQLo4BuyHJP8%2Bw%3D)账号ID&key=特定的Key**

用户点击链接，后端代码处理：  
**验证时间、ID、Key是否有效，将邮箱保存到用户的信息表里去，完成。**

在数据库设一个 status, 验证前是锁定的, 验证后邮箱可以使用
[链接](https://segmentfault.com/u/superadmins)