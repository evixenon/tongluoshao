---
title: "JUnit"
date: "2023-06-16"
tags:
- Java
---

#### IntelliJ 中的 Junit
首先, 2017以上版本的 IntelliJ 是默认支持 JUnit 的, 且自带
只要写一个带 `@Test` 的方法, 再写一个 `assert` 就会自动导入需要的包

#### JUnit 命名风格
测试类的命名是 `被测试的类名Test`
测试方法的命名是 `test被测试方法名_描述` 

#### Test-Fixture
对象和操作的集合, 代表一个测试类的测试案例的相同开始状态
比如在测试开始前都会执行 @BeforeEach, 即是生成同样的对象进行同样的操作

#### Test 类型
- @Test
- @BeforeEach
- @AfterEach
- @Before, setUp()
- @After, tearDown()
- @BeforeClass, static 方法
