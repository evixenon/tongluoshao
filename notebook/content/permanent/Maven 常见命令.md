---
title: "maven 命令"
date: "2023-08-04"
tags:
---

- mvn -v, 查看版本
- mvn compile
- mvn test-compile, 编译测试代码
- mvn test, 运行单元测试
- mvn site, 生成项目相关信息的网站
- mvn package, 根据项目生成 jar 文件
- mvn install, 在本地 repository 安装
- mvn -D maven.test.skip=true, 忽略测试文档编译
- mvn clean, 清除目标文件夹的生成结果
- ![[attachments/Pasted image 20230804152645.png]]


#### 打包
- mvn clean package, 最常用
- mvn clean install, 打完后上传到本地仓库
- mvn clean deploy, 打完包上传的远程仓库