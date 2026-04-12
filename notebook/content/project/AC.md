---
title: "AC"
date: "2026-04-10"
tags:
---
#### 启动啦
- 前端：Vite + React + TypeScript + PWA（`manifest` + 图标 + Service Worker）
- 后端: FastAPI + SQLite + 小图 WebP + Docker（API + Caddy）
- 离线：仅已浏览——打开过的列表/详情 API 响应 + 对应小图进缓存，未打开过的离线不可用。

uvicorn app.main:app --reload --port 8000

npm run dev

[wow](http://localhost:5173)


## React

## SQLite
1. 打开 DBeaver → Database → New Database Connection。
2. 选 SQLite。
3. Path 选上面的 `app.db`（浏览到 `backend\data\app.db`）。
4. 点 Test Connection → Finish。

- 右键连接 → SQL Editor → New SQL Script，例如：
```sql
INSERT INTO ingredient_types (name_zh, name_en) VALUES ('蔬菜', 'Vegetables');
```

## SqlAlchemy

与 FastAPI 常常配合的 SQL 库

```python
from sqlalchemy import DateTime, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base # Base class for all models

class Recipe(Base):
    __tablename__ = "recipes"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name_zh: Mapped[str] = mapped_column(String(30)) 
    name_en: Mapped[str] = mapped_column(String(30))
    # Step-by-step text; can store Chinese. Structured steps can come later.
    instructions: Mapped[str] = mapped_column(Text())
    notes: Mapped[str] = mapped_column(Text())
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )
```


`backend/app/schemas.py`（新建）

- 做了什么：Pydantic 模型 `RecipeRead`，用于 API 出参校验与文档；`from_attributes=True` 表示可以从 ORM 对象转。
- 为什么：API 返回结构稳定，且和数据库字段解耦（以后可加计算字段而不改表）。