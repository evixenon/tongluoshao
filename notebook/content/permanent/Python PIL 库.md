---
title: Python PIL 库
date: 2024-06-28
tags:
---

#### 根据色彩通道数值生成图片(Misc)
```Python
from PIL import Image

f = open('timu.txt', 'r')
lines = f.readlines()
# print(len(lines)) # 160000
f.close()

height = 400
width = 400

img = Image.new("RGB", (400, 400))
cnt = 0

for l in lines:
    l = l.strip()
    obj = l.split(" ")
    r = int(obj[0])
    g = int(obj[1])
    b = int(obj[2])
    tow = (r, g, b)
    img.putpixel((cnt%400, cnt//400), tow)
    cnt+=1

img.save("flag.png")
```