---
title: Linux 系统
date: 2025-05-23
tags:
  - Linux
---
#t# Linux 文件系统

linux 一切皆文件. dir 也是文件.
通常使用的是 ext 系列文件格式.
### 各文件夹简介
Filesystem Hierarchy Standard(fhs)

**二进制可执行文件**
- `/bin` 核心命令程序(ls, cd)
- `/usr`  (usr=Unix System Resources)
    - `/local/bin` 存放管理员安装的可执行文件, 以及从本地源代码 build 的
    - `/bin` 通常是系统预装的应用程序
- `/sbin` 存放需要 root 权限的管理工具, 结构与 `/usr` 类似
    - 如 iptables、reboot

`/bin`, `/usr/local/bin`, `/usr/bin` 可能会冲突, 可以通过调整 `$PATH` 的目录顺序更改优先级

**库文件**
- `/lib` 包含了 bin 正常允许所需的库文件
    - 如 C library routines, compiler runtime
    - 在系统早期(用户mount前)就要初始化
- `/usr/lib` 用户程序所需的库文件
    - 不参与早期初始化

**Linux 配置文件/etc**
- `/etc` 管理各种内容的配置文件
    - 如 networking, authen services
    - `/passwd` 公开的用户基本信息
    - `/shadow` 除基本信息, 还有密码哈希, 密码有效期, 敏感数据
    - `/sudoers` 超级用户权限用户 
    - `/group` 分组信息

**用户主页**
- `/home` 每个用户都有一个的文件夹
- `/root` 管理员专属

**日志和缓存/var** 
- `/var` 存放日志和缓存等快速变化的数据
    - `/log` 日志

**运行时信息/run**
- `/run` 存放系统运行时的易失性信息
    - systemd details
    - user session
    - loggind daemons 日志守护进程
    - 使用 socket 通信时的文件(如 mysql.sock 用于访问数据库)

**系统监控**
- `/proc` runtime stats
    - `less /proc/cpuinfo` 查看CPU高级指标
    - 查看系统 mount
    - lsof, strace, pmap
    - 存储了每个运行中进程的信息
- `/sys` 组件和硬件的访问权限
    - 可以对设备, 模块 等组件精细监控和配置

**其他**
- `/dev` 设备
    - `/dev/null` 2>/dev/null
- `/srv` 关键的系统服务
- `/opt` Optional application software packages.有的人用来放自己的东西
#### 设置
- sys 是内存参数
- sudo echo 500 > brightness 会失败因为sudo 只运行 了 echo , 而不是 sudo 打开 brightness
    - sudo su 会换成 root
    - echo 500 | sudo tee brightness 就可行, 因为用 sudo 执行了 tee, tee 打开的 brightness

### /dev
#### dev types
ls -l /dev, there are 4 types
- c - character
- b - block
- p - pipe
- s - socket

**Character Device**
This devices transfer data, but one char at a time. Usually for os functionalities.

**Block Device**
These devices transfer data, but in large fixed-sized blocks. E.g. for harddrives, filesystems.

**Pipe Device**
Named pipes allow two or more *processes* to communicate with each other.

**Socket Device**
Socket devices facilitate communication between processes, similar to pipe devices but they can communicate with *many processes at once*.

#### SCSI protocol
- SCSI (pronounced "scuzzy") stands for Small Computer System Interface.
- allows communication between disks, printers, scanners and other peripherals to your system.

#### device name
**SCSI devices**
- /dev/sda - First hard disk
- /dev/sdb - Second hard disk
- /dev/sda3 - Third partition on the first hard disk

**Pseudo devices**
- /dev/null - accepts and discards all input, produces no output
- /dev/zero - accepts and discards all input, produces a continuous stream of NULL (zero value) bytes
- /dev/random - produces random numbers

**PATA devices**
Sometimes in older systems
- /dev/hda - First hard disk
- /dev/hdd2 - Second partition on 4th hard disk

### Partition

#### 分区表 Partition Table
分区表告诉系统磁盘如何分区
- 分区的开始和结束
- 哪些分区是 bootable(可引导)
- 磁盘的哪些扇区分配给哪个分区

两种常见的分区表
- MBR: Master Boot Record
- GUID Partition Table

#### 分区

<section style="display: flex; flex-direction: row; align-items: center;"><span style="color: rgb(75, 153, 211); display: flex; flex-direction: row; align-items: center; padding: 0px 0.5em; font-size: 0.824em; border-radius: 0.428em; line-height: 2.306em; background-color: rgba(75, 153, 211, 0.15);"><span style="margin-right: 0.2em; display: flex; flex-direction: row; align-items: center; justify-content: center;"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24" width="1.9988577955454025em" height="1.9988577955454025em" stroke="currentColor" aria-hidden="true" class=""><path d="m21.15 6.85c0-2.2056-1.7944-4-4-4-4.1765-0.01989-5.4993 5.7322-1.8147 7.5629-0.263 0.63631-0.4627 1.4421-0.6559 2.2215-0.1397 0.56337-0.2841 1.1459-0.4405 1.6084-0.0728 0.2155-0.1286 0.4813-0.1891 0.4813-0.5072-0.7362-0.8126-2.2507-1.0979-3.3161-0.47879-1.5358-0.72936-4.4237-2.8018-4.558-0.77422 7e-5 -1.3844 0.52253-1.8138 1.553-0.55019 1.254-0.75064 3.2421-1.3784 4.4472-0.39648 3e-4 -0.79576 0.0045-1.1877 0.0703-0.67978 0.1073-1.3339 0.4195-1.798 0.9347-0.39707 0.4315-0.6427 0.9874-0.74275 1.5623-0.063545 0.351-0.07691 0.7094-0.07883 1.0654 0.001935 0.4718-0.01324 0.9457 0.027745 1.4163 0.09435 1.151 0.65732 2.1308 1.7281 2.6237 0.43467 0.1975 0.91053 0.2877 1.3854 0.3129 0.40096 0.0215 0.80345 0.0129 1.2048 0.0139 0.6491 2e-4 1.2891-0.0515 1.888-0.3229 0.90042-0.4067 1.4845-1.2039 1.6712-2.1666 0.0761-0.3779 0.09179-0.7654 0.09344-1.15 7.7e-4 -0.2699 0.00148-0.5413-7.8e-4 -0.8111-0.00379-0.4854-0.04143-0.9771-0.19121-1.4414-0.28748-0.9172-0.98053-1.616-1.8964-1.909 0.43984-1.1576 0.66815-2.7594 1.1268-3.8895 0.3537 0.72804 0.57113 1.7669 0.82283 2.7298 0.26567 1.0724 0.5404 2.1814 0.90896 3.0557 0.87204 2.2985 3.1124 2.7586 4.0452 0.392 0.5508-1.2642 0.7508-3.279 1.3828-4.4916 2.1142-0.10339 3.8024-1.8557 3.8024-3.995zm-12.073 8.8023c0.05605 0.2275 0.06623 0.465 0.07092 0.6983 0.00363 0.2444 0.00195 0.4906 0.00214 0.735-0.0063 0.408 0.01486 0.882-0.18359 1.2496-0.24573 0.4539-0.8026 0.501-1.2651 0.5114-0.33714 0.0058-0.67525 0.0041-1.0124 0.0018-0.46455-0.0092-1.0361-0.0245-1.3192-0.4545-0.16612-0.2552-0.19733-0.5702-0.21202-0.8673-0.01004-0.2443-0.00683-0.4906-0.0075-0.735 5.9e-4 -0.2322-0.00201-0.4664 0.01171-0.6983 0.01886-0.2936 0.06332-0.6069 0.24969-0.8453 0.34185-0.4331 1.0226-0.3889 1.5228-0.3979 0.38828 0.0035 0.77905-0.0131 1.1658 0.0285 0.49865 0.0566 0.85211 0.2621 0.97684 0.7737zm8.0732-6.8023c-2.6379-0.06696-2.6373-3.9334 0-4 2.6378 0.06697 2.6373 3.9334 0 4z" fill="currentColor"></path></svg></span>MBR</span></section>

- 传统的, "standard"
- 限制: 4 主分区(primary), 1 拓展分区(extended), 拓展分区内 无限 逻辑分区(logical)
- 仅支持 BIOS 启动（不支持 UEFI）

<section style="display: flex; flex-direction: row; align-items: center;"><span style="color: rgb(75, 153, 211); display: flex; flex-direction: row; align-items: center; padding: 0px 0.5em; font-size: 0.824em; border-radius: 0.428em; line-height: 2.306em; background-color: rgba(75, 153, 211, 0.15);"><span style="margin-right: 0.2em; display: flex; flex-direction: row; align-items: center; justify-content: center;"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24" width="1.9988577955454025em" height="1.9988577955454025em" stroke="currentColor" aria-hidden="true" class=""><path d="m21.15 6.85c0-2.2056-1.7944-4-4-4-4.1765-0.01989-5.4993 5.7322-1.8147 7.5629-0.263 0.63631-0.4627 1.4421-0.6559 2.2215-0.1397 0.56337-0.2841 1.1459-0.4405 1.6084-0.0728 0.2155-0.1286 0.4813-0.1891 0.4813-0.5072-0.7362-0.8126-2.2507-1.0979-3.3161-0.47879-1.5358-0.72936-4.4237-2.8018-4.558-0.77422 7e-5 -1.3844 0.52253-1.8138 1.553-0.55019 1.254-0.75064 3.2421-1.3784 4.4472-0.39648 3e-4 -0.79576 0.0045-1.1877 0.0703-0.67978 0.1073-1.3339 0.4195-1.798 0.9347-0.39707 0.4315-0.6427 0.9874-0.74275 1.5623-0.063545 0.351-0.07691 0.7094-0.07883 1.0654 0.001935 0.4718-0.01324 0.9457 0.027745 1.4163 0.09435 1.151 0.65732 2.1308 1.7281 2.6237 0.43467 0.1975 0.91053 0.2877 1.3854 0.3129 0.40096 0.0215 0.80345 0.0129 1.2048 0.0139 0.6491 2e-4 1.2891-0.0515 1.888-0.3229 0.90042-0.4067 1.4845-1.2039 1.6712-2.1666 0.0761-0.3779 0.09179-0.7654 0.09344-1.15 7.7e-4 -0.2699 0.00148-0.5413-7.8e-4 -0.8111-0.00379-0.4854-0.04143-0.9771-0.19121-1.4414-0.28748-0.9172-0.98053-1.616-1.8964-1.909 0.43984-1.1576 0.66815-2.7594 1.1268-3.8895 0.3537 0.72804 0.57113 1.7669 0.82283 2.7298 0.26567 1.0724 0.5404 2.1814 0.90896 3.0557 0.87204 2.2985 3.1124 2.7586 4.0452 0.392 0.5508-1.2642 0.7508-3.279 1.3828-4.4916 2.1142-0.10339 3.8024-1.8557 3.8024-3.995zm-12.073 8.8023c0.05605 0.2275 0.06623 0.465 0.07092 0.6983 0.00363 0.2444 0.00195 0.4906 0.00214 0.735-0.0063 0.408 0.01486 0.882-0.18359 1.2496-0.24573 0.4539-0.8026 0.501-1.2651 0.5114-0.33714 0.0058-0.67525 0.0041-1.0124 0.0018-0.46455-0.0092-1.0361-0.0245-1.3192-0.4545-0.16612-0.2552-0.19733-0.5702-0.21202-0.8673-0.01004-0.2443-0.00683-0.4906-0.0075-0.735 5.9e-4 -0.2322-0.00201-0.4664 0.01171-0.6983 0.01886-0.2936 0.06332-0.6069 0.24969-0.8453 0.34185-0.4331 1.0226-0.3889 1.5228-0.3979 0.38828 0.0035 0.77905-0.0131 1.1658 0.0285 0.49865 0.0566 0.85211 0.2621 0.97684 0.7737zm8.0732-6.8023c-2.6379-0.06696-2.6373-3.9334 0-4 2.6378 0.06697 2.6373 3.9334 0 4z" fill="currentColor"></path></svg></span>GPT</span></section>

- 新的, 只有一种分区
- 每个分区都有一个全局唯一 ID （GUID）
- 主要与基于 UEFI 的引导结合使用

### inode

#### inode
一个 inode 节点记录以下内容 
- File type - regular file, directory, character device, etc
- Owner
- Group
- Access permissions
- Timestamps - mtime (time of last file modification), ctime (time of last attribute change), atime (time of last access)
- Number of hardlinks to the file
- Size of the file
- Number of blocks allocated to the file
- Pointers to the data blocks of the file - most important!

### link

#### soft link, symbolic link, symlink
- 在 win 中, 快捷方式(shortcuts)是一个别名, 如果更改原始文件会破坏快捷方式
- 在 linux 中, symlink 等价于 快捷方式
- `ln -s myfile myfilelink` 创建一个 指向 myfile 的 syslink
- symlinks are just files that point to filenames
- syslink 文件的 inode 和原文件*不同*, 因为 inode 编号*对文件系统是唯一的*
- 使用 syslink 可以在不同文件系统中指引用文件, 因为使用的是文件名而非 inode 编号 

#### 硬链接 hardlinks
- 使用 `ls -li` 第三个字段是文件的 硬链接数量
- A hardlink just creates another file with a link to the same inode
- 删除了指向 inode 的所有硬链接后，才会删除 inode
- 同一文件的多个目录入口（共享 inode）, 常用来防误删
-  如何查看文件的所有硬链接（`find -samefile`）

#### 对比
链接（Hard Link）与符号链接（Symbolic Link）核心区别

| **特性**      | **硬链接 (Hard Link)**      | **符号链接 (Symbolic Link)**   |
| ----------- | ------------------------ | -------------------------- |
| **本质**      | 同一文件的多个目录入口（共享 inode）    | 独立文件（存储目标路径）               |
| **inode 号** | 与源文件相同                   | 独立 inode（不同号）              |
| **文件删除影响**  | 源文件删除后仍可用（数据不丢）          | 源文件删除后失效（"断链"）             |
| **跨文件系统**   | ❌ 不支持                    | ✅ 支持                       |
| **链接目标**    | 仅限文件（不能链接目录）             | 可链接文件和目录                   |
| **创建命令**    | `ln source.txt hardlink` | `ln -s source.txt symlink` |
| **查看方式**    | `ls -i` 显示相同 inode       | `ls -l` 显示 `->` 指向路径       |
| **存储空间**    | 不额外占用空间（共享数据块）           | 占用少量空间（存储路径字符串）            |
| **递归链接**    | 无递归风险                    | 可能形成死循环（如 `ln -s dir dir`） |

## Linux 用户和权限

useradd, userdel, passwd 三个命令 

#### 文件权限
除了 -rwxrwxrwx, 其实还有三个权限位

- suid, 体现为 -rwsr-xr-x,  表示允许用户以文件所有者的权限运行文件
- sgid, 体现为 -rwxr-sr-x, 表示允许组内用户以文件所有者的权限运行文件
- sticky, 体现为 drwxrwxrwxt, 意味着只有所有者或 root 用户才能删除或修改文件。这对于共享目录非常有用

#### 三个 UID
- 每个进程有三个关联的 UID
- **effective user ID**, 运行时拥有相当于此 ID 拥有的权限
- **real user ID**, 启动该进程的用户ID
- **saved user ID**, 保存的 UID, 允许在 effective 和 real 之间切换

#### /etc 信息

**/etc/passwd**
1. Username
2. fake password
    1. "x" means the password is stored in the /etc/shadow file
    2. "\*" means the user doesn't have login 
    3. a blank field that means the user doesn't have a password.
3. The user ID - root has the UID of 0
4. The group ID
5. GECOS field - This is used to generally leave comments about the user or account such as their real name or phone number, it is comma delimited.
6. User's home directory
7. User's shell 

**/etc/shadow**
1. Username
2. Encrypted password
3. Date of last password changed - expressed as the number of days since Jan 1, 1970. If there is a 0 that means the user should change their password the next time they login
4. Minimum password age - Days that a user will have to wait before being able to change their password again
5. Maximum password age - Maximum number of days before a user has to change their password
6. Password warning period - Number of days before a password is going to expire
7. Password inactivity period - Number of days after a password has expired to allow login with their password
8. Account expiration date - date that user will not be able to login
9. Reserved field for future use

**/etc/group**
1. Group name
2. \*
3. Group ID (GID)
4. List of users - you can manually specify users you want in a specific group


## 命令行
[[permanent/命令行指南|命令行指南]]

#### 终端
Ctrl-Alt-F1 to get into TTY1

pts 是 pseudoterminal, 用 shell 窗口模拟 terminal, 是以及

#### 前台和后台作业
- 在命令后添加 & 会在后台运行
- jobs 列出后台作业
- fg %1 会将 jobs 中 ID 为 1 的任务移动到前台. 
    - 不带%数字的话, 默认是最近的任务, 也就是 jobs 中带 * 的
- 要将正在运行的任务移动到后台, c-z 然后 bg

#### 包管理
- Ubuntu 的 source repo 在 cat /etc/apt/sources.list.d/ubuntu.sources
- Ubuntu 是 Debian 的发行版, 所以 软件包是 `.deb` 格式, 包管理工具是 `dpkg`, red hat-based 是 rpm

#### 从源代码编译

首先, 需要允许变异源代码的工具
```shell
sudo apt install build-essential
```

通常来说, 需要三步：`./configure && make && make install`

先配置和构建 
```shell
./configure
make
```

使用 checkinstall 是更好的安装方式. 此命令实质上是 “make install” 并构建一个 .deb 包并安装它。这样以后可以更轻松地删除包。
```shell
sudo checkinstall
```



## 进程和线程

#### 进程创建
- fork
- 每个进程都有 父进程 除了 PID 1 的 `init`, ps -l 可以看到 ppid

#### 进程终止
- 当子进程退出, 终止状态是0表示成功终止. 进程必须使用 wait syscall 来确认子进程的终止，它的作用是检查子进程的终止状态
- **孤儿进程**：父进程先一步终止了，子进程会被 **PID 1 的进程接管**（此时 `PPID` 变为 1）。由 init 调用 wait
- **僵尸进程**: 
    - 当子进程终止并且父进程尚未调用 wait. 
    - 子进程使用的资源仍会释放给其他进程
    - 但是 process 表中仍有一个用于此 Stalbie 的条目.僵尸进程太多可能是一件坏事，因为它们会占用进程表上的空间

#### Niceness - CPU 需求指标
Niceness 是一个非常奇怪的名字，但它的意思是进程有一个数字来确定它们在 CPU 中的优先级。高数字表示进程很好，CPU 的优先级较低，低或负数表示该进程不是很好，它希望获得尽可能多的 CPU。

```shell
# top 的 NI 表示 niceness
$ top

# 使用 nice 设置新进程的 NI
$ nice -n 5 apt upgrade
# 使用 renice 设置已存在进程的 NI
$ renice 10 -p 3245
```


## 信号 Signal

#### Signal 的用处
- software interrupt
- notify a process that something has happened

#### Signal handling
when a signal is passed, a process can :
- *ignore*
- *catch*, and perform specific routine
- *terminate*, abnormal exit
- *block* the signal

#### common Signal
- SIGHUP or HUP or 1: Hangup
- SIGINT or INT or 2: Interrupt
- SIGKILL or KILL or 9: Kill
- SIGSEGV or SEGV or 11: Segmentation fault
- SIGTERM or TERM or 15: Software termination
- SIGSTOP or STOP: Stop

[[permanent/命令行指南#kill|kill]] can send specified signal, by default SIGTERM

#### Signal explanation
- SIGHUP - Hangup, 在控制终端关闭时发送到进程。例如，如果您关闭了一个正在运行进程的终端窗口，您将收到 SIGHUP 信号。所以基本上你已经挂断了
- SIGINT -  是一个中断信号，因此您可以使用 Ctrl-C，系统将尝试正常终止该进程
- SIGTERM - 终止进程，但允许它先进行一些清理
- SIGKILL - 杀死进程，用火杀死它，不做任何清理
- SIGSTOP - Stop/suspend a process


