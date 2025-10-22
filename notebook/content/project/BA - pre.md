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

