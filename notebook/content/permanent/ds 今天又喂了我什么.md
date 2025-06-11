---
title: "ds 今天又喂了我什么"
date: "2025-05-27"
tags:
---

#### 发布时删除注释

是的，可以通过以下几种方法实现 **“开发时保留注释，发布时自动删除”** 的需求：

---

**方法 1：使用预处理工具（如 `sed` 或 `awk`）**
**步骤**
1. **在开发代码中添加特殊标记的注释**（例如 `# DEV:`）：  
   ```bash
   # DEV: 这是开发时可见的注释
   export OMP_NUM_THREADS=$1
   ```

2. **发布时用 `sed` 删除这些注释**：  
   ```bash
   sed -i '/^# DEV:/d' script.sh
   ```
   - 这会删除所有以 `# DEV:` 开头的行。

**优点**
- 简单直接，无需额外工具。

**缺点**
- 需要手动运行清理命令。

---

**方法 2：使用代码生成工具（如 M4）**
**步骤**
1. **将脚本改为模板文件（`script.sh.m4`）**，用宏控制注释：  
   ```bash
   define(`DEV_COMMENT`, `# $1')dnl
   DEV_COMMENT(这是开发时可见的注释)
   export OMP_NUM_THREADS=$1
```

2. **开发时生成带注释的代码**：  
```bash
   m4 script.sh.m4 > script.sh
```

3. **发布时生成无注释代码**：  
```bash
   m4 -DDEV_COMMENT='dnl' script.sh.m4 > script.sh
```

**优点**
- 灵活控制注释的显示/隐藏。

**缺点**
- 需要安装 `m4` 工具。

---

**方法 3：使用 Git Hooks 自动清理（推荐）**
**步骤**
1. **在开发代码中使用普通注释**，无需特殊标记。

2. **创建 Git 的 `pre-commit` Hook**（在 `.git/hooks/pre-commit` 中）：  
```bash
#!/bin/bash
sed -i '/^#/d' script.sh  # 提交时删除所有注释
git add script.sh
```

3. **创建 `post-commit` Hook 恢复注释**：  
```bash
#!/bin/bash
git checkout HEAD -- script.sh  # 提交后恢复注释
```

**优点**
- 自动化流程，适合团队协作。

**缺点**
- 需要配置 Git Hooks。

---

**方法 4：使用 IDE/编辑器插件**
- **VS Code**：通过 [Regex Replace](https://marketplace.visualstudio.com/items?itemName=angelomollame.regex-replace) 插件匹配并隐藏注释。  
- **Vim**：用 `:g/^# DEV:/d` 删除特定注释。

**优点**
- 适合个人开发者。

---

**终极方案：注释 + 发布脚本**
1. **保留所有注释**，但在发布时通过脚本生成纯净版：  
   ```bash
   #!/bin/bash
   grep -v '^#' script.sh > script-release.sh
   chmod +x script-release.sh
   ```

2. **实际发布 `script-release.sh`**，保留 `script.sh` 供开发。

---

**总结**
| 方法               | 适用场景                  | 复杂度 |
|--------------------|--------------------------|--------|
| `sed`/`awk`        | 快速临时方案              | ★★☆    |
| M4 模板            | 需要精细控制              | ★★★    |
| Git Hooks          | 团队协作                  | ★★☆    |
| IDE 插件           | 个人开发                  | ★☆☆    |
| 发布脚本生成纯净版 | 分离开发与发布版本        | ★★☆    |

**推荐选择**：  
- 个人项目 → **方法 1** 或 **方法 4**  
- 团队项目 → **方法 3**（Git Hooks）

#### run.sh 注释

在代码中添加 **Ghost Comments**（“幽灵注释”，即不影响代码逻辑但帮助理解的注释）是一种良好的实践，可以提高可读性。以下是针对你的 Bash 脚本的优化版本，添加了清晰的注释说明每个关键部分的作用：

---

**优化后的脚本（含 Ghost Comments）**

```bash
#!/bin/bash

=============================================
Ghost Comment: 
  此脚本用于多线程运行稀疏矩阵向量乘法 (SpMV) 测试，
  并记录不同线程数下的性能结果。
  用法: ./script.sh <线程数>
=============================================

检查是否传入线程数参数
if [ -z "$1" ]; then
    echo "Error: Need to pass number of threads as first argument" >&2
    exit 1
fi

=============================================
Ghost Comment: 
  OpenMP 环境变量配置：
  - OMP_PROC_BIND=close    : 绑定线程到相邻物理核心
  - OMP_PLACES=cores       : 线程绑定到物理核心（非逻辑线程）
  - OMP_WAIT_POLICY=active : 线程主动 spin 减少延迟
  - OMP_NUM_THREADS        : 控制并行线程数
=============================================
export OMP_PROC_BIND=close
export OMP_PLACES=cores
export OMP_WAIT_POLICY=active
export OMP_DISPLAY_ENV=true
export OMP_NUM_THREADS=$1

格式化线程数为 3 位数字（如 4 → 004）
THREADS=$(printf %03d "$1")
BASE_DIR=/home/ru37geh

=============================================
Ghost Comment: 
  运行测试的函数：
  1. 从 ss490matrices.txt 读取矩阵名
  2. 调用 ./spmvrd 对每个矩阵测试
  3. 结果保存到 ${RESULT_DIR}/<矩阵名>-<线程数>threads.csv
  4. 移动总开销文件到结果目录
=============================================
run() {
    local CONF=$1      # 预留参数（未使用）
    local RESULT_DIR=$2

    # 创建结果目录（如果不存在）
    mkdir -p "$RESULT_DIR"

    # 逐行读取矩阵列表文件
    while read -r group name; do
        # 去除矩阵名中的空格（防止路径问题）
        name=$(echo "$name" | tr -d '[:space:]')

        # Ghost Comment: 
        #   - -f : 指定矩阵文件路径
        #   - -v : 可能启用详细日志（取决于 spmvrd 实现）
        #   - -o : 输出结果到 CSV 文件
        ./spmvrd \
            -f "$BASE_DIR/mtx/suitesparse/$group/$name.mtx" \
            -v \
            -o "${RESULT_DIR}/${name}-${THREADS}threads.csv"
    done < ss490matrices.txt

    # 移动总开销文件
    mv "overhead-${THREADS}threads.csv" "${RESULT_DIR}"
}

=============================================
Ghost Comment: 
  主执行逻辑：
  - 调用 run 函数，结果保存到 results/<线程数>threads/
  - 第一个参数 0 为占位符（未使用）
=============================================
run 0 "results/${THREADS}threads/"
```

---

**Ghost Comments 的添加原则**
1. **文件头注释**  
   - 说明脚本的 **目的**、**用法** 和 **核心逻辑**。

2. **模块分隔注释**  
   - 用 ` ===` 或 `---` 划分逻辑块（如环境变量配置、函数定义）。

3. **关键变量注释**  
   - 解释 `OMP_*` 等环境变量的作用。

4. **函数注释**  
   - 描述函数的 **输入**、**输出** 和 **行为**。

5. **复杂命令注释**  
   - 在 `./spmvrd` 调用前说明参数含义。

6. **错误处理提示**  
   - 在 `if [ -z "$1" ]` 处强调参数检查的必要性。

---

**效果对比**

| 原代码                          | 添加 Ghost Comments 后                     |
|---------------------------------|--------------------------------------------|
| 需要逐行阅读逻辑                | 通过注释快速理解整体结构和关键决策点       |
| 环境变量用途不清晰              | 明确说明 `OMP_PROC_BIND` 等的作用          |
| 函数 `run` 的输入输出不直观     | 注释明确其数据流和文件操作                |

---

**扩展建议**
1. **日志增强**：  
   在 `run` 函数中添加 `echo` 打印当前测试的矩阵名，方便跟踪进度：
   ```bash
   echo "Testing matrix: $name (Threads=$THREADS)"
   ```

2. **错误处理**：  
   检查 `ss490matrices.txt` 是否存在：
   ```bash
   if [ ! -f "ss490matrices.txt" ]; then
       echo "Error: Matrix list file ss490matrices.txt not found!" >&2
       exit 1
   fi
   ```

3. **参数验证**：  
   确保线程数为正整数：
   ```bash
   if ! [[ "$1" =~ ^[0-9]+$ ]]; then
       echo "Error: Thread count must be a positive integer" >&2
       exit 1
   fi
   ```

#### 解卦

上卦是3，下卦是4，变爻是4，帮我算一卦梅花易数

根据您提供的数字，我们用梅花易数的方法来起卦和分析：

一、确定本卦
- **上卦（3）**：对应八卦中的 **离卦（☲）**  
  八卦序数：1乾 2兑 3离 4震 5巽 6坎 7艮 8坤。
- **下卦（4）**：对应八卦中的 **震卦（☳）**  
- **本卦**：上离下震，组合为 **火雷噬嗑卦（䷔）**  
  **卦象解读**：噬嗑象征咬合、突破阻碍，需果断行动，但过程中可能有冲突或阻碍。

二、确定变爻
- **变爻是第4爻**（从下往上数，初爻为1）：  
  噬嗑卦第4爻阳爻变阴爻，上卦离（☲）变为艮（☶），生成 **变卦：山雷颐（䷚）**  
  **卦象解读**：颐卦代表修养、等待时机，需静心调整，注重内在积累。

三、动爻爻辞参考
噬嗑卦第4爻辞：  
**「噬干胏，得金矢，利艰贞，吉。」**  
含义：处理棘手问题时如咬硬骨，但秉持正直（金矢）和坚持（艰贞），最终吉祥。

四、体用生克分析
- **体卦（下卦）**：震木（代表自己）  
- **用卦（上卦）**：离火（代表外部环境）  
- **生克关系**：木生火（体生用），需付出精力，可能消耗较大，需注意能量分配。

五、变卦提示
变卦颐（䷚）提示：当前宜暂停行动，养精蓄锐，专注学习和计划，等待更适合的时机。

综合建议
1. **短期**：面临阻碍时（噬嗑），需果断解决，但避免强攻，可借助他人力量。  
2. **长期**：转向颐卦的修养策略，积累资源，提升自身能力。  

此卦提示先行动后调整，最终结果向好，但需注意过程中的消耗。  

---
以上内容由AI生成，仅供娱乐参考。玄学算命是一种可能性的艺术，其内容并非绝对，切勿过度依赖。希望您能更关注自己的现实生活，理性看待此类信息。愿您在未来的日子里，心怀希望，脚踏实地，收获属于自己的美好与幸福。

#### jyy 的 wget
wget -r -np -nH --cut-dirs=2 -R "index.html*" "https://jyywiki.cn/os-demos/introduction/logisim/" 这条命令的各个参数是什么意思

这条 `wget` 命令用于递归下载指定网址的内容，同时过滤掉不必要的文件和目录结构。以下是各个参数的含义及作用：


 **参数解析**
 
| 参数                                                    | 全称/含义                    | 作用                                               |
| ----------------------------------------------------- | ------------------------ | ------------------------------------------------ |
| `-r`                                                  | `--recursive`            | **递归下载**，抓取指定 URL 的所有子目录和文件。                     |
| `-np`                                                 | `--no-parent`            | **不追溯父目录**，仅下载当前目录及其子目录内容，避免下载上级无关文件。            |
| `-nH`                                                 | `--no-host-directories`  | **不创建主机名目录**，默认会生成类似 `jyywiki.cn` 的根目录，此参数禁用该行为。 |
| `--cut-dirs=2`                                        | -                        | **忽略远程路径中的前 2 级目录**，直接保存到本地当前目录。                 |
| `-R "index.html*"`                                    | `--reject="index.html*"` | **排除匹配的文件**，不下载所有 `index.html` 文件（如自动生成的索引页）。    |


**命令整体作用**
递归下载 `https://jyywiki.cn/os-demos/introduction/logisim/` 下的所有文件，但：
1. **不下载父目录**（如 `/os-demos/introduction/` 之外的内容）。
2. **本地不生成 `jyywiki.cn` 目录**，直接保存到当前文件夹。
3. **忽略路径前 2 级**（即跳过 `/os-demos/introduction/`，直接保存 `logisim/` 下的内容）。
4. **排除所有 `index.html` 文件**（避免下载冗余的索引页）。


 **示例对比**
 **原始 URL 结构**
```
https://jyywiki.cn/os-demos/introduction/logisim/file1
https://jyywiki.cn/os-demos/introduction/logisim/subdir/file2
```

 **默认下载后的本地结构（无参数）**
```
jyywiki.cn/os-demos/introduction/logisim/file1
jyywiki.cn/os-demos/introduction/logisim/subdir/file2
```

 **使用该命令后的本地结构**
```
./logisim/file1          # -nH 去掉了主机名，--cut-dirs=2 跳过了前 2 级目录
./logisim/subdir/file2
```


 **常见问题**
1. **为什么用 `-np`？**  
   防止下载到 `/os-demos/` 或 `/introduction/` 中与目标无关的文件。

2. **`--cut-dirs=2` 如何计算？**  
   URL 中 `https://jyywiki.cn/os-demos/introduction/logisim/` 的目录层级：  
   `os-demos` (1) + `introduction` (2) → 前 2 级被忽略。

3. **如何调整排除文件？**  
   修改 `-R` 参数，例如 `-R "*.tmp,*.bak"` 排除临时文件。


 **替代方案**
如果需保留更多原始路径，可减少 `--cut-dirs` 的值或移除 `-nH`。例如：
```bash
wget -r -np -nH --cut-dirs=1 https://jyywiki.cn/os-demos/introduction/logisim/
```
此时本地路径会保留 `introduction/logisim/`。

#### 进程和线程继承的内存空间

 **进程创建（fork）**  
- **继承父进程的全部虚拟地址空间副本**：  
  - 代码段（text）  
  - 数据段（全局变量、静态变量）  
  - 堆（heap）  
  - 栈（stack）  
  - 文件描述符表  
- **写时复制（Copy-On-Write）**：  
  物理内存实际复制发生在父/子进程修改共享数据时（优化性能）。  
- **exec() 后**：  
  新程序完全替换原有内存空间（仅保留文件描述符等元信息）。

---

 **线程创建（pthread_create）**  
- **共享进程的全部内存空间**：  
  - 代码段、数据段、堆、打开的文件资源。  
- **独享资源**：  
  - 线程栈（每个线程有独立栈空间）  
  - 线程局部存储（TLS）  
  - 寄存器状态（如程序计数器）

---

 关键区别总结  
 
| **特性**       | 进程                                     | 线程                                     |  
|----------------|------------------------------------------|------------------------------------------|  
| **内存空间**   | 独立副本（初始通过写时复制共享）         | 共享进程的全部内存                       |  
| **通信成本**   | 高（需 IPC：管道、共享内存等）           | 低（直接读写共享变量）                   |  
| **安全性**     | 高（隔离崩溃）                           | 低（一个线程崩溃可能导致整个进程退出）   |  

---

你可能还想知道：  
- 写时复制（Copy-On-Write）的具体实现机制  
- 线程间如何通过共享内存同步数据（互斥锁/信号量）  
- 进程的 `exec()` 如何替换内存空间  
- 线程局部存储（TLS）的应用场景  
- 进程/线程创建的性能开销对比

#### linux 选择历史参数

在 Ubuntu 终端中，当输入了错误的命令但参数正确时（如 `cd 1.txt`），可以通过以下快捷键快速获取参数并用于新命令：

 解决方案
1. **获取上一个命令的最后一个参数**  
   示例：
```bash
$ cd 1.txt        # 错误命令
$ cat !$          # 自动替换为 cat 1.txt
```

2. **获取上一个命令的所有参数**  
   示例：
```bash
$ cp file1.txt file2.txt   # 错误命令
$ ls !*                    # 自动替换为 ls file1.txt file2.txt
```

3. **交互式选择历史参数（推荐）**  
   按 `Alt + .`（或 `Esc + .`），每按一次会插入上一个命令的最后一个参数，可连续按来遍历历史参数。


 其他相关技巧
 
| 快捷键/符号 | 作用 |
|-------------|------|
| `!!`        | 上一个完整命令 |
| `!^`        | 上一个命令的第一个参数 |
| `!:n`       | 上一个命令的第 n 个参数（如 `!:2`） |
| `Ctrl + R`  | 反向搜索命令历史 |

你可能还想知道：  
- 如何修改并重新执行上一条命令  
- 如何快速调用历史命令中的特定参数  
- 如何批量处理多个历史命令的参数  
- `fc` 命令的高级历史编辑技巧  
- Zsh 中的历史参数扩展功能

#### 来点开心的

有必要吗
![[attachments/Pasted image 20250611132036.png]]