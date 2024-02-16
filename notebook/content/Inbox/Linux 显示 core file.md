---
title: Linux 显示 core file
date: 2024-02-16
tags:
---
用来处理这种的
```bash
$ gcc -ggdb test.c -o test.out
$ ./test.out
Floating point exception (core dumped)
```


一次性:
```bash
if ! grep -qi 'kernel.core_pattern' /etc/sysctl.conf; then
  sudo sh -c 'echo "kernel.core_pattern=core.%p.%u.%s.%e.%t" >> /etc/sysctl.conf'
  sudo sysctl -p
fi
ulimit -c unlimited
```
于是会生成以我们规定的方式命名的 core file

持久化: (最后一个引号是加的, 不加报错, 真的对吗, 注意, 这会把原文件内容全部删除)
```bash
sudo bash -c "cat << EOF > /etc/security/limits.conf
* soft core unlimited
* hard core unlimited
EOF"
```
