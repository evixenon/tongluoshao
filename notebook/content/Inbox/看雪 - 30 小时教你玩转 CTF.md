---
title: 看雪 - 30 小时教你玩转 CTF
date: 2024-06-27
tags:
---
## 编码
实体编码
![[attachments/Pasted image 20240627182449.png]]

7位编码
- ascii 可打印字符 8 位, 但第一位一定为 0
#### Base
```
•Base16
•0-9，A-F 
•Base32 
•数字，A-Z，= 
•Base64
•数字，A-Z，a-z，+，/，=
•Base85
•0–9, A–Z, a–z， !#$%&()*+-;
```

#### 其他
ADFGX密码
![|200](https://www.kanxue.com/upload/attach/202308/202308241726_P2YEQZCJZRDDCQ7.jpg)


aaencode密码
•解密网站：http://utf-8.jp/public/aaencode.html
![|L|400](https://www.kanxue.com/upload/attach/202308/202308241801_QDM5XWRUPCCH7HA.jpg)

BrainFuck密码
•解密网站：[https://www.splitbrain.org/services/ook](https://www.splitbrain.org/services/ook
![|300](https://www.kanxue.com/upload/attach/202308/202308241757_WKN6MZRXGVAK53V.jpg)

JSFuck
•解密网站：[http://www.jsfuck.com](http://www.jsfuck.com/)
•或者在Console运行(对, 这是可以运行的 JS 代码)

![|300](https://www.kanxue.com/upload/attach/202308/202308241801_P39WBBDTHEKKKFM.jpg)

## Misc

### 图片隐写
![[attachments/Pasted image 20240627172559.png]]

JPG 文件头 FFD8

![[attachments/Pasted image 20240627172945.png]]

[abeluck/stegdetect: UNMAINTAINED. USE AT OWN RISK. Stegdetect is an automated tool for detecting steganographic content in images.](https://github.com/abeluck/stegdetect)

![[attachments/Pasted image 20240627173547.png]]

GIF 考察:
- GIF89a / GIF87a
- 每帧之间的时间间隔
- 逐帧查看
![[attachments/Pasted image 20240627180301.png]]

#### LSB 隐写
- Least Significant Bit
- 用颜色的二进制最后一位藏数据
- StegSolve

#### [[permanent/Python PIL 库#根据色彩通道数值生成图片(Misc)|PIL 库 根据色彩通道生成图片]]

#### 改变高度
- 如果用 010 Editor 打开改变了高度宽度的图片, 左下会提示 chunk0 CRC 与期待不符 
### 音频隐写
- 注意 EXIF 信息(这里是标题, 艺术家, 星级 ...)
- mp3: 
    - 有损压缩(意味着能隐写的地方少, 往专用工具方向想, 或者波形频谱)
    - Mp3Stego(压缩)
- 波形和频谱
    - wav
    - Audacity/Adobe Audition
- 常见的几种解法
    - 开头/结尾/大段空白里找奇怪的波形
    - 直接看频谱

![[attachments/Pasted image 20240628134023.png|300]]

![[attachments/Pasted image 20240628134314.png|400]]

### 文档隐写
文档经常只是辅助其他考察, 不会作为主要考察点

Word
- 隐藏文字(设置)
- 白底白字
- 行间距, 字体编码
- 新版(docx, pptx...) 都可以用 zip 读取, 是 doc+素材+xml

PDF
- 用编辑模式(比如用图片挡住文字)
- metadata(工具: pdfinfo)
- 隐藏内容(屏幕外的内容, 可以藏东西的装饰)
- 文件头 24 50 44 46
- 用库, pdf.js, 
- [Extract Text from a PDF — pypdf 4.3.0 documentation](https://pypdf.readthedocs.io/en/latest/user/extract-text.html)


隐写工具: wb4stego4open

### 固件和磁盘镜像
- 可能作为解题的第一步
- 多个文件结合的结构
- 工具: binwalk -e, foremose, dd
- 磁盘镜像: mount 挂载
## 密码学
- 古典密码: 密码体系的安全性取决于**算法**的保密
- 现代密码: 密码体系的安全性取决于**密钥**的保密
- => 解决算法的保密问题(不用保密算法也能要安全性)

- 对称密码: 加密密钥和解密密钥**相同**
- 非对称密码: 加密密钥和解密密钥**不同**
- => 解决密钥的传输问题

Python 现代密码库 pycryptodome


