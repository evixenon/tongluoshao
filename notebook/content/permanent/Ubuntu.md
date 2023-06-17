---
title: "Ubuntu"
date: "2023-06-14"
tags:
---

#### Ubuntu 开放端口
- https://www.cnblogs.com/kxm87/p/9561054.html
- 安装
    在终端输入
- >sudo apt-get install iptables
- 添加规则
    在终端输入
- >iptables -I INPUT -p tcp --dport 80 -j ACCEPT
- 中间的80为所需要开放的端口
- 保存规则
    在终端输入
- >iptables-save
- **持久化规则**
- 这里我们需要在安装一下工具来帮我们实现，这里我们使用 iptables-persistent
- 安装iptables-persistent
- >sudo apt-get install iptables-persistent
- 持久化规则
- >sudo netfilter-persistent save
  sudo netfilter-persistent reload