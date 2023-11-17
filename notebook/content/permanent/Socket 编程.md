---
title: Socket 编程
date: 2023-11-17
tags:
  - 网络
---
## 认识 Socket 

#### Socket 是什么
Socket 本意是插座, 是计算机之间通信, 计算机连接到因特网的工具.

在 Unix/Linux 中, Socket 是文件, 可以用文件描述符来指代. 

在 Windows 中, Socket 句柄, 被当作一个网络连接来对待.

#### Socket 的常用传输方式

两种:
- SOCK_STREAM
- SOCK_DGRAM

SOCK_STREAM 流格式套接字
- 就像传送带
- 使用 TCP
    - 按顺序
    - 检验并保证数据
- 没有数据边界
    - 数据的发送和接收是不同步的
    - 接收方可以把收到的数据包先放在缓冲区, 到一定数量再一次性读取

SOCK_DGRAM 数据报套接字
- 使用 UDP
    - 不按顺序传输
    - 丢包和错误不作处理(不可靠)
    - 限制每次传输的数据大小
- 就像快递
- 存在数据边界
    - 发送方怎么发, 接受方就得怎么收

QQ 视频聊天和语音聊天就使用 SOCK_DGRAM 来传输数据

## Socket 编程示例

### Linux TCP

server.c/cpp
```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <sys/socket.h>
#include <netinet/in.h>

int main(){
    //创建套接字
    int serv_sock = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);

    //将套接字和IP、端口绑定
    struct sockaddr_in serv_addr;
    memset(&serv_addr, 0, sizeof(serv_addr));  //每个字节都用0填充
    serv_addr.sin_family = AF_INET;  //使用IPv4地址
    serv_addr.sin_addr.s_addr = inet_addr("127.0.0.1");  //具体的IP地址
    serv_addr.sin_port = htons(1234);  //端口
    bind(serv_sock, (struct sockaddr*)&serv_addr, sizeof(serv_addr));

    //进入监听状态，等待用户发起请求
    listen(serv_sock, 20);

    //接收客户端请求
    struct sockaddr_in clnt_addr;
    socklen_t clnt_addr_size = sizeof(clnt_addr);
    int clnt_sock = accept(serv_sock, (struct sockaddr*)&clnt_addr, &clnt_addr_size);

    //向客户端发送数据
    char str[] = "http://c.biancheng.net/socket/";
    write(clnt_sock, str, sizeof(str));
   
    //关闭套接字
    close(clnt_sock);
    close(serv_sock);

    return 0;
}
```

client.c/cpp
```cpp
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <sys/socket.h>

int main(){
    //创建套接字
    int sock = socket(AF_INET, SOCK_STREAM, 0);

    //向服务器（特定的IP和端口）发起请求
    struct sockaddr_in serv_addr;
    memset(&serv_addr, 0, sizeof(serv_addr));  //每个字节都用0填充
    serv_addr.sin_family = AF_INET;  //使用IPv4地址
    serv_addr.sin_addr.s_addr = inet_addr("127.0.0.1");  //具体的IP地址
    serv_addr.sin_port = htons(1234);  //端口
    connect(sock, (struct sockaddr*)&serv_addr, sizeof(serv_addr));
   
    //读取服务器传回的数据
    char buffer[40];
    read(sock, buffer, sizeof(buffer)-1);
   
    printf("Message form server: %s\n", buffer);
   
    //关闭套接字
    close(sock);

    return 0;
}
```

### Windows TCP
Windows 下的 socket 程序依赖 Winsock.dll 或 ws2_32.dll，必须提前加载。

VSC 编译 g++ win_server.cpp -o win_server.exe -l ws2_32

server.cpp
```cpp
// vsc 直接编译没有 -l
// 手动编译 g++ win_server.cpp -o win_server.exe -l ws2_32
#include<cstdio>
#include<WinSock2.h>
#include<iostream>
#pragma comment(lib, "ws2_32.lib") // 加载 ws2_32.dll
using namespace std;

int main() {
    // 初始化 DLL
    WSADATA wsaData;
    WORD sockVersion = MAKEWORD(2, 2);
    if(WSAStartup(sockVersion,&wsaData)!=0)
	{
		cout<<"WSAStartup() error!"<<endl;
		return 0;
	}
    
    // 创建 socket
    SOCKET servSock = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP);
    
    // 绑定 socket
    struct sockaddr_in sockAddr;
    memset(&sockAddr, 0, sizeof(sockAddr));
    sockAddr.sin_family = PF_INET;
    // sockAddr.sin_addr.S_un.S_addr = INADDR_ANY; //IP地址设置成INADDR_ANY，让系统自动获取本机的IP地址
    sockAddr.sin_addr.s_addr = inet_addr("127.0.0.1");
    sockAddr.sin_port = htons(1234);
    bind(servSock, (SOCKADDR *)&sockAddr, sizeof(SOCKADDR));
    
    // listen
    listen(servSock, 20);
    
    // 接收客户端
    SOCKADDR clientAddr;
    int n = sizeof(SOCKADDR);
    SOCKET clientSock = accept(servSock, &clientAddr, &n);
    
    // 发送数据
    char str[] = "Hello socket";
    send(clientSock, str, strlen(str) + sizeof(char), 0);

    // 关闭
    closesocket(servSock);
    closesocket(clientSock);
    
    // 终止 DLL 的使用
    WSACleanup();
    
    return 0;
}
```


client.cpp
```cpp
#include<cstdio>
#include<WinSock2.h>
#include<iostream>
#pragma comment(lib, "ws2_32.lib") // 加载 ws2_32.dll
using namespace std;

int main() {
    // 初始化 DLL
    WSADATA wsaData;
    WSAStartup(MAKEWORD(2,2), &wsaData);
    
    // 创建 socket
    SOCKET sock = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP);
    
    // 绑定 socket
    struct sockaddr_in sockAddr;
    memset(&sockAddr, 0, sizeof(sockAddr));
    sockAddr.sin_family = PF_INET;
    // sockAddr.sin_addr.S_un.S_addr = INADDR_ANY; //IP地址设置成INADDR_ANY，让系统自动获取本机的IP地址
    sockAddr.sin_addr.s_addr = inet_addr("127.0.0.1");
    sockAddr.sin_port = htons(1234);

    // 连接服务器
    connect(sock, (SOCKADDR *)&sockAddr, sizeof(SOCKADDR));
    
    // 接收数据
    char buffer[256] = "";
    recv(sock, buffer, 256, 0);
    
    cout << "Received: " << buffer << endl;
    system("pause");

    // 关闭
    closesocket(sock);
    
    // 终止 DLL 的使用
    WSACleanup();
    
    return 0;
}
```

### UDP
[基于UDP的服务器端和客户端](https://c.biancheng.net/view/2359.html)
## 技术细节

#### 缓冲区

每个 TCP socket 被创建时, 都会分配两个独立的 I/O 缓冲区.

write()/send() 将数据写入输入缓冲区, read()/recv() 将数据从输出缓冲区读取出来. 

一旦数据成功写入到缓冲区, write()/send() 的任务就完成了, 会返回成功 flag; 而数据何时发送, 如何发送则由 TCP 协议决定, 通常取决于当时的网络状态.

缓冲区的大小通常是 8k, 可以用 getsockopt() 获取
```c
unsigned optVal;
int optLen = sizeof(int);
getsockopt(servSock, SOL_SOCKET, SO_SNDBUF, (char*)&optVal, &optLen);
printf("Buffer length: %d\n", optVal);
```

#### 阻塞模式
TCP socket 默认使用阻塞模式. 即如果某个操作不能被完成, 这个操作会被阻塞(blocked). 直到可以操作时才被唤醒.

- 如果输入缓冲区正在发送数据, 或者输入缓冲区剩余空间不足, write()/send() 会被阻塞
- 如果输出缓冲区没有足够的数据, read()/recv() 会被阻塞