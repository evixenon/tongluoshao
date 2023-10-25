---
title: MD5
date: 2023-10-25
tags:
  - 安全
  - hash
---
## MD5 简介
- Merkle-Damgard 结构
- 著名散列算法, 但现在已经不安全(可以在较短时间内撞序列)
## MD5 算法
[JieweiWei/md5: 用C++实现md5加密算法](https://github.com/JieweiWei/md5)

[MD5 - 维基百科，自由的百科全书](https://zh.wikipedia.org/zh/MD5)

- 输入: 任意长度
- 输出: 128 bit

#### 表示
```
bit 表示原文件的 bit 信息
M[i] 表示原文件的第 i 位
```

#### 补位

补到 512n+448
```
if (len(bit) % 512 == 448) {
    补 1
    补 447 个 0
} else if (len(bit)) % 512 == 447 {
    补 1
} else {
    补 1
    补 (len(bit) % 512) - 1 个 0, 也就是补到 512n+448
}
```

#### 添加长度信息

把原始文件的长度表示为 64 bit, 添加在最后

#### 初始化标准幻数(IV)

用一个 4 Bytes 的缓冲器(A，B，C，D)来计算报文摘要，A,B,C,D分别是32位的寄存器，初始化使用的是十六进制表示的数字
- A: 01 23 45 67 
- B: 89 ab cd ef 
- C: fe dc ba 98 
- D: 76 54 32 10
注意: 程序端用的是小端序

#### 定义辅助函数
```python
def F(x, y, z) {
    return x&y | (~x)&z
}
def G(x, y, z) {
    return x&z | y&(~z)
}
def G(x, y, z) {
    return x^y^z
}
def I(x, y, z) {
    y^x | ~z
}
```


![[attachments/Pasted image 20230222154835.png|L|400]]

#### 主处理
- 每个 512 bit, 分成 16 份 32 bit, 经过如下16轮计算
    - s, ac 是固定值, x 是当前处理的 32 bit
    - ![[attachments/Pasted image 20230222155302.png|L|500]]
- 得到的新 ABCD, 加在初始的 ABCD 上, 和投入下一轮计算作为 IV
- 最后将 ABCD 的结果转回大端序, 就是 MD5


- ![[attachments/Pasted image 20230222155453.png]]
## MD5 的安全性
- 对4轮函数的一轮可以做到差分密码分析
- 1993伪撞库: 可以找到散列值相同但没有意义的序列
- 2004撞库: 一个多小时可以找到同散列值

=> MD5 不再安全(SHA-1也不安全)
- 用这些替代: SHA-256, Whirlpool, SHA-3
- 仅在同时使用多种散列算法时有意义(比如 MD5+SHA-1)
