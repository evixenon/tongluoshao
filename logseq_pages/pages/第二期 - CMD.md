public:: true

- ## `win + R`
	- calc
- ## CMD 是什么
	- ComManD prompt, 命令提示符
	- 最早期的电脑都是这样的命令行界面
- ## 可以做什么
	- ipconfig 查网络信息
	- calc 计算器
	- regedit 注册表编辑器
	- services.msc 服务
	- msinfo32 电脑硬件配置
	- mspaint 画图, snippingtool 截图工具
- ## 和 ipad 共享
	- 电脑
		- 1. 比如在C盘建立一个文件夹
		- 2. 把这个文件夹 右键 属性 共享 设置成共享文件夹
		- WLAN IPv4 地址：
			- `win+R`, cmd, ipconfig
	- iPad
		- 1. 打开文件，左边栏右上角 三个点，连接服务器
		- 2. `smb://` 加上电脑的 WLAN IPv4 地址
- ## .bat
	- ```bat
	  ipconfig | find "IPv4"
	  pause
	  ```