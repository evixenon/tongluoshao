
#### 4.1 Experimental Procedure

The experiments are conducted in the Bavarian Energy Architecture & Software Testbed(BEAST) environment at Leibniz Supercomputing Centre(LRZ), 在 Fujitsu A64FX 的机器上执行, 使用了40个来自 suitesparse matrix collection 的矩阵作为测试负载. baseline 数据使用的是 breiter 等人在论文中提出的 approach, 这是一个基于 reuse distance 的 cache simulator. 此外, 使用了 likwid tools 收集真实 spmv 计算时产生的 cache misses 作为 ground truth. 

The A64FX is a state-of-the-art ARM hardware architectures designed by Fujitsu for High Performance Computing(HPC) with a 48-core processor. Each core has a private 64 KiB 4-way L1D caches and every 12 cores share the same L2 cache. 实验首先在单线程环境下进行, 收集 baseline simulator, extended simulator 下的 cache misses 数据, 然后与 likwid tools 收集的 ground truth 数据对比. 然后, 同样的流程也会再 12, 24, 36, 48 线程下重复, 以对比在多线程环境中与单线程环境的差异. 

baseline simulator 和 extended simulator 的优化程度通过以下公式计算:
$$\frac{1}{n}\sum^n_{i=0}(y_i - \hat{y}_i)/y_i$$

其中 yi 是第 i 个 矩阵的通过 simulator 得到的cache misses 数量, $\hat{y}_i$ 是相对应的 ground truth 数值

这个公式从 MAE 标准公式修改而来, 由于误差的方向(signed) 可以为我们提供信息, 因此不采用绝对值的方式. 又由于矩阵的大小各有差异, 因此通过除以ground truth , 可以得到一个相对标准化的优化率.

最后, 通过 shell scripting 和 python 程序汇总数据, 进行数值上的分析和结果可视化.

---

The experiments were conducted within the Bavarian Energy Architecture & Software Testbed (BEAST) environment at the Leibniz Supercomputing Centre (LRZ), using a Fujitsu A64FX machine for execution. A diverse set of 40 matrices from the SuiteSparse Matrix Collection was selected as test workloads to ensure representativeness across various sparsity patterns and problem scales. The baseline prediction data was generated using the reuse distance-based cache simulator originally proposed by Breiter et al[]. Additionally, the Likwid performance monitoring toolkit[] was employed to collect actual hardware performance data during the execution of the SpMV kernel, specifically cache miss events, providing the ground truth for validation.

The A64FX represents a state-of-the-art ARM-based architecture designed by Fujitsu for high-performance computing (HPC). It has a 48-core processor, where each core possesses a private 64 KiB 4-way set-associative L1 data cache. Every group of 12 cores shares an 8 MiB L2 cache. The experimental procedure began with single-threaded executions. For each matrix, cache miss predictions were collected from both the baseline simulator and the extended simulator. These results were compared against the ground truth measurements obtained via Likwid. The same procedure was subsequently repeated in multi-threaded configurations using 12, 24, 36, and 48 threads, in order to evaluate prediction accuracy under increasing parallelism and assess the impact of shared cache behavior and potential coherence overheads.

The accuracy of the baseline and extended simulators was quantified using the Mean Percentage Error (MPE) metric, defined as:

$$\frac{100}{n}\sum^n_{i=1}\frac{y_i - \hat{y}_i}{y_i}$$

where y_i​ denotes the number of cache misses predicted by the simulator for the i-th matrix, and \hat{y}^i​ represents the corresponding ground truth value measured by hardware counters. MPE is not taking absolute values to preserve the direction of the error (over- or under-prediction), which offers valuable insight into systematic biases within the models. Furthermore, normalizing the error by the ground truth value enables a relative and scale-independent comparison across matrices of vastly different sizes. Finally, all experimental data was aggregated and processed using a combination of shell scripting and Python scripts, which facilitated consistent numerical analysis and generated the visualizations presented in the Results section.

#### 4.2 Matrices Selection


The SuiteSparse Matrix Collection from the University of Florida[] is a widely recognized repository of sparse matrices derived from a wide spectrum of domains. It serves as a standard benchmark in evaluating the performance of sparse matrix algorithms. SpMV 程序也是许多标准测试集中的常见部分, 属于典型的 loop-oriented 程序. 这个算法同时也是一种真实研究环境中无处不在的内核，例如在物理模拟和图算法中

According to Davis and Hu’s 2011 study, matrices within the dataset can be classified into 27 distinct application domains[]. In this work, 40 matrices were selected from the collection, encompassing 18 of these categories as indicated by the “kind” tag in the data source. During the selection process, a wide variety of matrix sources were incorporated  (also referred to as the group attribute), with the nonzeros scaling from 1 million to 50 millions, the number of rows ranging from 9000 to 20 millions. Table 4.1 lists the details for the selected matrices.

---

The SuiteSparse Matrix Collection from the University of Florida[] is a widely recognized repository of sparse matrices derived from a wide spectrum of scientific and engineering applications. It serves as a standard benchmark for evaluating the performance of sparse matrix algorithms. The Sparse Matrix-Vector Multiplication (SpMV) kernel is also a common component in many standard benchmark suites and is representative of loop-oriented, memory-bound computations. As a ubiquitous kernel in practical research environments, SpMV plays a critical role in domains such as physical simulations and graph algorithms.

According to Davis and Hu’s 2011 study, the matrices in the dataset can be classified into 27 distinct application domains[]. In this work, 40 matrices were selected from the collection, covering 18 of these categories, as indicated by the “kind” attribute in the metadata. The selection aimed to incorporate a diverse set of matrix sources (also referred to as the “group” attribute), with the number of nonzeros ranging from 1 million to 50 million, and the number of rows varying between 9,000 and 20 million. Table 4.1 provides detailed information on the selected matrices.

```latex
\documentclass{article}
\usepackage{booktabs}
\usepackage{array}
\usepackage{longtable}
\usepackage{siunitx} % 用于格式化数字和单位

\begin{document}

\begin{longtable}{>{\raggedright\arraybackslash}p{2.5cm}S[table-format=2.2]S[table-format=5.1]>{\raggedright\arraybackslash}p{2.5cm}>{\raggedright\arraybackslash}p{5cm}}
\caption{Matrices} \\
\toprule
\textbf{Name} & {\textbf{Nonzeros}} & {\textbf{Rows}} & \textbf{Group} & \textbf{Kind} \\
& {\textbf{(m)}} & {\textbf{(k)}} & & \\
\midrule
\endfirsthead

\caption[]{Matrixces(cont.)} \\
\toprule
\textbf{Name} & {\textbf{Nonzeros}} & {\textbf{Rows}} & \textbf{Group} & \textbf{Kind} \\
& {\textbf{(m)}} & {\textbf{(k)}} & & \\
\midrule
\endhead

\bottomrule
\endfoot

AS365 & 22.74 & 3799.3 & DIMACS10 & Undirected Graph \\
Ga10As10H30 & 6.12 & 113.1 & PARSEC & Theoretical/Quantum Chemistry Problem \\
GAP-road & 57.71 & 23947.3 & GAP & Directed Weighted Graph \\
G3\_circuit & 7.66 & 1585.5 & AMD & Circuit Simulation Problem \\
Goodwin\_054 & 1.03 & 32.5 & Goodwin & Computational Fluid Dynamics \\
ML\_Laplace & 27.69 & 377.0 & Janna & Structural Problem \\
TSOPF\_FS\_b300 & 4.40 & 29.2 & TSOPF & Power Network Problem \\
Zd\_Jac2 & 1.64 & 22.8 & VanVelzen & Chemical Process Simulation Problem \\
atmosmodd & 8.81 & 1270.4 & Bourchtein & Computational Fluid Dynamics Problem \\
bcsstk30 & 2.04 & 28.9 & HB & Structural Problem \\
bcsstk35 & 1.45 & 30.2 & Boeing & Structural Problem \\
boneS01 & 6.72 & 127.2 & Oberwolfach & Model Reduction Problem \\
circuit5M\_dc & 19.19 & 3523.3 & Freescale & Circuit Simulation Problem \\
CurlCurl\_1 & 2.47 & 226.5 & Bodendiek & Model Reduction Problem \\
debr & 4.19 & 1048.6 & AG-Monien & Undirected Graph Sequence \\
denormal & 1.16 & 89.4 & Castrillon & Counter Example Problem \\
dielFilterV2real & 48.54 & 1157.5 & Dziekonski & Electromagnetics Problem \\
eu-2005 & 19.24 & 862.7 & LAW & Directed Graph \\
gupta1 & 2.16 & 31.8 & Gupta & Optimization Problem \\
human\_gene1 & 24.67 & 22.3 & Belcastro & Undirected Weighted Graph \\
ins2 & 2.75 & 309.4 & Andrianov & Optimization Problem \\
kkt\_power & 14.61 & 2063.5 & Zaoui & Optimization Problem \\
lhr71 & 1.53 & 70.3 & Mallya & Chemical Process Simulation Problem \\
mario002 & 2.10 & 389.9 & GHS\_indef & Duplicate 2D/3D Problem \\
mawi\_201512012345 & 38.04 & 18571.2 & MAWI & Undirected Weighted Graph \\
mycielskian14 & 3.70 & 12.3 & Mycielski & Undirected Graph \\
nd3k & 3.28 & 9.0 & ND & 2D/3D Problem \\
nemeth21 & 1.17 & 9.5 & Nemeth & Subsequent Theoretical/Quantum Chemistry Problem \\
nv1 & 2.45 & 75.5 & VLSI & Semiconductor Device Problem \\
pcrystk03 & 1.75 & 24.7 & Boeing & Duplicate Materials Problem \\
pdb1HYS & 4.34 & 36.4 & Williams & Weighted Undirected Graph \\
pkustk03 & 3.13 & 63.3 & Chen & Structural Problem \\
pre2 & 5.96 & 659.0 & ATandT & Frequency Domain Circuit Simulation Problem \\
qa8fk & 1.66 & 66.1 & Cunningham & Acoustics Problem \\
rgg\_n\_2\_19\_s0 & 6.54 & 524.3 & DIMACS10 & Undirected Random Graph \\
t2em & 4.59 & 921.6 & CEMW & Electromagnetics Problem \\
thermomech\_dK & 2.85 & 204.3 & Botonakis & Thermal Problem \\
venkat01 & 1.72 & 62.4 & Simon & Computational Fluid Dynamics Problem Sequence \\
wave & 2.12 & 156.3 & AG-Monien & 2D/3D Problem \\
wikipedia-20051105 & 19.75 & 1635.0 & Gleich & Directed Graph \\
\bottomrule
\end{longtable}

\end{document}
```

#### 4.3 Ground Truth Collection and Cache Simulation Methodology

在收集 Ground Truth 时, 使用了一个 CSR 格式的 SpMV 模拟程序. 读取测试矩阵后, 分配一个虚拟向量, 并使用这个虚拟向量与测试矩阵执行 SpMV 算法. 在缓存分配时不会用 likwid 记录 cache misses, 记录开始于 SpMV 的运算之前.

 Cache simulator 则没有进行真正的 SpMV 运算, 而是通过模拟 SpMV 对内存的访问, 为运算中涉及的变量分配了虚拟的内存地址, 并在每次访问这个虚拟的内存地址, 模拟缓存栈的行为和统计 cache misses 计数.

在处理器真实执行程序时, 常常会通过例如 hardware prefetching 的手段减少 Cold misses 的发生. 本论文中的 simulator 无法模拟这种优化, 出于这个考虑, simulator 执行了 11 次 SpMV 模拟, 并只统计后10次的结果. 相对应地, SpMV 程序也会重复执行 11 次运算并放弃第一次的结果.

但这样的处理同时也带来一个问题: 在真实的 SpMV 运行环境中, 不可避免地会有其他程序同时在执行, 因此, 即使执行了第一次运算的预热, 也会有其他程序读取并替换缓存中的部分内容; 而在缓存模拟器中, 只有 SpMV 模拟在运行, 因此, 缓存会完完全全地保留预热后的状态, 也就是, 缓存栈中的所有块都是与 SpMV 模拟相关的内容. A64FX 是 state of the art 的 HPC 机器, 拥有总共 32 MiB 的 shared L2 caches, 当矩阵的大小不足以占满缓存空间时, 这个问题被放大得更严重了. 

在计算 simulator 的预测准确率时, 考虑矩阵的 working set size 和 当前环境的 active shared cache lines. Working Set Size(wss) 是指, 当使用此矩阵进行模拟器, 有多少个 unique 的虚拟地址被使用了. wss 可以通过统计模拟程序结束后的 stack 状态获得. active shared cache lines 则是在当前运行环境下, 有多少 cache lines 被启用. 计算公式为: 
$active\ shared\ cache\ lines = active\ shared\ memories * shared / memory\ size / cache\ line\ size$
例如, A64FX 的 cache line size 为 256 Bytes, 当前在 24 线程下运行, 则 L2 缓存的 active shared cache lines 为 8 MiB * 2 / 256 Bytes = 65536. 如果 wss 小于 active shared cache lines, 或者两者的差距不够大, 那么这种情况下测量的结果将被视为无效的.

---

To collect ground truth data, a SpMV program using the CSR format was employed. After reading the test matrix, a dummy vector was allocated, and the SpMV algorithm was executed using this vector and the matrix. Cache misses were not recorded during the initial allocation phase, the measurement started immediately before the SpMV computation began using Likwid tools.

The cache simulator, on the other hand, does not perform actual SpMV computations. Instead, it simulates the memory access patterns of SpMV by assigning virtual memory addresses to all variables involved. Each access to a virtual address is tracked to emulate cache stack behavior and count the number of cache misses.

In real processor executions, techniques such as hardware prefetching are often used to reduce cold misses. Since the simulator in this study cannot emulate such optimizations, each simulation was run 11 times, with only the last 10 results being collected. The first run was regarded as a "warm-up" of cache stack and was excluded. Similarly, the actual SpMV program was also executed 11 times, with the first run being discarded to account for cold-start effects.

However, this approach introduces a problem: in a real execution environment, there are other processes inevitably running concurrently. After the first "warm-up" iteration, these processes may access and replace parts of the cache blocks. In contrast, the cache simulator runs in isolation, meaning the cache remains entirely unchanged after warming up. This issue is particularly serious on state-of-the-art HPC systems like the A64FX, which features a total of 32 MiB of shared L2 cache, especially when the matrix working set size is not large enough to occupy the entire cache.

To account for this when evaluating simulator accuracy, both the working set size (WSS) of the matrix and the number of active shared cache lines in the environment are considered. The working set size refers to the number of unique virtual addresses accessed during the simulation, which can be obtained by analyzing the state of the cache stack at the end of the simulation. The number of active shared cache lines is estimated based on the currently allocated shared memory and cache line size, using the formula:

$active\ shared\ cache\ lines = active\ shared\ memories * shared / memory\ size / cache\ line\ size$

For example, on the A64FX with a cache line size of 256 bytes running with 24 threads, the number of active shared cache lines in L2 would be:

8 MiB×2/256 bytes=65536

If the working set size is smaller than the number of active shared cache lines, or if the difference between them is not substantial, the measurement for that configuration is considered invalid and excluded from accuracy analysis.

#### 6.1 Baseline results

