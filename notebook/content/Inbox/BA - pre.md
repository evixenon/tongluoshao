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

To further dive into this topic, we need to answer two questions at fisrt.
The first one is: What is cache behavior here.

When a program runs, it constantly reads and writes data from memory. But accessing the main memory is slow, so modern CPUs use _caches_ to store recently used data— cache is smaller, but it is also faster. 

(and) **Cache behavior** refers to how data moves in and out of the cache. If the required data is found in the cache, it is called a cache hit, otherwise it will be a cache miss. When a cache miss occurs, the cache system also needs to decide how to bring new data into the cache and which old data should be replaced.  
This behavior has a huge impact on program performance.


When we talk about **cache behavior prediction**, we mean predicting these hit/misses patterns in the system. So then comes the second question: why do we want to predict cache behavior?

First, it gives us valuable insights into programs. cache behavior prediction helps us to analyze performance, or optimize thes codes. For example, if we can predict frequent cache misses, we may identify problems like _poor data locality_, which can lower program performance with ineffective cache access patterns.

Second, accurate prediction also helps in **designing and evaluating cache architectures**, allowing researchers and engineers to explore how different cache policies or configurations affect the system performance.

---

3 simplified assumptions

In many cache-related studies, researchers often make **simplified assumptions** to make analysis or simulation easier.  
These assumptions help reduce complexity, but they can also lead to differences between predicted and real cache behavior.

One common example is the **cold start effect** — In simulation, a cache is typically modeled as starting from an empty state. This results in a burst of cache misses (cold misses) at the beginning, which would probably not occur in reality, since the cache is rarely empty on a continuously running system.

Another simplification is using a **fully associative cache** instead of a **set-associative cache**.  
In a fully associative cache, a block of data can go anywhere of the cache, which makes analysis simpler.  
But real hardware is usually set-associative, meaning each block can only go into certain sets. I will use an example to make a further explanation about the two different associativities in the next slide.
This restriction can lead to conflicts and performance differences.

We also often ignore **multi-threading and inter-core interference**.  
In multi-core systems, multiple threads share caches and may compete for cache space, which can drastically change cache behavior.

There are also other factors, like **replacement policies** (LRU vs. pseudo-LRU), **hardware prefetching**, and **write policies**, which are often simplified or ignored.

All these simplifications can lead to an **accuracy gap** between predicted results in a cache simulation and actual cache behavior.  
In my work, I mainly focus on understanding how the **fully associative versus set-associative assumption** affects the accuracy of cache behavior prediction.

---

a conflict miss occurs only in set-associative cache, it is a little bit more complicate.  
  
well let's first pay attention to the images, on the left side there is a fully associative cache with the capacity 8.  
  
In a fully associative cache, a data block can go to any free place of the cache.  

On the right side there is a two-way set-associative cache. in this kind of cache, free places are divided into different sets. In each set there are two free places and this is what 2 way means. which set a data block should be placed in is calculated by address modulo by number of sets. for example, 6 modulo 4 is 2, so block 6 goes to set 2 .

If we now want to access a new block 10 in both cache, 10 can go to any free places in the fully associative cache, but it can only go to set 2 on the right side, because 10 module 4 is also 2.

Then one of the data in set 2 should be replaced, even if there are other blank spaces in the cache. This might lead to a conflict miss in the future.

In short, conflict misses are misses caused by conflicts within a set.

Although fully associative cache seems much more simple and easy to understand, it is very expensive, and most real hardware employ set-associative for common caches.


---

Methods

My main work in this thesis is to adjust an existing algorithm, which simulates the cache access pattern in a
Sparse Matrix-Vector Multiplication(SpMV) program. 

The original algorithm measures the amount of capacity misses under a fully associative cache assumption.
While The algorithm after adjustment, which i call it extended algorithm later, will measure the number of conflict misses under a set-associative cache simulation.

The experiments are carried out on the fujitsu A64FX,  it has a 48 cores in total. Each core has
a private 64 4-way set-associative L1 cache. Every group of 12 cores shares an L2 cache, which is 16-way associative.

The experiments are done with 1/12/24/36/48 threads

--
In my thesis, my first goal is to extend an existing algorithm that simulates the cache access pattern of a SpMV program.  
SpMV means Sparse Matrix–Vector Multiplication, it is a widely used computational kernel in scientific and engineering applications, and it is often used to study memory and cache behavior.

The original algorithm measures the number of capacity misses under a fully associative cache assumption.  
In my extended version, I modify it to simulate a set-associative cache, so it can also measure conflict misses.

I ran the experiments on a Fujitsu A64FX processor. There are two levels of caches.
Each core has a private L1 cache, with 4-way associativity.  
Every group of 12 cores shares an L2 cache, which is 16-way associative.

The processor has 48 cores in total, so I ran the experiments with 1, 12, 24, 36, and 48 threads to study the effect of parallelism,

---
In the original version of the algorithm, there is a class called “private cache”, which simulates a fully associative cache.
Inside this class, two member variables — “stack” and “refmap” — work together to maintain an LRU stack, so that the cache can keep track of the most recently used data.
Another variable, called “bucket”, is used for statistical purposes — it records how many cache misses occur during the simulation.

my extension is to make this structure support a set-associative cache.
The main idea is to create a vector which stores all the sets within the same level of cache.
Each set itself is a private cache object, and each of them maintains its own LRU stack.

Correspondingly, the way we do the cache miss statistics are also adjusted.

(Correspondingly, the way we collect cache-miss statistics also needs to be adjusted, because now we count misses across multiple sets instead of a single global cache.)

---
To evaluate the prediction accuracy of both algorithms, we need to know the real number of cache misses.

The machine we used supports hardware performance counters
So, we can use the LIKWID performance tool to directly record low-level events such as cache misses during execution.
The data collected by hardware counters is highly reliable, so it can be treated as ground truth.

I wrote a simple test program that runs the real SpMV computation, measure cache misses that occur during the operation.
The results from this program are then compared with the results predicted by our simulation algorithms.