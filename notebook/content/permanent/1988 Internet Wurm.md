---
title: "1988 Internet Wurm"
date: "2023-06-14"
tags:
- 恶意软件
---

起因:
	1988 年的「蠕虫」病毒使得美国大面积的计算机(尤其是校园网络)阻塞. 事情的起因是23岁的康奈尔大学学生莫瑞斯, 希望自己写的这个程序悄悄保存在一些机密计算机上.
原理:
	sendmail BUG
	finger BUG, buffer overflow
	remote execution(rsh, rexec)
受影响的账号:
	无密码, 简易密码等
受影响的主机:
	路由表(Routing-Table), 随机地址, Sun, VAX等


蠕虫并没有
- 试图获取 root
- 攻击(主动)知名账号
- 毁坏数据
- 留下定时炸弹(Zeitbomben)

```C
main Routine
	argv[0] := “sh”; /* rename process */
	Is there already a worm? /* faults here causes mass infection */
	Initialize clock;
	while (true) {
		cracksome(); /* attack accounts, try to find hosts */
		sleep(30); /* hide the worm */
		Listen for other worms /* faults here causes mass infection */
		create a new process, kill the old /* Camouflage */
		try to attack some machines;
		sleep(120); /* hide the worm */
		if (running > 12 hours)
		cleaning host List; /* reduce memory consumption */
		if (pleasequit && wordcheck > 10)
	exit
	}
```


![[attachments/Pasted image 20221020151731.png]]


啊对了, 还有事情的结果:
	- 10000刀和400小时社区服务(在我国的版本里是250k刀和5年监禁)
	- 大学停学