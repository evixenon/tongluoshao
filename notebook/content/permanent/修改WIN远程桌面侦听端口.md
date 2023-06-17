---
title: "修改WIN远程桌面侦听端口"
date: "2023-06-15"
tags:
- WIN
- 服务器
---

默认是 3389
- 改 注册表 port number 项
    - 改注册表 `计算机\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp`
    - 也有说`计算机\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Terminal Server\Wds\rdpwd\Tds\tcp` 也要改的（测试也是改了才行）
- 防火墙添加入站规则
    - firewall 高级设置， 新建入站规则，改成新改的端口
    - 脚本 [[permanent/bat 创建防火墙入站规则|bat 创建防火墙入站规则]]