# JavaScript

## 目录

*   [核心特性](#核心特性)

*   [快速上手](#快速上手)

*   [常量](#常量)

*   [变量](#变量)

*   [全局作用域 和 名字空间](#全局作用域-和-名字空间)

*   [函数](#函数)

*   [数据类型](#数据类型)

*   [流程控制](#流程控制)

*   [strict模式](#strict模式)

*   [Class](#class)

*   [Interface](#interface)

    *   [Error Handling](#error-handling)

*   [库](#库)

## 核心特性

*   动态类型，弱类型

*   解释性语言

## 快速上手

*   在浏览器console中可以直接尝试

*   `console.log()`

*   `//` 注释

*   TypeScript 静态类型的JS

*   数据类型速览

## 常量

```javascript
const c = 3.14;
```

## 变量

var 和 let 差别：

var 作用域是函数， let是块级

var 不可重复定义， let 可

```javascript
let v = 0;
var x = 'abc';
```

## 全局作用域 和 名字空间

<https://www.liaoxuefeng.com/wiki/1022910821149312/1023021187855808#名字空间>

没在函数内用`var` 定义的变量，就具有全局作用域。全局作用域的变量实际上被绑定到`window`这个全局对象里。

alert函数也是全局作用域，可以用window\.alert取出

```javascript
// 把alert保存到另一个变量:
var old_alert = window.alert;
```

把自己的代码全部放入唯一的名字空间`MYAPP`中，会大大减少全局变量冲突的可能。许多著名的JavaScript库都是这么干的：jQuery，YUI，underscore等等。

```javascript
// 唯一的全局变量MYAPP:
var MYAPP = {};

// 其他变量:
MYAPP.name = 'myapp';
MYAPP.version = 1.0;

// 其他函数:
MYAPP.foo = function () {
    return 'foo';
};
```

用`let`替代`var`可以申明一个块级作用域的变量。**不是函数，而是块**\*\*\*\*

## 函数

```javascript
function Foo(p1, p2, p3) {...}
const Bar = (p1, p2, p3) => {...}
var abs = function (x) {...}

```

**arguments**

指向传入参数的一个 **类array**

`arguments.length`, `arguments[0]`

**rest**

```javascript
function foo(a, b, ...rest) {
    console.log('a = ' + a);
    console.log('b = ' + b);
    console.log(rest);
}

foo(1, 2, 3, 4, 5);
// 结果:
// a = 1
// b = 2
// Array [ 3, 4, 5 ]

foo(1);
// 结果:
// a = 1
// b = undefined
// Array []

```

**方法**

给对象绑定一个函数，就叫方法

```javascript
var xiaoming = {
    name: '小明',
    birth: 1990,
    age: function () {
        var y = new Date().getFullYear();
        return y - this.birth;
    }
};
```

**this**

在一个方法内部，`this`是一个特殊变量，它始终指向当前对象，也就是`xiaoming`这个变量。所以，`this.birth`可以拿到`xiaoming`的`birth`属性。

js 有很多相关的坑

<https://www.liaoxuefeng.com/wiki/1022910821149312/1023023754768768>

**apply** 可以改变this的指向。要指定函数的`this`指向哪个对象，可以用函数本身的`apply`方法，它接收两个参数，第一个参数就是需要绑定的`this`变量，第二个参数是`Array`，表示函数本身的参数。

```javascript
function getAge() {
    var y = new Date().getFullYear();
    return y - this.birth;
}

var xiaoming = {
    name: '小明',
    birth: 1990,
    age: getAge
};

xiaoming.age(); // 25
getAge.apply(xiaoming, []); // 25, this指向xiaoming, 参数为空

```

*   统计函数调用次数的实例

    ```javascript
    'use strict';

    var count = 0;
    var oldParseInt = parseInt; // 保存原函数

    window.parseInt = function () {
        count += 1;
        return oldParseInt.apply(null, arguments); // 调用原函数
    };
    ```

**箭头函数**

*   类似于匿名函数

*   可以取参数，无参，或者可变参数

    ```javascript
    // 可变参数
    (x, y, ...rest) => {
        var i, sum = x + y;
        for (i=0; i<rest.length; i++) {
            sum += rest[i];
        }
        return sum;
    }
    ```

*   如果返回对象，用括号`()` 括起来

*   现在，箭头函数完全修复了`this`的指向，`this`总是指向词法作用域，也就是外层调用者`obj` [https://www.liaoxuefeng.com/wiki/1022910821149312/1031549578462080](https://www.liaoxuefeng.com/wiki/1022910821149312/1031549578462080 "https://www.liaoxuefeng.com/wiki/1022910821149312/1031549578462080")

    ```javascript
    var obj = {
        birth: 1990,
        getAge: function () {
            var b = this.birth; // 1990
            var fn = () => new Date().getFullYear() - this.birth; // this指向obj对象
            return fn();
        }
    };
    obj.getAge(); // 25

    ```

## 数据类型

类型检测: `typeof(obj)`

**number**

```javascript
123; // 整数123
0.456; // 浮点数0.456
1.2345e3; // 科学计数法表示1.2345x1000，等同于1234.5
-99; // 负数
NaN; // NaN表示Not a Number，当无法计算结果时用NaN表示
Infinity; // Infinity表示无限大，当数值超过了JavaScript的Number所能表示的最大值时，就表示为Infinity

```

**string**

单引号`''` 双引号`""` 都行

**boolean**

true || false

`&&` , `||`,  `!`

\*\*\*\*\*\* 和\*\*\*\*\*\*

第一种是`==`比较，它会自动转换数据类型再比较，很多时候，会得到非常诡异的结果；

第二种是`===`比较，它不会自动转换数据类型，如果数据类型不一致，返回`false`，如果一致，再比较。

由于JavaScript这个设计缺陷，\_不要\_使用`==`比较，始终坚持使用`===`比较。

```javascript
false == 0; // true
false === 0; // false

```

NaN 与任何值（包括它本身）比较都是false, 只能用 isNaN() 函数 判断

\*\*\*\*\*\*, \*\*\*\*\*\*

表示“空值”， 与`0` , `''` 都不同

两者类似，建议直接用`null`

**Array**

```javascript
var arr = [1, 2, 3.14, 'Hello', null, true];   // 建议的新建方法
var arr2 = new Array(1, 2, 3);

```

可以索引 `arr[0]`

`push` append

**对象**

键值对，键是字符串，值可以是任意类型

```javascript
var person = {
    name: 'Bob',
    age: 20,
    tags: ['js', 'web', 'mobile'],
    city: 'Beijing',
    hasCar: true,
    zipcode: null
};

// 读取对象的属性
person.name; // 'Bob'
person.zipcode; // null

```

**Map**

键可以为其他类型的 对象(ES6)

```javascript
var m = new Map([['Michael', 95], ['Bob', 75], ['Tracy', 85]]);

// 方法
var m = new Map(); // 空Map
m.set('Adam', 67); // 添加新的key-value
m.set('Bob', 59);
m.has('Adam'); // 是否存在key 'Adam': true
m.get('Adam'); // 67
m.delete('Adam'); // 删除key 'Adam'
m.get('Adam'); // undefined

```

**Set**

数学上的集合，可以包含不同类型的元素

```javascript
var s = new Set([1, 2, 3, 3, '3']);
s.add('1');
s.delete('1');
```

**Iterable**

`Array`、`Map`和`Set`都属于`iterable`类型。

用 `for...of` 遍历。 `for ... in`循环由于历史遗留问题，它遍历的实际上是对象的属性名称。一个`Array`数组实际上也是一个对象，它的每个元素的索引被视为一个属性。&#x20;

## 流程控制

if

```javascript
if {
  // ...
} else if {
  // ...
} else { ... }

```

for

```javascript
for (let i = 0; i<n; i++) {...}
for (const line of lines) {...}
```

## strict模式

开启strict 模式: 在第一行加上 `'use strict';`

未开启时不强制用var声明变量，可能造成重复定义互相影响

## Class

## Interface

### Error Handling

```javascript
try {
  console.log('works');
  throw new Error('throw an error!');
  console.log('not work');
} catch(err) {
  console.log(err);
} finally {
  console.log('always work');
}
```

## 库
