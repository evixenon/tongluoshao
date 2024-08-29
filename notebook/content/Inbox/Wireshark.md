---
title: Wireshark
date: 2024-08-29
tags:
---

## 设置

wireshark 设置可以做什么

- 更改包的显示颜色
- 将包的具体内容 不用 hex bytes 而是 diagram 的形式显示
- 在工具栏添加 filter 按钮, 点一下可以只显示此 filter 下的包
- 加一个 delta time 列, 或者直接把包里的某一项 apply as column(比如 TCP Segment Len右键)

建议的 wireshark 捕捉位置: client 和 server 各自
## Capture

Wireshark Package Capture

- 开始界面左上第四个
- Capture option-Snaplength: 只捕捉每个包的一部分
- 建议 多个小的 pcap 代替 一个大的
    - 方法: 在 capture option 里设置 create a new file automatically after 100MB.
    - ring buffer: 只保存指定数量个 pcap
    - 需要 start

## dumpcap

Wireshark 命令行工具 dumpcap, 用来在后台持续捕捉流量, 并存为 pcapng 文件

- dumpcap -h
- -D 查看流量设备及编号
- -i <no.> 捕捉某一设备流量
- -w <path.pcapng> 写入位置
- ringbuffer -b filesize:100000 -b files:10

## Filter Traffic

Capture Filter

Display Filter