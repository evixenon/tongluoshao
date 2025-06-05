---
title: "WSL Ubuntu24 配置备忘"
date: "2025-05-12"
tags:
---
#### WSL
nk, a9

#### vsc cpp 环境
[Using C++ and WSL in VS Code](https://code.visualstudio.com/docs/cpp/config-wsl#:~:text=In%20this%20tutorial%2C%20you%20will%20configure%20Visual%20Studio,Ubuntu%20in%20the%20Windows%20Subsystem%20for%20Linux%20%28WSL%29.)

```shell
sudo apt-get install build-essential gdb
```

The **code .** command opened VS Code in the current working folder, which becomes your "workspace". As you go through the tutorial, you will see three files created in a `.vscode` folder in the workspace:

- `c_cpp_properties.json` (compiler path and IntelliSense settings)
- `tasks.json` (build instructions)
- `launch.json` (debugger settings)

还有 task.json 简易教程 

#### python 环境

如果安装了 `python-is-python3` 包，则 `python` 会直接调用 `python3`：

```python
sudo apt install python-is-python3  # 显式建立软链接
```

#### tmux + 默认 zsh
```shell
# 1. 安装 zsh
sudo apt install zsh

# 2. 将 zsh 设为默认 Shell
chsh -s $(which zsh)

# 3. 安装 Oh My Zsh（增强框架）
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# 4. 启动 tmux 自动使用 zsh
tmux new -s mysession
```

#### zsh 主题

```shell
# 安装最流行的 Powerlevel10k 主题
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

```shell
# ~/.zshrc
ZSH_THEME="powerlevel10k/powerlevel10k"
```

#### 永久激活 autojump

这玩意会自己统计访问次数, 所以你只要 j 就可以了

```shell
# 永久激活（添加到 zsh 配置）
echo "[[ -s /usr/share/autojump/autojump.sh ]] && source /usr/share/autojump/autojump.sh" >> ~/.zshrc
```

#### vim
```c
set relativenumber
command! Tl :set relativenumber! | set number! " :Tl to toggle between rn and n

set guicursor=n-v-c:block,i-ci-ve:ver25
let &t_SI = "\e[5 q"  " insert: blinking line
let &t_EI = "\e[2 q"  " normal: block

colorscheme molokai
let g:molokai_original = 1
let g:rehash256 = 1

" use clip.exe to make vim y use windows clipboard
set clipboard=unnamedplus
if system('uname -r') =~ "microsoft"
    augroup Yank
        autocmd!
        autocmd TextYankPost * :call system('/mnt/c/windows/system32/clip.exe ',@")
    augroup END
endif

```
#### vscode
code 指定 vscode
```bash
# ~/.zshrc
alias code="/mnt/c/Program\ Files/Microsoft\ VS\ Code/bin/code"
```