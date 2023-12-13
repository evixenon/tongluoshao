---
title: Java电商
date: 2023-12-04
tags:
  - Java
  - 服务器
---
## 导学&资料
#### 一个大型电商的架构
![[attachments/Pasted image 20231204162540.png]]
- 还有一些看不到的, 如高并发, 容灾


[找工作的季节之简历及找工作的分享_慕课手记](https://www.imooc.com/article/19998)

[《Java从零打造企业级电商实战-服务端》思维导图&amp;知识点索引&amp;温馨tips_慕课手记](https://www.imooc.com/article/20193)

[happymmall课程QQ群分享手记_慕课手记](https://www.imooc.com/article/19094)

[happymmall课程QQ群分享手记_慕课手记](https://www.imooc.com/article/19094)
#### 邮箱注册验证的思路
数据库表设计：  
**账号ID，邮箱，生成的随机激活Key，有效验证时间**

发送邮件（SMTP协议之类，邮件格式为HTML），  
附带一个A标签的链接地址：  
**[http://XXX.XXX.XXX/XXX.XXX?id=](https://link.segmentfault.com/?enc=0OIXMSJgp3NmVEtlWW5xnA%3D%3D.qpRIdLH2PPUoqCn0JJAn2wLjboRlXoQLo4BuyHJP8%2Bw%3D)账号ID&key=特定的Key**

用户点击链接，后端代码处理：  
**验证时间、ID、Key是否有效，将邮箱保存到用户的信息表里去，完成。**

在数据库设一个 status, 验证前是锁定的, 验证后邮箱可以使用
[链接](https://segmentfault.com/u/superadmins)

#### 大型项目架构演进
推荐书: 大型网站技术架构核心原理与案例分析
[大型项目架构演进过程及思考的点_慕课手记](http://www.imooc.com/article/17545)

1. all in one 服务器, 包括 app, file, database 都放一个
2. 拆分服务器, app 的服务器性能强点, 数据服务器容量大点
3. 增加缓存服务器, app 的本地缓存
4. 增加负载均衡调度服务器
5. Session管理, 方案:
    1. Session Sticky 粘滞会话
    2. Session 复制
    3. Cookies
    4. Session 服务器              
6. 数据库读写分离
7. 反向代理和 CDN
8. 分布式文件系统
9. 数据垂直拆分, 专库专用, 如 Products, Users
10. 数据水平拆分, Users 拆成 User1, User2
11. 拆分搜索引擎

## 环境配置

####  jdk

#### tomcat

[Apache Tomcat® - Apache Tomcat 10 Software Downloads](https://tomcat.apache.org/download-10.cgi)


环境配置
- 环境变量, CATALINA_HOME 设成 tomcat 根目录
- path, `%CATALINA_HOME%\bin\`

中文乱码
- /conf/server.xml  Connector port="8080" 的位置, 加上 URIEncoding="UTF-8"
    - ![[attachments/Pasted image 20231204183419.png]]

日志乱码
- /conf/logging.properties 
    - ![[attachments/Pasted image 20231204185205.png]]

#### maven 安装配置
[[permanent/Maven 安装配置|Maven 安装配置]]

项目里说到的 Settings 是 `/conf/settings`

#### FTPserver

这个似乎是个私人小软件, 不是 Apache 的 FTPserver

MS Edge, Firefox, Chrome 都不支持 ftp 了, 现在要用 File Explorer 访问 ftp

#### Nginx
[[private/Nginx|Nginx]]

win 直接下载压缩, 在 `/drivers/etc/host` 配置 host