---
title: BA
date: 2024-10-09
tags:
---
## Prepare and Config

##### git ssh
-  Ubuntu 24 user.email: nuohengluo@qq.com

通过 `ssh-keygen -t rsa -C 邮箱` 生成的 rsa 在
```
Your identification has been saved in /home/nk/.ssh/id_rsa
Your public key has been saved in /home/nk/.ssh/id_rsa.pub
The key fingerprint is:
SHA256:2gStlQbeNsbwGLsmHzbtCekFYYehJnbEtvIFEyDuhCI nuohengluo@qq.com
The key's randomart image is:
+---[RSA 3072]----+
|. .oo.Bo.        |
|o. .=+.& .       |
|Eoo.++* %        |
|=..+. .% .       |
| . o..X S        |
|    .* X .       |
|      + +        |
|                 |
|                 |
+----[SHA256]-----+
```

```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCqRKdNEi0BdbS4d4vL5N27pEPi65fbbySJ4JFyy8Kcxc2StMsqJFmyG7PWOvsz3k3RCkNlRFunIbLerX7bucTry9V9+66kVVFhH28o+TAzSGvbOsyR5GV7Dtdl3qLhiNZjrwgO0bnT2LYioVNShhzsLFguNE5D6SIGk5gwXjLC7dew/avQ6jYyaG+7xIPHMETu1Bgl3kTy2l8EEtowz5/WKTWRy5maCrP7iio+fsfTbl3CGv1jowBG3e0pWiU9mUP+x6sNqyBZVntzeQi83Uz2rKCLdxM9ErVvbEQY+e61axlCC8v+xNuLgz9yIkAfikjWkKrBisNiopN4TeXWEq0eTmxAF8M1JA2Ld7G7LkXOKHKjQt/Nfw7+xcA3CEReKacehbswuPGlerb4ZBj//4TDCTZiwU+k1Dgm6u9ISMqWZmcLFgXQtiZCIs6awarTToOmzKF100FCkMZV1ZzN/lfYHTYIukOYgs/1bEqvYgiRJGB2dSKpvwpvRhgISfn3E6E= nuohengluo@qq.com
```


## Collect Materials

- you should cite it if your use their matrices [About | SuiteSparse Matrix Collection](https://sparse.tamu.edu/about)

cpu uses SRAM

The stack distance algorithm is based on [Kim et al. 1991](https://dl.acm.org/doi/pdf/10.1145/107972.107995)

## Comments

#### makefile
This is a Makefile for building a C++ program called `spmvrd` (likely "Sparse Matrix-Vector Multiplication with Reordering"). Let me break it down section by section:

##### Basic Configuration

```makefile
SHELL:=/bin/bash
BIN:=spmvrd
```

Sets the shell to bash and defines the final executable name as `spmvrd`.

##### File Discovery

```makefile
HEADERS:=$(wildcard *.h)
SOURCES:=$(wildcard *.cpp)
OBJECTS:=$(SOURCES:.cpp=.o)
```

Automatically finds all `.h` header files and `.cpp` source files in the current directory, then creates a list of corresponding `.o` object files.

##### Compiler Flags

The `CXXFLAGS` are built up incrementally:

**Performance flags:**

- `-std=c++20`: Use C++20 standard
- `-fopenmp`: Enable OpenMP for parallel processing
- `-Ofast`: Aggressive optimization (faster than `-O3`)
- `-march=native -mtune=native`: Optimize for the current CPU architecture
- `-flto`: Link-time optimization

**Build configuration:**

- `-DNDEBUG`: Disable debug assertions
- `-g3`: Include debug symbols (maximum level)

**Warning flags:**

- `-Wall -Wextra -Wpedantic`: Enable comprehensive warnings
- Multiple `-Wno-*` flags to disable specific warnings that are apparently not relevant for this codebase

**Commented-out options:**

- Profiling flags (`-pg -fno-inline`)
- Additional strict warnings (`-Weffc++`, `-Wconversion`)
- Sanitizers for debugging (undefined behavior, address, thread)

##### Hardware-Specific Optimization

```makefile
CXXFLAGS+=-DMEMBLOCKLEN=$(shell getconf LEVEL1_DCACHE_LINESIZE)
CXXFLAGS+=-DCACHE_LINESIZE=$(shell getconf LEVEL1_DCACHE_LINESIZE)
```

These dynamically determine the CPU's L1 data cache line size and pass it as preprocessor definitions. This allows the code to optimize memory access patterns for the specific hardware it's running on.

##### Build Rules

```makefile
$(BIN): $(OBJECTS)
	$(CXX) $(CXXFLAGS) $^ -o $@ $(LDFLAGS)

%.o: %.cpp $(HEADERS)
	$(CXX) $(CXXFLAGS) -c $< -o $@
```

Standard pattern: compile each `.cpp` file to a `.o` object file, then link all objects into the final executable. Object files depend on all headers, so changing any header will trigger recompilation.

This Makefile is clearly for a high-performance computing application, likely involving sparse matrix operations, with careful attention to CPU optimization and parallel processing.

These are **automatic variables** in Make that represent different parts of the current rule:

##### automatic variables
###### `$@` - Target

The name of the target (what's being built)

```makefile
$(BIN): $(OBJECTS)
	$(CXX) $(CXXFLAGS) $^ -o $@ $(LDFLAGS)
```

Here `$@` expands to `$(BIN)`, which is `spmvrd`. So this becomes:

```bash
g++ [flags] [objects] -o spmvrd [ldflags]
```

###### `$^` - All Prerequisites

All the dependencies/prerequisites of the target

In the same rule, `$^` expands to `$(OBJECTS)`, which might be something like `main.o utils.o matrix.o`. So the full command becomes:

```bash
g++ [flags] main.o utils.o matrix.o -o spmvrd [ldflags]
```

###### `$<` - First Prerequisite

The first (or only) dependency

```makefile
%.o: %.cpp $(HEADERS)
	$(CXX) $(CXXFLAGS) -c $< -o $@
```

For a specific file like `main.cpp`, `$<` expands to `main.cpp` (the first prerequisite), while `$@` expands to `main.o`. This becomes:

```bash
g++ [flags] -c main.cpp -o main.o
```

###### Why Use These?

They make Makefiles more maintainable and less error-prone:

- No need to repeat target/dependency names
- Rules work generically for pattern matching (like `%.o: %.cpp`)
- Less chance of typos when copying similar rules

Other common automatic variables include `$?` (prerequisites newer than target) and `$*` (the stem of pattern rules).

### mcslock.h

这是一个MCS锁(Mellor-Crummey and Scott Lock)的实现，它是一种自旋锁的变体，专门设计用于减少高竞争环境下的缓存一致性流量。

让我们逐部分分析：

1. 基础结构体 `qnode`:
```cpp
struct alignas(CACHE_LINESIZE) qnode {
    atomic_uintptr_t next;  // 指向队列中下一个节点的指针
    atomic_bool      wait;  // 表示是否需要等待的标志
};
```
- 使用`alignas(CACHE_LINESIZE)`确保每个节点都对齐到缓存行，避免伪共享
- 每个节点包含两个原子变量：指向下一个节点的指针和等待标志

2. `MCSLock`类的主要组件：
```cpp
private:
    atomic_uintptr_t _tail;  // 指向队列尾部的指针
    qnode            _nodes[MAX_THREADS];  // 为每个线程预分配的节点数组
```

3. 加锁操作(`lock`)的工作流程：
- 初始化当前节点：清空next指针，设置wait为true
- 将节点添加到队列尾部，并获取之前的尾节点
- 如果有前驱节点：
  - 将当前节点链接到前驱节点
  - 自旋等待直到wait标志被清除

4. 解锁操作(`unlock`)的工作流程：
- 获取后继节点
- 如果没有后继节点：
  - 尝试将尾指针设为NULL（表示队列为空）
  - 如果成功，直接返回
  - 如果失败，说明有新节点正在入队，需要等待其完成
- 最后，将后继节点的wait标志设为false，允许其获取锁


使用示例：
```cpp
MCSLock lock;
// 在线程中使用
lock.lock(thread_id);   // 获取锁
// 临界区代码 do something
lock.unlock(thread_id); // 释放锁
```

这个实现使用了C++的原子操作来确保线程安全，并且通过预分配节点数组来避免动态内存分配的开销。代码中的`MAX_THREADS`常量定义了支持的最大线程数。

#### mcs 主要优点
1. 每个线程只在自己的本地变量上自旋，减少了缓存一致性流量
2. FIFO(先进先出)顺序保证了公平性
3. 没有中央热点，扩展性好
#### mcs 如何降低缓存一致性开销

MCS锁通过以下方式降低缓存一致性开销：

- **将等待线程组织成队列**（每个线程在其本地缓存行上自旋）
- **仅在锁交接时更新队列尾指针**
- **消除传统自旋锁的"群惊效应"（thundering herd effect）**
- Organizing waiting threads in a **queue** (each thread spins on its own local cache line)
- Only updating the queue tail pointer during lock handoff
- Eliminating the "thundering herd" effect of traditional spin locks

#### 惊群 Thundering Herd Effect

**群惊效应**指当锁释放时，所有等待线程同时被唤醒并争抢资源导致的性能骤降现象，此译名在分布式系统文献中被广泛采用。

 **触发场景**：  
当某个共享资源（如锁、网络连接、文件句柄）从**不可用变为可用**时：
- 操作系统会唤醒 **所有正在等待该资源的线程/进程**
- 这些被唤醒的线程会**同时发起资源请求**
- 最终**只有一个线程能成功获取资源**，其他线程再次陷入等待

**性能损耗来源**：
- ⚡ **CPU资源浪费**：大量上下文切换（Context Switching）
- 🧩 **缓存失效**：多个核心频繁读写同一内存地址（缓存行乒乓）
- 📉 **系统抖动**：资源争抢导致响应延迟飙升

**典型场景案例**
1. **多线程锁竞争**
    - **传统自旋锁（如pthread_mutex）**：  
        锁释放时唤醒所有等待线程 → 引发惊群
    - **优化方案**：  
        使用 **队列化锁（如MCS锁、Futex）**，仅唤醒下一个等待线程
2. **网络服务器（如Nginx/Apache）**
    - **accept() 系统调用**：  
        当新连接到达时，内核唤醒**所有监听同一端口的Worker进程**
    - **优化方案**：  
        开启 `SO_REUSEPORT`（Linux 3.9+）或使用 **EPOLLEXCLUSIVE** 标志（Linux 4.5+）
3. **文件系统事件（如inotify）**
    - 文件修改事件触发 → 通知**所有监控该文件的进程**
    - **优化方案**：  
        使用 **事件合并机制**（如Fanotify）

#### mcs 伪代码

```cpp
// MCS锁实现伪代码
void lock(MCSLock* lock, MCSNode* node) {
  node->next = NULL;
  MCSNode* prev = atomic_exchange(&lock->tail, node);  // 原子入队
  if (prev != NULL) {
    prev->next = node;     // 传递指针
    while (!node->locked); // 仅自旋本地变量
  }
}
```

#### 自旋锁

**自旋锁（Spinlock）** 是一种基础的**忙等待锁**，用于多线程/多核环境中保护共享资源。

其核心特点是：当线程尝试获取锁失败时，不会进入睡眠状态，而是通过**循环检测（自旋）** 持续检查锁状态，直到成功获取锁。

依赖**原子指令**（如x86的`LOCK CMPXCHG`）确保锁操作的*原子性*

```cpp
// 加锁
while (true) {
  if (锁空闲) {       // 步骤1：检查锁状态
    获取锁并退出循环;  // 步骤2：原子操作设置锁状态
  }
  // 否则持续循环检查（自旋）
}

// 解锁
原子操作将锁标记为“空闲”;  // 允许其他线程获取
```

#### 自旋锁 vs. 临界锁
| **特性**   | 自旋锁 (Spinlock) | 互斥锁 (Mutex)    |
| -------- | -------------- | -------------- |
| **阻塞行为** | 忙等待（不释放CPU）    | 睡眠等待（释放CPU）    |
| **开销来源** | CPU循环消耗        | 上下文切换（~1-10μs） |
| **适用场景** | 短临界区、非抢占式内核    | 长临界区、用户态应用     |
| **死锁风险** | 在单核需禁用抢占       | 支持超时和死锁检测      |
| **实现位置** | 内核/用户态均可       | 通常依赖操作系统调度     |

> 💡 黄金法则：
> 临界区执行时间 < 线程切换时间 → 选**自旋锁**；
> 否则 → 选**互斥锁**

#### atomic

- 原子操作库
- 无需锁的线程安全编程
- 避免对原子变量进行非原子操作（如直接解引用），必须通过原子接口访问。

```cpp
atomic_int counter = ATOMIC_VAR_INIT(0);
// 原子的写入一个值并返回原值
C atomic_exchange(volatile A* obj, C desired);
int old_val = atomic_exchange(&counter, 0);

atomic_bool exit_flag = ATOMIC_VAR_INIT(false);
// 原子地存储新值
void atomic_store(volatile A* obj, C desired);
atomic_store(&exit_flag, true);

// 读取指针（需反向转换）
while (atomic_load(&(p->wait)))
qnode *succ = (qnode *)atomic_load(&(p->next));
```

#### atomic CAS
compare and swap

- strong版本提供了更强的保证，只有在实际值确实不匹配时才会失败
- weak 可能会伪失败, 即使比较值相等

```cpp
bool atomic_compare_exchange_weak(volatile A* obj, C* expected, C desired);
bool atomic_compare_exchange_strong(volatile A* obj, C* expected, C desired);
```

```cpp
// _tail == old_p ?
// _tail = nullptr (true) : old_p = _tail (false)
if (atomic_compare_exchange_strong(&_tail, (uintptr_t *)&old_p, (uintptr_t)NULL)) {
    // _tail was p and is now nullptr
    return;
}
```

让我解释这段代码中`compare_exchange`的使用目的：

这里的`compare_exchange`操作并非"什么都没做"，而是在执行一个非常重要的原子检查和更新操作。让我详细解释这段逻辑：

1. 这段代码出现在`unlock`操作中，当一个线程发现没有后继节点（`succ == NULL`）时执行。

2. `compare_exchange`在这里的作用是：
```cpp
if (atomic_compare_exchange_strong(&_tail, (uintptr_t *)&old_p, (uintptr_t)NULL))
```
- 检查`_tail`是否仍然指向当前节点（`p`）
- 如果是，则将`_tail`设置为`NULL`
- 如果不是，则将实际的`_tail`值存储在`old_p`中

3. 这个操作有两种可能的结果：

   - 成功情况：
     - 说明当前节点确实是队列中的最后一个节点
     - 没有其他线程正在尝试获取锁
     - 这种情况下，直接返回即可，因为队列已经为空
   
   - 失败情况：
     - 说明在我们检查`succ`为`NULL`到执行`compare_exchange`期间
     - 有新的线程加入了队列
     - 这种情况下，我们需要等待新线程完成将自己链接到当前节点的操作

4. 为什么这很重要：
   - 这是一个关键的竞态条件处理
   - 如果没有这个检查，可能会在新节点还没有正确链接时就释放锁
   - 这可能导致队列断裂，使得某些线程永远等待

简单来说，这个`compare_exchange`操作是一个原子性的"检查并更新"操作，用于安全地处理队列为空的情况，同时也能检测到是否有新的线程正在尝试获取锁。这是确保锁正确性的关键操作，而不是"什么都没做"。

为什么用 strong?
- 操作的正确性比轻微的性能优化更重要
- 避免伪失败导致的不必要自旋

### cache

#### 纵览

1. 整体架构：
这是一个用于模拟和分析内存访问模式的缓存模拟器，主要包含两个类：
- `Cache`：基础缓存类
- `SharedCache`：支持多线程的共享缓存类

2. 核心数据结构：
```cpp
class Cache {
    std::list<MemoryBlock> stack_{};  // 缓存栈
    std::vector<StackIterator> refmap_{};  // 引用映射
    std::vector<Bucket> buckets_{};  // 桶系统
};
```

3. 主要功能和工作原理：

a) 缓存行访问处理：
```cpp
void Cache::handle_cline(Addr addr) {
    if (addr == last_) {
        incr_access({0u});
        return;
    }
    last_ = addr;
    StackIterator &it = refmap_[addr];
    
    if (it == stack_.end()) {
        incr_access_inf();
        refmap_[addr] = on_block_new(MemoryBlock{0u});
    } else {
        incr_access(on_block_seen(it));
    }
}
```
- 检查是否是重复访问
- 查找缓存行是否在缓存中
- 处理缓存命中或未命中的情况

b) 缓存替换策略：
```cpp
StackIterator Cache::on_block_new(MemoryBlock &&mb) {
    stack_.push_front(std::move(mb));
    move_markers(next_bucket_ - 1);
    
    if (Bucket::min_dists[next_bucket_] != Bucket::INF_DIST &&
        (stack_.size() > Bucket::min_dists[next_bucket_])) {
        on_next_bucket_gets_active();
    }
    return stack_.begin();
}
```
- 使用栈式替换策略
- 新访问的块放在栈顶
- 通过桶系统跟踪访问距离

c) 桶系统管理：
```cpp
void Cache::move_markers(unsigned bucket_max) {
    for (unsigned b{1u}; b <= bucket_max; b++) {
        --(buckets_[b].marker);
        (buckets_[b].marker)->bucket++;
    }
}
```
- 使用桶来分类缓存块
- 根据访问距离将块分配到不同的桶
- 动态调整桶的标记位置

4. 多线程支持：
```cpp
class SharedCache : public Cache {
    void handle_cline_shared(int tid, Addr a) {
        mcslock_.lock(tid);
        handle_cline(a);
        mcslock_.unlock(tid);
    }
    MCSLock mcslock_{};
};
```
- 使用 MCSLock 实现线程安全
- 提供线程安全的缓存访问方法

5. 性能分析功能：
```cpp
void Cache::print_csv(FILE *file, const auto &matrix, int id, double time) const {
    size_t working_set_size = stack_.size();
    for (size_t i{0u}; i != Bucket::min_dists.size(); ++i) {
        fprintf(file, "%s,%zu,%zu,%d,%d,%f,%zu,%zu,%lu\n",
                matrix.name, matrix.nnz, matrix.nrow, id,
                shared_, time, working_set_size,
                Bucket::min_dists[i], buckets_[i].access_counts.count);
    }
}
```
- 记录缓存访问统计信息
- 输出性能指标到 CSV 文件

6. 一致性检查：
```cpp
void Cache::check_consistency(bool force) {
    // 检查桶标记的位置是否正确
    // 验证访问距离是否符合预期
}
```
- 确保缓存状态的一致性
- 验证桶系统的正确性

这个缓存模拟器的主要用途是：
1. 分析内存访问模式
2. 评估缓存性能
3. 研究缓存替换策略
4. 支持多线程环境下的缓存行为分析

特别适用于：
- 矩阵运算等计算密集型应用
- 内存访问模式分析
- 缓存性能优化研究
- 多线程程序的内存行为分析

这个实现的特点是：
1. 使用栈式替换策略
2. 通过桶系统跟踪访问距离
3. 支持多线程访问
4. 提供详细的性能统计
5. 包含完整的一致性检查机制

#### stack_(cache sys simulator), refmap_(cache block search)

让我详细解释 `stack_` 和 `refmap_` 的作用和关系：

1. 数据结构定义：
```cpp
std::list<MemoryBlock> stack_{};  // 缓存栈
std::vector<StackIterator> refmap_{};  // 引用映射
```

2. 它们的作用：

`stack_`：
- 是一个双向链表，存储实际的缓存块
- 最近访问的块在栈顶（链表头部）
- 最久未访问的块在栈底（链表尾部）
- 每个块都记录了自己的桶号（bucket）

`refmap_`：
- 是一个向量，用于快速查找缓存块
- 索引是缓存行地址（Addr）
- 值是 `stack_` 中对应块的迭代器
- 用于 O(1) 时间复杂度的缓存查找

3. 举例说明：

假设我们有以下内存访问序列：
```
访问地址：A -> B -> C -> A -> D -> B
```

让我们看看 `stack_` 和 `refmap_` 如何变化：

初始状态：
```
stack_: 空
refmap_: 所有位置指向 stack_.end()
```

访问 A：
```
stack_: [A]
refmap_: [A的迭代器, 其他都是end]
```

访问 B：
```
stack_: [B, A]
refmap_: [A的迭代器, B的迭代器, 其他都是end]
```

访问 C：
```
stack_: [C, B, A]
refmap_: [A的迭代器, B的迭代器, C的迭代器, 其他都是end]
```

访问 A（再次访问）：
```
stack_: [A, C, B]
refmap_: [A的迭代器, B的迭代器, C的迭代器, 其他都是end]
```

访问 D：
```
stack_: [D, A, C, B]
refmap_: [A的迭代器, B的迭代器, C的迭代器, D的迭代器, 其他都是end]
```

访问 B（再次访问）：
```
stack_: [B, D, A, C]
refmap_: [A的迭代器, B的迭代器, C的迭代器, D的迭代器, 其他都是end]
```

4. 关键操作示例：

a) 查找缓存块：
```cpp
StackIterator &it = refmap_[addr];
if (it == stack_.end()) {
    // 缓存未命中
} else {
    // 缓存命中
}
```

b) 添加新块：
```cpp
stack_.push_front(std::move(mb));  // 新块放在栈顶
refmap_[addr] = stack_.begin();    // 更新引用映射
```

c) 移动已存在的块：
```cpp
// 将块移到栈顶
stack_.splice(stack_.begin(), stack_, it);
// refmap_ 不需要更新，因为迭代器仍然有效
```

5. 性能特点：

`stack_`：
- 使用 `std::list` 实现
- 支持 O(1) 时间的插入和删除
- 支持 O(1) 时间的块移动
- 内存开销较大

`refmap_`：
- 使用 `std::vector` 实现
- O(1) 时间的查找
- 连续内存布局，缓存友好
- 需要预分配空间

6. 实际应用场景：

假设在矩阵运算中：
```
访问矩阵元素：M[0,0] -> M[0,1] -> M[1,0] -> M[0,0]
```

对应的缓存行访问：
```
访问缓存行：C0 -> C1 -> C2 -> C0
```

缓存模拟器会：
1. 通过 `refmap_` 快速检查缓存行是否在缓存中
2. 使用 `stack_` 维护缓存行的访问顺序
3. 根据访问模式更新桶系统
4. 记录缓存命中/未命中的统计信息

这种设计的优点：
1. 快速查找（O(1)）
2. 高效更新（O(1)）
3. 准确模拟缓存行为
4. 支持详细的性能分析

这种实现特别适合：
- 分析内存访问模式
- 研究缓存替换策略
- 优化程序的内存访问
- 评估缓存性能

#### Bucket: miss/hit stats
-  通过桶系统跟踪 reuse distance

```cpp
void incr_access(Bucket::Counts &&bucket) {
    auto [bx] = bucket;
    buckets_[bx].access_counts.count++;  // 在对应桶中增加计数
}
```

```cpp
void incr_access_inf() {
    auto bucket_inf = Bucket::min_dists.size() - 1;  // 使用最后一个桶
    incr_access({bucket_inf});  // 在无限距离桶中增加计数
}
```

实例
```
访问A（未命中）：
- 增加 INF 距离桶的计数

访问B（未命中）：
- 增加 INF 距离桶的计数

访问C（未命中）：
- 增加 INF 距离桶的计数

访问A（命中，距离=2）：
- 增加距离2桶的计数

访问D（未命中）：
- 增加 INF 距离桶的计数

访问B（命中，距离=2）：
- 增加距离2桶的计数
```

### openMP

#### 速通
 -  parallel：创建并行区域。
 -  critical：保护共享数据（慎用，性能低）。
 -  single：只有一个线程执行任务。
 -  barrier：所有线程到达 barrier 再继续执行. (OpenMP 在某些隐式同步点, 如 parallel for 结束, 会自动插入屏障)
 -  schedule：优化循环分配策略。
 -  规则：优先用 atomic 替代 critical，用 reduction 处理规约操作，避免过度同步。
 
```cpp
#include <omp.h>
#include <stdio.h>

int main() {
    int sum = 0;
    #pragma omp parallel
    {
        #pragma omp single
        printf("Threads: %d\n",
omp_get_num_threads());

        #pragma omp for schedule(static)
reduction(+:sum)
        for (int i = 0; i < 100; i++) {
            sum += i;
        }

        #pragma omp barrier  //
确保所有线程完成累加

        #pragma omp critical
        printf("Thread %d: sum = %d\n",
omp_get_thread_num(), sum);
    }
    return 0;
}
```

### matrix

#### csr format
- compress sparse row
- 适用于绝大多数元素为零的矩阵
- 三个数组存储 data(非零元素), indices(列索引), indptr(偏移)
    - 通过这三个数组和 shape 可以反推原数组

**data**
存储所有非零元素值，按行优先顺序排列。

**indices**
存储每个非零元素对应的列索引（从0开始）。

**indptr**
划分行范围. 存储每行的起始位置在data中的偏移。长度为行数+1，最后一项为总非零元素数。

<section style="display: flex; flex-direction: row; align-items: center;"><span style="color: rgb(205, 82, 85); display: flex; flex-direction: row; align-items: center; padding: 0px 0.5em; font-size: 0.824em; border-radius: 0.428em; line-height: 2.306em; background-color: rgba(205, 82, 85, 0.15);"><span style="margin-right: 0.2em; display: flex; flex-direction: row; align-items: center; justify-content: center;"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24" width="1.9988577955454025em" height="1.9988577955454025em" stroke="currentColor" aria-hidden="true" class=""><path fill="currentColor" d="m21.9 15.621c0.1248-1.8535-0.6087-3.4099-2.6058-3.8292-0.7712-0.15744-1.3921-0.13977-2.1113-0.14543-0.6323 0.0048-1.1718-0.01567-1.8401 0.03203 1.5356-0.8078 1.6998-2.205 1.6567-3.546 0.1272-2.3708-1.4685-3.666-3.7727-3.673-2.2427-0.04024-5.0463-0.27229-5.9443 1.9172-0.28083 0.6692-0.27606 1.2179-0.28202 1.6587-0.08527 1.4303 0.20687 2.9224 1.662 3.6429-2.3051-0.05275-5.3273-0.39212-6.28 1.8983-0.28073 0.66862-0.27595 1.2174-0.282 1.6572-0.10329 1.6061 0.3059 3.171 2.0252 3.8067 1.2061 0.4187 2.2175 0.2869 3.3945 0.3134 2.0524 0.0901 4.0448-0.4637 4.4796-2.4982 0.609 2.5638 3.2086 2.5463 5.3204 2.4982 2.7823 0.1278 4.7024-0.9368 4.5798-3.7329zm-12.899-7.6287c-0.14889-1.8665 1.8839-1.4921 3.1358-1.546 0.8939 0.05358 2.4743-0.21158 2.8003 0.88445 0.2729 2.4494-0.0297 2.8555-2.5242 2.8232-0.94713-0.07259-2.869 0.28949-3.3134-0.77077-0.14881-0.44557-0.08538-0.92893-0.09846-1.3909zm0.2606 9.2128c-0.56638 0.162-1.1652 0.1412-1.7487 0.1488-0.59786-0.0036-1.1977 0.0131-1.7948-0.0233-0.93407-0.0365-1.6776-0.3579-1.6157-1.4217 0.01574-0.5119-0.06845-1.0551 0.11822-1.5436 0.4432-0.84155 1.5978-0.6728 2.4032-0.7191 0.81712 0.01614 1.6464-0.05154 2.4536 0.10154 0.99382 0.17537 1.0564 0.91742 1.0227 1.7752-6.1e-4 0.7729 0.04085 1.416-0.83867 1.6821zm2.9212-3.6286c-0.0836 0.19457-0.14194 0.3848-0.18279 0.56614-0.18535-0.87758-0.76293-1.6189-1.5605-2.02 1.0871 0.04933 2.0387 0.04959 3.1216-8e-5 -0.7672 0.39034-1.1687 0.96486-1.3783 1.4539zm6.8788 3.6286c-0.5664 0.162-1.1652 0.1412-1.7488 0.1488-0.5978-0.0036-1.1977 0.0131-1.7947-0.0233-0.9341-0.0365-1.6776-0.3579-1.6157-1.4217 0.0157-0.5119-0.0685-1.0551 0.1182-1.5436 0.4432-0.84155 1.5978-0.6728 2.4033-0.7191 0.8171 0.01614 1.6464-0.05154 2.4536 0.10154 0.9938 0.17537 1.0563 0.91742 1.0227 1.7752-6e-4 0.7729 0.0409 1.416-0.8386 1.6821z"></path></svg></span>example</span></section>

示例：\[0, 2, 3, 5]
• 第0行：data\[0:2]（元素3, 2）
• 第1行：data\[2:3]（元素5）
• 第2行：data\[3:5]（元素1, 4）

$$\left( \begin{array}{cccc} 3 & 0 & 0 & 0 \\ 0 & 2 & 5 & 0 \\ 0 & 1 & 0 & 4 \\ \end{array} \right)$$ 对应CSR表示为：

 • data = \[3, 2, 5, 1, 4]
 • indices = \[0, 1, 2, 1, 3]
 • indptr = \[0, 1, 3, 5]

data: 第一按行排序, 第二按列排序

indices: data 对应元素的列索引

indptr: enumerate(i, x) 表示从 data 中的 第 x 个元素开始, 进入 第 i 行
- \[0, 1, 3, 5]
- 第 0 行从第 *0* 个元素开始
- 第 1 行从 第 *1* 个元素开始
- 第 2 行从第 *3* 个元素开始
- 一共 *5* 个非 0 元素