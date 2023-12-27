---
title: "node.js 的环境配置"
date: "2023-08-03"
tags:
---

##### 下载安装
现行版本: [Download | Node.js](https://nodejs.org/en/download)

历史版本: [Index of /dist/](https://nodejs.org/dist/)

##### 环境配置
Path 系统变量加路径

##### 验证
- node -v
- npm -v

##### 配置缓存和全局package路径
在 nodejs 根目录新建两个文件夹 `node_cache` 和 `node_global`

```cmd
npm config set prefix "node_global 完整路径"
npm config set cache "node_cache 完整路径"
```

然后在 用户 Path 变量添加 node_global 的路径,
系统变量添加 `NODE_PATH` 值为 node_global\\node_modules 完整路径, 再把`%NODE_PATH%` 加入系统 Path
