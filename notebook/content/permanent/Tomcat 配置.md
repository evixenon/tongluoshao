---
title: Tomcat 配置
date: 2023-12-26
tags:
---

#### 环境变量配置
- 环境变量, CATALINA_HOME 设成 tomcat 根目录
- path, `%CATALINA_HOME%\bin\`

#### 中文乱码
- /conf/server.xml  Connector port="8080" 的位置, 加上 URIEncoding="UTF-8"
    - ![[attachments/Pasted image 20231204183419.png]]

#### 日志乱码
- /conf/logging.properties 
    - ![[attachments/Pasted image 20231204185205.png]] 10 版本: 改成 UTF-8
