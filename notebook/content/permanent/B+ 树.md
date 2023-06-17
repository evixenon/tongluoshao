---
title: "B+ 树"
date: "2023-06-16"
tags:
- 数据结构
- 数据库
---

#### B+ 树
- 内部节点不保存数据, 只保存值, 所有的数据只保存在叶子节点
- 数据磁盘块之间加入了连接

在 B 树的基础上:
- 分离 Directory 和 Datei
- 在有序作业时提升了效率
	- 有序作业(de. sequentielle Verarbeitung) e.g. “Nenne mir alle Studierenden, deren Nachname im Bereich \[Be ... Brz\] liegt.”

![[attachments/Pasted image 20221219155102.png|600]]
(最左叶子节点的那个10应该不存在)

#### 分离值 Separator
指在 directory 层的值, 这个值符合以下规则:
- 其值 $\gt$ 左子节点的所有值
- 其值 $\leq$ 右子节点的所有值(也就是说其数据在右子节点)

