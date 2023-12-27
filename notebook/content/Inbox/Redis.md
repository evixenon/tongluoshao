---
title: "Redis"
date: "2023-08-04"
tags:
---

> REmote DIctionary Server(Redis) 是一个由 Salvatore Sanfilippo 写的 key-value 存储系统，是跨平台的非关系型数据库。

> Redis 是一个开源的使用 ANSI C 语言编写、遵守 BSD 协议、支持网络、可基于内存、分布式、可选持久性的键值对(Key-Value)存储数据库，并提供多种语言的 API。

> Redis 通常被称为数据结构服务器，因为值（value）可以是字符串(String)、哈希(Hash)、列表(list)、集合(sets)和有序集合(sorted sets)等类型。

以上来自[Redis 教程 | 菜鸟教程](https://www.runoob.com/redis/redis-tutorial.html)



## 入门

Redis 默认 port 6079
#### WIN 安装
[Releases · tporadowski/redis](https://github.com/tporadowski/redis/releases)

#### 常用命令

- KEYS 查看符合模板的key
- DEL 删除 key
- EXISTS 查看 key 是否存在
- EXPIRE 设置 key 有效期
- TTL 查看剩余有效时间

#### key 的前缀

比如
![[attachments/Pasted image 20230804143747.png]]
