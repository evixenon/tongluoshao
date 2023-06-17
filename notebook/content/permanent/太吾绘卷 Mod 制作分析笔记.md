---
title: "太吾绘卷 Mod 制作分析笔记"
date: "2023-06-15"
---

#### 主动传剑制作中

SetLegacyPassingState 的变化
```
2023-04-24 12:00:50.0793|INFO|Main|GameData.Utilities.AdaptableLog|select option to next Event: 52b116a3-0248-4bbe-9d94-06b2029347be
2023-04-24 12:00:53.3029|INFO|Main|GameData.Utilities.AdaptableLog|[=EviTest=] SetLegacyPassingState:3 // PassingLegacy 进入遗惠界面
2023-04-24 12:00:53.3029|INFO|Main|GameData.Utilities.AdaptableLog|[=EviTest=] 太吾ID: 5098
2023-04-24 12:01:06.5556|INFO|Main|GameData.Utilities.AdaptableLog|[=EviTest=] SetLegacyPassingState:1 // ChoosingHeir 在同道中选择传剑的
2023-04-24 12:01:06.5556|INFO|Main|GameData.Utilities.AdaptableLog|[=EviTest=] 太吾ID: 5098
MainStoryLine progress notified:from 16 to 16
2023-04-24 12:01:21.5085|INFO|Main|GameData.Utilities.AdaptableLog|[=EviTest=] SetLegacyPassingState:4 // DisplayEvent
2023-04-24 12:01:21.5085|INFO|Main|GameData.Utilities.AdaptableLog|[=EviTest=] 太吾ID: 5098
太吾ID：5100    // 所以最后点击传剑才变化
```


ActionName Listener 的 Trigger 代码形如
```C#
DomainManager.TaiwuEvent.TriggerListener("SelectSuccessorComplete", value: true);
```

##### 逻辑链&Guid
```
trigger传剑入口: 24b
if(入魔&&有同道): 0fd 
{
    StartPassingLegacy 
    {
        state=3
    }
    listen(PassingLegacyComplete)
    
    f7d 
    {
        SelectSuccessor
        listen(SelectSuccessorComplete)
    }
    
    结束传剑对话 1a5
    
    结束传剑立场对话 b7b { FinishPassingLegacy }
}
```

这两个都是 GameBridge 的 call method 调用, 应该在前端
```
ConfirmChosenSuccessor {
    state=4
    Trigger(SelectSuccessorComplete)
}
CompletePassingLegacy{
    Trigger(PassingLegacyComplete)
}
```

总之, 无损传剑的核心是改 ConfirmChosenSuccessor 里的 TransferTaiwuData, 可喜可贺


