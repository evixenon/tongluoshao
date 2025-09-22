
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

The accuracy of the baseline and extended simulators was quantified using the Mean Absolute Percentage Error (MAPE) metric, defined as:

$$\frac{100}{n}\sum^n_{i=1}|\frac{y_i - \hat{y}_i}{y_i}|$$

where y_i​ denotes the number of cache misses predicted by the simulator for the i-th matrix, and \hat{y}^i​ represents the corresponding ground truth value measured by hardware counters. MAPE is taking absolute values and discarding the direction of the error (over- or under-prediction), which offers valuable insight into systematic biases within the models, thus Mean Percentage Error(MPE) was applied in some phases of analysis. Furthermore, normalizing the error by the ground truth value enables a relative and scale-independent comparison across matrices of vastly different sizes. Finally, all experimental data was aggregated and processed using a combination of shell scripting and Python scripts, which facilitated consistent numerical analysis and generated the visualizations presented in the Results section.

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

If the working set size (WSS) is smaller than the number of active shared cache lines, or if the difference between them is not substantial, the corresponding measurement is considered invalid and excluded from the accuracy analysis. In this study, a credible threshold was established through visual analysis of the relationship between WSS and prediction accuracy. Only matrices whose WSS exceeds this empirically determined threshold are included in the final comparative evaluation.

#### 6.1 Prediction results

#### 6.1.1 Accuracy Comparison Between Simulated and Measured Cache Misses

Figure 展示了使用 simulator 程序测量得到的结果与 likwid tools 测量结果的差距. 图中每一个矩阵的 difference 百分比由 (likwid result - simulator result)/likwid result * 100 获得, 没有使用绝对值, 保留了 over/under-prediction 的方向, 因此一个 negative 的 value 表示 simulator 预测到了比 likwid tools 更多的 cache misses. 矩阵是按照 Working set size 降序排列的, 同一张 figure 中, 越上面的 矩阵拥有越大的 WSS. 左边的 figure 中的矩阵的 WSS 大于 160K, 而右边则小于. 如同图例中的说明, 红色的 bar 表示baseline simulator 的测量结果, 而蓝色的 bar 则是本论文中经过 extended 的 simulator 结果.

---

Figure X presents a comparison of cache miss predictions generated by the simulators against the ground truth measurements obtained from Likwid performance counters. The percentage difference for each matrix in the figure is calculated as:

$$ Difference(\%)=\frac{(Likwid\ Result - Simulator\ Result)×100}{Likwid\ Result}$$

Notably, absolute values are not applied in this calculation, allowing the retention of directionality in the form of over-prediction (positive values) or under-prediction (negative values). A negative value, therefore, indicates that the simulator predicted more cache misses than were actually measured by Likwid.

The matrices are arranged in descending order of Working Set Size (WSS), meaning matrices with larger WSS values appear on the top of the figure. The left panel includes matrices with a WSS greater than 160K, while the right panel contains those with a WSS below this value. As indicated in the legend, the red bars correspond to results from the baseline simulator, and the blue bars represent results from the extended simulator proposed in this study.

10 图
#### 6.1.2 Analysis of L1 Prediction Accuracy

首先注意到,  L2 caches 的预测结果中出现了相当多的接近 100% 的 error. L2 数据异常的原因在 section 4.3 中已有解释, 是由于L2的缓存空间超过了矩阵的总大小. 因此会在稍后的小节中确认数据的有效性再行比较.

对 L1 cache 的预测, 总体来说, extended simulator 得到了与 原本的 simulator 相近的结果. 两者对大部分矩阵的预测, 与 gound truth 的 error 集中在 2.5% 到 10% 之间, 最高的误差在 18% 左右. 矩阵的大小与预测的准确率并没有表现出相关性, 与之相比, 矩阵的个体差异对预测准确率的影响更大. 例如, GAP-road, mycielskian14, nv1 这几个矩阵在不同的线程下, L1 预测结果都出现了相似的模式. 更具体地举例来说, nv1 在各个线程下, 原 simulator 测试得到的 error 总是在 17.5% 附近, extended simulator 的测试结果则维持在 12.5% 左右.

将 conflict misses 融合入程序中后, 预测程序对 L1 cache 的预测表现并不总是比原程序好. 在两个版本的 simulator 200 次对比中,  只有其中的 128 次(64%), extended 后的程序表现得更优. Table 展示了 Mean and standard deviation of the absolute percentage error for predicting L1 cache misses using before and after extending the algorithm. 总体而言, 拓展后的程序对 L1 cache 的预测误差减小了大约 0.6%,  在 1, 12, 24, 36, 48 线程中, 分别比原来优化了10.59%, 10.71%, 9.15%, 9.62%, 9.68%, 平均的优化率为 9.95%.

---

First, it is notable that a significant number of nearly 100% errors are observed in the L2 cache predictions. As explained in Section 4.3, this anomaly is attributed to the fact that the L2 cache capacity exceeds the total size of many test matrices, causing a large portion of the measurements invalid under the adopted method. Therefore, a validity filtering will be applied before further comparative analysis of L2 cache results is conducted in a later subsection.

For L1 cache predictions, the extended simulator generally yields results similar to those of the baseline simulator. Both versions obtain errors between 2.5% and 10% for the majority of matrices, with the highest observed error around 18%. Prediction accuracy does not appear to correlate strongly with matrix size; instead, matrix-specific characteristics introduces a greater influence. For instance, matrices such as GAP-road, mycielskian14, and nv1 consistently show similar error patterns across different thread counts. A representative example is nv1, for which the baseline simulator consistently produces an error around 17.5%, while the extended simulator maintains an error of approximately 12.5% across all thread numbers.

After integrating conflict miss modeling, the extended simulator does not consistently outperform the baseline in predicting L1 cache behavior. In a total of 200 comparative tests, the extended version demonstrated better accuracy in only 128 cases (64%). Table X summarizes the mean and standard deviation of the absolute percentage error for L1 cache miss predictions before and after the algorithm extension. Overall, the extended simulator reduces the average prediction error by approximately 0.6%. The relative improvement is 10.59% for 1 thread, 10.71% for 12 threads, 9.15% for 24 threads, 9.62% for 36 threads, and 9.68% for 48 threads respectively, yielding an average optimization rate of 9.95%.
#### 6.1.3 Explanation of Reduced Predicted Cache Misses

对比 baseline simulator 和 extended simulator 的结果会发现, 后者有时候测量出了比前者更少的 cache misses. 直觉上来说, 原本的程序只能测量 capacity misses, 在 integrating conflict misses 之后, 测量得到的 total cache misses 应该只能增加. 但实际上, 根据论文中的 simulator 的实现方式, 这种现象是可能发生的. 

这里使用一个简化的例子来解释这种现象: 考虑一个 2-way associatity, 拥有 4 cache sets, 总共的 capacity 为8 的 cache, 按顺序访问地址 0, 4, 1, 5, 2, 6, 3, 7. 此时再访问地址 9, 13, 则现在 stack 的状态如 figure a 所示. 访问 9 和 13 各造成了一次 capacity miss 和 conflict miss, 并将 capacity LRU stack 中的 地址 0, 4 出队. 然而, 在 cache set 0 自身的 LRU stack 中, 还保留着地址 0 和 4. 此时再次访问 地址 0 和 4, 就只会造成 capacity miss, 而没有 conflict miss(如 figure b). 这种现象也是可以重复的, in the most extreme case, capacity misses can be **twice** as high as conflict misses.

---

The comparison between the baseline and extended simulators reveals that the latter occasionally predicts fewer cache misses than the former. Intuitively, one might expect that integrating conflict misses into a model that originally accounted only for capacity misses would increase the total number of predicted misses. However, due to the specific implementation of the simulator presented in this work, such a result is indeed possible.

This phenomenon can be illustrated through a simplified example. Consider a 2-way associative cache with 4 sets and a total capacity of 8 cache blocks. Suppose the following sequence of addresses is accessed:  
`0, 4, 1, 5, 2, 6, 3, 7`, followed by `9, 13`.  
After these accesses, the state of the cache stacks is shown in Figure (a). The accesses to addresses 9 and 13 both result in a capacity miss and a conflict miss, evicting addresses 0 and 4 from the global capacity LRU stack. However, within the local LRU stack of cache set 0, addresses 0 and 4 are still retained. If addresses 0 and 4 are accessed again, these accesses will now be recorded only as capacity misses—not conflict misses—as illustrated in Figure (b). This mechanism is repetitive. In the most extreme case, the number of capacity misses can be up to twice that of conflict misses.

Thus, the interaction between the global capacity management policy and the set-specific replacement logic can lead to scenarios where a more detailed modeling of conflict misses paradoxically reduces the total miss count in the extended simulator compared to the baseline.
#### 6.2 Determination of a Valid Working Set Size Threshold for L2 Cache Evaluation

我们已经知道 wss 小于 active cache lines 会导致预测失效, 本小节的实验结果探究了到底应该选择 wss 为多大的 矩阵才可以视为没有受到 4.3 中描述的问题的影响. Figure 展示了在仅考虑 wss 大于 x 倍 active cache lines的矩阵时, 在各线程下预测 L2 cache misses 的平均 MAPE. 即使是最小的矩阵, 其 wss 也远大于 L1 private cache 的容量, 因此只需要考虑对 L2 的预测设置 threshold. 从图中可以看到, 当这个系数 在1.0 到 1.8 之间时, both MAPE 的 mean 值 和 standard deviation 快速下降. 而当 x > 2 时, y 轴的数值趋于平稳. 这个结果表明, 至少在本实验中, 仅使用 wss 大于 2 倍 active cache lines 的矩阵所得到的结果是较为可靠的.

---

As established earlier, a Working Set Size (WSS) smaller than the number of active cache lines can lead to invalid predictions. This subsection investigates the minimum WSS multiplier required to mitigate the confounding effect described in Section 4.3 and ensure reliable L2 cache miss predictions.

Figure Y displays the Mean Absolute Percentage Error (MAPE) of L2 cache miss predictions across various thread counts, considering only matrices whose WSS exceeds x times the number of active shared cache lines. Since even the smallest matrix in the test suite has a WSS significantly larger than the capacity of a private L1 cache, it was only necessary to establish a validity threshold for L2 cache predictions.

The results indicate that as the multiplier x increases from 1.0 to 1.8, both the mean and standard deviation of the MAPE decrease rapidly. Beyond x = 2, the values on the y-axis stabilize, showing little further variation. This trend suggests that using only matrices with a WSS greater than twice the number of active cache lines yields statistically stable and reliable results for L2 cache prediction accuracy evaluation in this experimental setting.
#### 6.3 L2 Prediction Accuracy after Filtering

#### 6.3.1 Accuracy Comparison Between Simulated and Measured Cache Misses

根据 6.2 的结果, 缩小了矩阵范围再对 L2 预测误差进行展示(见 Figure). 与  6.1.1 中的结果不同, 此处的 difference 加上了绝对值, 以便于分析 extended cache simulator 的优化程度. 

---

Based on the validity threshold established in section 6.2, the set of evaluated matrices was refined to include only those whose Working Set Size (WSS) exceeds twice the number of active shared cache lines. This filtering ensures that the subsequent analysis of L2 cache behavior is not influenced by the overestimation artifacts described earlier. The prediction accuracy for this reduced set of matrices is presented in Figure Z.

In contrast to the results in section 6.1.1, which retained the directionality of prediction errors (over- or under-prediction), the differences shown here are expressed in terms of absolute percentage error. This choice allows for a clearer and more direct assessment of the overall improvement achieved by the extended cache simulator, as it focuses on the magnitude of deviations rather than their sign.
#### 6.3.2 Interpretation and Evaluation

相比于 L1 cache 的预测结果, L2 cache 的结果与 ground truth 的误差普遍更小. 同时, 最大误差超过25%, 这是在 L1 cache 中没有的, 考虑到 L2 是共享缓存, 预测存在更多干扰, 这个结果也是解释得通的.与L1 相同的是, L2 结果也没有表现出 预测准确率与 matrix size的相关性. 在 L2 result 中同样有与其他矩阵结果差异较大的 outliner, 比如矩阵 wikipedia-20051105, 在部分线程下测得了远超其他矩阵的误差.

在经过筛选的两个版本的 simulator 139 次对比中,  其中的 84 次(60.43%), extended 后的程序表现得更优. 拓展后的程序对 L2 cache 的预测误差优化幅度非常小,  在 1, 12, 24, 36, 48 线程中, 分别比原来优化了-0.02%, 1.31%, 1.60%, 1.76%, 1.06%, 平均的优化率为 1.14%.

---

The evaluation reveals distinct characteristics in the prediction accuracy between L1 and L2 caches. While the L2 cache predictions generally demonstrate smaller absolute errors compared to ground truth measurements than those observed in L1 predictions, they exhibit maximum errors exceeding 25\%, which is not encountered in L1 results. This discrepancy can be attributed to the shared nature of the L2 cache, where interference from concurrent processes and coherence overhead introduces additional unpredictability that is challenging to model accurately.

Similar to the L1 findings, the accuracy of L2 predictions shows no significant correlation with matrix size. However, certain matrices function as notable outliers in the L2 results. For instance, wikipedia-20051105 demonstrates substantially higher error rates compared to other matrices under specific thread configurations.

In the filtered matrices analysis comprising 139 valid tests between the two simulator versions, the extended simulator demonstrated superior performance in 84 instances, representing 60.43\% of cases. Howeve, the extended simulator provided very limited improvements in L2 cache prediction accuracy. The optimization rates across different thread counts were: -0.02\% for 1 thread, 1.31\% for 12 threads, 1.60\% for 24 threads, 1.76\% for 36 threads, and 1.06\% for 48 threads, yielding an average improvement of 1.14\%.

#### 6.4 Accuracy Gap in this study

Cold Start Effect
本研究的实验中, 通过一次不计入预测结果的 SpMV 模拟或者真实执行, 对 cache 执行一次预热, 尽可能地避免了 cold start effect. 

Hardware Prefetching
模拟器无法完成 hardware prefetching 的模拟, 因此这一 accuracy gap 依然存在. 

Imperfect Modeling of Conflict Misses
本研究中, 通过对只支持 fully associative 的 cache simulator, 拓展为支持 N-way set-associative cache, 大力缩小了这一 gap.

Idealized vs. Actual Replacement Policy
LRU 算法 在此 simulator 中被使用, 而不是更贴近现实的 tree/bit based pseudo LRU. 这是未来可以改进的空间.

Write Strategy Implications
实验中应用的是 write-through strategy. 真实环境中使用的策略可能因机器的差异而不同.

Virtual-to-Physical Address Mapping
你来写

Multi-threading and Inter-core Interference
你来写

---

Cold Start Effect  
In this study, both the simulation and actual execution of SpMV were preceded by a warm-up phase, during which one complete iteration was performed and excluded from measurement. This approach effectively preloaded the cache with relevant data, thereby substantially mitigating the cold start effect.

Hardware Prefetching  
The simulator does not model hardware prefetching mechanisms. As a result, this represents a persistent accuracy gap between simulated and actual cache behavior.

Imperfect Modeling of Conflict Misses  
The original cache simulator supported only fully associative cache modeling. This study extended it to simulate N-way set-associative caches, thereby significantly improving the accuracy of conflict miss prediction.

Idealized vs. Actual Replacement Policy  
The simulator employs a strict Least Recently Used (LRU) replacement policy. In contrast, real-world architectures often use more hardware-efficient approximations such as tree-based or bit-based pseudo-LRU policies. This divergence represents a limitation in the current modeling approach and offers a direction for future improvement.

Write Strategy Implications  
The experiments adopted a write-through strategy for cache write operations. However, actual systems may employ alternative strategies such as write-back or write-allocate, depending on the specific machine architecture. This difference may lead to deviations in write-related cache events.

Virtual-to-Physical Address Mapping  
The simulator operates using virtual memory addresses and does not account for virtual-to-physical address translation effects. In real systems, address mapping mechanisms based on physical addresses can significantly alter cache set contention and conflict behavior. This omission results in an inherent gap between the simulation model and actual hardware performance.

Multi-threading and Inter-core Interference  
While the simulator incorporates basic support for multi-threaded execution, it does not fully capture inter-core interference effects such as cache line invalidations due to coherence protocols, shared cache contention. These hardware-level interactions in multi-core environments introduce additional noise and uncertainty that are not reflected in the current simulation results.

#### 6.5 Experimental Limitations

从实验方法来说, 本研究的实验存在两个限制: 一是在矩阵的选择时, 为了使矩阵的来源覆盖到各种不同领域, 矩阵的选择受到人为干预, 并不是随机的. 二是矩阵的普遍大小不够大, 研究中只用到了 Nonzeros 最大为 57 millions 的矩阵, 而实际上, 矩阵大小超过这个数字, 甚至 Nonzeros 达到 100 millions 的矩阵也不少. 另外, 重复实验的次数也可以增加, 以得到更可靠的实验结果.

这些限制导致了一个问题: 实验结果受到随机性影响. 从本实验已有的结果来看, 不同矩阵的差异对预测结果的影响很大. 因此, 无论是误差预测的准确率, 还是 6.2 中 threshold 的确定, 都不可避免的在通用性上有所缺失. 

此外, 本研究中对 working set size 与 active cache lines 的关系分析使用的是基于可视化方法的估计, 通过更大的数据集以及更科学的方法可以有办法确定一个更可信的参考值.

---

This study is restricted to several methodological limitations. First, the selection of matrices was intentionally planned to cover a diverse range of application domains rather than following a random sampling approach. While this improves the representativeness of the matrix set, it may introduce selection bias. Second, the size of the matrices used in the experiments is limited, with the largest matrix containing 57 million nonzeros. In practice, many real-world sparse matrices exceed this size, with some containing over 100 million nonzeros, which may exhibit different cache behavior patterns. Furthermore, the number of experimental repetitions was relatively limited, increasing the trial count would improve the statistical reliability of the results.

These limitations increase the susceptibility of the experimental outcomes to randomness and matrix-specific variations. The observed results indicate that prediction accuracy is highly influenced by matrix-specifig characteristics, which implies that both the error rates  and the threshold derived in Section 6.2 may lack generalizability beyond the studied matrix set.

Additionally, the analysis of the relationship between working set size (WSS) and the number of active cache lines relied primarily on visual estimation methods. A more rigorous and data-driven approach, supported by a larger and more varied dataset, would help establish a more robust and widely applicable reference value for determining valid simulation conditions.

#### Conclusion

This study investigated the accuracy of cache behavior prediction based on reuse distance analysis, with a specific focus on irregular memory access patterns in Sparse Matrix-Vector Multiplication (SpMV). An existing reuse distance-based cache miss measurement algorithm was extended to support set-associative cache systems, enabling more realistic modeling of conflict misses. Experiments were conducted on the A64FX architecture within the BEAST environment, where predictions from the extended cache simulator were systematically compared against hardware performance measurements obtained from Likwid counters.

The results demonstrate a clear disparity in the effectiveness of the proposed extension between private and shared cache levels. For L1 cache, which is private per core, the modified simulator achieved an average optimization rate of 9.95\%, indicating a meaningful improvement in prediction accuracy. In contrast, for the shared L2 cache, even after applying validity filtering based on working set size, the average optimization rate was only 1.14\%. This suggests that the extended approach, which primarily targets conflict miss modeling through set-associativity simulation, is notably more effective in private cache environments than in shared ones. The limited improvement in L2 predictions highlights the greater complexity of shared cache behavior, indicating the restriction of proposed approach.

This study has several limitations. Matrix selection prioritized diversity over randomness, potentially introducing bias. The maximum matrix size was limited to 57 million nonzeros, excluding larger real-world instances. The simulator also did not model important hardware features like prefetching, address translation, or detailed multi-core interference in shared caches, which affect real-world behavior.

In the future, several directions can be explored to address the limitations of this work and improve predictive accuracy. The simulation framework could be extended to more realistic cache replacement policies such as pseudo-LRU. Furthermore, testing on larger matrices and more hardware architectures would also help confirm and extend these findings. While software-based cache simulation using reuse distance provides valuable insights, achieving high accuracy in modern multi-core systems requires more nuanced and architecture-aware modeling.

#### abstract
Accurate prediction of cache behavior is essential for performance optimization, particularly for data-intensive applications with irregular memory access patterns such as Sparse Matrix-Vector Multiplication (SpMV). While reuse distance analysis offers a theoretical foundation for cache modeling, its practical accuracy is often limited by simplifications that ignore key architectural features.
This paper presents an extended reuse distance-based algorithm that incorporates cache associativity to better predict conflict misses. The study evaluates the model through trace-driven simulation of SpMV kernels using 40 matrices from the SuiteSparse collection, executed on a Fujitsu A64FX system. Predictions from both baseline and extended models are compared against hardware performance counters measured with Likwid.
Results indicate that the proposed extension optimizes prediction error for private L1 caches by an average of 9.95%, demonstrating significant improvement in accuracy. However, for shared L2 caches, optimization is limited to only 1.14% after applying a validity filter based on working set size. These findings suggest that while associativity-aware modeling enhances private cache predictions, shared caches may require more sophisticated approaches.

#### related work

reuse distance proposed by [mat] is the theoretical foundation of cache modeling. Beyls and D’Hollander 提出 reuse distance as a metric for characterizing application memory access behavior. A significant shortcoming of classical reuse distance theory is its assumption of full associativity. 即使受到关联性的限制, reuse distance analysis 仍广泛地应用于缓存优化研究, 如 cache performance prediction, program locality modeling, cache hits generation. 虽然有些研究指出, reuse distance 同样适用于 set-associativity, 但是这些工作要么是在较低关联度(<= 4 ways)中进行, 要么没有衡量 关联度对测量误差的影响.

Kim et at. 提出了一种 stack simulation for highly-associtive memories, 而 Breiter et al. 基于此提出了一种 lightweight approach to estimate cache behavior of SpMV based on reuse distance, 本研究的中的 simulator 基于这些工作拓展. Tools like Likwid Treibig et al. (2010) and PAPI Mucci et al. (1999) are widely used to obtain ground truth measurements for cache events, 本研究中使用前者在 Fujitsu A64FX 环境中得到硬件计数的 cache misses 数据. 测试中使用的 workload 来自 suitesparse collection.

---

The theoretical foundation of cache modeling in this work is built upon **reuse distance**, originally proposed by Mattson et al. [mat] and later advanced by Beyls and D’Hollander[] as a metric for characterizing application memory access behavior. However, a significant shortcoming of classical reuse distance theoryis its assumption of full associativity, which limits its direct applicability to modern set-associative cache architectures. Despite this limitation, reuse distance analysis is widely used in studies on cache performance prediction, program locality modeling, and cache hits generation[].

While some researchers have argued that reuse distance can be adapted to set-associative caches, most existing work has been limited to low associativity (e.g., ≤ 4 ways) or has not systematically quantified the impact of associativity on prediction accuracy[]  []. Kim et al.[] proposed a stack simulation method tailored for highly associative memories, which inspired Breiter et al.[] to develop a lightweight reuse distance-based approach for estimating cache behavior in Sparse Matrix-Vector Multiplication (SpMV). The simulator used in this study extends these contributions by incorporating support for set-associative cache modeling with higher associativity and explicitly evaluating its effect on prediction error.

To ensure rigorous validation, hardware-derived cache miss data were collected using Likwid [] on the Fujitsu A64FX platform, providing reliable ground truth measurements. The evaluation employed a diverse set of matrices from the SuiteSparse collection[], enabling comprehensive assessment under realistic and varied workload conditions.

#### 5.6 Ground Truth Collection

A parallel sparse matrix-vector multiplication (SpMV) kernel was implemented to collect cache misses counts using LIKWID performance profiling tools, which served as ground truth for the experiment. The implementation used OpenMP for shared-memory parallelization and represented the sparse matrix in Compressed Sparse Row (CSR) format.

The input vector x was initialized with unit values, and memory was allocated for the output vector y. Parallel computation was performed using OpenMP's #pragma omp for directive, where each thread processed different matrix rows. For each row, the dot product between the sparse row and the input vector was computed and stored in the output vector.

LIKWID performance markers were used to measure cache miss rates during execution. The first iteration served as cache warm-up, while performance measurement was conducted over the next ten iterations to avoid cold cache effects and obtain reliable cache miss statistics for the SpMV operation.

#### 废案
\subsection{OpenMP}

The parallel programming content in this study utilizes OpenMP directives. OpenMP is the de facto standard API for developing shared memory parallel applications in C, C++, and Fortran. It enables programmers to parallelize serial code easily by adding compiler directives (pragmas), without requiring in-depth knowledge of low-level hardware details or complex multithreaded management. OpenMP is particularly suited for the shared memory parallelism model, in which all threads operate within a single address space and share data seamlessly. This allows multiple threads to access the same memory locations and efficiently share variable values. 

\subsection{Sparse Matrix-Vector Dataset}

The SuiteSparse Matrix Collection from the University of Florida\cite{davis2011university} is a widely recognized repository of sparse matrices derived from a wide spectrum of domains. It serves as a standard benchmark in evaluating the performance of sparse matrix algorithms. In this study, the dataset was used as the workload for SpMV. 

\hfill\break
The matrices within the collection span a broad range of application domains, including both geometric (such as 2D/3D models) and non-geometric problems. Furthermore, the dataset includes matrices of varying scales, ranging from small to medium and large dimensions, making it suitable for computational experiments. By providing a diverse set of realistically occurring matrices, the collection supports robust and reproducible experimental comparisons.

\hfill\break
According to Davis and Hu’s 2011 study, matrices within the dataset can be classified into 27 distinct application domains\cite{davis2011university}. In this work, 40 matrices were selected from the collection, encompassing 18 of these categories as indicated by the “kind” tag in the data source. During the selection process, a wide variety of matrix sources were incorporated  (also referred to as the group attribute), with the number of nonzeros scaling from \_ to \_. Table 4.1 lists the data tags for the selected matrices.

##### spmv
\section{Experimental Procedure}

\subsection{Experiment Setup}

\subsection{Sparse Matrix-Vector multiplication}

This study investigated the cache behavior while simulating a Sparse Matrix-Vector multiplication program. Sparse Matrix-Vector multiplication (SpMV), denoted operation of multiplying a sparse matrix and a vector. Wilkinson stated his definition of sparse matrix in [Wilkinson 12]:

\hfill\break
\begin{displayquote}
The matrix may be sparse, either with the nonzero elements concentrated
on a narrow band centered on the diagonal or alternatively they may be
distributed in a less systematic manner.
\end{displayquote}


\hfill\break
Sparse Matrix-Vector multiplication is a fundamental kernel routine in numerical linear algebra and computational mathematics, usually expressed in the format `y = A * x`. In this operation, `A` represents a sparse matrix, while `x` and `y` are dense vectors. 

\hfill\break
The principal challenge and design focus of efficient SpMV implementations stem from the matrix's sparsity. SpMV algorithms strategically avoid unnecessary arithmetic on zero operands. Specifically, they ensure that each element of the matrix is accessed only once during computation. However, the irregular and data-dependent access pattern to the vector `x` often results in poor cache utilization, presenting a significant performance bottleneck.

\hfill\break
Different sparse matrix storage formats also affect cache access patterns. In this study, the CSR format is employed. The CSR format stores a matrix using three arrays: \verb|var[]| stores all nonzeros, \verb|col_idx[]| stores the column index of each nonzero element, and \verb|row_ptr[]| stores the starting index of each new row in \verb|val[]|. Listing aa shows the pseudocode for performing SpMV operations using the CSR format. In the study, this operation is not actually executed; instead, simulated cache accesses to matrices and vectors are performed.

\hfill\break
\begin{lstlisting}[language=C++]
do i = 1, Nr
    do j = row_ptr(i), row_ptr(i+1) - 1
        y(i) = y(i) + val(j) * A(col_idx(j))
    enddo
enddo
\end{lstlisting}


##### 2 intro
This paper focuses entirely on the cache system of modern computers. To better understand the paper, this chapter introduces basic cache knowledge, emphasizing content relevant to this research, and briefly introducing related technologies not used.

##### 3 intro
As established in Section 2.1, the growing performance gap between processor and memory speeds has made the memory subsystem a critical bottleneck in modern computing systems. Caches serve as a fundamental technique to mitigate this gap by storing frequently accessed data close to the processor. Consequently, improving cache utilization efficiency is directly linked to enhancing overall system performance. To achieve this, a deeper understanding of cache access patterns is essential. This necessity motivates the field of cache behavior prediction, which aims to anticipate future data accesses and manage cache resources more intelligently.

\hfill\break
This chapter explores methods for predicting cache behavior to inform and optimize replacement decisions. Section 3.1 begins by reviewing and summarizing the replacement operations within a cache system upon a miss, building upon the foundational knowledge from the previous chapter. Section 3.2 introduces reuse distance, a critical metric for predicting cache behavior, and discusses the specific extensions with set-associativity to this metric proposed in our study. Following this, Section 3.3 surveys existing cache simulation approaches commonly employed in prior research to evaluate replacement policies and predictive models. Finally, Section 3.4 analyzes the potential sources of error between predictions and actual outcomes, providing a discussion on the limitations and realism of our approach.