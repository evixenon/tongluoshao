---
title: "Java 细节"
date: "2023-06-16"
tags:
- Java
---

##### List<> 和 []
`String[]` 是数组，定长，不可变  
`List<String>` 是泛型 ，非定长，可变

##### 极限值
Integer.MAX_VALUE = 2147483647
Double.NEGATIVE_INFINITIVy
Double.NaN

##### 剩余参数
```java
  private void check(double a, double b, double c, double... expectedResult) {
    List<Double> zeros = solver.getZeros(a, b, c);
    double[] arr = zeros == null ? null : zeros.stream().mapToDouble(d -> d).toArray();
    assertArrayEquals(arr, expectedResult, DELTA);
  }
```

