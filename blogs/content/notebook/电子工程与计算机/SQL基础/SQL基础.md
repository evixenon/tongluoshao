# SQL基础

## 目录

*   [SQL简介](#sql简介)

    *   *   [SQL是什么](#sql是什么)

        *   [SQL存储结构](#sql存储结构)

        *   [SQL语法标准](#sql语法标准)

*   [SQL语句分类](#sql语句分类)

    *   *   [数据定义语言DDL](#数据定义语言ddl)

        *   [数据操作语言DML](#数据操作语言dml)

        *   [数据控制语言DCL](#数据控制语言dcl)

        *   [数据查询语言](#数据查询语言)

*   [SQL数据类型](#sql数据类型)

    *   [数字类型](#数字类型)

        *   [int](#int)

        *   [double](#double)

        *   [decimal](#decimal)

        *   [BigDecimal](#bigdecimal)

    *   [字符串类型](#字符串类型)

        *   [char](#char)

        *   [varchar](#varchar)

        *   [text 家族(MySQL特有, 在标准中是clot)](#text-家族mysql特有-在标准中是clot)

    *   [二进制类型](#二进制类型)

        *   [blob 家族](#blob-家族)

    *   [日期类型](#日期类型)

## SQL简介

#### SQL是什么

*   SQL: Structured Query Language 结构性查询语言。

*   SQL是由国际标准化组织ISO制定的标准，对DBMS的统一操作方式。

#### SQL存储结构

*   DATABASE数据库 -> TABLE表 -> COLUMN列

*   一个系统中有若干个数据库，一个数据库有若干张表，每一张表有若干行若干列

*   下面是一张表的例子：

    | name/varchar | gender/char(10) | age/int |
    | ------------ | --------------- | ------- |
    | zhangsan     | male            | 22      |
    | lisi         | female          | 33      |

*   每列的数据类型相同，每一行称为一条记录

#### SQL语法标准

*   以分号结尾，可以单行或多行

*   空格和换行不会当作输入

*   不区分大小写（通常大写关键字）

## SQL语句分类

#### 数据定义语言DDL

*   Data Definition Language

*   用来操作数据库对象的结构：库、表、列

#### 数据操作语言DML

*   Data Manipulation Language

*   用来操作数据库记录：增、删、改（会修改记录的操作）

#### 数据控制语言DCL

*   Data Control Language

*   用来定义和访问权限和安全级别，如用户创建和授权

#### 数据查询语言

*   Data Query Language

*   用来查询记录（不会修改记录）

## SQL数据类型

### 数字类型

#### int

*   整数类型

#### double

*   双精度浮点数

*   `double(5,2)` 表示最多5位，其中必须有2位小数

#### decimal

*   对十进制运算比较精确的小数，适合用在钱方面

#### BigDecimal

*   可以装极大的数

### 字符串类型

#### char

*   固长字符串, 最大 255 **字符**

*   `char(255)`

*   例如用在身份证号

*   不同的编码最大可用字节数不同

#### varchar

*   变长字符串，最大 65535 Bytes

*   `varchar(65535)`

*   每一个值需要1或2个字节记录长度

    <=255 / <= 65535

*   不同的编码所对应的最大可存储的字符数不同

#### text 家族(MySQL特有, 在标准中是clot)

*   固长字符串

    | 类型名        | 长度                |
    | ---------- | ----------------- |
    | tinytext   | $2^{8} -1$ Bytes  |
    | text       | $2^{16} -1$ Bytes |
    | mediumtext | $2^{24} -1$ Bytes |
    | longtext   | $2^{32} -1$ Bytes |

### 二进制类型

#### blob 家族

*   固长二进制

    | 类型名        | 长度                |
    | ---------- | ----------------- |
    | tinytext   | $2^{8} -1$ Bytes  |
    | text       | $2^{16} -1$ Bytes |
    | mediumtext | $2^{24} -1$ Bytes |
    | longtext   | $2^{32} -1$ Bytes |

### 日期类型

| 类型名       | 含义  | 格式                  | 示例                  |
| --------- | --- | ------------------- | ------------------- |
| date      | 日期  | YYYY-MM-DD          | 1970-01-01          |
| time      | 时间  | hh:mm:ss            | 23:59:59            |
| timestamp | 时间戳 | YYYY-MM-DD hh:mm:ss | 2038-01-19 03:14:07 |
