---
title: 现代 SSD 知识
date: 2024-08-12
tags:
---
#### 基础结构
- 主控
- 颗粒
- 缓存(如有)

#### 存储层次
- 浮栅晶体管
- 存储单元
- 串 string/页 page
- 行* row
- 块 block
- 平面 plane
- 颗粒 die chip

#### NAND 颗粒结构
- 每一个块有一个**地址解码器**
    - 地址解码器能选择同一水平面所有 page
- 地址解码器的对面有一个**位线选择器**
    - 位线选择器

![[attachments/Pasted image 20240812174614.png|400]]

![[attachments/Pasted image 20240812175804.png|400]]

#### SLC, MLC, TLC, QLC
- single/multiple/triple/quad -level cell
- 分别能存储 2^(1/2/3/4) 种状态
- 从左到右
    - 寿命 SLC > MLC > TLC > QLC
    - 成本 SLC > MLC > TLC > QLC
    - 写入难度 SLC < MLC < TLC < QLC
    - 写入速度 SLC > MLC > TLC > QLC
    - 离电存储寿命 SLC > MLC > TLC > QLC

#### 硬盘缓存策略
有独立方案, 也有 DRAM + SLC Cache / HMB + SLC Cache

DRAM(有独立缓存)
- 最快
- 多一个发热单元
- 有可能集成在主控中, 这种情况下缓存容量通常较小

HMB(无独立缓存)
- Host Memory Buffer
- 借用一部分主机的内存, 但由于硬盘总线的速率远低于内存的, 性能比起独立缓存差

SLC Cache(就是无独立缓存)
- 性能比 DRAM 或 HMB 差
- 独立 SLC, 专门有一部分 SLC 颗粒作为缓存
- 模拟 SLC, 用一部分 TLC 颗粒模拟 SLC 使用
    - 模拟 SLC 造成[[#写入放大]], 加速寿命消耗

#### FTL
Flash Translation Layer, 一种软件层或固件功能
- 用来*优化 SSD 性能, 延长寿命, 增加数据可靠性*
- 一般 1GB 容量的 NAND 颗粒, 需要配备 1MB 的 FTL 表缓存空间
- 小缓存方案: 小于 1MB/1GB NAND, 会将常用的 FTL 表放在缓存中, 另一部分放在 NAND 颗粒中

FTL 的任务
- 地址转换: 将逻辑地址转为物理地址
- 磨损均衡 Wear balance: 平均各存储单元的写入量
- 垃圾回收 Garbage collection: 被删除的数据的重新分配和管理
- 坏块管理
- 缓存管理

#### 写入放大
- Write Amplification
- 写入放大指的是固态硬盘中, 实际向 SSD 写入的数据比请求要大的现象
- 写入时需要先擦除再写入, 而擦除的最小单位是 块, 因此写入必须先读取, 在缓存中修改, 擦除原数据, 再写入数据

#### IOPS
- I/O Operations Per Second

$$实际读写速度(MB/s) = \frac{IOPS \times 平均数据块大小(Bytes)}{2^{20}}$$