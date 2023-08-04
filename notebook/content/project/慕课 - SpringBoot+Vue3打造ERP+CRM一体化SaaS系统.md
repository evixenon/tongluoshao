---
title: "慕课 - SpringBoot+Vue3打造ERP+CRM一体化SaaS系统"
date: "2023-08-03"
tags:
---

## 介绍和基础

#### 标题的这几个缩写是什么
[[permanent/SaaS|SaaS]]

[[permanent/CRM|CRM]] => 增加销售额

[[permanent/ERP|ERP]] => 降低成本

#### 设计方案

前端
- npm: node包管理
- vue-cli: 脚手架工具, 生成框架
- vue-router: 前端路由工具
- vuex: 状态管理工具, 管理数据交互和重用
- element-ui: 前端 UI 组件
- axios: 网络请求库
- 等

后端
- Spring Boot
- Spring Security + Jwt
- MyBatis: 持久层
- Redis: 缓存
- Mysql: 数据库
- oshi

数据库
- master 库: 主数据库, 在结构上保持稳定
    - master_tenant 表
    - log 表
- tenant 库: 每个tenant 生成一个(应该指订阅这个系统的用户)
    - system 表
    - crm 表 1+
    - erp 表 1+

SaaS 系统
1. 注册 + 初始化
2. 独立数据库
3. 数据源切换

## 流程化搭建开发环境

##### Java
[[private/Java 的环境配置|Java 的环境配置]]

##### node.js+npm
[[private/node.js 的环境配置|node.js 的环境配置]]

##### vue, vue-cli
然后 
```
npm install -g vue
npm install -g @vue/cli
```

两个都装好后 vue --version 验证

##### postman
建议安装: postman 用于调试 API

##### mysql
下载 mysql installer for WIN: [MySQL :: MySQL Community Downloads](https://dev.mysql.com/downloads/)

安装 MySQL server 8.0, 点击加到右边的项可以自定义安装地址

选 server computer
![[attachments/Pasted image 20230804141231.png]]

验证: mysql -u root -p

##### Redis
[Releases · tporadowski/redis](https://github.com/tporadowski/redis/releases)

配置环境变量
##### maven

[[private/maven 安装配置|maven 安装配置]]

maven 是一个插件框架

maven-source-plugin
![[attachments/Pasted image 20230804151847.png]]

maven-compiler-plugin, 用来编译源码, 通常只用设置版本
![[attachments/Pasted image 20230804151915.png]]

spring-boot-maven-plugin, springboot打包 jar 包
![[attachments/Pasted image 20230804152028.png]]

资源配置
![[attachments/Pasted image 20230804152044.png]]

maven-surefire-plugin, 单元测试
![[attachments/Pasted image 20230804152107.png]]

![[attachments/Pasted image 20230804152136.png]]

[[private/maven 常见命令|maven 常见命令]]

