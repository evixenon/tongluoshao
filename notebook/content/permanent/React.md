---
title: "React"
date: "2026-04-12"
tags:
---

#### UseState
`useState` 给组件一块 会变的内存，变了界面就会 重新渲染。

- `health`：当前要显示的值。
- `setHealth`：更新这个值的唯一推荐方式；调用后 React 会再跑一次 `App`，于是 `{health}` 会变成新文案。
```ts
const [health, setHealth] = useState<string>("加载中…");
```

#### useEffect
副作用：发请求、订时钟、改 `document.title`、手动操作 DOM 等——不是「算 UI 长什么样」，而是 和外界打交道。

基本用法
```ts
 import { useEffect } from 'react';
 useEffect(() => {
   // 副作用逻辑
   return () => {
     // 清理函数（可选）
   };
 }, [dependencies]); // 依赖数组（可选）
```

```ts
useEffect(() => {
    // Dev server proxies /api to FastAPI so the browser stays same-origin.
    fetch("/api/health")
      .then((r) => r.json())
      .then((data: { status?: string }) => setHealth(data.status ?? JSON.stringify(data)))
      .catch(() =>
        setHealth("无法连接后端（请先启动 backend，端口 8000，然后刷新）"),
      );
}, []);
```