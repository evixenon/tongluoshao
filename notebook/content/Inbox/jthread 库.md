---
title: "jthread 库"
date: "2026-03-19"
tags:
---
`std::jthread` 是 C++20 引入的新一代线程库（全称 “joining thread”），核心优势是**自动管理线程生命周期**（析构时自动 join，避免线程泄漏），并原生支持 `std::stop_token` 实现优雅停止。下面我会提供一个**覆盖核心用法的完整示例**，包含基础使用、停止请求、参数传递、异常处理等关键场景，代码可直接编译运行（需 C++20 编译器）。

### 一、完整示例代码

cpp

运行

```
#include <iostream>
#include <thread>   // std::jthread、std::stop_token、std::stop_source
#include <chrono>   // 时间相关函数
#include <string>   // 字符串参数示例
#include <stdexcept>// 异常处理

// 示例1：基础工作函数（接收停止令牌，实现优雅停止）
void worker_task(std::stop_token stoken, const std::string& task_name, int count) {
    try {
        int i = 0;
        // 循环工作，每次检查停止请求
        while (!stoken.stop_requested() && i < count) {
            std::cout << "[" << task_name << "] 工作中... 进度：" << i+1 << "/" << count << std::endl;
            // 模拟耗时工作（500ms）
            std::this_thread::sleep_for(std::chrono::milliseconds(500));
            i++;
        }

        // 区分“正常完成”和“被停止”
        if (stoken.stop_requested()) {
            std::cout << "[" << task_name << "] 收到停止请求，提前退出" << std::endl;
        } else {
            std::cout << "[" << task_name << "] 任务正常完成" << std::endl;
        }
    } catch (const std::exception& e) {
        std::cerr << "[" << task_name << "] 执行出错：" << e.what() << std::endl;
    }
}

// 示例2：带停止回调的任务（停止时执行清理逻辑）
void callback_task(std::stop_token stoken) {
    // 注册停止回调：收到停止请求时执行清理
    auto callback = stoken.register_callback([]() {
        std::cout << "[回调任务] 收到停止请求，执行清理操作..." << std::endl;
    });

    std::cout << "[回调任务] 开始运行（按回车触发停止）" << std::endl;
    // 阻塞等待，直到收到停止请求
    while (!stoken.stop_requested()) {
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }
    std::cout << "[回调任务] 已退出" << std::endl;
}

int main() {
    // ========== 场景1：基础使用（自动join + 手动停止） ==========
    std::cout << "=== 场景1：基础任务 ===" << std::endl;
    // 创建jthread，传入工作函数和参数
    std::jthread worker1(worker_task, "基础任务", 10);

    // 主线程运行3秒后，发起停止请求
    std::this_thread::sleep_for(std::chrono::seconds(3));
    // 获取stop_source并发起停止请求（jthread原生支持stop_source）
    worker1.request_stop();

    // 无需手动join！jthread析构时会自动join，这里为了演示等待完成
    if (worker1.joinable()) {
        worker1.join();
    }

    // ========== 场景2：带停止回调的任务 ==========
    std::cout << "\n=== 场景2：带回调的任务 ===" << std::endl;
    std::jthread worker2(callback_task);
    // 主线程等待用户输入后停止
    std::cout << "请按回车键触发停止...";
    std::cin.get();
    worker2.request_stop();

    // ========== 场景3：Lambda作为线程入口（结合stop_token） ==========
    std::cout << "\n=== 场景3：Lambda任务 ===" << std::endl;
    std::jthread worker3([](std::stop_token stoken) {
        int count = 0;
        while (!stoken.stop_requested()) {
            std::cout << "[Lambda任务] 计数：" << count++ << std::endl;
            std::this_thread::sleep_for(std::chrono::milliseconds(200));
        }
        std::cout << "[Lambda任务] 已停止" << std::endl;
    });

    // 2秒后停止Lambda任务
    std::this_thread::sleep_for(std::chrono::seconds(2));
    worker3.request_stop();

    // ========== 场景4：jthread析构自动停止（无需手动处理） ==========
    std::cout << "\n=== 场景4：自动析构停止 ===" << std::endl;
    {
        // 局部作用域内创建jthread
        std::jthread worker4(worker_task, "自动停止任务", 20);
        std::cout << "[自动停止任务] 运行中，3秒后析构..." << std::endl;
        std::this_thread::sleep_for(std::chrono::seconds(3));
        // 作用域结束，worker4析构：自动调用request_stop() + join()
    }
    std::cout << "[自动停止任务] 已被析构并停止" << std::endl;

    std::cout << "\n所有任务执行完毕" << std::endl;
    return 0;
}
```

### 二、编译与运行说明

1. **编译器要求**：需支持 C++20（GCC 10+、Clang 11+、MSVC 2022+）；
2. **编译命令**（GCC/Clang）：
    
    
```bash
g++ -std=c++20 jthread_demo.cpp -o jthread_demo -pthread
./jthread_demo
```

`jthread` 析构时会检查是否可 join，若未 join 则自动 join（避免 `std::thread` 析构时的崩溃风险）。

原生支持 `stop_token`/`stop_source`, `std::thread` 需手动实现停止标志（如 `std::atomic<bool>`）