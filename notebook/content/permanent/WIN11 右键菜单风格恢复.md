---
title: "WIN11 右键菜单风格恢复"
date: "2023-06-14"
tags:
- WIN
---

#### 一个简单的 File Explorer 系恢复

1）切换回经典右键菜单

> _reg add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve_

2）恢复到新版右键菜单

> _reg delete "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}" /f_

重启文件管理器生效(重启电脑也可)


#### (推荐) Explorer Patcher
可以修改 File Explorer, Start Menu, Taskbar 等等的系统风格
项目:https://github.com/valinet/ExplorerPatcher

直接下载文件: (22.09.28)
https://github.com/valinet/ExplorerPatcher/releases/tag/22622.450.50.2_5de2eb0

双击exe安装, 安装后自动重启 File Explorer, `右键任务栏-属性` 修改样式