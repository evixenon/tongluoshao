# Linux

## 目录

*   [Linux目录结构](#linux目录结构)

*   [Linux basic commands](#linux-basic-commands)

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
