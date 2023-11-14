---
title: HTTP 状态码
date: 2023-11-15
tags:
  - 网络
  - 协议
---

| 状态码 |             说 明             |                               详 情                                |
|:------ |:-----------------------------:|:------------------------------------------------------------------:|
| 100    |           Continue            | 请求者应当继续提出请求。服务器已收到请求的一部分，正在等待其余部分 |
| 101    |      Switching Protocol       |         请求者已要求服务器切换协议，服务器已确认并准备切换         |
| 200    |            Success            |                       服务器已成功处理了请求                       |
| 201    |            Created            |                  请求成功并且服务器创建了新的资源                  |
| 202    |           Accepted            |                    服务器已接受请求，但尚未处理                    |
| 203    | Non-Authoritative Information |        服务器已成功处理了请求，但返回的信息可能来自另一个源        |
| 204    |          No Content           |              服务器成功处理了请求，但没有返回任何内容              |
| 205    |         Reset Content         |                  服务器成功处理了请求，内容被重置                  |
| 206    |        Partial Content        |                      服务器成功处理了部分请求                      |
| 300    |       Multiple Choices        |                   针对请求，服务器可执行多种操作                   |
| 301    |       Moved Permanently       |             请求的网页已永久移动到新位置，即永久重定向             |
| 302    |             Found             |             请求的网页暂时跳转到其他页面，即暂时重定向             |
| 303    |           See Other           |       如果原来的请求是 POST，重定向目标文档应该通过 GET 提取       |
| 304    |         Not Modified          |        此次请求返回的网页未修改，继续使用上次的资源(cache)         |
| 305    |           Use Proxy           |                    请求者应该使用代理访问该网页                    |
| 307    |      Temporary Redirect       |                    请求的资源临时从其他位置响应                    |
| 400    |          Bad Request          |                        服务器无法解析该请求                        |
| 401    |         Unauthorized          |                  请求没有进行身份验证或验证未通过                  |
| 403    |           Forbidden           |                          服务器拒绝此请求                          |
| 404    |           Not Found           |                       服务器找不到请求的网页                       |
| 405    |      Method Not Allowed       |                    服务器禁用了请求中指定的方法                    |
| 406    |        Not Acceptable         |                  无法使用请求的内容响应请求的网页                  |
| 407    | Proxy Authentication Required |                       请求者需要使用代理授权                       |
| 408    |       Request Time-out        |                           服务器请求超时                           |
| 409    |           Conflict            |                     服务器在完成请求时发生冲突                     |
| 410    |             Gone              |                        请求的资源已永久删除                        |
| 411    |        Length Required        |             服务器不接受不含有效内容长度标头字段的请求             |
| 412    |      Precondition Failed      |          服务器未满足请求者在请求中设置的其中一个前提条件          |
| 413    |   Request Entity Too Large    |                 请求实体过大，超出服务器的处理能力                 |
| 414    |     Request-URI Too Large     |                    请求网址过长，服务器无法处理                    |
| 415    |    Unsupported Media Type     |                      请求格式不被请求页面支持                      |
| 416    | Request Range Not Satisfiable |                       页面无法提供请求的范围                       |
| 417    |      Expectation Failed       |                 服务器未满足期望请求标头字段的要求                 |
| 500    |     Internal Server Error     |                    服务器遇到错误，无法完成请求                    |
| 501    |        Not Implemented        |                     服务器不具备完成请求的功能                     |
| 502    |          Bad Gateway          |           服务器作为网关或代理，从上游服务器收到无效响应           |
| 503    |      Service Unavailable      |                         服务器目前无法使用                         |
| 504    |       Gateway Time-out        |       服务器作为网关或代理，但是没有及时从上游服务器收到请求       |
| 505    |  HTTP Version Not Supported   |               服务器不支持请求中所用的 HTTP 协议版本               |