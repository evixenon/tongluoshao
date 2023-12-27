---
title: Wallabag
date: 2023-11-28
tags:
---
[【好玩儿的Docker项目】保存网页、稍后阅读，自建 Wallabag 服务，搭配RSS使用更佳！ | 爱玩实验室](https://iwanlab.com/docker-compose-install-wallabag/)


docker-compose.yml
```docker
version: '3'
services:
  wallabag:
    image: wallabag/wallabag
    environment:
      - MYSQL_ROOT_PASSWORD=wallaroot
      - SYMFONY__ENV__DATABASE_DRIVER=pdo_mysql
      - SYMFONY__ENV__DATABASE_HOST=db
      - SYMFONY__ENV__DATABASE_PORT=3306
      - SYMFONY__ENV__DATABASE_NAME=wallabag
      - SYMFONY__ENV__DATABASE_USER=wallabag
      - SYMFONY__ENV__DATABASE_PASSWORD=wallapass
      - SYMFONY__ENV__DATABASE_CHARSET=utf8mb4
      - SYMFONY__ENV__MAILER_HOST=127.0.0.1
      - SYMFONY__ENV__MAILER_USER=~
      - SYMFONY__ENV__MAILER_PASSWORD=~
      - SYMFONY__ENV__FROM_EMAIL=1037635613@qq.com  # 修改成你自己的邮箱
      - SYMFONY__ENV__DOMAIN_NAME=https://wallabag.tongluoshao.space  # 修改成稍后要反向代理的域名
      - SYMFONY__ENV__SERVER_NAME="Roy's Wallabag"
    ports:
      - 8010:80   # 8080可以修改成其他的自己想用的端口
    volumes:
      - /root/data/docker_data/wallabag/images:/var/www/wallabag/web/assets/images  # 将图片映射挂载到本地，这样docker停止了，数据不会丢失
    healthcheck:
      test: ["CMD", "wget" ,"--no-verbose", "--tries=1", "--spider", "http://localhost"]
      interval: 1m
      timeout: 3s
    depends_on:
      - db
      - redis
  db:
    image: mariadb
    environment:
      - MYSQL_ROOT_PASSWORD=wallaroot
    volumes:
      - /root/data/docker_data/wallabag/data:/var/lib/mysql  # 将数据映射挂载到本地，这样docker停止了，数据不会丢失
    healthcheck:
      test: ["CMD", "mysqladmin" ,"ping", "-h", "localhost"]
      interval: 20s
      timeout: 3s
  redis:
    image: redis:alpine
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 20s
      timeout: 3s
```