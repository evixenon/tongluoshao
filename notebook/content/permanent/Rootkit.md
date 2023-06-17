---
title: "Rootkit"
date: "2023-06-16"
tags:
- 安全
---

#### Rootkit
= root + kit
不会自动传播, 也不会造成大范围攻击, 只是对系统的隐蔽通道

通常带有 [[permanent/Dropper|Dropper]], 即释放或下载另一个恶意软件的木马

#### Rootkit 的历史和典型案例
##### 第一代 Rootkits
第一代 rootkits 其实是内置 backdoor 的 UNIX 系统程序

**攻击流程**
1. 攻击者拿到 root 权限
2. 安装 rootkit
3. 清除入侵痕迹(logfile), 留下 root 入口
4. 第一代的 rootkits 是修改了的系统命令程序, 如 _ps, lw, top, du, find, netstat, passwd, sshd..._
5. 这些修改后的程序会隐藏攻击者的进程和文件

通过 Host-IDS 和工具(e.g. chkrootkit) 检测

##### 第二代Rootkits
动机：从攻击者的角度来看，单独替换所有系统程序既费时又容易出错.
新方法：修改操作系统内核→攻击者的文件、进程等被隐藏在所有系统程序之外

**LKM rootkits**
是一个可加载的内核模块, 在系统运行时被扩展. 在读取目录(隐藏文件)或访问进程列表(隐藏恶意软件)时发挥作业.
预防: 禁止重新加载内核模块
检测: 只从纯净系统启动(USB, CD)

**Sony BMG copy protection rootkit**
- win 程序, 植入了用于增强版权([[permanent/DRM]])的后门
- 将数据文件用 "\$sys\$" 伪装 (被后人模仿)

**Banker-Rootkit**
- disable 强制签名
- 安装了 文件管理系统驱动
- 伪造的 根证明 和 HOSTS 文件

##### 现代形式

**Hypervisor-level Rootkit**
- rootkit 接管整个系统, 原本的操作系统像虚拟机一样运行
- e.g. Blue Pill(2006)

**Bootkits**
- 攻击者用恶意软件替换原本的 Bootloader
- 通过完全加密的磁盘起到保护作用
- e.g. Evil Maid Attack, Stoned Bootkit, Alureon 

**Hardware-/Firmware-Rootkits**
- Rootkit 自行安装在例如 BIOS 或网卡的固件中
- e.g. DelugréNetXtreme Rootkit 2010

**难以实现可靠的检测**
- 一个方法是计时, 通过改变例如系统调用的持续时间来检测rootkit-virtualised环境(问题: 高FP)
- 外部分析(如从CD启动)

#### User-Mode/Kernel-Mode Rootkit
**User Mode Rootkit**![[attachments/Pasted image 20230116230548.png|inlineR|300]]
- 可作为 dll 附加到其他程序
- Ring3 权限
- 操纵安全设置

**Kernel Mode Rootkit**
- 最高权限
- 修改操作系统内核, 可能导致操作系统不稳定


#### Rootkit 的反取证措施
Anti-Forensik

**Data Destruction**
- 处置不再需要的组件/数据/痕迹
- 破坏取证工具所用的数据结构
- 溶解 .bat: 通过脚本从磁盘上删除二进制文件

**Data Concealment**
- 在特殊区域如系统卷信息主动隐藏
- 主动隐藏：安装成功好修改操作系统

**Data Fabrication**
- flooding 虚假和误导信息 -> 转移注意力