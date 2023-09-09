---
title: Nginx 网站用 Certbot 配置免费 https 证书
date: 2022-01-13T17:43:53+01:00
tags:
  - nginx
  - 个站
  - certbot
---

Cerbot是什么？
>Certbot 是最流行的基于Let's Encrypt 的客户端，用于在服务器上简化HTTPS（SSL/TLS）证书的申请流程。 本文中，我们介绍通过Certbot 客户端为网络服务器添加、删除 HTTPS 证书、吊销证书，以及为已有证书添加新域名的操作。

这里可以找到一份 `Cerbot` [官网指南](https://certbot.eff.org/instructions)。

## 安装 snapd
首先要安装 `snap`, 根据系统不同方法可能不一样。详细看[这里](https://snapcraft.io/docs/installing-snapd)

我的系统是 Ubuntu 20.04 ， 实测并没有预装，使用如下命令安装:
>sudo apt install snapd

## 更新 snap 到最新版本
> sudo snap install core; sudo snap refresh core

## 使用 snap 安装 Cerbot
如果曾经不通过 `snap` 安装了 `cerbot`, 需要先将其卸载。
(命令: `sudo apt-get remove certbot`, `sudo dnf remove certbot`, `sudo yum remove certbot`)

然后通过 snap 安装 cerbot:
>sudo snap install --classic certbot


然后运行这条指令，保证其正常使用：
>sudo ln -s /snap/bin/certbot /usr/bin/certbot

## 获取证书

这是获取并安装证书的命令：
>sudo certbot --nginx
回车之后还有一些要配置的，见机行事。

这是只获取证书的命令：
>sudo certbot certonly --nginx
这条指令没有尝试过。

根据代理服务的不同，命令的参数也不同，这里是 nginx.
Certbot 会在证书过期前自动更新，所以除非更改配置，我们不再需要运行它。

## Nginx 的配置
如果执行上一步中获取并安装证书的命令，cerbot 会自动改动 Nginx 的配置文件。若是想看具体改变了什么，可以打开配置文件，就会发现多了一些 `# managed by Certbot` 的注释，就是它们了。

## 最后，重新加载 Nginx
>nginx -s reload
刷新一下你的网站，是不是变成 https 了？

## 子域名的证书配置

在 nginx 下的 Certbot 可以很方便地为子域名配置证书，命令：
>certbot --nginx

certbot 能自动识别已经挂上 80 端的子域名，根据提示选择要配置的子域名即可。

参考:

[快速搭建https网站: Hugo + Nginx + Let's Encrypt (certbot)](https://zhuanlan.zhihu.com/p/365910957)

[User Guide - Certbot 1.23.0 documentation](https://eff-certbot.readthedocs.io/en/stable/using.html#certbot-commands)