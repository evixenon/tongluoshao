---
title: "C++ 算法常用数据结构"
date: "2025-03-17"
tags:
---

#### 哈希 
```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> hashtable;
        for (int i = 0; i < nums.size(); ++i) {
            auto it = hashtable.find(target - nums[i]); // 查找
            if (it != hashtable.end()) { 
                return {it->second, i};
            }
            hashtable[nums[i]] = i; // 修改
        }
        return {};
    }
};
```

**`auto` 的作用**
- `auto` 是 C++11 引入的关键字，用于**自动推断变量的类型**。
- 编译器会根据 `hashtable.find(target - nums[i])` 的返回值类型，自动推断 `it` 的类型。

 **`hashtable.find()` 的返回值**
- `hashtable.find(key)` 用于在哈希表中查找键 `key`。
- 如果找到键 `key`，`find()` 返回一个**迭代器**，指向该键值对。
- 如果未找到键 `key`，`find()` 返回 `hashtable.end()`，表示查找失败。

 **`hashtable.end()` 的作用**
- `hashtable.end()` 是哈希表的**尾后迭代器**，表示哈希表的末尾（即最后一个元素之后的位置）。
- 它不指向任何有效元素，仅用于表示查找失败或遍历结束。

 **`second` 的用途**
在 C++ 中，`std::pair` 和关联容器的元素通常是键值对（key-value pair），其中：
- `first` 表示键（key）。
- `second` 表示值（value）。

#### 数组

```cpp
vector<vector<int>> ans;
ans.size(); // 长度
sort(ans.begin(), ans.end()); // 排序
ans.push_back({x, nums[j], nums[k]}); // 往数组里添加
```


#### 链表

```cpp
// ctor
struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};
```


```cpp
// 记得箭头
node = node->next;

// 哨兵
ListNode dummy(0, head);
auto slow = &dummy; // auto = ListNode*
return dummy.next;

// 删除节点时的内存管理
auto node = fast;
fast = fast->next;
delete node;

```