---
title: "Bell LaPadula 模型"
date: "2023-06-15"
tags:
- 模型
- 安全
---

- 又名多层安全模型
- 主体(用户)对客体(数据)的访问规则

#### Simple security property 简单安全规则
- no read up
- 主体对于比自己安全级别**高**的客体不可读

#### Star property 星属性安全规则
- no write down
- 主体对于比自己安全级别**低**的客体不可写

#### Strong star property 强星属性安全规则
- 主体可以对与自己安全级别相同的客体可读可写