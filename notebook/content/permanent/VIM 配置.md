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
#### tab, indent
> set tabstop=4 tab字符长度
> set softtabstop=4 按下 tab 时的行为
> set expandtab 表示将 tab 转换为 空格

- tabstop：表示一个 tab 字符显示出来是多少个空格，默认 8  
- softtabstop：在编辑的时候 (比如按退格或 tab 键), 按一次 tab 是多少长度
    - 不足 tab 的长度会转为空格
    - 如果设置了 expandtab, 则全转为空格
- expandtab/noexpandtab：将 tab 扩展/不扩展成空格  
- shiftwidth：每一级缩进是多少个空格  
- smarttab：根据文件中其他地方的缩进空格个数来确定一个 tab 是多少个空格

```
:[range]retab [new_tabstop]
```
应用新的 tabstop 值，替换所有的 tab，如果设置了expandtab，还会把文件中 tab 都替换成空格。

## 环境
#### 备份文件
>set undodir=$TEMP\\vimfiles\\undo_temp
>set backupdir=$TEMP\\vimfiles\\backup_temp

备份文件地址, 必须是已经存在的文件夹
可以用环境变量

## jyy 的快速配置教程
[Configuring vim · GitBook](https://nju-projectn.github.io/ics-pa-gitbook/ics2024/0.4.html)
