---
title: "Java Date, Java Calender"
date: "2023-09-02"
tags:
---

`java.util.Date` 的很多功能都停用的, 提示去 `java.util.Calender` 找

#### 获取实例
```java
// 默认是 java.util.GregorianCalendar 的实例
Calendar cal = Calendar.getInstane(); 
```

#### 关键字段
- DATE/DAY_OF_MONTH
- HOUR/HOUR_OF_DAY
- MILLISECOND
- MINUTE
- MONTH
- YEAR
- ZONE_OFFSET

#### 重要方法
```java
add(int field, int amount);
get(int field);
getInstance(); // 可指定地区
getTimeInMillis();
roll(int field, boolean up); // 加减时间值, 不进位
set(int field, int value); // 设置指定字段的值
set(int year, int month, int day, int hour, int minute);
setTimeInMillis(long millis);
```