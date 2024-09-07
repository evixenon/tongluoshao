---
title: 使用 Algorithm-stone 跟踪 Leetcode 分类进度
date: 2024-09-05
tags:
  - 算法
  - Leetcode
---

#### 项目简介
[acm-clan/algorithm-stone: ACM/LeetCode算法竞赛路线图，最全的算法学习地图！](https://github.com/acm-clan/algorithm-stone)

Altorithm-stone 是「ACM算法日常」制作的项目, 对各类算法题进行了路线图整理, 并用可视化的方式追踪进度. 类别整理不完整, 似乎已弃坑. 但已完成的部分就足够有益.

#### 补充使用说明
因为年久失修, 只按照 readme 操作有点小问题.

本文背景: Win 11

**VS Code, Leetcode 插件**

首先按照项目的 readme, 先 fork 一份在自己的仓库里. 然后下载到本地, user 目录下, leetcode 和 codeforces 的内容应该清空. 学会使用 VS Code 的 Leetcode 插件刷题.

或者以前用 VS Code 做过 leetcode 的, 把答题文件复制过来, 注意需要修改 leetcode 插件的 工作目录.

**额外的运行环境安装**

然后是项目运行环境的问题
- 安装 Python 和相应的库
- 安装 Graphviz, 并将其 bin 目录加入系统环境变量(可能需要重启电脑)

关于需要安装的 Python 库, 项目里有 `requirements.txt`, 但因为我用 `pip install -r requirements.txt` 出现了 build wheel 失败的问题, 我后来是手动安装的. 具体方法是: 直接运行 `/src/main.py`, 报缺少什么库就装什么. 

**项目小修小补**

接下来可能会出现 `update_db: 403 Forbidden` 的问题. 这是因为网站有(简单的)反爬虫措施, 只要给 http 请求加上 user-agent 的 header 就可以.

Leetcode 修改位置在 `/src/leetcode.py` 171 行左右

```python
url = withUrl("api/problems/all/")
f = urllib.request.urlopen(url)
```

改成

```python
headers = {'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36''}
url = withUrl("api/problems/all/")
req = urllib.request.Request(url=url, headers=headers)
f = urllib.request.urlopen(req)
```

这里的 User-Agent 是原项目里用过的, 自己在浏览器 f12 看一下也是一样的.

修改 codeforces 也是差不多的原理. 如果不用 codeforces, 在 `main.py` 里面直接把 `codeforces_view.process()` 注释掉比较省事.

**折腾结束, 刷题开始**

然后再次运行 `main.py`, 正常运行的话会更新 Leetcode 的题库, 可能需要一段时间, 毕竟这个项目看起来几年没动过了

运行完成, image 文件夹的 svg 图会根据你在 user 文件夹下放的题解更新. 每次更新都似乎都需要手动运行 `main.py`, 应该可以用 Github action 优化?