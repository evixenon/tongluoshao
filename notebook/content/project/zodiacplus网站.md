---
title: zodiacplus网站
date: 2024-03-12
tags:
---
## 1.0 纯展示页面

2024-03-12

#### 技术选型1 hugo 放弃
放弃原因: 希望能比较容易地修改

hugo
- 静态页面, 加载快
- 用过, 熟练度加成

initio
- demo [Initio - Free, multipurpose html5 template by GetTemplate](https://miguelsimoni.github.io/hugo-initio-site/)
- hugo 主题商城 [Hugo Initio | Hugo Themes](https://themes.gohugo.io/themes/hugo-initio/)
- 设计简洁优雅, 比较符合展示页面
- MIT 许可证


#### 技术选型2 wordpress
2024-03-16
- 服务层 Docker + Nginx + MySQL + PHP
- 软件层 wordpress + woocommerce
- 主题 https://github.com/pozh/Initio/

主要看这个, nginx 配置 `location /` 有改变 [使用 Docker 搭建 WordPress 并启用 HTTPS 访问 | Ethan's Blog - 记录和思考](https://ethanblog.com/tips/install-wordpress-and-enable-ssl-with-docker.html#:~:text=%E4%BD%BF%E7%94%A8%20Docker%20%E6%90%AD%E5%BB%BA%20WordPress%20%E5%B9%B6%E5%90%AF%E7%94%A8%20HTTPS%20%E8%AE%BF%E9%97%AE%201,4%204%E3%80%81%E9%85%8D%E7%BD%AE%20nginx%20%E5%B9%B6%E5%BC%80%E5%90%AF%20HTTPS%20%E8%AE%BF%E9%97%AE%20WordPress%20)

整个请求-响应流程大概是
- 用户请求发送到服务器 80 -> nginx 容器的 80
- nginx 将指定域名内容转发到 服务器的 8080 -> wordpress 容器的 80
- 

docker-compose.yml
```yml
version: '1.0'

services:

  nginx:
    image: nginx:stable-alpine
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/conf/conf.d:/etc/nginx/conf.d:ro
      - ./nginx/conf/nginxconfig.io:/etc/nginx/nginxconfig.io:ro
      - ./nginx/conf/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/html:/usr/share/nginx/html:rw
      - ./nginx/log:/var/log/nginx:rw
      - ./nginx/ssl:/etc/ssl:ro
    networks:
      - default
  wp:
    image: wordpress
    restart: always
    ports: 
     - 8080:80
    environment:
      WORDPRESS_DB_HOST: mysql_db
      WORDPRESS_DB_USER: zodiac
      WORDPRESS_DB_PASSWORD: UhxvT3l4nBOHp3u
      WORDPRESS_DB_NAME: wordpressdb
    volumes:
      - ./wp/html:/var/www/html
    networks:
      - default
  
  mysql_db:
    image: mysql:5.7
    restart: always
    environment:
      MYSQL_DATABASE: wordpressdb
      MYSQL_USER: zodiac
      MYSQL_PASSWORD: UhxvT3l4nBOHp3u
      MYSQL_RANDOM_ROOT_PASSWORD: '1' # ???
    volumes:
      - ./wp/db:/var/lib/mysql
    networks:
      - default
      
networks:
  default:
```

```conf
location / { 
    proxy_set_header Host $host; 
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; 
    proxy_pass http://宿主机ip:8080; 
    }
```


##### 迁移改动
- nginx default.conf 的 ip
- 
##### 其他参考
[建站教程（四）：基于Nginx部署WordPress - 知乎](https://zhuanlan.zhihu.com/p/37614954)

[WordPress主题制作全过程（五）：制作header.php - 露兜即刻](https://www.ludou.org/create-wordpress-themes-header.html)

[wordpress主题模板开发制作教程_wordpress 模板教程-CSDN博客](https://blog.csdn.net/qq_39339179/article/details/118998401)

[使用Docker快速搭建Nginx+PHP-FPM+MySQL+phpMyAdmin环境-腾讯云开发者社区-腾讯云](https://cloud.tencent.com/developer/article/1632683)

[docker 安装 wordpress，通过nginx反向代理，绑定域名，配置https - 大数据技术派 - 博客园](https://www.cnblogs.com/data-magnifier/p/15362218.html)
## 备用资料

- [WordPress 搬家方法总结：迁移主机和更换域名 - 知乎](https://zhuanlan.zhihu.com/p/50803437)
- [github pages | websites for you and your projects, hosted directly from your github repository. just edit, push, and your changes are live.](https://pages.github.com/)
- [新网站的 SEO: 8个重要步骤](https://ahrefs.com/blog/zh/seo-for-new-website/#:~:text=%E6%96%B0%E7%BD%91%E7%AB%99%E7%9A%84%20SEO%3A%208%E4%B8%AA%E9%87%8D%E8%A6%81%E6%AD%A5%E9%AA%A4%201%201.%20%E9%80%89%E6%8B%A9%E4%B8%80%E4%B8%AA%E5%9F%9F%E5%90%8D%202%202.,SEO%20%E6%88%90%E5%8A%9F%E5%81%9A%E5%87%86%E5%A4%87%205%205.%20%E5%BC%80%E5%A7%8B%E5%85%B3%E9%94%AE%E8%AF%8D%E7%A0%94%E7%A9%B6%206%206.%20%E5%88%9B%E5%BB%BA%E4%B8%BA%E6%90%9C%E7%B4%A2%E8%80%8C%E4%BC%98%E5%8C%96%E7%9A%84%E9%A1%B5%E9%9D%A2)
- [如何利用 github pages 和 hugo 轻松搭建个人博客？ - 知乎](https://zhuanlan.zhihu.com/p/57361697)
- [host on github pages | hugo](https://gohugo.io/hosting-and-deployment/hosting-on-github/)