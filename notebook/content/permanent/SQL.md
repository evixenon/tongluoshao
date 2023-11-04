---
title: "SQL"
date: "2023-06-16"
tags:
- 数据库
---

SQL 是使用 [[permanent/ANSI|ANSI]] 标准的一种计算机语言, 除了必须符合标准的部分, 在不同版本的 SQL 中也有不同的方言.

## SQL 简介
### SQL是什么
- SQL: Structured Query Language 结构性查询语言。
- SQL是由国际标准化组织ISO制定的标准，对DBMS的统一操作方式。
### SQL存储结构
- DATABASE数据库 -> TABLE表 -> COLUMN列
- 一个系统中有若干个数据库，一个数据库有若干张表，每一张表有若干行若干列
- 下面是一张表的例子：

| name/varchar | gender/char(10) | age/int |
| ------------ | --------------- | ------- |
| zhangsan     | male            | 22      |
| lisi         | female          | 33      |
    - 每列的数据类型相同，每一行称为一条记录
### SQL语法标准
- 以分号结尾，可以单行或多行
- 空格和换行不会当作输入
- 不区分大小写（通常大写关键字）
### SQL语句分类
#### 数据定义语言DDL
- Data Definition Language
- 用来操作数据库对象的结构：库、表、列
#### 数据操作语言DML
- Data Manipulation Language
- 用来操作数据库记录：增、删、改（会修改记录的操作）
#### 数据控制语言DCL
- Data Control Language
- 用来定义和访问权限和安全级别，如用户创建和授权
#### 数据查询语言
- Data Query Language
- 用来查询记录（不会修改记录）
 
## SQL 数据类型
##### 数据类型兼容
SQL 支持 compatible range:
- 任意长度的字符串可兼容
- 任意精度的数字可兼容

|类型语法|说明|
|---|---|
|CHAR(n)|固长字符串|
|VARCHAR(n)|变长字符串|
|INT||
|FLOAT||
|DECIMAL(n,m)|n位小数, 其中小数点后m位|
|DATE|日期|
|TIME|时间|

#### 数字类型

**int**
- 整数类型

**double**
- 双精度浮点数
- `double(5,2)` 表示最多5位，其中必须有2位小数

**decimal**
- 对十进制运算比较精确的小数，适合用在钱方面

**BigDecimal**
- 可以装极大的数

#### 字符串类型
**char**
- 固长字符串, 最大 255 **字符**
- `char(255)`
- 例如用在身份证号
- 不同的编码最大可用字节数不同

**varchar**
- 变长字符串，最大 65535 Bytes
- `varchar(65535)`
- 每一个值需要1或2个字节记录长度
    - <=255 / <= 65535
- 不同的编码所对应的最大可存储的字符数不同

**text 家族(MySQL特有, 在标准中是clot)**
- 固长字符串
| 类型名     | 长度              |
| ---------- | ----------------- |
| tinytext   | $2^{8} -1$ Bytes  |
| text       | $2^{16} -1$ Bytes |
| mediumtext | $2^{24} -1$ Bytes |
| longtext   | $2^{32} -1$ Bytes |

#### 二进制类型
**blob 家族**
- 固长二进制

| 类型名     | 长度              |
| ---------- | ----------------- |
| tinyblob   | $2^{8} -1$ Bytes  |
| blob       | $2^{16} -1$ Bytes |
| mediumblob | $2^{24} -1$ Bytes |
| longblob   | $2^{32} -1$ Bytes |

#### 日期类型

| 类型名    | 含义   | 格式                | 示例                |
| --------- | ------ | ------------------- | ------------------- |
| date      | 日期   | YYYY-MM-DD          | 1970-01-01          |
| time      | 时间   | hh:mm:ss            | 23:59:59            |
| timestamp | 时间戳 | YYYY-MM-DD hh:mm:ss | 2038-01-19 03:14:07 |

## SQL 约束
Integritätbedingung

### 属性约束
#### not null

#### unique

#### primary key
unique, not null
每表有且仅有一个唯一的主键, 可以是一个或一组

#### references

> $name$ $type$ references $tablename(columnname)$

表示 $a_2$ 是来自$t_1$ 的 $a_1$ 键
如果 $t_1$ 没有对应的键则不允许

#### default $w_1$
设置默认值 $w_1$
e.g. default 'Auto'

#### check f
给定限定条件
e.g. check (A <= 100)

### 表约束
> PRIMARY KEY ($a_1$, ..., $a_k$)

> UNIQUE ($a_1$, ..., $a_k$)

> CHEKC(b)

foreign key $a_2$ references $t_1 (a_1)$
> KNr INTEGER REFERENCES K(KNr)

##### ON DELETE ... 
foreign key (a5,a6) references B (b1,b2) 
- on delete cascade 
	通常 b1, b2 在 A 表有对应项时无法更改, 如果增加此条属性, 则删除 B 中的项时, A 的对应项也会删除
- on update cascade
	更改 B 中的项时, A 的对应项也会更新
- on delete set null
	删除 B 中的项时, A 的对应项会设为 null


## SQL 增删查改

use database1;
### DDL
data defination language
- meta 层

#### 数据表的创建
- $a_i$ 属性名称
- $d_i$ 属性类型 (domain)
- $c_i$ 可选约束
```sql
CREATE TABLE Mitarbeiter
(
	a1 d1 c1,
	...
	ak dk ck
)
```
e.g. 
```sql
CREATE TABLE Mitarbeiter
(
	pNr    NUMBER(3) PRIMARY KEY,
	name   CHAR(20) DEFAULT 'empty',
    age    INT CHECK (Age > 0),
    salary DECIMAL(6,2)
)
```

#### 表修改属性, 增加属性, 删除属性
```sql
ALTER TABLE tablename
	ADD (attr type); |
	MODIFY (attr type); |
	DROP (attr);
```

drop table $n_1$
删除数据表

alter table $n_1$ add ($a_1\ d_1\ c_1,\ a_2\ d_2\ c_2,\ ...$)
增加表的属性

alter table $n_1$  drop ($a_1\ a_2$, ...)
删除表的属性

alter table $n_1$ modify ($a_1\ d_1\ c_1,\ a_2\ d_2\ c_2,\ ...$)


#### 插入数据, 删除数据

##### INSERT INTO
```sql
INSERT INTO MGA VALUES ('Weber', 001) 
```

##### DELETE FROM
```sql
DELETE FROM MGA WHERE ...
```


### DML
data manipulation language

纯读取操作


## SQL 权限
```sql
GRANT right1, right2, ...
ON table_name | view_name
TO user_name | TO PUBLIC
[WITH GRANT OPTION]
```
option: restrict, cascade


## SQL 进阶操作

#### SQL运算顺序
```sql
SELECT ...
FROM ...
[WHERE ...]
[GROUP BY ...
 [HAVING ...]]
[ORDER BY ...]
```
1. FROM WHERE
2. GROUP BY 
3. Aggregation(即函数操作)
4. HAVING
5. SELECT(projection)

### SQL JOIN
##### INNER JOIN
如果表中有至少一个匹配，则返回行
##### LEFT JOIN
即使右表中没有匹配，也从左表返回所有的行
##### RIGHT JOIN
即使左表中没有匹配，也从右表返回所有的行
##### FULL JOIN
只要其中一个表中存在匹配，则返回行
缺省值会被设置为 NULL
##### NATURAL JOIN
自动using同名属性

![[attachments/Pasted image 20221108232850.png|500]]

### 子查询
可以出现在 con 位, 以及 select...from...where... 中的任意空位
![[attachments/Pasted image 20221117115041.png|480]]

##### exists 关键字
exists:
```sql
select * from kunde k1 where exists
(select * from Kunde k2 where k1.Adr=k2.Adr and...
)
```

forall: 双重否定
...where not exists (select...from...where not...)

##### all, some, any 关键字
和 exists 一样, 作为 con 的起始
some 差不多就是引导从句用

e.g.
$A_i \ \Theta \ all (Subq) \equiv \{ ... | \forall t \in Subq: A_i \ \Theta\ t\}$
比如可以用在找数值最高最低

##### in 关键字
$A_i \ IN \ (Subq)$  可作为条件
```sql
select * from MagicNumbers where Wert in ( select
Zahl from Primzahlen)

select * from MagicNumbers where Wert not in ( select
Zahl from Primzahlen)
```

### 排序

##### ORDER BY 关键字
```sql
SELECT column_name,column_name_ 
FROM table_name  
ORDER BY column_name,column_name ASC|DESC;
```
- 默认是升序
- 可以设置多级排序, 列名间用逗号分隔
- 字符串类型不可排

### 分组

##### GROUP BY 关键字
```sql
SELECT site_id, SUM(access_log.count) AS nums  
FROM access_log GROUP BY site_id;
```
将某列数据按另一列的结果加总

##### HAVING 关键字
相当于分组时的 WHERE 条件, 只显示满足条件的分组
在分好组后开始 HAVING 的筛选

##### 根据多属性分组
```sql
SELECT Abteilung, Einheit, sum(Gehalt) FROM Mitarbeiter 
GROUP BY Abteilung, Einheit
```
![[attachments/Pasted image 20221124204053.png|500]]

##### 多表链接分组
```sql
SELECT Websites.name,COUNT(access_log.aid) AS nums FROM access_log  
LEFT JOIN Websites  
ON access_log.site_id=Websites.id  
GROUP BY Websites.name;
```
![[attachments/Pasted image 20221124203342.png|500]]

## SQL Index

#### Index 操作

##### 创建 index
```sql
CREATE INDEX index_name ON table_name (a1, ..., an);
create index name_geb on Dozent (Name, Geburt);
```

##### 删除和修改 index
```sql
DROP INDEX index_name;
ALTER INDEX index_name new_name; 
```

#### 使用 Index 的情况
```sql
/* 
* match query 
* 可以 partial 匹配, 但不能在不指定 i 的情况下指定 i+1
*/
SELECT * FROM t WHERE a1=... AND an=...;

/*
* range query
* 比较符，BETWEEN 都可用
*/
SELECT * FROM t WHERE a1=... AND ai=... AND ai+1<= ...;

/* 
* pointset query
* 可用 OR
*/
SELECT * FROM t WHERE a1=... AND ai=... AND ai+1 in (7, 77,177);
```



## SQL 函数
```sql
SELECT avg(column_name) FROM ...
```



##### MAX(), MIN(), AVG(), SUM()
字面

##### COUNT()
返回一个计数
```sql
SELECT COUNT(DISTINCT column_name) FROM table_name;
```
- COUNT(\*)
- COUNT(column_name) = COUNT(ALL column_name)

##### FIRST()/LAST()
字面

##### UCASE()/LCASE()
大小写

## SQL VIEW

### 视图是什么
- 隐藏了表的底层结构, 限制了部分操作, 简化了数据访问操作的数据呈现结构
- 只存储了必需的 Relationschema
- 数据表的变化会影响视图, 视图的变化有限制地影响数据表
- 在实际访问操作中, 会将对视图的操作翻译成对数据表的操作, 再呈现为视图
	![[attachments/Pasted image 20221124211644.png|400]]

### 视图操作

##### CREATE VIEW
创建视图
```sql
CREATE VIEW view_name AS  
SELECT column_name(s)  
FROM table_name  
WHERE condition
```

##### DROP VIEW
撤销视图
```sql
DROP VIEW view_name
```

##### CREATE \[OR REPLACE\] VIEW
这里更新视图指的是让视图的显示数据变化, 而不能直接在视图上修改数据库中的内容

更新视图语法
```sql
CREATE OR REPLACE VIEW view_name AS
SELECT column_name(s)
FROM table_name
WHERE condition
```
示例: 现在，我们希望向 "Current Product List" 视图添加 "Category" 列。我们将通过下列 SQL 更新视图：
```sql
CREATE VIEW [Current Product List] AS
SELECT ProductID,ProductName,Category
FROM Products
WHERE Discontinued=No
```

### 视图限制操作
- 允许: selection, projection, crossproduct, union, intersection, difference, group, aggregation, subqueries
- 不允许: 排序

##### Projection view
指通过 projection 操作创建的 view
- 删除视图的项无限制
- 增加视图的项时，如果有视图不包含而源数据表包含的列，则会用 NULL 代替该属性
- Kein insert/delete/update bei distinct/Arithmetik

##### Selection view
指通过 selection 操作创建的 view
- 项更新后如果不满足 WHERE 条件, 视图中的项就会消失
-  `with check option` 的话, 若更新后不满足 WHERE 则会出现错误消息

##### Join view
指通过 join 操作创建的 view
- join view 禁止 update. 原因是歧义.
	![[attachments/Pasted image 20221125125308.png|480]]

##### Updatable View
- 可以增删改的视图都属于 Updatable view
- 不能有aggregation, group by, subquery, 不能用 join 创建
Aggregation, group by, Subquery in VIEW 不可使用

