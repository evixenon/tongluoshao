---
title: "XSS"
date: "2023-06-16"
tags:
- 网安
---

#### XSS
Cross Site Scripting
让软件执行恶意代码

典型的XSS目标
- 将敏感数据，如cookies，传输给攻击者。 
- Mallet可以用这个来冒充Bob（身份盗窃，冒充攻击)

Dangerous HTML element attributes: `innerHTML, src, onLoad, onClick, etc...`

Dangerous functions: `eval, setTimeout, setInterval`

##### DOM XSS
- 没有网络服务器参与
- 在可以输入的地方都可以尝试输入恶意代码, 攻击者自己触发
- JS 不检查传入的参数(或者被绕过了)

```html
http://www.example.com/index.html?username=<script>alert(“XSS-Problem!“)</script>
```

##### Reflected XSS
在受害者做出某种行为是被触发, 例如点了这个链接
```html
http://suchmaschine.example.com/?suchbegriff=<script type="text/ javascript">alert("Alice, Du hast ein XSS-Problem!")</script>
```

##### Persistent(stored) XSS
恶意代码由网络服务器存储，并随着每个请求传递。
例如留言板里的恶意留言:
```html
Nice Website! <script type="text/javascript">alert("But with XSS problem!")</script>
```

#### XSS 对策
##### Input Validating
按照过滤规则验证，转写，清理
- 来自用户的输入(用字符白名单)
- 数据库内容
输出前验证内容

##### 内容安全策略(CSP)
- HTTP header 扩展，如：
```html
Content-Security-Policy: default-src: 'self'; script-src: 'self’ security.lmu.de
```
- 可信源加入白名单
- 禁止 inline JS, 使用 NoScript 等插件


##### HTTPonly
- 额外的 Cookie Flag
```html
Set-Cookie: <name>=<value>[; <Max-Age>=<age>] [; expires=<date>][; domain=<domain_name>] [; path=<some_path>][; secure][; HttpOnly]
```
- 需要浏览器支持
- 禁止基于脚本的 Cookie 访问


##### Parameterized Statements
software best practice
用参数的方式替代字符串 concat
用来预防:
- SQL 注入
- Command Injection