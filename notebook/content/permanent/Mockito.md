---
title: "Mockito"
date: "2023-06-16"
tags:
- Java
---


### Get started
```java
//You can mock concrete classes, not just interfaces 
LinkedList mockedList = mock(LinkedList.class); 

//stubbing 
when(mockedList.get(0)).thenReturn("first"); 
when(mockedList.get(1)).thenThrow(new RuntimeException()); 

//following prints "first" 
System.out.println(mockedList.get(0)); 
//following throws runtime exception 
System.out.println(mockedList.get(1)); 
//following prints "null" because get(999) was not stubbed 
System.out.println(mockedList.get(999)); 

//Although it is possible to verify a stubbed invocation, usually **it's just redundant** 
//If your code cares what get(0) returns, then something else breaks (often even before verify() gets executed). 
//If your code doesn't care what get(0) returns, then it should not be stubbed. 
verify(mockedList).get(0);
```


#### 匹配参数
```java
//stubbing using built-in anyInt() argument matcher 
when(mockedList.get(anyInt())).thenReturn("element"); 
//stubbing using custom matcher (let's say isValid() returns your own matcher implementation): 
when(mockedList.contains(argThat(isValid()))).thenReturn(true); 
//following prints "element" 
System.out.println(mockedList.get(999));
//**argument matchers can also be written as Java 8 Lambdas** 
verify(mockedList).add(argThat(someString -> someString.length() > 5));
```

#### 匹配调用次数
```java
mockedList.add("once");
mockedList.add("twice"); 
mockedList.add("twice"); 
mockedList.add("three times"); 
mockedList.add("three times"); 
mockedList.add("three times");

//exact number of invocations verification 
verify(mockedList, times(2)).add("twice"); 
verify(mockedList, times(3)).add("three times");
verify(mockedList, atMostOnce()).add("once");
// atLeast(2)
// ...
```