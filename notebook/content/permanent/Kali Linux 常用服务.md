---
title: "Kali Linux 常用服务"
date: "2023-06-14"
tags:
- Kali
---

1. HTTP (Web, Apache2)
用来建立本地服务器的
`service apache2 start/stop` 启/停
`systemctl status apache2.service` 查看状态
现在版本的 kali 似乎不会给 info
`update-rd.d apache2 defaults` 将服务加入开机自启动列表

2. MySQL
mysql
启动后如果要测试是否正常, 可以登录一下
`mysql –u root -p`

3. SSH
ssh