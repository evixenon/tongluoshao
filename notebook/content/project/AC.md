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

