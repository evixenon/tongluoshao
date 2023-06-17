---
title: "dig"
date: "2023-06-16"
tags:
- 工具使用
- 安全
---

dig  Domain Information Groper 域信息搜索器

## 安装
[下载地址](https://www.isc.org/download/) 可能需翻墙
win 最高支持到 9.16.30 [下载地址](https://downloads.isc.org/isc/bind9/9.16.30/BIND9.16.30.x64.zip)

## 命令

#### spamlist 查询 
> dig +short 2.0.0.127.zen.spamhaus.org
127.0.0.4
127.0.0.10
127.0.0.2

回复 127.0.0.0/24 表明 IP 在 Blocklist

