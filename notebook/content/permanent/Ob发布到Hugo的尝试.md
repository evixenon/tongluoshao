---
title: "Ob发布到Hugo的尝试"
date: "2023-06-14"
tags:
- obsidian
- hugo
---

主方案是[🪴 Quartz 3.3](https://quartz.jzhao.xyz/). 

[[permanent/网站更新记录|网站更新记录]]

特点:
- 仅找到的可用的hugo方案
- 有预览
- 同文件夹下支持双链
- 有知识图, 但感觉算法不太对劲, 而且中文会转码相当难用
- 有搜索, 但经常抽风
- 易用的fork, 快速yaml模板
- 引用预览似乎不行
- 根目录下一个 make serve 就建好

你可以看一下, search, graph, 等等是怎么实现的, 在layout里

*不要用link converter*, 会把所有中文转码

##### 关于转码
draft:true在图里是乱码, 其他好像不会

链接用别名好像 rebuild 一下也不会乱码

1.4 obsidian 支持 Proporties,  也是对 yaml 更好的支持