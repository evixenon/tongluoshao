---
title: "Hugo个人网站起步"
date: 2021-11-21T15:45:31+01:00
draft: true
---


## 0x00 Hugo安装
---
Win10系统需要先安装`Chocolatey`, 或者

Chocolatey官方安装教程：https://chocolatey.org/install#individual

在`Powershell`中执行:
> choco install hugo -confirm

完成后可以在`Powershell`中看到提醒：
```
The install of hugo was successful.
Software installed to 'C:\ProgramData\chocolatey\lib\hugo\tools'
```
在任意目录打开`cmd`, 尝试命令:
> hugo help 

这是 Hugo 的帮助命令，如果命令出错，则需要手动将 Hugo 添加到 PATH 环境变量。

<br>
<br>

## 0x01 新建一个站点
---
在你想要创建站点的空文件夹打开`cmd`, 执行如下命令，其中`mysite`是你的站点名称。例如我在F盘的Hugo目录下运行:
> F:\Hugo> hugo new site mysite

Hugo会帮你生成一个叫`mysite`的文件夹，其中包含了站点所需的一些基础文件。

<br>
<br>

## 0x02 配置站点的主题
---
在官方提供的主题目录 https://themes.gohugo.io/ 中，或者自行寻找Hugo主题，按照主题提供的下载方式将主题下载到`themes`目录中。

有两种安装方法：一种是通过`git`, 另一种是直接下载安装包并手动添加主题到配置文件。通常在主题的介绍页面或者github页面能找到帮助。

以Loveit为例，官方文档页面： https://hugoloveit.com/zh-cn/theme-documentation-basics/ 


<br>
<br>

## 0x03 启动站点
---
首先在站点根目录使用以下命令创建一篇post:
> hugo new /posts/fisrt-post.md

这个命令会在`content`文件夹下创建目录和文件`posts\fisrt-post.md`。

注意: MD文件的`draft:true`参数，如果在生成站点时要显示，就必须改成`draft:false`，或者在启动服务时时候`hugo serve -D`命令。

启动Hugo服务：
> hugo serve

之后就可以通过 http://localhost:1313/ 访问站点了。

<br>
<br>


## 0xff 错误信息
---
挑了LoveIt主题，然后发现它在Hugo 0.75以上版本会报错。
迫不得已降成了0.74.3
`Powershell`:
> choco uninstall hugo
> choco install hugo --version 0.74.3


