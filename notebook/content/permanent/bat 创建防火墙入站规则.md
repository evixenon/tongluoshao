---
title: "bat 创建防火墙入站规则"
date: "2023-06-16"
tags:
- 工具使用
- WIN
---

[教程来源](https://blog.csdn.net/m0_43605481/article/details/125772820)

```bat
@echo off
netsh advfirewall firewall show rule name=rdp4413 >nul
echo ...检查规则是否存在
if not ERRORLEVEL 1 (
	echo ...同名规则已存在, 按任意键继续, 否则请关闭脚本
	pause
	netsh advfirewall firewall delete rule name=rdp4413 >nul
	echo ...删除原有规则
)
echo ...创建新规则
netsh advfirewall firewall add rule name=rdp4413 dir=in action=allow protocol=TCP localport=4413
echo ...创建完成
pause
```