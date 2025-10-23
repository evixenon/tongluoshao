---
title: "BA - pre"
date: "2025-10-15"
tags:
---

intro: 
- 缓存行为是什么? 
    - 当系统写入一块缓存或读取一个缓存时,
- 为什么了解缓存行为很重要
    - 
    - 很多关于缓存的研究在基于与真实情况有区别的假设下, 我们需要知道这些假设对研究结果的准确性的影响
-Valuable insights to possible bottlenecks within certain applications(e.g. poor data locality)
-Cache relative researches are carried out under

背景: 造成 accuracy gap 的假设们 -> 我们的重点是 conflict

背景: 什么是 conflict miss
- 3C, cold miss and capacity miss
- associativity
- conflict miss example

Research questions and work

Testing environment and workload

Program design
- extended algorithm(main idea)
- ground truth colletor

L1 result

L2 result - problem

wss

L2 result

---

my name is 

thank you for coming to my final presentation for my bachelor's thesis and My topic is Conflicts in Cache Behavior Prediction

---
2
introduction

To better dive into the background, there are two questions need to be answered at beginning.  
The first one is: What is cache behavior here.  
  
When a program runs, it constantly reads and writes data from cache.  
  
Cache behavior refers to how data moves in and out of the cache. If the required data is found in the cache, it is called a cache hit, otherwise it will be a cache miss. When a cache miss occurs, the system also needs to decide how to bring new data into the cache and which old data should be replaced.   
Thess actions have a huge impact on program performance.  
  
And when we talk about cache behavior prediction, we mean predicting these hit/miss patterns and the behavior triggered by them in the system. So then comes the second question: why do we want to predict cache behavior?   
  
well the first reason is, it gives us valuable insights into programs.  
if we can predict frequent cache misses, we may identify problems that lowers the program performance, then we can analyze the code, and optimize the code.  
  
Second, an accurate prediction also helps in designing and evaluating cache architectures, allowing us to explore how different cache policies or configurations affect the system performance.

---
Background: Simplified Assumptions in
Cache Simulations


However, in many cache-related studies, researchers often make simplifications or idealized assumptions to make simulation or analysis easier.    
  
One common example is using a simplified replacement policy, typically the LeastRecentlyUsed, the lru algorithm,   instead of the pseudo-LRU scheme that is actually implemented in hardware.  
  
another example is Inter-core interference, which can occur in multi-threaded systems, that is different threads may affect each other when they share the same caches. this kind of interactions are usually not simulated and they are also difficult to observe in real hardware.   
  
There are also other factors that can influence cache behavior, such as hardware prefetching techniques and cache write policies, but these are often ignored or simplified in simulations.  
  
The last pointe I want to mention is using a fully associative cache instead of a set-associative cache. In my work, I mainly focus on analysing the impact of this assumption.   
  
on the left side, you can see a fully associative cache with the capacity 8 blocks.    
In this type of cache, a new data block can be placed in any free location.   
  
On the right side there is a two-way set-associative cache. Here, the cache space is divided into four different sets, each set contains two slots, and this is what “two-way” means.  
  
In which set a new data block can be placed in is calculated by memory address modulo by number of sets. for example, 6 modulo 4 equals 2, so block 6 would be placed in set 2.  
  
Set-associative caches are employed in most modern processors, while fully associative caches are only used for small hardware components, because they are very expensive.  
   
All these assumptions or simplifications help reduce complexity and overheads, but they can also lead to an accuracy gap between predicted results from simulation and actual cache behavior.

---

cache miss types

before moving on to next part. it is also useful to involve an introduction of  cache miss types.   
   
in the established 3c model, cache misses are categorized into 3 types, cold capacity conflict. there is also a forth type of miss called Coherence misses emerged thereafter,.   
  
i'm going to emphasize capacity misses and conflict misses, because they are the most relevant in my thesis.  
  
a capacity miss means that, the required data block was previously in the cache, but has been replaced by the new coming data due to the limited capacity. so you can no longer find it in the cache  and this is a miss;  
   
a conflict miss is a little bit more complicate, it occurs only in set-associative cache.  
   
Now in this example, the 2 places in set 2 are already occupied. If we now want to access a new block 10, it can only go to set 2, because 10 module 4 is 2.   
  
but set 2 is full, Then the least recently used block in set 2, will be replaced, even if there are many free spaces in other sets. So block 2 gets out, block 10 comes in.  
  
And now if we access block 2 again, this is going to be a conflict miss.  
   
so conflict misses are, in short, misses caused by conflicts within a single set.

---
 contribution
Now i would like to introduce the contribution of my thesis.  
  
My first goal is to extend an existing algorithm that simulates the cache access pattern of a SpMV program.    
SpMV means Sparse Matrix–Vector Multiplication, it is a widely used computational kernel in scientific and engineering applications, and it is often used to study memory and cache behavior as well.  
  
The algorithm is based on the reuse distance theory by mattson et al., this is a famous metric for modeling cache behavior. And the algorithm also measures the number of cache misses, the measuring method under this reuse distance framework was proposed by Kim et al.  
   
The original algorithm measures the number of capacity misses under a fully associative cache assumption.    
In my extended version, I modify it to simulate a set-associative cache, so it can also measure conflict misses.   
  
And then, i predicted cache misses with the two algorithms, the original one and my extended one, and compare the results with actual cache misses.

---

experiments

I ran the experiments on a Fujitsu A64FX processor, well this is one of the state-of-the-art architechture in BEAST system, which is located in our LRZ.  
  
There are two levels of caches in this architechture, L1 and L2, no L3 cache.  
The processor has 48 cores in total, Each core has a private L1 cache, with 4-way associativity.    
L2 caches are shared, every group of 12 cores shares an L2 cache, which is 16-way associative.   
   
I also ran the experiments under different thread configurations, both single thread and multiple threads, in order to study the effect of parallelism. And as the workload for the SpMV program, i used 40 matrices from Sparsesuite, which is a well known collection of sparse matrices in cache study domain.

---

program

As i mentioned, i extended an algorithm in this thesis, and I am going to briefly introduce how this is done.  
  
In the original version of the algorithm, there is a class called “private cache”, which simulates a fully associative cache.  
Inside this class, two member variables — “stack” and “refmap” — work together to maintain an LRU stack, so that the cache can keep track of the most recently used data.  
Another variable, called “bucket”, is used for statistical purposes — it records how many cache misses occur during the simulation.  
  
my extension is to make this structure support a set-associative cache.  
The main idea is to create a vector which stores all the sets within the same level of cache.  
Each set itself is a private cache object, and each of them maintains its own LRU stack.  
Correspondingly, the way we do the cache miss statistics are also adjusted.  
  
If a new data block comes in, the first step is to decide in which set it should be placed in. Then the following procedure in this set is similar to what happens in the fully associative cache.

---

program2

To evaluate the prediction accuracy of both algorithms, we need to know the real number of cache misses.  
  
The testing architechture we used supports hardware performance counters, which can record low-level events such as cache misses .  
  
So I wrote a simple program that runs the real SpMV computation, well this is how SpMV code looks like in CSR format using cplusplus, and I use LIKWID marker APIs to enable hardware counters during the execution, wrapping the computation here, so that i can measure cache misses within this area.  
  
The data collected by hardware counters is highly reliable, so it can be treated as ground truth.  The results from this program will be compared with the cache misses predicted by our simulation algorithms later.

---

results

after prediction, I calculated the Mean Absolute Percentage Error, or MAPE between predicted results and ground truth for every matrix, with both original and the extended algorithm. This value represents how far the prediction results are to the real data,  
  
As shown in the tables, the extended algorithm produces prediction results that are closer to the ground truth, which means a smaller MAPE value.  
We can also see that the standard deviation becomes more stable, indicating more consistent predictions across different thread counts.  
  
For the L1 cache, on average, the extended algorithm achieved an optimization rate of about 9.95% compared to the original one.  
For the L2 cache, the improvement is smaller — around 1.14% — but it still shows a slight gain in accuracy.

---

conclusion

Overall, the extended algorithm achieved more accurate predictions than the original version.  
This shows that simplifying a set-associative cache into a fully associative model can indeed reduce prediction accuracy, because it ignores conflict misses that occur in realistic cache architectures.  
  
While the extended algorithm achieved a notable improvement in the L1 cache — about 9.95% on average — the gain in the L2 cache was much smaller, only around 1.14%.  
  
The main difference between L1 and L2 is that L1 caches are private and have low associativity, making them more sensitive to conflict misses, whereas L2 caches are shared and have high associativity, where other factors like multi-core interference dominate.  
  
This indicates that the proposed approach is more effective for low-associativity, private caches, but less effective for complex, shared caches with many interacting factors.  
  
There are also some limitations in this study — for example, the matrix size was was limited. In the future, the framework could be extended with more realistic cache policies like pseudo-LRU, and tested on larger datasets and more architectures to improve its accuracy and generality.