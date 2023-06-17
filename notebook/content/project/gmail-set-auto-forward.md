---
title: "gmail-set-auto-forward"
date: "2023-06-16"
---

这是一次探索, 后来因设置完转发邮箱需要去转发邮箱点击链接确认而不了了之.

### Google API
[官方API quickstart](https://developers.google.com/gmail/api/quickstart/python?hl=zh-cn)

[一个 Google API 的教程](https://blog.csdn.net/dingshi7798/article/details/105818987#:~:text=1%20handleClientLoad%20%28%29%20%E5%8F%AA%E9%9C%80%E8%AE%BE%E7%BD%AEAPI%E5%AF%86%E9%92%A5%EF%BC%8C%E5%B9%B6%E5%9C%A81%E6%AF%AB%E7%A7%92%E5%90%8E%E4%BC%A0%E9%80%92%E7%BB%99%20checkAuth%20%28%29%20%E3%80%82%202,%E4%BD%86%E5%B0%86%E7%94%A8%E6%88%B7%E5%91%88%E7%8E%B0%E7%99%BB%E5%BD%95%2F%E6%9D%83%E9%99%90%E6%A8%A1%E6%80%81%E3%80%82%20...%205%20%E4%B8%80%E6%97%A6%E6%89%A7%E8%A1%8C%E4%BA%86%E8%BF%99%E4%BA%9B%E7%B3%BB%E5%88%97%E7%9A%84%E5%8A%9F%E8%83%BD%E5%B9%B6%E4%B8%94%E7%94%A8%E6%88%B7%E5%B7%B2%E9%80%9A%E8%BF%87%E8%BA%AB%E4%BB%BD%E9%AA%8C%E8%AF%81%EF%BC%8C%E6%88%91%E4%BB%AC%E5%B0%B1%E5%BA%94%E8%AF%A5%E5%A7%8B%E7%BB%88%E5%9C%A8%20loadGmailApi%20%28%29%20%E5%87%BD%E6%95%B0%E4%B8%AD%E6%89%BE%E5%88%B0%E8%87%AA%E5%B7%B1%E3%80%82%20)

### selenium 
[模拟谷歌邮箱登录](https://blog.csdn.net/qq_44790423/article/details/115494045)

[读取已打开的浏览器 url](https://blog.csdn.net/weixin_43126355/article/details/122405740)

[selenium设置代理](https://zhuanlan.zhihu.com/p/158494380)

[打开新页面的N种方法](https://blog.csdn.net/kinghzking/article/details/122626574)

### pyHook
安装:
1. 下载 [swig](https://www.swig.org/download.html)
2. 解压 swig 并将根目录添加到环境变量
3. VS 安装工具, 在生成工具的单个组建里找到并安装
```text
MSVC v140  - VS 2015 C++ 生成工具
```
4. pip install PyHook3


