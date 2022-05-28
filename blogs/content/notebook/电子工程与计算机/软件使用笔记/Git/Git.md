# Git

## 目录

*   [ssh 密钥生成](#ssh-密钥生成)

## ssh 密钥生成

```bash
git config -–global user.name ‘xxxxx’ 
git config –-global user.email ‘xxx@xx.xxx’
ssh-keygen -t rsa -C ‘上面的邮箱’
```

*   代码参数含义：

    *   \-t 指定密钥类型，默认是 rsa ，可以省略。

    *   \-C 设置注释文字，比如邮箱。

    *   \-f 指定密钥文件存储文件名。
