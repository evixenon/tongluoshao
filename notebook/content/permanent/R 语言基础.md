---
title: "R 语言基础"
date: "2023-07-27"
draft: true
tags:
---

## 准备工作

#### 安装

R下载: [R: The R Project for Statistical Computing](https://www.r-project.org/)

RStudio下载: [RStudio Desktop - Posit](https://posit.co/download/rstudio-desktop/)

课程文件: [CourseFiles - Google 云端硬盘](https://drive.google.com/drive/folders/15U8WjVKbYXaq6N6Wb_6bCr9QZ1DwCkAO)

#### 帮助
在 R 交互查帮助用 `?函数名`
```R
# 查询 plot 的用法
?plot
```

官方 Manual: [CRAN: Manuals](https://cran.r-project.org/manuals.html)

## Package

Package 就是封装好的 *R 语言工具 Kit*, 加载了一个 package 就可以使用这个 package 的功能(即函数) 

#### Package 获取

分为
- base package: 会在安装 R 的时候安装好的包, 但默认不会加载
- contributed package: 需要单独安装, 加载

获得方式
- [The Comprehensive R Archive Network](https://cran.r-project.org/) 左边的 Task View 根据任务分类
- [Trending R repositories on GitHub today](https://github.com/trending/r) 查找 Github 上开源的 Package
- [Bioconductor - Home](https://www.bioconductor.org/)

教程作者的常用包
- `dplyr`, deply r, 操作 dataframe
- `tidyr`, tidy r, cleaning up information
- `stringr`, 操作字符串/文本
- `lubridate`, 操作 date 信息
- `http`, 处理网页信息
- `ggvis`, gg=grammar of graphic, interactive visualization
- `ggplot2`, **最常用的可视化包**
- `shiny`, create app that you can install on website
- `rio`, r input output, 用来导入导出数据
- `rmarkdown`, 想分享数据时, 创建 interactive notebooks/rich document
- `pacman`, package manager, **one package to load them all**

#### R 语言的 Package 操作
```R
# 安装一个名叫 pacman 的包
install.packages("pacman") 

require(pacman) # 加载并提示是否加载成功
library(pacman) # 加载, 没有提示
```

在信息窗的 `Package` 可以查看已加载的包

使用 `::` 可以在没有加载某个包的时候用这个包的函数
```R
# 使用 pacman 的函数 p_load() 加载 ggplot2 包, 如果没有安装 ggplot2 会自动安装
pacman::p_load(ggplot2) 
```

pacman 的 `p_unload()` 则可以 unload
```R
p_unload(ggplot2) # unload 某个包
p_unload(all) # unload 所有加载的包
```

#### 拓展: R的教程包swirl
swirl 是配套 coursera上的约翰霍普金斯大学的R语言课程 写的

```R
# 安装和加载
install.packages("pacman")
pacman::p_load(swirl)

swirl()
```

然后跟着指示走吧
## 获取数据

#### datasets 包
```R
library(datasets) 
```

#### 一维数组
```R
x <- c(10, 10, 20, 40)
# 等同于
assign("x", c(10.4, 5.6, 3.1, 6.4, 21.7))

# 从 -5 开始, 步长 0.2, 一共 51 个数
# -5, -4.8, ... , 4.8, 5
s4 <- seq(length=51, from=-5, by=.2)

# x 重复 5 次
s5 <- rep(x, times=5)

# x 的每个数据重复 5 次
s6 <- rep(x, each=5)
```

#### 带标签的一维数组
```R
# 数每一个项和出现的次数
table(c(10,10,40,30))

# 输出:
# 10 30 40 
#  2  1  1
```


## Graphs

### Base

#### plot()

通常用来画散点图, 有时也会自适应画其他

##### plot(x, y)
散点图

给 x, y 轴数据, 自动选择合适的图表类型生成 graph

实际上并不必要是两组数据, 函数会自适应
- 如果只给一组数据, 就默认把 index(序数) 当作 x 轴数据; 
- 如果给更多组数据, 也会做成一组 graphs

##### plot(func, start, end)
```R
# 画出正态分布 -3 到 3 的区间
# dnorm = density of normal distribution
plot(dnorm, -3, 3) 
```

#### 参数
`?plot` 查看帮助

各种图表通用的参数:
- col, 颜色
- main, 标题
- xlab, ylab, x轴/y轴标签
- xlim, ylim, x轴/y轴的范围

```R
# Plot with options
plot(iris$Petal.Length, iris$Petal.Width,
  col = "#cc0000",  # Hex code for datalab.cc red
  pch = 19,         # Use solid circles for points. pch=point character
  main = "Iris: Petal Length vs. Petal Width", # title
  xlab = "Petal Length",
  ylab = "Petal Width")
```

其他参数
- lwd: line width

#### barplot() 条形图
barplot(data)

这个 data 比如说 table 生成的
```R
barplot(table(iris$Species))
```

#todo ~是什么
```R
boxplot(iris$Sepal.Length~iris$Species)
typeof(iris$Petal.Length~iris$Species)
[1] "language"
```

#### hist() 直方图
直方图(histogram)和条形图(bar chart)的区别是, 直方图的 x 轴是连续的数值, 且柱子之间没有空隙. 所以条形图更适合统计某一类的数量, 直方图更适合展示分布情况.

```R
hist(iris$Sepal.Length)
```

#### 多个图像
通过 `par(mfrow=c(r)`

下图是直方图课件里的例子
![[attachments/Pasted image 20230730131327.png]]

### ggplot2

[手把手教你使用ggplot2绘制条形图 - 知乎](https://zhuanlan.zhihu.com/p/25173606)
## Distribution

dnorm = density of normal distribution