---
title: "宵夜97 - 太吾绘卷 Mod 制作"
date: "2023-06-15"
tags:
- Modder
- 逆向
---

[视频链接](https://www.bilibili.com/video/BV1Fd4y1z7jV/?spm_id_from=333.999.0.0&vd_source=92451653bea4ed324c9bfc0287256aa5)
> https://www.bilibili.com/video/BV1Fd4y1z7jV/?spm_id_from=333.999.0.0&vd_source=92451653bea4ed324c9bfc0287256aa5

[灰机wiki - 太吾 Mod 制作](https://taiwu.huijiwiki.com/wiki/MOD%E5%88%B6%E4%BD%9C)

### 主要相关
managed-AC, managed-TaiWuModLib, backend-GameData

### Mod 的文件夹结构
mod名文件夹
	- Config.lua
	- Settings.lua
	- Plugins
		- xxx.dll
	
### Config.lua
Config.lua,  Settings.lua 怎么写?
- 把 AC 拖进 dnSpy
- 搜索 ModManager
- 找到 ReadLocalMode 方法, 看需要什么, 类型也可以看到
```lua
--[[Config.lua]]
return {
	Title = "HelloWorld",
	Version = "0.0.1",
	BackendPlugins = {"TaiWuHelloworld.dll"} -- 后端名
	-- ...
}
```

![[attachments/宵夜97 - 太吾绘卷 Mod 制作#更正1 Mod管理界面不打钩的原因]]


### (前端)MOD 主体
VS 新项目 - 类库(.NET Framework), C# WIN 库
框架版本4.8

> 注意 .NET 版本: dnSpy 打开 
> - 前端 TaiwuModdingLib
> - 后端 GameData
> 能找到


添加引用-AC,TaiWuModdingLib, UECore, UE(用到什么选什么)

全选引用, 复制本地-否

类继承 TaiWuRemakePlugin
实现抽象类(销毁和初始化)
\[PluginConfig]

基础的 HelloWorld
[16:59](https://www.bilibili.com/video/BV1Fd4y1z7jV/?spm_id_from=333.999.0.0&vd_source=92451653bea4ed324c9bfc0287256aa5#t=1019.516437)

生成 - 打开路径 bin - Debug, 把 dll 复制到游戏mod文件夹下的Plugins
右键项目名 - 属性, 可以设置生成目录

游戏实时日志(Debug.Log)在 AppData\\LocalLow\\username\\Taiwu

### Mod 的详细设置
Config.lua 的 DefaultSettings 负责界面
还是根据反编译的 ReadLocalMod 方法决定要写什么
当然还要逻辑代码

##### 怎么写 Config.lua
宵夜的测试mod写法
[22:49](https://www.bilibili.com/video/BV1Fd4y1z7jV/?spm_id_from=333.999.0.0&vd_source=92451653bea4ed324c9bfc0287256aa5#t=1369.194854)
![[attachments/Pasted image 20230412143836.png]]

修改后的 HelloWorld Config.lua
[25:15](https://www.bilibili.com/video/BV1Fd4y1z7jV/?spm_id_from=333.999.0.0&vd_source=92451653bea4ed324c9bfc0287256aa5#t=1515.659755)
[34:15](https://www.bilibili.com/video/BV1Fd4y1z7jV/?spm_id_from=333.999.0.0&vd_source=92451653bea4ed324c9bfc0287256aa5#t=2055.133696)

##### 怎么读取 Config.lua 的数据
参考 TheChosenElite(TopElite) Mod
![[attachments/Pasted image 20230412185810.png]]



### Patch 方法
引用 0Hamory

什么时候用 TaiwuRemakeHarmonyPlugins?
- 

(不推荐, 写起来麻烦) 例子
[38:09](https://www.bilibili.com/video/BV1Fd4y1z7jV/?spm_id_from=333.999.0.0&vd_source=92451653bea4ed324c9bfc0287256aa5#t=2289.942044)

##### 后置 PostFix

(推荐) 写一个常规的 继承 RemakePlugin

先\[PluginConfig]

Harmony harmony;

初始化和销毁[39:58](https://www.bilibili.com/video/BV1Fd4y1z7jV/?spm_id_from=333.999.0.0&vd_source=92451653bea4ed324c9bfc0287256aa5#t=2398.315657)

![[attachments/Pasted image 20230412124259.png]]

主体框架[42:02](https://www.bilibili.com/video/BV1Fd4y1z7jV/?spm_id_from=333.999.0.0&vd_source=92451653bea4ed324c9bfc0287256aa5#t=2522.324187)

![[attachments/Pasted image 20230412124216.png]]

更多说明: [[permanent/HarmonyPatch]]

### 上传创意工坊
需要在Config.lua里加一行Source = 1，才可以上传到创意工坊哦。上传创意工坊的方法是，改好配置文件后，在mod管理界面点左下角的上传mod，里面填上你mod文件夹的绝对路径（也就是从资源管理器那里直接复制的路径），然后填好描述点上传就可以了。

23.04.12: Source = 1 在 模组管理 里看不到, 改成0又看到了

#### 更正1 Mod管理界面不打钩的原因
对部分内容进行一下更正！并不是显示bug导致mod管理内的mod不打勾。  
在写Config.lua时，Version不要写纯数字，可以写字符串或者不写。  
在写数组时，按照\[x] = ""这样的方式写，比如  
```C#
FrontendPlugins = {  
   [1] = "TaiWuCreateAvatarOptimization.dll"  
}
```



### 后端 Mod
[视频链接](https://www.bilibili.com/video/BV1Pg411e7jb/?spm_id_from=333.999.0.0&vd_source=92451653bea4ed324c9bfc0287256aa5)
> https://www.bilibili.com/video/BV1Pg411e7jb/?spm_id_from=333.999.0.0&vd_source=92451653bea4ed324c9bfc0287256aa5

创建项目的时候用 普通类库, 不要 .NET framework, 框架选5.0

然后是添加引用, 只要 ModdingLib 和 0Harmony, Backend 文件夹的 `GameData`

using ModdingLib, GameData.Uilities;

其中 ModdingLib 是前端部分, GameData 是后端部分

后端不要用 Debug.Log, 用 AdaptableLog.Info()
log 在游戏文件夹 Logs, Gamedata.log 可查看

#### 例子 功法书锁定最大耐久
开始写内容代码了
[14:14](https://www.bilibili.com/video/BV1Pg411e7jb/?spm_id_from=333.999.0.0&vd_source=92451653bea4ed324c9bfc0287256aa5#t=854.5231)

参数, 要修改的参数要传 ref
[15:23](https://www.bilibili.com/video/BV1Pg411e7jb/?spm_id_from=333.999.0.0&vd_source=92451653bea4ed324c9bfc0287256aa5#t=923.895036)

写好了
[16:55](https://www.bilibili.com/video/BV1Pg411e7jb/?spm_id_from=333.999.0.0&vd_source=92451653bea4ed324c9bfc0287256aa5#t=1015.350943)

![[attachments/Pasted image 20221023232318.png]]

### Log 位置
=前=
```text
C:\Users\Nk\AppData\LocalLow\Conchship\The Scroll of Taiwu\output_log.txt
```

=后=
```text
log 在游戏文件夹 Logs, Gamedata.log 可查看
```