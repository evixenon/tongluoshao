---
title: "python unrar库"
date: "2023-06-16"
tags:
- Python
---

https://rarfile.readthedocs.io/api.html#rarfile-class


```python
from unrar import rarfile

rf = rarfile.RarFile('sgz14.rar')
for f in rf.infolist():
    print(f.filename, f.file_size)
pwd_list = []
with open('PwdDic.txt', encoding='utf-8') as pwd_file:
    print('load pwd list..')
    for ln in pwd_file:
        pwd_list.append(ln.strip())
    print('finished.')
ctr = 1
for pwd in pwd_list:
    print(str(ctr) + ' try decrpyting..' + pwd)
    try:
        rf.extractall(pwd=pwd)
        print('Found: ' + pwd)
        break
    except:
        ctr += 1
        pass
rf.close()
```