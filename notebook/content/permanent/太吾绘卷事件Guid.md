---
title: "太吾绘卷事件Guid"
date: "2023-06-15"
---

#### 大地图人物交互

人物交互主事件
```
567d1caf-8b28-4dbf-8cbe-e746e8ac8cfd
```

交谈
```
05e87c45-f14e-49ef-8769-cbaced4753ae
```

比试
```
9dce4f27-347c-4588-9be4-08c1c7f1f4a3
```

修习
```
a9d0bcd8-e378-4ee9-96a6-1e5b9db17371
```

亲近
```
bad63f08-115a-45aa-970c-fa203dd85e2b
```

敌对
```
7c70ce0c-577a-4049-bcad-e593c63d62d4
```

互动
```
fb38f657-6ed0-41e4-a0c2-c82afb49762f
```


#### 传剑
传完了按立场说话
![[attachments/Pasted image 20230424000412.png]]
```
b7bf8f65-470e-4f55-9377-b2417f9863b8
```

TriggerLegacyPassingEvent(false)
入魔传剑
```
24b66f5e-cd47-486c-ad8f-6e069bd8dd71 to event => 0d699770-2cc9-4c91-89a8-f6218a041731
```

TriggerLegacyPassingEvent(true)
死亡传剑
```
24b66f5e-cd47-486c-ad8f-6e069bd8dd71 to event => 0fdb04fe-635f-4359-9e81-01937639be23
```

24b(默认跳转0fd)
![[attachments/Pasted image 20230424004840.png]]

0d6
![[attachments/Pasted image 20230424004929.png]]

TriggerLegacyPassingEvent函数
```text
2023-04-24 04:12:16.4292|INFO|Main|GameData.Utilities.AdaptableLog|[=EviTest=] entering: onEvent_NeedToPassLegacy()
2023-04-24 04:12:16.4292|INFO|Main|GameData.Utilities.AdaptableLog|new Event triggered : 24b66f5e-cd47-486c-ad8f-6e069bd8dd71, _triggeredEventList.Count = 2
2023-04-24 04:12:16.4292|INFO|Main|GameData.Utilities.AdaptableLog|[=EviTest=] entering: ClearAllTrigeredEvent()
2023-04-24 04:12:16.4292|INFO|Main|GameData.Utilities.AdaptableLog|[=EviTest=] entering: GetMonthlyEventCollection()
2023-04-24 04:12:16.4292|INFO|Main|GameData.Utilities.AdaptableLog|[=EviTest=] 什么玩意儿
2023-04-24 04:12:16.4292|INFO|Main|GameData.Utilities.AdaptableLog|select option to next Event: 4c2182d3-1cfb-4fc3-b33f-630322fa370b
```