---
title: "Gitflow Workflow"
date: "2023-06-16"
tags:
- Git
---

是 Git 的一种工作流.
- git branching model
- 现在受欢迎程度下降, 取而代之的是 [[permanent/Trunk-based Workflow|Trunk-based Workflow]]
- 更多分支, 分支的生命周期更长, 更大的 commit

src: [Gitflow Workflow|Atlassian](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

### Gitflow
- 为每一个 feature 创建分支, 直到 feature 完成才将分支合并到主干(导致容易偏离)
- 有独立的分支来管理 releases
- 也有 [[permanent/Feature Branch Workflow#Benifits|Feature Branch Workflow 的好处]]


#### Get started

1. 安装
[download and install gitflow](https://git-scm.com/download/win)

2. `git flow init`
这个命令是 `git init` 的拓展, 会引导用户创建 gitflow 所需要的分支
- main
- develop
- feature
- release
- hotfix
- support

#### How it works

##### main branch
official release history

##### develop branch
integration branch of features

为 main 创建一个一样的 develop 分支, 最简单的办法是创建一个空分支然后直接 push:
```git
git branch develop
git push -u origin develop
```
##### feature branches
每一个 feature 有专属的分支, 从 develop 创建, 合并到 develop

**创建一个 feature branch**
```git
git checkout develop
git checkout -b feature_branch
```

如果使用 gitflow:
```gitflow
git flow feature start feature_branch
```

**合并 feature branch**
```git
git checkout develop
git merge feature_branch
```
gitflow:
```gitflow
git flow feature finish feature_branch
```

##### release branches
当累计的 feature 足够更新一个版本 (或 ddl 要到了) 的时候, 从 develop 创建的版本分支.
当 release branch 被创建时, 就是新的 release 循环的开始, 新 feature 不再合并至这个 release branch, 只有 hotfix, 文档, 版本相关工作才可以合并到这个 release branch.
release branch 准备好, 就会合并到 main, 并 tag 版本号. 同时也将同样的内容合并到 develop. 
最后删除 release 分支.


**创建 release branch**
```git
git checkout develop
git checkout -b release/0.1.0
```
gitflow
```gitflow
git flow release start 0.1.0
// Switched to a new branch 'release/0.1.0'
```

**结束 release branch**
```git
git checkout main
git merge release/0.1.0
git checkout develop
git merge release/0.1.0
git branch -D release/0.1.0
```
gitflow
```gitflow
git flow release finish '0.1.0'
```

##### hotfix branches
唯一一种可以直接从 main 创建, 并直接合并到 main 的分支.
完成的时候同时也要合并到 develop(或者当前 release, 如果有的话).
合并后删除.

**创建 hotfix branch**
```git
git checkout main
git checkout -b hotfix_branch
```
gitflow:
```gitflow
git flow hotfix start hotfix_branch
```

**结束 hotfix branch**
```git
git checkout main
git merge release/0.1.0
git checkout develop
git merge release/0.1.0
git branch -D hotfix_branch
```
gitflow:
```gitflow
git flow release finish hotfix_branch
```

### Example
![[attachments/Pasted image 20221212230143.png|500]]

