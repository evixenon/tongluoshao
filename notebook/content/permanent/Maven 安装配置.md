---
title: "maven 安装配置"
date: "2023-08-04"
tags:
---


#### 一
[新手必看！IDEA 2022配置Maven教程_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1gM4y167Tw/?spm_id_from=..search-card.all.click&vd_source=92451653bea4ed324c9bfc0287256aa5)

#### 二, 来自erpcrm
[Maven – Download Apache Maven](https://maven.apache.org/download.cgi)

放在一个全英文的文件夹, 自己觉得合适的位置

配置环境变量

验证 mvn -version

/conf/settings.xml 里面配置 `localRepository`(54行左右, 取消注释), 设置一个自定义路径, 可能需要比较大的空间

IntelliJ 的设置: 

![[attachments/Pasted image 20231023231106.png]]

如果在国内, 建议再配置一下镜像地址 settings 里的 mirrors(146行). 阿里的镜像: http://maven.aliyun.com/nexus/content/groups/public