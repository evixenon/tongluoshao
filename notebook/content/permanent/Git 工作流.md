---
title: "Git 工作流"
date: "2025-05-21"
tags:
---

## Gitflow workflow
- git branching model
- 现在受欢迎程度下降, 取而代之的是 [[#Trunk-based Workflow]]
- 更多分支, 分支的生命周期更长, 更大的 commit
- 为每一个 feature 创建分支, 直到 feature 完成才将分支合并到主干(导致容易偏离)
- 有独立的分支来管理 releases
- 也有 [[#Feature Branch Workflow]] 的好处
src: [Gitflow Workflow|Atlassian](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

#### 速通
1. 接手一个项目
    1. `git clone` 到本地
    2. `git checkout -b myfeature` 通常是从 dev
2. 修改代码
    1. add, commit
3. 如果修改过程中, 远端代码发生了改变, 则回到 main 拉取改动, 再将新代码 rebase 到 main
    1. `git checkout main`
    2. `git pull origin main`
    3. `git checkout myfeature`
    4. `git rebase main` 并处理 conflict. 有时也用 `rebase -i` 合并成一个 commit 再提交
    5. `git push -f origin myfeature`
    6. 此时项目管理者应采用 `pull request` 中的 `squash and merge`, 合并 myfeature
4. 远端更新完成后, 删除本地分支 
    1. `git push origin myfeature`
5.  hotfix
    1. 从 main pull, 合并到 main 和 dev


![[attachments/Pasted image 20221212230143.png|500]]

#### 分支简介
- main: official release history
- develop:  integration branch of features
- feature: 每一个 feature 有专属的分支, 从 develop 创建, 合并到 develop
- release:
    - 当累计的 feature 足够更新一个版本 (或 ddl 要到了) 的时候, 从 develop 创建的版本分支.
    - 当 release branch 被创建时, 就是新的 release 循环的开始, 新 feature 不再合并至这个 release branch, 只有 hotfix, 文档, 版本相关工作才可以合并到这个 release branch.
    - release branch 准备好, 就会合并到 main, 并 tag 版本号. 同时也将同样的内容合并到 develop.  最后删除 release 分支.
- hotfix: 
    - 如果上线后，发现有bug，如果此时main分支已经又合并上新功能B了，但是这个临时的版本又不想包含B的功能，那么可以切换到上次的official tag，checkout -b一个hotfix分支进行bug修复，hotfix分支要进行保留，不能删除。测试没问题就可以发版了，最后可以合并到main上。
    - 唯一一种可以直接从 main 创建, 并直接合并到 main 的分支.
    - 完成的时候同时也要合并到 develop(或者当前 release, 如果有的话). 合并后删除.
####  gitflow 流程指令

安装 gitflow 工具 [download and install gitflow](https://git-scm.com/download/win)

`git flow init` 命令是 `git init` 的拓展, 会引导用户创建 gitflow 所需要的分支
- main
- develop
- feature
- release
- hotfix
- support

创建一个新 feature
```gitflow
git flow feature start feature_branch
```

合并一个 feature-branch

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

你还应该知道:
- stash
- cherry-pick
- reset


## Gitlab Workflow

#### 流程
1. 提出了 issue
2. 建立 branch
3. 开发, 测试
4. 提出合并请求
5. 合并 review
6. 合并到主干
7. build

![[Pasted image 20221212230701.png|500]]

## Feature Branch Workflow
- pull requests
- isolated experiments
- efficient collaboration

## Trunk-based Workflow
- best for DevOps?