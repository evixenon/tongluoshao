---
title: "个站bug"
date: "2023-06-23"
tags:
- 个站
---

#### Fingerprint nil 问题
.gitignore 改一下把两个 index 放过去就行.
但后面怎么办还不知道
```
.DS_Store

notebook/resources

notebook/public

notebook/.idea

notebook/content/.obsidian/workspace.json

# notebook/assets/indices/linkIndex.json

# notebook/assets/indices/contentIndex.json

notebook/content/.obsidian

notebook/linkmap

notebook/static/linkmap
```

#### 同源策略导致的搜索问题
#todo 