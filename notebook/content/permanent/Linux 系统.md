---
title: Linux 系统
date: 2025-05-23
tags:
  - Linux
---
## Linux 文件系统

linux 一切皆文件. dir 也是文件.
通常使用的是 ext 系列文件格式.
#### 各文件夹简介
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
- `/opt` 有的人用来放自己的东西
#### 设置
- sys 是内存参数
- sudo echo 500 > brightness 会失败因为sudo 只运行 了 echo , 而不是 sudo 打开 brightness
    - sudo su 会换成 root
    - echo 500 | sudo tee brightness 就可行, 因为用 sudo 执行了 tee, tee 打开的 brightness

#### /dev
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
Named pipes allow two or more processes to communicate with each other.

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


