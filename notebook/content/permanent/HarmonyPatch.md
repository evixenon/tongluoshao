---
title: "HarmonyPatch"
date: "2023-06-16"
tags:
- C#
- Modder
- Unity
---

[官方文档](https://harmony.pardeike.net/articles/patching.html)

### Prefix
- 主要用于跳过原函数, 修改传入值
- prefix 中的参数还可以传递给 postfix

使用时需要额外定义一个形参 `ref 原函数返回类型 __result` , 用来接受返回值. 而 prefix 函数 return 一个 布尔值(true 表示执行完 prefix 后继续执行原函数, false 表示跳过原函数)

实例:
> F:\\VSProjects\\evixenon_taiwu_mods\\JieYiMatchmaker\\JieYiMatchmakerFrontend

