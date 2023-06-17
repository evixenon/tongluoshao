---
title: "WIN 清理右键菜单"
date: "2023-06-14"
tags:
- WIN
---

```C
// 选中文件夹时
reg delete HKEY_CLASSES_ROOT\Directory\shellex\ContextMenuHandlers\xxx /f
// 选中非文件夹时
reg delete HKEY_CLASSES_ROOT\*\shellex\ContextMenuHandlers\xxx /f
pause
```

