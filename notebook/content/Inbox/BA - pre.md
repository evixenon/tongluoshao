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
