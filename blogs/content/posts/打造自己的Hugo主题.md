---
title: "打造自己的Hugo主题"
date: 2022-01-10T14:55:01+01:00
draft: true
series: "Hugo主题"
---

# 一个最低限度的 Hugo 主题

参考 [Mike Dane](https://www.mikedane.com/) 的 [ga-hugo-theme](https://github.com/giraffeacademy/ga-hugo-theme). 这里展示了一个拥有基本功能的主题。Mike Dane 的 Hugo 系列教程也是极好的。

写作时使用 Hugo 0.89 版本。

在你的 Hugo 应用输入命令以创建一个新主题:
> hugo new theme THEMENAME

这时会在 themes 文件夹下创建一个新文件夹，同时应用根目录出现一个 `config.toml`, 在其中加上：
> theme = 'THEMENAME'

主题已经可以使用了，但目前还是一片空白，因为主题文件里什么都没有。

<br>

# header, footer 和 baseof

其实也不是完全空白。`/layouts/_default/baseof.html` 是有内容的：

`baseof.html` 是 Hugo 页面的基础，所有页面默认按照这个模板来渲染。官方教程中提供了一个简单的[示例](https://gohugo.io/templates/base/#define-the-base-template).

默认的 baseof.html :
```
<!DOCTYPE html>
<html>
{{- partial "head.html" . -}}

<body>
    {{- partial "header.html" . -}}
    <div id="content">
        {{- block "main" . }}{{- end }}
    </div>
    {{- partial "footer.html" . -}}
</body>

</html>
```

Hugo 使用 Go 模板语法。`{{}}` 内的内容就是 Go 语言。

`partial`  是一个内置函数，`{{partial "head.html" . }}`（ `.` 不能少）意思就是将 `/layouts/partials/.head.html` 的内容复制到该处。

` - ` 的作用是修饰掉 {{}} 外面的空格符，换行符等。

`block` 部分以后再说。为了能直接看到效果，我们先暂时把
>{{- block "main" . }}{{- end }}

这句删掉。

<br>

先修改 `/layouts/partials` 下的 `head.html`, `header.html`, `footer.html` . 

`head.html` 网页的元信息
```
<head>
    <meta charset="utf-8">
    <title>
        {{ .Title}}
    </title>
</head>
```

<br>

`header.html` 注意 header 不是拿来放文章标题的，标题在main里。header 主要放网站标题，导航之类的。这里随便写写。
```
<div style="
    background-color: aliceblue;
    padding: 5px;
    font-size: 24px;
    font-family: 'Kristen ITC'; width: 100%;">
    <h1>TONGLUOSHAO</h1>
</div>
```

`footer.html` 通常写版权和备案
```
<div style="height:35px;"></div>
<div style="
    color: #fdfdfd; 
    height:35px; 
    background-color:#999; 
    bottom:0px; 
    text-align:center; 
    width:100%">
    <p style="margin:10px; ">© 2022 evixenon&nbsp;&nbsp|&nbsp;&nbsp;粤 ICP 备2022002978号-1;</p>
</div>
```

PS：这时候如果 /layout 文件夹里有空的 index.html 的话，打开 1313 会是一片空白。因为 index.html 是默认的主页，对于主页来说，它的优先级比 baseof 模板要高。我们可以暂时删掉 index.html 这个文件，或者把 baseof 的内容复制一份过去。

写完之后就是
主题01.JPG
嗯，没什么问题，只差内容把页面撑开了。



<br>

## 将脚注信息设置成自定义属性

每个网站的作者和备案号各不相同，所以当然要做成可修改的啦。在`config.toml`里加一些属性：
```
[params]
    author = ""
    icp = ""
```
这样使用这个主题的人就可以自由修改。同时，我们再改一下`footer.html`:
```
<div style="height:35px;"></div>
<div style="
    color: #fdfdfd; 
    height:35px; 
    background-color:#999; 
    bottom:0px; 
    text-align:center; 
    width:100%">
    <p style="margin:10px; ">© {{.Site.Title}} 2022

    {{/* 作者信息 */}}
    {{- with .Site.Params.author -}}
        &nbsp;{{safeHTML .}}
    {{- end -}}

    {{/* ICP 备案 */}}
    {{- with .Site.Params.icp -}}
        &nbsp;&nbsp;|&nbsp;&nbsp;{{ . | safeHTML}}
    {{- end -}}
    </p>
</div>
```

`with...end`函数可以理解为，如果这个参数存在，就执行中间的代码，如果没有就忽略这段代码。参数在上面的第一个 with...end 块中是 `.Site.Params.author`。

`.` 在 Hugo 模板语法中是上下文(context)的意思。`.`是个一当前变量

`|` 是管道符，表示将前一部分的内容当作后一部分的参数。这和 bash, shell 中管道符是相似的。上面的代码中，`{{safeHTML .}}` 和 `{{ . | safeHTML}}` 在同一语境中的含义是一样的。如果 `|` 前一部分是函数，那就表示将前一个函数的结果当成后一个函数的参数的。

`safeHTML` 是一个函数，经过它处理后的内容不会对 html 内容产生影响。举例来说，safeHTML 中如果放了 html 标签，就不会被转义出来。

上面的解释记不住看不懂也不要紧，见得多就会熟悉。我在写主题的时候，通常都是先观摩别人的写法，辅以 Hugo 文档，就基本能写出自己想要的效果。重要的是想用的时候能找到就行了。

以上内容都可以在 Hugo 文档的函数和变量部分找到准确的解释和部分示例。顺便给个文档直通车：[with](https://gohugo.io/functions/with/), [.](https://gohugo.io/templates/introduction/#variables) , [|](https://gohugo.io/templates/introduction/#pipes) , [safeHTML](https://gohugo.io/functions/safehtml/).

<br>

# main block, single 模板 和 list 模板

先讲一下前面跳过的 `block`。

回忆一下，baseof.html 的默认内容是这样的：
```
<!DOCTYPE html>
<html>
{{- partial "head.html" . -}}

<body>
    {{- partial "header.html" . -}}
    <div id="content">
        {{- block "main" . }}{{- end }}
    </div>
    {{- partial "footer.html" . -}}
</body>

</html>
```

其中有一句：
>{{- block "main" . }}{{- end }}

`block` 和 `partial` 类似，作用都是将一段预先定义好的代码复制此位置，但不同的是，partial 复制的是 `/layouts/partials` 中的 html 文件，而 `block` 复制的是一段放在其他模板的代码。具体地说，是 single.html 和 list.html 这两个文件里的代码.

`single.html` 和 `list.html` 是除了 baseof.html 的另两个模板。 baseof 模板是所有页面的默认模板，而 single.html 和 list.html 可以算作细分领域。

`single.html` 负责的是单篇文章的页面，单篇具体文章，而 `list.html` 则通常是一个文章列表，比如某某分类下的所有文章，某某标签下的文章等。

那么就知道了，在 `single.html` 模板下的页面，其 main block 应该放文章的具体内容，我们可以这样写 `single.html`:
```
{{ define "main" }}
<h1>{{ .Title }}</h1>
{{ .Content }}
{{ end }}
```

前面说过 `.` 在 Hugo 模板中是上下文的意思。在一个 single 页面里，`.Title` 指的是这篇文章的标题( list 页面会是站点标题，你可以试一下)。而 single 页面的 `.Content` 就是这篇文章的具体内容啦。这样一个单篇文章页面的模板就做好了，当然，是最简单版本。

<br>

而 `list.html` 就要复杂一点了，一个 category 分类页面需要展示所有该分类的文章，一个 tag 分类需要展示该 tag 下的所有文章。我们可以这样写 `list.html` ：

```
{{ define "main" }}
{{ .Content }}
    {{range .Pages}}
    <div style="border: 2px solid aliceblue; width: 98%; margin: auto; margin-top: 10px;">
        <h2><a href="{{.Permalink}}">{{.Title}}</a></h2>
        {{if gt .WordCount 50}}
            <p>词数：{{.WordCount}}</p>
        {{end}}
        <p>{{.Summary}}</p>
    </div>
    {{end}}
{{ end }}
```

`range` 函数的作用是遍历。`{{range .Pages}}` 一句是遍历当前上下文的所有页面。对一个分类，就是遍历该分类的所有页面。对于每一个遍历对象，都会生成一次 `range...end` 中的内容。也就是说，假设当前是一个分类页面，虽然这段代码看上去只有一个 `div`，但实际上，对分类里了每一篇文章，都会生成一个这样的 `div`. 

主页实际上也使用 list 模板，它的 `.Pages` 变量是 Hugo 根目录下 `/content` 文件夹的内容。

在 `range...end` 代码块中，上下文 `.` 的含义就有所改变了。`.Title` 指的是当前文章(在主页中，也可能是文件夹)的标题，`.Summary`则是摘要。

如果是非文章，比如主页的文件夹，没有 `.Title` 或者 `.Summary`, 这两个属性会为空，也不影响。

文章显示出来了，当然还需要点击跳转的功能。上面代码中，标题被做成了一个 `a` 连接，指向的是 `{{.Permalink}}`。 这个变量是一个 Page 的永久链接，这样点击标题就能跳转到文章了。

<br>

基本功能做好了，还可以加点花活。
```
{{if gt .WordCount 50}}
    <p>词数：{{.WordCount}}</p>
{{end}}
```
这段代码的意思是，如果该文章的词数超过 50 词，就显示词数。 `.WordCount` 是一个 Page 变量，更多这样的变量还可以在 [Page 变量的文档](https://gohugo.io/variables/page/) 中找到。

<br>

## CSS 的引入

Hugo 主题中的 CSS 不能直接使用，需要将`.css`文件放在主题的`assets`目录下，也就是`[主题名]/assets`，没有就自己新建。

在`head.html`中引入`assets/css/styles.css`：

```
{{- with $css := resources.Get "css/styles.css" | resources.Minify -}}
        <link rel="stylesheet" href="{{ $css.RelPermalink }}">
{{- end -}}
``` 

`.js`文件的引入也是类似的。

如果使用`SASS/SCSS`, 则需要先转换为CSS. Hugo 提供了对应的函数，详参[链接](https://gohugo.io/hugo-pipes/scss-sass/)。

做到这里，一个主题的基本功能就成型了(虽然差点CSS)。看到这里，你应该能做出一个简单的主题了。后面的文章开始讲一些不一样的功能实现。