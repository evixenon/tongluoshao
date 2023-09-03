---
title: "WINTOGO & more"
date: "2023-08-07"
tags:
- 操作系统
---
## 硬件选购
### 首先要知道
电脑支持, 才能发挥最大, USB 3.0 接口旁应该有数字

USB 3 更名史
- USB 3.0 -> USB 3.1 Gen1 -> USB 3.2 Gen1: 5Gbps
- USB 3.1 -> USB 3.1 Gen2 -> USB 3.2 Gen2: 10Gbps
- USB 3.2 -> USB 3.2 Gen2x2: 20Gbps

### 硬盘盒
目前 100 价位的大多是 1000MB/s 读写速度, 也就是 USB 3.2 Gen2 能带满

建议金属外壳+风扇

9210B 在低负载下比 JMS 583 低温, 高负载时差不多
### 硬盘
避免 联芸1202, 英韧5236, 容易掉盘
钛颗粒联芸主控和联想不对付

有缓or无缓, PCIE3.0or4.0, 差距不太感知得到

### 选择的方案
itgz 硬盘盒里选个喜欢的, 硬盘用梵想 S690 或 S790, 不要用 S500(掉盘)

## 镜像

- itellyou.cn
- FirPE
## WINTOGO


### 参考链接
主参考, 除 edgeless 部分 [【详细教程】用ventoy打造超级8合一系统启动U盘同时塞入WinTOGO，PE，LinuxTOGO#1_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1gP41167qr/?spm_id_from=333.788.recommend_more_video.4&vd_source=92451653bea4ed324c9bfc0287256aa5) 

edgeless 部分, 虚拟机试运行 edgeless 部分参考[制作U盘中的「战斗盘」｜ Ventoy+WTG+Edgeless+PortableApps_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1KN411F7ct/?vd_source=92451653bea4ed324c9bfc0287256aa5). 注意虚拟机不能运行 win11

参考[【教程】打造2022年个人最强U盘！快闪U盘配ventoy，集成多个PE、wintogo、linuxtogo系统_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1pe4y127uX/?spm_id_from=333.788.recommend_more_video.0)

参考 [最强WinToGo教程！让系统随身携带，利用Ventoy引导多个PE、WinToGo_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1pe4y127uX/?spm_id_from=333.788.recommend_more_video.0&vd_source=92451653bea4ed324c9bfc0287256aa5) 大概一分多的操作, 直接在移动固态分盘

### NTFS版成功流程
1. 格盘
    1. 可以直接系统格盘, ntfs
    2. 也可以用 DiskGenius 硬盘工具, guid, ntfs
2. 制作 wintogo vhdx 文件
    1. wtga (5.6.0.0), 直接在移动硬盘/U盘里制作
    2. 虚拟磁盘模式, UEFI+GPT, 屏蔽本机磁盘可选可不选择 虚拟磁盘里手动设置大小, 分页 GPT, 不要勾选固定大小
3. 部署 wintogo
    1. 如果是 win8/win10, 应该可以用虚拟机启动, 方法是虚拟机硬件里磁盘用SATA-物理磁盘-选择对应的移动硬盘
    2. 如果是 win11, 还是直接重启吧, 进 bios, 启动对应的 系统
    3. 如果缺少驱动(尤其网卡驱动), 用 dism++ 在原系统里拷过去
    4. 部署好回到本机系统, 做好的 vhdx 文件从移动硬盘拷出来, 注意有两层, 拷里面的那个
4. 制作 ventoy+edgeless
    1. 直接用 edgeless-hub 这个工具, 自动下载 ventoy 工具
    2. ventoy 工具勾选安全启动支持, 分区选 GPT, 注意制作 ventoy 会格盘. 如果后面还想加 linux, 就留一段 16 GB 左右的空间
    3. 跟着引导选择做好的 ventoy 盘, edgeless 一键部署
    4. ventoy 盘建一个名叫 `ventoy` (大小写敏感)的文件夹, 把 wimboot.img, vhdboot.img, ventoy.json 放进去
5. 完成了 想要的话再用 FirPE 制作工具做个 FirPE 吧, 这个选 exFaT 好像没问题

pan.baidu.com/s/1F2C-30Y8gehXUG5w7bBWXA
