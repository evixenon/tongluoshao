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

[[permanent/Tomcat 配置|Tomcat 配置]]
#### maven 安装配置

[[permanent/Maven 安装配置|Maven 安装配置]]

项目里说到的 Settings 是 `/conf/settings`
#### FTPserver

这个似乎是个私人小软件, 不是 Apache 的 FTPserver. 开箱即用

MS Edge, Firefox, Chrome 都不支持 ftp 了, 现在要用 File Explorer 访问 ftp

#### Nginx
[[private/Nginx|Nginx]]

win 直接下载压缩, 在 `/drivers/etc/host` 配置 host

在 `conf.d/*.conf` 下配置单个文件

##### image 配置(目录转发型)

配置 conf
![[attachments/Pasted image 20231221184047.png]]

在 hosts 添加 二级域名

在 win 下需要修改各路径, 注意用反斜杠


##### tomcat 配置(端口转发型)

![[attachments/Pasted image 20231221200444.png]]

然后启动 tomcat

##### 文件服务器搭建

根据以上两种 nginx 配置, 加上 apache 的一些 ftp 文件上传 API

![[attachments/Pasted image 20231225223111.png]]

#### MySQL 安装配置

Linux: 安装, 字符集配置, 自启动, 防火墙
Windows: 下载安装, 字符集配置

[[permanent/MySQL#安装和初配置|MySQL#安装和初配置]]

项目用的 MySQL 5.1.73

```sql
/* 本地用户赋予所有权限 mmall.* 是指这个数据库下所有 table */
grant all privileges on mmall.* to yourusername@localhost identified by 'yourpassword';
```

![[attachments/Pasted image 20231225230739.png]]


## 数据表设计

没有使用外键和触发器, 因为拓展修改和数据清洗麻烦

![[attachments/Pasted image 20231225234713.png]]

![[attachments/Pasted image 20231225231216.png]]
- 倒数第二句, 把 username 设为唯一索引

![[attachments/Pasted image 20231225231821.png]]

![[attachments/Pasted image 20231225231837.png]]
- text 比 varchar 长很多, 如果作了 url 长度限制, 也可以用 varchar

![[attachments/Pasted image 20231225232259.png]]
- 一项应该是某个用户购物车里的一条商品信息
- 加了 user_id 的索引来提高效率

![[attachments/Pasted image 20231225232427.png]]

![[attachments/Pasted image 20231225232658.png]]
- shipping_ip 对应订单的收货地址表id 

![[attachments/Pasted image 20231225232930.png]]
- 这里的商品名称和图片起到一个快照的作用

![[attachments/Pasted image 20231225233440.png]]

## 项目初始化

### 项目初始化
IntelliJ 需要配置 JDK, Maven, tomcat

[[permanent/Maven 安装配置|Maven 安装配置]] 沿用了 erpcrm 的 settings

创建项目
- 用 maven 的 archetype `org.apache.maven.archetypes:maven-archetype-webapp`
- 创建好了在 main 目录下创建 java 目录并标记成 src root; 在 src 下创建 test/java 标记为 test root

然后在 `Run/Debug Configuration` 增加 tomcat server 配置
- 如果没有找到要先装 plugin
- 选择 tomcat 根目录
- 端口改成了 8088
- run, 然后 8088 就可以看到 hello world 了. 此时还能在 `\webapps\ROOT` 看到 `index.jsp` ([[permanent/JSP|JSP文件]])

### Git 配置

在 github 创建一个仓库


在本地项目创建 readme.md 和 .gitignore

```gitignore
*.class

# package file
#*.jar
*.war
*.ear

# kdiff3
*.orig

# maven
target/

# eclipse
.settings/
.project
.classpath

# IntelliJ IDEA
.idea/
/idea/
*.ipr
*.iml
*.iws

# temporary file
*.log
*.cache
*.patch
*.diff
*.tmp

# system
.DS_store
Thumbs.db
```

[[permanent/Git#将本地仓库上传到 remote|Git#将本地仓库上传到 remote]]

然后创建一个新的分支用于开发, 并推送分支到远程`git push origin HEAD -u`
### 数据库初始化
教程用的 Navicat, 太贵了, 我用的 DBeaver

mmall.sql 文件可以在慕课的代码仓库找到

我的 3306 是一个 8.0, 3307 是一个 5.7

这个项目用在 5.7
