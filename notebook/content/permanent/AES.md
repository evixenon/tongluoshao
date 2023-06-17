---
title: "AES"
date: "2023-06-15"
tags:
- 安全
- 密码学
---

#### AES
- Advanced Encryption Standard
- 1997 年美国商务部公开招标的算法, Rijndael 中标
- diffusion 也比较高

#### AES 算法
- 可变块长度 32*$N_b$ bits, 可变密钥长度 32*$N_k$ bits, $N_k$ 和 $N_b$ 4, 6, 8
- 轮数推导出: $N_r$ = max($N_b$, $N_k$) + 6

##### 总体流程
- ![[attachments/Pasted image 20230220142314.png|L|400]]

##### input -> state
- 初始变换: 与第0轮密钥异或
- ![[attachments/Pasted image 20230220142756.png|L|400]]

##### Bytesubstitution(SB)
- ![[attachments/Pasted image 20230220142645.png|L|400]]

##### ShiftRows(SR)
- ![[attachments/Pasted image 20230220142707.png|L|400]]

##### MixColumns(MC)
- 将输入的矩阵左乘一个给定的 4\*4 矩阵
- 对每一项, 比如下二图的 02\*b4, 乘完还要 ^ 给定的 多项式(GF(2$^8$)), 然后各项相加
- 那个加号代表异或! 不是相加!
- ![[attachments/Pasted image 20230220144932.png|L|400]]
- ![[attachments/Pasted image 20230220214634.png|L|400]]

##### AddRoundKey(ARK)
- AddRoundKey() 异或!
- ![[attachments/Pasted image 20230220145202.png|L|400]]

##### 计算下一轮密钥
- if i%n_k == 0: 
    - temp = Subword(Rotword(w\[i-1])) xor RCON\[1] 
    - i 当前列数
- else: temp=Subword
- 然后每一列 与 temp 异或
- ![[attachments/Pasted image 20230220221420.png|L|400]]
- ![[attachments/Pasted image 20230220145507.png|L|400]]
- ![[attachments/Pasted image 20230220221020.png|L|400]]
- ![[attachments/Pasted image 20230220221110.png|L|400]]
