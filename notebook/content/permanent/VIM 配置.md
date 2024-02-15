---
title: VIM 配置
date: 2023-06-16
tags:
  - Vim
---


## 界面设置
#### 颜色
>set guifont=consolas:h16

>colorscheme molokai
>set termguicolors

下载的配色文件放在vim90/colors
第二句是真彩色



#### 窗口
>set lines=35 columns=118

其中lines是窗口显示的行数，columns是窗口显示的列数，大家根据自己的习惯可以调整这两个数字的大小。

>winpos 300 0

后面两个参数指的自屏幕左上角像素值参考位置

## 编辑器
#### tab
> set tabstop/softtabstop=4
> set expandtab

https://blog.csdn.net/shell_picker/article/details/6033023

[Vim 修改 Tab 键为 4 个空格 - 知乎](https://zhuanlan.zhihu.com/p/367795051)


## 环境
#### 备份文件
>set undodir=$TEMP\\vimfiles\\undo_temp
>set backupdir=$TEMP\\vimfiles\\backup_temp

备份文件地址, 必须是已经存在的文件夹
可以用环境变量

## jyy 的快速配置教程
[Configuring vim · GitBook](https://nju-projectn.github.io/ics-pa-gitbook/ics2024/0.4.html)
