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

安装 MySQL server, 点击加到右边的项可以自定义安装地址. 示范项目用的是5.7.21

选 server computer
![[attachments/Pasted image 20230804141231.png]]

验证: mysql -u root -p

##### Redis
[Releases · tporadowski/redis](https://github.com/tporadowski/redis/releases)

配置环境变量

##### maven

[[permanent/Maven 安装配置|Maven 安装配置]]

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

[[permanent/Maven 常见命令|Maven 常见命令]]

IntelliJ 项目设置里 show members 可以看到类的成员, ctrl+e 最近文件, settings-file encoding 全部改 utf-8

IntelliJ 插件
- grep console, 配置日志颜色
- GsonFormatPlus, 方便处理 gson
- jadx 反编译
- alibaba java coding, guidelines, 代码规范
- codeglance, 右侧代码预览缩略图
- MyBatisX, mapper 和 xml 之间跳转
- MyBatisCodeHelperPro, 协助生成 dml 语句

## 数据库设计开发

### 理论
#### 数据库设计步骤
- 需求分析
- 概念结构设计
- 逻辑结构设计
- 物理结构设计: 选择最合适的数据结构
- 数据库实施
- 运行和维护

#### 为属性创建索引
- B+ 树索引: 如果属性经常出现在搜索条件中, 或聚合函数中(max, min), 考虑为属性创建 B+ 索引
- hash 索引: 属性经常出现在等值连接
- 聚簇 索引: 为了提高某个属性组的查询速度, 把具有相同值的条目

### 开发

#### PowerDesigner
[PowerDesigner 安装+汉化+破解+使用过程 - 沦陷 - 博客园](https://www.cnblogs.com/huangting/p/12654057.html)
也许是原版: [PowerDesigner安装教程（含下载+汉化+破解） - 付杰博客](https://www.fujieace.com/software/powerdesigner.html)

## COMMON

### 介绍
4-1、下载代码，并进行启动，注册租户，并登录  
4-2、父子工程是什么意思？思考如果自己搭建，基本流程和注意事项是什么！  
4-3、spi机制原理是什么？  
4-4、@ConfigurationProperties注解核心原理是什么，如何应用？  
4-5、请阐述一下常量的命名规则！  
4-6、@InitBinder注解的作用是什么？思考如何更有效的应用  
4-7、Entity的作用是什么？  
4-8、自己梳理一下注册和登录的流程  
4-9、cod、data、message来存放什么信息？  
4-10、邻接表的优缺点是什么？  
4-11、请手动梳理TableSupport的逻辑流程  
4-12、手动梳理RedisCache的重点逻辑  
4-13、什么是字符集？思考字符集和字符编码的区别  
4-14、Converter接口怎么定义的？  
4-15、不看源码，自己手动编写字符串格式方法  
4-16、如何比较两个枚举成员定义的顺序？  
4-17、自己手动梳理全局异常定义的方法步骤


#### 示例启动

##### 启动 redis
在 redis 目录, cmd, redis-server

如果没有字符图形也就是失败了, 就运行
```
redis-cli
shutdown
exit
redis-server.exe redis.windows.conf
```

##### 第一次时: 数据库初始化
```sql
mysql -u root -p 密码
source xxx.sql;
```
运行 sql 目录的数据库脚本, 注意先选择对应的库. 出现中文乱码, cmd 里先跑 chcp 65001 再进 mysql

![[attachments/Pasted image 20231019204508.png]]

ryt_nelub7xr -> 测试租户 tenant4 -> admin root1234
ryt_5rbg03bq -> 主数据库管理的业务数据库 super admin

##### 后端启动
![[attachments/Pasted image 20231019204854.png]]

##### 前端启动
前端项目是 erp-crm-ui, 需要 npm, vue 相关环境

启动: IJ 打开项目, npm run dev
build: IJ 打开项目, npm run build:prod

然后自动打开浏览器

### 父子工程创建
![[attachments/Pasted image 20231023222156.png]]

如果 pom.xml 被忽略
![[attachments/Pasted image 20231023222211.png]]

### SprintBoot

#### SprintBoot 简介
![[attachments/Pasted image 20231023222607.png]]
2-直接集成到 tomcat 等
![[attachments/Pasted image 20231023222709.png]]
![[attachments/Pasted image 20231023222810.png]]
![[attachments/Pasted image 20231023222819.png]]

#### maven 项目改造为 SpringBoot 项目
就是在父工程的 xml 文件里添加 SpringBoot 相关的依赖

![[attachments/Pasted image 20231023223212.png]]
- 其中 type 行意指 pom 文件会指明依赖的 jar 包
- scope import 配合 type pom, 打破单继承. SprintBoot 官方的使用推荐是继承 父pom, 但如果有其他 父pom 又要使用 SprintBoot, 就可以以这种方式打破

还要引入
![[attachments/Pasted image 20231023223736.png]]

关注这两个类:
![[attachments/Pasted image 20231023223932.png]]
![[attachments/Pasted image 20231023224042.png]]
- scanBase 指定根目录
- exclude 在多数据源的时候排除, 以手动指定数据源

![[attachments/Pasted image 20231023224351.png]]

![[attachments/Pasted image 20231023224500.png]]

![[attachments/Pasted image 20231024185932.png]]
application.yml 是主配置文件

4-5

![[attachments/Pasted image 20231024185746.png]]
使 devtools 配置和热加载用同一个加载器

### 配置
#### 怎么读取项目配置
- common 模块
- ![[attachments/Pasted image 20231024190149.png]]
- ConfigurationProperties 注意前缀
- ErpCrmConfig 类的变量名要和 application.yml 中的属性并保持一致

#### 常量
- 项目名小写
- 包名小写
- 类名大写开头驼峰
- 方法名小写开头驼峰
- 常量大写

项目中的常量定义在 common.constant

#### initBinder
由 `@initBinder` 修饰的方法用于初始化 `WebDataBinder` 对象

用 request `@RequestParam` 或 `@PathVariable` 修饰的方法获取参数后, 如果参数类型不匹配, WebDataBinder 可以处理

例如前台传来的日期字符串转换为 Date 类型

#### BaseController
这是作为控制类的基类

关于防 sql 注入
```Java
String orderBy = SqlUtil.escapeOrderBySql(pageDomain.getOrderBy());
```