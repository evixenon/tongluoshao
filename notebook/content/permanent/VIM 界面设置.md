---
title: "VIM 界面设置"
date: "2023-06-16"
tags:
---


#### 颜色
>set guifont=consolas:h16

>colorscheme molokai
>set termguicolors

下载的配色文件放在vim90/colors
第二句是真彩色


#### 备份文件
>set undodir=$TEMP\\vimfiles\\undo_temp
>set backupdir=$TEMP\\vimfiles\\backup_temp

备份文件地址, 必须是已经存在的文件夹
可以用环境变量

#### 窗口
>set lines=35 columns=118

其中lines是窗口显示的行数，columns是窗口显示的列数，大家根据自己的习惯可以调整这两个数字的大小。

>winpos 300 0

后面两个参数指的自屏幕左上角像素值参考位置

#### tab
> set tabstop/softtabstop=4
> set expandtab

https://blog.csdn.net/shell_picker/article/details/6033023

