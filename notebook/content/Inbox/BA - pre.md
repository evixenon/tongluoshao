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
The first one is: What is cache behavior.

When a program runs, it constantly reads and writes data from memory. But accessing the main memory is slow, so modern CPUs use _caches_ to store recently used data— cache is smaller, but it is also faster. 

(and) **Cache behavior** here refers to how data moves in and out of the cache. If data is found in the cache, it is called a cache hit, otherwise it will be a cache miss. When a cache miss happens, the cache system also needs to decide how to bring new data into the cache and which old data should be replaced.  
This behavior has a huge impact on program performance.


When we talk about **cache behavior prediction**, we mean predicting these hit/misses patterns in the system. So then comes the second question: why do we want to predict cache behavior?

First, it gives us valuable insights into programs. cache behavior prediction helps us to analyze performance, or optimize thes codes. For example, if we can predict frequent cache misses, we may identify problems like _poor data locality_, which can lower program performance by ineffective cache access pattens.

Second, accurate prediction also helps in **designing and evaluating cache architectures**, allowing researchers and engineers to explore how different cache policies or configurations affect the system performance.

---


