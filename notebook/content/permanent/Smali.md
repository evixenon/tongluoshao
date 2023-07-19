---
title: "Smali"
date: "2023-06-16"
---

![[attachments/Smali语法查询_1.0.0.apk]]

smali 是 Dalvik 的寄存器语言, 由 .dex 反编译而来


## 关键字
- .xxx
- 如 .class, 类名
- .register 是寄存器数量, 必须大于实际使用的寄存器数量

|名称|注释|
|---|---|
|.class|类名|
|.super|父类名，继承的上级类名名称|
|.source|源名|
|.field|变量|
|.method|方法名|
|.register|寄存器|
|.end method|方法名的结束|
|public|公有|
|protected|半公开，只有同一家人才能用|
|private|私有，只能自己使用|
|.parameter|方法参数|
|.prologue|方法开始|
|.line xxx|位于第xxx行|


## 常用指令

| 关键字       | 注释                                                   |
| ------------ | ------------------------------------------------------ |
| const        | 重写整数属性，真假属性内容，只能是数字类型             |
| const-string | 重写字符串内容                                         |
| const-wide   | 重写长整数类型，多用于修改到期时间。                   |
| return       | 返回指令                                               |
| if-eq        | 全称equal(a=b)，比较寄存器ab内容，相同则跳             |
| if-ne        | 全称not equal(a!=b)，ab内容不相同则跳                  |
| if-eqz       | 全称equal zero(a=0)，z即是0的标记，a等于0则跳          |
| if-nez       | 全称not equal zero(a!=0)，a不等于0则跳                 |
| if-ge        | 全称greater equal(a>=b)，a大于或等于则跳               |
| if-le        | 全称little equal(a<=b)，a小于或等于则跳                |
| goto         | 强制跳到指定位置                                       |
| switch       | 分支跳转，一般会有多个分支线，并根据指令跳转到适当位置 |
| iget         | 获取寄存器数据                                         |
|              |                                                        |



## 数据类型
- 单个大写字母
- 如 Z 代表 boolean
- 出现在方法头的行尾表示返回类型

|smali类型|java类型|注释|
|---|---|---|
|V|void|无返回值|
|Z|boolean|布尔值类型，返回0或1|
|B|byte|字节类型，返回字节|
|S|short|短整数类型，返回数字|
|C|char|字符类型，返回字符|
|I|int|整数类型，返回数字|
|J|long （64位 需要2个寄存器存储）|长整数类型，返回数字|
|F|float|单浮点类型，返回数字|
|D|double （64位 需要2个寄存器存储）|双浮点类型，返回数字|
|string|String|文本类型，返回字符串|
|Lxxx/xxx/xxx|object|对象类型，返回对象|


## 寄存器
- 一般方法中 p0 是 this, p1 是第一个参数
- 而静态方法中 p0 是第一个, 因为 static 没有有 this
