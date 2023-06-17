---
title: "太吾绘卷Mod 自用更新改动检查器 readme"
date: "2023-06-15"
---

#### 0.前言
一个modder可能开发过多个mod，每个mod又可能patch了多个地方。然而茄子一更新，原先patch的地方可能就变了，从而引起mod工作不正常甚至红字。Modder手上的mod越多、越大，每次更新后的红字可能就越多，就需要耗费更多时间去排查、修复。尤其是测试版更新频繁，可能这边焦头烂额地才修到一半，那边又更新了...久而久之可能会演变成“开发一时爽，维护火葬场”的尴尬局面......
假如能在版本更新后快速找出打过patch的地方哪些是改动过的，哪些是没有改动过的，似乎就能节省不少时间和精力。
于是就写了这个小工具......

#### 1.使用方法
使用本工具的之前最好卸载所有其它Mod以确保结果的准确性。

首先确定工作目录(默认为太吾文件夹`\Mod\Checker\`)，在下面创建2个文件`watchlist_Frontend.txt`和`watchlist_Backend.txt`，按照格式填写查询条目(_不能有空白行, 不能有空格_)。

查Assembly-CSharp.dll里的方法用watchlist_Frontend.txt；查GameData.dll里或者EventLib里的方法用watchlist_Backend.txt。

**第一次使用**时模式需选择提取代码，然后重启游戏。成功patch上的话会在records文件夹内输出提取到的结果。
**待本体更新后**需要检查所监视的方法是否有改动时，需要把之前得到的结果转移到records_old文件夹内，然后选择对比模式或者对比并且提取，并重启。一切顺利的话会在工作文件夹内生成检查报告。
(检查结果只显示是否有改动，具体改了什么可以用UltraCompare之类的工具查看。)

#### 2.格式
监视列表中的条目具有形如
```
<方法名,类或结构体程序集限定名,<泛型参数0类型,泛型参数1类型,...>,<参数0类型,参数1类型,...>,返回值类型,方法类别>
```
(不带最外面的引号，"..."表示省略，下同)的样子，
其中方法名就是方法的名字，不带任何参数和命名空间的那种。

[[permanent/太吾绘卷Mod 自用更新改动检查器 readme#类或结构体程序集限定名|类或结构体程序集限定名]]

[[permanent/太吾绘卷Mod 自用更新改动检查器 readme#泛型参数、参数和返回值整项|泛型参数、参数和返回值整项]]

[[permanent/太吾绘卷Mod 自用更新改动检查器 readme#方法类别|方法类别]]

更多关于类型和程序集限定名的信息可参阅微软的官方文档或相关书籍......

###### 例1
例如假设 程序集MyAsm中有
```C#
namespace MyNameSpace
{
public class MyClass1<T>
    {
        public class MyClass2<U,V>
        {
            public class MyClass3
            {
                ......
                unsafe private void MyMethod<W,X>(ref MyClass2<T,int>[] x, U y,float* z,Func<byte,short> f)
                {
                    ......
                }
            }
        }
    }
}
```

于是上例中要查询到MyMethod的信息，可使用
```
<MyMethod,[MyNameSpace.MyClass1`1+MyClass2`2+MyClass3[,,],MyAsm],<W,X>,<MyNameSpace.MyClass1`1+MyClass2`2[T,T,System.Int32][]&,U,System.Single*,System.Func`2[System.Byte,System.Int16]>,System.Void,M>
```

在没有重载的情况下也可以写成
```
<MyMethod,[MyNameSpace.MyClass1`1+MyClass2`2+MyClass3[,,],MyAsm],null,null,null,M>
```
(当然由于目前Harmony无法patch含自由泛型变元的方法，所以查到了也不能成功patch，此例仅作说明用)
再例如要查询GameData.dll中命名空间

###### 例2 构造
GameData.Domains.Character.Ai中的类AiHelper中的类NpcCombat的构造函数（0参数），可以用
```
<.cctor,[GameData.Domains.Character.Ai.AiHelper+NpcCombat,GameData],null,<>,null,C>
```

##### 类或结构体程序集限定名
- **类或结构体程序集限定名**需要带上命名空间，有时还要写出程序集并用方括弧括起来
- 套娃类各层之间用加号连接；泛型类需要加上==\`n==，n为泛型变元个数；泛型类或者外层有泛型类的套娃类
- 类名后面要加上\[, ,...,]，逗号数量为前面各泛型类的泛型变元数之和减一，而泛型变元须不写留空。。。。

则MyClass3的程序集限定名为
```
[MyNameSpace.MyClass1`1+MyClass2`2+MyClass3[,,],MyAsm]
```

##### 泛型参数、参数和返回值整项
泛型参数、参数和返回值的类型只需要写全名，不需要带程序集(因为似乎含自由泛型变元的泛型类型没有程序集限定名)，但是泛型变元需要写出来。

例如参数`(ref MyClass2<T,int>[])`的类型就是```
```
MyNameSpace.MyClass1`1+MyClass2`2[T,T,System.Int32][]&
```

泛型参数、参数和返回值整项可以不填或写"null"，此时查询时会忽略此项，但在有重载的情况下可能会查出多个结果报红字。
在查询构造函数的时候泛型参数和返回值两项都要写"null"，方法名也可以不填。

##### 方法类别
方法类别"M"表示方法,"C"表示构造函数。
