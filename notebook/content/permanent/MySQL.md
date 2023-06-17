---
title: "MySQL"
date: "2023-06-16"
tags:
- 数据库
---

使用 [[permanent/SQL|SQL]] 语言

## 安装和初配置
[官网下载链接](https://dev.mysql.com/downloads/mysql/)
[MySQL安装 | 菜鸟教程](https://www.runoob.com/mysql/mysql-install.html)


#### ZIP 包解压的安装方式
1. 在[官网](https://dev.mysql.com/downloads/mysql/)下载对应版本的 ZIP 包, 解压到想放的位置
2. 在根目录创建 `my.ini`, 内容如下:
   ```ini
    ### my.ini
    
    [client]
	# 设置mysql客户端默认字符集
	default-character-set=utf8
	 
	[mysqld]
	# 设置3306端口
	port = 3306
	# 设置mysql的安装目录
	basedir=[安装根目录]
	# 设置 mysql数据库的数据的存放目录，MySQL 8+ 不需要以下配置，系统自己生成即可，否则有可能报错
	# datadir=C:\\web\\sqldata
	# 允许最大连接数
	max_connections=20
	# 服务端使用的字符集默认为8比特编码的latin1字符集
	character-set-server=UTF8MB4
	# 创建新表时将使用的默认存储引擎
	default-storage-engine=INNODB
	````
3. 将 bin 文件夹添加到环境变量
4. 初始化数据库, 在 cmd 输入一下, 初始化完成后记下显示的初始密码
> mysqld --initialize --console
5. 安装(需权限)
> mysqld install
6. 启动 `mysql` 服务
> net start mysql
7. 登录 sql
> mysql -h 主机名 -u 用户名 -p
8. 更改默认密码
> ALTER USER USER() IDENTIFIED BY 'new_password';

## 元数据查询
```sql
/* 查询所有库 */
SHOW DATABASES;
/* 查询所有表 */
SELECT * FROM information_schema.tables where table_schema=库名;
/* 查询所有列 */
SELECT GROUP_CONCAT(column_name) FROM information_schema.columns WHERE table_name=表名 [and table_schema=库名];
```

## 数据库操作

#### 创建数据库
```mysql
CREATE DATABASE database_name;
```

#### 指定使用的数据库
```mysql
USE database_name;
```

#### 导入数据库
报错, 不如直接复制吧
