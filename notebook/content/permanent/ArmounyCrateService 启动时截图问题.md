---
title: "ArmounyCrateService 启动时截图问题"
date: "2023-08-03"
tags:
---


原因是启动时如果电脑非正常姿态放置, ACS 会禁用 \触控板, 于是向系统发送 `ctrl+win+f24`, 但因为我换了 ctrl和capslock, 变成了 win+f24, 不知道为什么就变成了截屏并保存到 图片/Screenshots. 在 ahk 里加了 
```
*f24::return
```

似乎无复发

关联: [[permanent/触摸板开关失效事件|触摸板开关失效事件]]