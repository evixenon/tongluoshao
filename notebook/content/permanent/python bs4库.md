---
title: "python bs4库"
date: "2023-07-19"
tags:
- Python
---
## 介绍
一个处理 html 的库, 可以方便地获取 tag 的相关信息, 如 content, 

[Beautiful Soup 中文文档](https://beautifulsoup.cn/#id17)

## 读取文件

```python
file = open(FILE_PATH, "rb")
html_doc = file.read()
soup = BeautifulSoup(html_doc, "html.parser")
```

## NavigableString
是 BeautifulSoup 各种方法通常的返回对象, 比如说下面的 find(), find_all()

- .name 最外的tag名, 如 span
- .string 这个tag 包含的内容, 一般是确定在嵌套最里才用

##### 转 str
```python
str(NavigableString)
```

## 基础功能

#### find()
```python
# 找到第一个 class包含noselect 的 <a> 标签
a = soup.find("a", "noselect") 

# 找到第一个 class包含noselect 的 <a> 标签
a = soup.find("a", "noselect") 
```

#### find_all()
与 find() 相比, 返回一个 list, 里面是所有符合的匹配项