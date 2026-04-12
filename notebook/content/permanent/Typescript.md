---
title: Typescript
date: 2024-06-20
tags:
---

#### vsc lc

vsc 写 leetcode, debug 报错, 
- npm i typescript
- npm i ts-node
- npm i @types/node
- 也装了看上去比较官方的 vsc js/ts 插件 
然后 f5 可以 debug 了(用js调), 但会有一些什么 es2015 之后的 compiler version 之类的问题
- 如果使用了 es6 的功能, tsconfig 里 target 必须是 es6

一个能用的vscode `tsconfig.json` (在运行文件相同目录)

```json
{
 "compileOnSave": false,
 "compilerOptions": {
  "baseUrl": "./",
  "outDir": "./dist/out-tsc",
  "sourceMap": true,
  "declaration": false,
  "module": "ES2020",
  "moduleResolution": "node",
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true,
  "target": "es6",
  "typeRoots": [
    "node_modules/@types"
   ],
  "lib": [
   "ES2020",
   "dom"
  ]
 }
}
```