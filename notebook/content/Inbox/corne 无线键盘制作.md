---
title: corne 无线键盘制作
date: 2023-10-04
tags:
---

### zmk 部分

#### 安装
官方: [Installing ZMK | ZMK Firmware](https://zmk.dev/docs/user-setup)

首先, 在 github 上创建一个空 repo, 什么都不要有, 不要 `README` 不要 `License` 不要 `.gitignore`.

然后在本机选择一个位置合适的文件夹, 作为本地 git 仓库的位置

用管理员打开 powershell, 运行:
```powershell
powershell -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://zmk.dev/setup.ps1'))"
```

如果出现以下提示:
```
Sorry, you do not have write permissions in this directory.
Please try running this script again from a directory that you do have write permissions for.
```

则尝试先执行这条, 再重新运行命令
```powershell
icacls [当前文件夹路径] /grant "Everyone:(w)"
```

然后得到
![[attachments/Pasted image 20231004204843.png]]

按照指示选择你有的设备. Nologo 的 nrf52840 的板子选 nice_nano_v2
![[attachments/Pasted image 20231004210146.png]]

输入无误回车, 就可以看到 github 远程仓库已经有内容了
![[attachments/Pasted image 20231004210415.png]]

切换到 Actions tab, 会看到有个正在运行的 workflow, 等待它完成.
![[attachments/Pasted image 20231004224212.png]]

点进这个 workflow, 在 summary 页的下方会找到一个 firmware.

![[attachments/Pasted image 20231004224332.png]]

这是 ZMK 自动生成的默认键位的固件, 下载下来是一个压缩包, 里面是两个 .uf2 文件. 

`config/corne.keymap` 后者是布局文件, 可以自行修改. 修改后 push 到 远程仓库, 就会重新 build 固件. 

![[attachments/Pasted image 20231004225522.png]]

### 刷固件

Nologo 的板子连上电脑, 0.5s 内短接两次 `RST` 到 `GND`, 就会进入 bootloader, 直接把固件复制进板.

验证是否刷写成功, 可以有线连接并打开[在线键盘测试 | zFrontier 装备前线](https://www.zfrontier.com/lab/keyboardTester), 然后短接几个普通口, 比如 `p1.00` 和 `p0.29` 会触发 z 键. 注意碰 `RST` 会重置.


### 先放着
[浅谈ZMK Firmware：蓝牙双模键盘入门级教程——环境搭建_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1HM4y1E7xB/?spm_id_from=333.788.recommend_more_video.-1&vd_source=92451653bea4ed324c9bfc0287256aa5)

### 焊接测试
行:
022 是 q 行
024 是 a 行
100 是 z 行

列:
031 是左起第1个
029 是左起第2个
002 是左起第3个
115 是左起第4个
113 是左起第5个
111 是左起第6个

焊好二极管后, 连上电脑, 两两短接就可以在[在线键盘测试 | zFrontier 装备前线](https://www.zfrontier.com/lab/keyboardTester)触发键位. 也可以用这个来检查有没有虚焊.