---
title: Nginx
date: 2023-12-08
tags:
  - 工具使用
  - 服务器
---

## 简介

#### 是什么
- 轻量级 Web 服务器
- 反向代理服务器

(正向代理: 代为请求; 反向代理: 代为响应)
#### 能做什么
- 直接支持 Rails 和 PHP 程序
- 作为 HTTP 反向代理服务器
- 负载均衡服务器
- 邮件代理服务器
- 帮助前端动静分离

#### 特性
- 高稳定
- 高性能
- 功能丰富
- 模块化
- 支持热部署

#### 安装

依赖 package
- gcc
- pcre-devel
- zlib, zlib devel
- openssl, openssl-devel

www.nginx.org 官网


linux 安装后在目录执行 `./configure`

win 下载后解压缩就能运行 exe

## 使用
#### 常用命令
**测试**配置是否正确
```
nginx -t  
```

启动
```
nginx 
```

停止
```
nginx -s stop 
// or 从容关闭
nginx -s quit
```

重启
```
nginx -s reload
```

平滑重启. 会先尝试解析配置文件, 如果更新了且无误就应用, 启动新的进程并 quit 旧的. 可以继续为当前链接用户提供服务
```
kill HUP [进程号]
```

查看进程信息
```
ps -ef | grep nginx
```

增加防火墙访问权限
```
sudo vim /etx/sysconfig/iptables -A INPUT -p tcp -m state --state NEW -m tcp --dport 80 -j ACCEPT
```

#### 虚拟域名配置及测试

- nginx.conf 增加 `include vhost/*.conf`
- 在 nginx/conf 创建 vhost 文件夹, 在里面配置 conf 文件
- 重启 nginx 服务
- 访问 localhost:80

指向端口的 http 转发
![[attachments/Pasted image 20231208221700.png]]

指向目录
![[attachments/Pasted image 20231208221904.png]]

autoindex 开启的话, 会将 root 文件夹下的所有文件创建目录, 也就是这些文件可以通过 URL 访问到. 一般不建议开启, 可能会被穷举爆破. 下载服务可以开.
#### Nginx 本地玩耍注意事项(win)
- 配置域名转发还要配置 host. 添加 `服务器ip 二级域名`
    - linux: /etc/hosts 
    - win: sys32/drivers/etc

win 下 路径用 `\`, 路径最后即使是文件夹, 不要再加一个反斜杠.

win 的报错信息报的是错误的+1行

access_log 这样配 access_log logs\access.log 不出问题. 其他好像会有 create_file() 问题
