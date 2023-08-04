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

[[private/Java 的环境配置|Java 的环境配置]]

[[private/node.js 的环境配置|node.js 的环境配置]]

然后 
```
npm install -g vue
npm install -g @vue/cli
```

两个都装好后 vue --version 验证

建议安装: postman 用于调试 API