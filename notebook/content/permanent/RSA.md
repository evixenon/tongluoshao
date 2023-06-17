---
title: "RSA"
date: "2023-06-15"
tags:
- 安全
- 密码学
---

#### RSA
- 1978, 命名是三个人名的开头字母
- 基于质因数分解

#### RSA 密钥生成
1. 随机选择两个差不多大的质数 p, q
2. n = pq, $\Phi(n) = (p-1)(q-1)$
3. 选择一个与 p, q 互质的 e, 1 < e < $\Phi(n)$, 常选 e = 65537
4. d = e$^{-1}$ mod $\Phi(n)$, 
    - 逆元, 就是 d 要达到这个效果
    - 扩展欧几里得算法求逆元: d * m - k * Phi(n) = 1, k 正数
    - ![[Pasted image 20230221190732.png|L|400]]
5. 私钥(n, d), 公钥(n, e)

#### RSA 加密解密
- $c = m^e$ mod n
- m = c$^d$ mod n

#### 针对 RSA 的自选密文攻击
- 目标: 得到某密文 c 的明文 m, 即计算 m = c$^d$ mod n
1. 选择一个 c' = s$^e$ c (mod n), s 随机
2. 得到 m' = (c')$^d$ (mod n)
3. m = m' s$^{-1}$ 

除此之外还有 time attack, signiture attack, math attack(src: k8p12)
