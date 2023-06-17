---
title: "Access Token Manipulation"
date: "2023-06-16"
tags:
- 安全
---

#### Access Token Manipulation
通过操纵访问令牌(Access Token), 以另一个用户/系统进行交互, 绕过访问控制验证, 以此获得未经授权的访问能力

#### Access Token Manipulation 分类
- Token Impersonation/Theft
- Create Process with Token
- Make and Impersonate Token
- Parent PID Spoofing
- SID-History Injection

#### 防御措施
检测
- 监视命令 `runas`
- Win API(如 DuplicateToken(EX)) 监视
- 与可疑行为相关联(以减少误报)

缓解/补救措施
- 权限账户/普通用户账户管理