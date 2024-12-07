---
title: 打造过保护 CE - Bili
date: 2024-08-24
tags:
---

### 环境
- ce 源码(github)
- 在 github 说明里找到 lazarus 的下载页面链接, 两个都下载下来
- vs c++ 桌面开发环境, .net v142mfc
- wdk 和 sdk
- 还装个 vm ubuntu?

### lazarus 修改
- 同名 .lpi
- f12 ui修改 (不知道为什么不生效)
- project options 改版本号, 应用名, 构建选项选64位
- 应用名在 MainUnit2 单元 CEnorm, find f3 下一个

随机名称
![[attachments/Pasted image 20240824214940.png]]

### 驱动过保护
- 工程 unit, DBK32Function 文件, 把 `dbk32.sys` `dbk64.sys` 改成别的名字, 旁边的 service name 也改掉
- 打开 DBKkernel.sln, 平台选 x64, Debug 改成 Release without sig
- DBKkernel 的项目属性里, 目标文件名改成刚刚改的
    - 生成事件-生成后事件, 把命令行的签名删掉
    - Driver signing, 测试签名关掉或者自己弄个签名
- DBKkernel.sln, 文件里, Driver Files, DBK64.inf, 把当前文档所有的 dbk64 字符串替换
- 编译(生成)(出错: Window7 is not supported system)
