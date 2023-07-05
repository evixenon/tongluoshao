---
title: "Python Generator, Iterator"
date: "2023-06-24"
tags:
---

## Generator

gen 就是
```python
def gen_square(n):
    for i in range(1, n+1):
        yield i**2

# 然后可以用在 in 里
for i in gen_square(10):
    print(i)
```

itertools库用很多实用函数
## itertools
[itertools — Functions creating iterators for efficient looping — Python 3.11.4 documentation](https://docs.python.org/3/library/itertools.html)