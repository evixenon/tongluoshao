---
title: "MySQL"
date: "2023-06-16"
tags:
- 数据库
---
- 典型的关系型数据库管理系统
- Oracle 旗下(收购), MySQL AB 公司 开发
- 体积小, 速度快, 总拥有成本低
- 使用 [[permanent/SQL|SQL]] 语言

## 安装和初配置
[官网下载链接](https://dev.mysql.com/downloads/mysql/)
[MySQL安装 | 菜鸟教程](https://www.runoob.com/mysql/mysql-install.html)


#### Windows ZIP 包解压的安装方式
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

#### Linux 下安装和配置
默认配置文件在 `/etc/my.cnf`

可以通过以下命令检查是否已经安装
```
rpm -qa | grep mysql-server
```

在配置文件 `[mysqld]` 节点下添加
```ini
default-character-set=utf8
character-set-server=utf8
```

中文乱码问题
#todo 

![[attachments/Pasted image 20231225224259.png]]
自启动配置

#todo
![[attachments/Pasted image 20231225224552.png]]

防火墙
![[attachments/Pasted image 20231225224712.png]]

启动
```
server mysqld start
```

## 通用数据查询
```sql
/* 查询所有库 */
SHOW DATABASES;
/* 查询所有表 */
SELECT * FROM information_schema.tables where table_schema=库名;
/* 查询所有列 */
SELECT GROUP_CONCAT(column_name) FROM information_schema.columns WHERE table_name=表名 [and table_schema=库名];
```

```MySQL
/* 查看目前已有用户 */
select user, host, password from mysql.user;

/* 修改 root 密码 */
set password for root@localhost=password('yourpw');

/* 删除匿名用户 */
delete from mysql.user where user='';

/* 刷新使新配置生效 */
flush privileges;

/* 插入新用户 */
insert into mysql.user(Host, User, Password) values ("localhost", "name", password("yourpw"));

```

## 数据库操作

#### 创建数据库
```mysql
CREATE DATABASE `database_name`;
DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
```

#### 指定使用的数据库
```mysql
USE database_name;
```

#### 导入数据库
报错, 不如直接复制吧
