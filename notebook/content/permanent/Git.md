---
title: "Git"
date: "2023-06-16"
tags:
- 工具使用
- Git
---

### Git 概念

##### HEAD
指向当前签出的分支

##### 3-Way-Merge
在目标分支上创建一个新的提交, 包括源分支和目标分支的修改.

##### Fast-Forward-Merge
只有当源分支和目标分支在历史中在同一路径时才可用, 会将目标分支推到源分支

##### Rebase
变基. 将源分支的 commit 路程在目标分支里也复制一遍.
例如, 在 feature 执行 git rebase origin, 就会将 feature 的历史复制到 origin.
如果你想让源分支历史看起来像没有经过任何合并一样, 就用 rebase 吧

##### Pull
pull = fetch + merge
pull 将远程的修改同步到本地
因为 pull 使用频率高, 频繁的 merge 会扰乱历史路径, 因此 pull 时通常会使用 rebase 选项.

##### Merge Conflict
指两个版本的代码无法自动合并的情况. 比如说两个版本的代码在同一个位置进行修改了.

### Git 命令

#### 项目相关
##### 将本地仓库上传到 remote
先在远程创建一个仓库, 内容不重要都会被覆盖

本地仓库执行
```git
git init
git add . 
git commit -am "first commit"
git remote add origin [远程仓库 ssh 地址]
git push -u -f origin main 
```

##### 添加 LICENCE
在 github 创建文件, 文件名写 licence, 可以选择模板
#### 修改
##### 直接修改上一次 commit
改完后 add, 
```git
git commit --amend
```

##### 查看当前修改状态
```git
git status -s
```

#### 分支

##### 创建分支
```git
git branch refactoring
git checkout refactoring
// 或
git checkout -b refactoring
```

##### 查看当前分支
```git
git branch --show-current
```

##### 查看所有分支
```git
git branch --list
```

##### 删除分支
```git
git branch -d <name>
```

#### 合并

##### 合并冲突
提示冲突的时候, 先通过 IDE 手动处理冲突
然后再次 add 和 commit, 若再自动打开 IDE, 这次的内容可以直接接受.

#### 回滚

##### 撤销一次 commit
准确地说是反做
```git
git revert <commit-hash>
```

##### 重置当前 commit
当前head指向某一节点, 此节点后的都丢弃
```git
git reset
```

#### 代码历史

##### 简洁查看代码历史
```git
git log --oneline
```

##### 可视化查看代码历史
```git
 git log --graph --oneline --branches
```

##### 编辑历史
操作方法同下面删除节点

如果修改的是 first commit, 则用 -root 选项
> git rebase -i --root

##### 删除一个 commit 节点
这并不是一个常规操作, 也没有专门的命令来执行, 需要使用 interactive rebase.

开始状态
```git
$ git log --oneline
311e523 (HEAD -> main) 3rd
598889b 2nd
c5f4f3d Revert "3rd change"
4c38726 3rd change
438e4f4 1st change
63330cd first commit
```

执行交互 rebase 命令, 版本是最晚的要保持不变的 hash
> git rebase -i 438e4f4


在交互中, 按照说明所指示的, 把要删除的 commit 前标为 drop (或d), 退出 vim

出现冲突的话, 直接手动保留想要的内容, 修改完成后 add(不用commit), 然后执行 `git rebase --continue`

结束
![[attachments/Pasted image 20221213155739.png|500]]

#### 暂存修改

1. 如果自己在本地做了修改, 又要拉取远程, 可能会报错要 stash
那就 `git stash`, `git pull`, `git stash pop`, 就能在 pull 同时保存自己的修改

2. 如果在 dev 开发中(半成品代码), 然后需要切回 master 改bug, 那就可以用 `git stash`/`git stash pop`

### 工作流程

#### Workflow
[[permanent/Gitflow Workflow|Gitflow Workflow]]

[[permanent/Gitlab Workflow|Gitlab Workflow]]

[[permanent/Feature Branch Workflow|Feature Branch Workflow]]

[[permanent/Trunk-based Workflow|Trunk-based Workflow]]

#### ssh 密钥生成
```bash
git config -–global user.name ‘xxxxx’
git config –-global user.email ‘xxx@xx.xxx’
ssh-keygen -t rsa -C ‘上面的邮箱’
 ```
 
代码参数含义：
- -t 指定密钥类型，默认是 rsa ，可以省略。
- -C 设置注释文字，比如邮箱。
- -f 指定密钥文件存储文件名。