# OSCP new4u带学

## 目录

*   [000](#000)

*   [001 Kali系统基础](#001-kali系统基础)

*   [Linux目录结构](#linux目录结构)

*   [Linux basic commands](#linux-basic-commands)

*   [002 Bash](#002-bash)

## 000

安装虚拟机的时候选Debian

2 CPU 4核2G 80G 拆分 NAT SCSI 从官网下载的镜像可以直接打开

## 001 Kali系统基础

root:toor（旧版本）现在是kali:kali

*   官方links

    > 文档

    <https://www.kali.org/docs/>

    > 默认密码

    <https://www.kali.org/docs/introduction/default-credentials/>

    > 论坛

    <https://forums.kali.org/>

    **kali metapackages**: 安装元包能一次安装多个包。用来安装一些特定的支持，比如802.11, bluetooth

    > crash什么的可以来发布问题或者找解决方案。都是结构化的情况

    <https://bugs.kali.org/my_view_page.php>

## Linux目录结构

`/bin/` 相当于PATH 路径

`/sbin/` contains system program. 实际上是用户的bin

`/etc/` 发音\[etsi]。有配置文件，有些软件会装在这

`/tmp/` 临时目录

`/usr/bin/` 放用户文件。有apt

`/usr/share/` support files

## Linux basic commands

*   `man`&#x20;

    `-k` 关键词搜索，返回相关的man条目。也可以用作命令的简单查询. 约等于`apropos`

*   通配/正则

    如 `man -k '^passwd$'`， `ls /bin/z*p`

*   `ls`

    `-a` 显示所有，包括隐藏

    `-l` 显示详细信息（权限，类型，日期，大小等）

    `-1` 一个文件一行

`cd` `pwd`&#x20;

*   `mkdir` `rm`

    创建多个文件夹： `mkdir good morning`

    删除多个文件夹： `rm -rf good/ morning/`

    创建带空格的文件夹： `mkdir "good morning"` 或 `mkdir good\ morning`

    `mkdir -p `

    `test/{recon, exploit, report}` 创建多个子文件夹

*   `echo $PATH`&#x20;

    显示系统path路径读取的目录

*   查找命令

    `which` 定位一个直接系统命令在哪个path路径

    `locate` 基于定期更新的数据库文件`locate.db` , 速度快，但不是实时更新. `updatedb` 手动更新

    `find` 很多选项。`find / -name sbd*`

    0：52

<!---->

*   Kali 服务管理

    `systemctl start 服务名` 启动服务

    *   `ss -antlp` sockets 统计数据

        `-a` all `-n` bandwidth `-t` TCP only `-l` listening only `-p` show processes using sockets

    `systemctl enable 服务名` 系统启动时自动开启服务

    `systemctl` 查看所有正在运行的服务

*   包管理`apt`

    包管理基于`apt` (Debian)

    `apt update` 更新list, 看有多少包能升级

    `apt upgrade` 包升级。升级之前建议快照

    `apt upgrade 包名` 只升级某一个包

    `apt-cache search 关键词` 查找（商店中）包名和描述中包含某关键词的包

    `apt show 包名` 查看某一个包的信息，包括版本号，大小，依赖关系等

    `apt install 包名` 安装某一个包

    `apt remove 包名`  卸载某一个包 `—purge` 彻底卸载

    `dpkg -i` 提供路径，本地离线安装一个包（注意：不会安装依赖）

`passwd` 改密码命令

`whoami` 查看当前用户

## 002 Bash

*   变量

    `var=value` 定义一个变量，当前环境下有效。以后可以用`$var`调用。（不用引号）

    `export var=value` 和上面不同的是，使用`bash`命令新建一个bash后还能用这个变量（但另一个terminal不行）

*   历史

    `history` 当前bash的历史记录

    `ctrl+r`搜索历史记录

    `!数字` 指定历史记录 如`!2`

    `tail -n 3 .bash_history` 显示历史记录的最后三行

*   Piping and Redirection

    streams  `1`:STDIN  `2`:STDOUT  `3`:STDERR

    `/dev/null`黑洞

*   正则

    `grep`

    `sed 表达式` 这好像是跟vim命令类似的，如 `sed 's/god/good/g`全局替换
