---
title: "Laplace 分布"
date: "2023-07-21"
tags:
- 统计学
- 数学
---

### Laplace 定理

在拉普拉斯概率空间中, 基本事件的总数是可数的, 各事件发生的可能性是一样的

Laplace 定理, 公式:

$$ P(A) := \frac{|A|}{|\Omega|} = \frac{|A|}{n} $$

- P = Probability
- $\omega_i$ = 单独可数的基本事件 
- $\Omega$ = ${\omega_1, \omega_2, ..., \omega_n}$ = (可能发生的)事件总集
- A = 达成条件A的事件(的合集)

拉普拉斯概率空间的局限性很大, 因此数学家们又将概率推广到离散概率空间

[皮埃尔-西蒙·拉普拉斯 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/%E7%9A%AE%E5%9F%83%E5%B0%94-%E8%A5%BF%E8%92%99%C2%B7%E6%8B%89%E6%99%AE%E6%8B%89%E6%96%AF)

### 离散概率空间

离散概率空间 $(\Omega, P)$, 
- 子集 $A$, $P(A) = \sum_{\omega \in A} P({\omega})$
- $0<P(\omega)<1$
- $\sum_{\omega \in \Omega} P(\omega)$ = 1

### Kolmogorov 的概率分布公理

##### Axiom

A1) $P(A) \ge 0$, for any $A \subset \Omega$

A2) $P(\Omega) = 1$

A3) $P(A\cup B) = P(A) + P(B)$, for disjunct result $A, B \subset \Omega$

由以上又可推其他常用公式
![[attachments/Pasted image 20230721203343.png]]

[安德雷·柯尔莫哥洛夫 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/%E5%AE%89%E5%BE%B7%E9%9B%B7%C2%B7%E6%9F%AF%E7%88%BE%E8%8E%AB%E5%93%A5%E6%B4%9B%E5%A4%AB)
