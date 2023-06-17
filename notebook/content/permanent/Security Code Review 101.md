---
title: "Security Code Review 101"
date: "2023-06-16"
---

应用程序的许多漏洞可以追溯到编程时的粗心大意。代码审查（独立进行，部分自动进行）的目的是在编程时就已经改进安全方面。使用OWASP安全编码道场来识别输入验证、内存操作等方面的典型错误，并改进你自己的编程风格!
https://owasp.org/SecureCodingDojo/codereview101/

一些好的习惯:
- 验证输入的时候用字符白名单
- Parameterized Statements: 用设置参数的方式代替字符串连接组成 statement.
- 输入时也限制长度: fgets 代替 gets
- 用到 buffer 时指定统一的长度
- off-by-one: C 涉及内存读写的时候用 < 而不是 <= (留出一个结束符)?
- 不要把用户的输入直接用作输出
- sends data using POST, which doesn't store the parameters in web logs.
- JS 不要用 div.innerHTML 更新内容, 用 div.innerText 和 div.textContect
- 可以用 id 指代的时候不用原信息(不要把原信息露出来)