---
title: WIN 注册表
date: 2023-06-14
tags:
  - WIN
---
### 标题

#### CLSID
发现那些奇怪代码似乎都是 CLSID, 在这个位置
`\HKEY_CLASSES_ROOT\WOW6432Node\CLSID`

### 关于右键菜单
#### 项
项的值
- MUIVerb 是显示名
- icon
- SubCommands 有这项说明是级联菜单
    - 子项建一个 shell, 再子项才是菜单里的项
- AppliesTo 只对某些文件显示此项
    - (System.ItemType:png) OR (System.ItemName:image)
- 子项 command 默认值为执行指令

%1 //为你选中的所有文件中的第一个文件路径 
%* //为你选中的所有文件的所有文件路径
#### 位置
```shell
// 文件右键
HKEY_CLASSES_ROOT\*
// 文件夹右键
HKEY_CLASSES_ROOT\Directory
// 桌面右键
HKEY_CLASSES_ROOT\Directory\Background
```

#### 清理右键菜单
```shell
// 选中文件夹时
reg delete HKEY_CLASSES_ROOT\Directory\shellex\ContextMenuHandlers\xxx /f
// 选中非文件夹时
reg delete HKEY_CLASSES_ROOT\*\shellex\ContextMenuHandlers\xxx /f
pause
```

dism++ 可以禁用不要的系统功能

[去掉不用的右键菜单 - 知乎](https://zhuanlan.zhihu.com/p/57176783)


#### 在桌面右键菜单添加关闭屏幕
```reg
Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\Directory\Background\shell\Turn off Monitor]
"Icon"="C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe"

[HKEY_CLASSES_ROOT\Directory\Background\shell\Turn off Monitor\command]
@="C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe -WindowStyle Hidden -Command \"(Add-Type '[DllImport(\\\"user32.dll\\\")]public static extern int SendMessage(int hWnd,int hMsg,int wParam,int lParam);' -Name a -Pas)::SendMessage(-1,0x0112,0xF170,2);\""
```