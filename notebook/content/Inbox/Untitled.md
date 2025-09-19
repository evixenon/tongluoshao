
#### 4.1 Experiment Procedure

The experiments are conducted in the Bavarian Energy Architecture & Software Testbed(BEAST) environment at Leibniz Supercomputing Centre(LRZ), 在 Fujitsu A64FX 的机器上执行, 使用了40个来自 suitesparse matrix collection 的矩阵作为测试负载. baseline 数据使用的是 breiter 等人在论文中提出的 approach, 这是一个基于 reuse distance 的 cache simulator. 此外, 使用了 likwid tools 收集真实 spmv 计算时产生的 cache misses 作为 ground truth. 

The A64FX is a state-of-the-art ARM hardware architectures designed by Fujitsu for High Performance Computing(HPC), with 48-core processor. Each core has a private 64 KiB 4-way L1D caches and every 12 cores share the same last-level L2 cache, no L3 cache).