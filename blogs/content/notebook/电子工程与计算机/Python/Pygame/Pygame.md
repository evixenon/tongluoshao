# Pygame

## 目录

*   [游戏基础型](#游戏基础型)

*   [图像](#图像)

## 游戏基础型

```python
# -*- coding:UTF-8 -*-
import pygame
from sys import exit

#初始化
pygame.init()
#创建窗口
screen = pygame.display.set_mode((778,652),0,32)
#设置标题
pygame.display.set_caption("Hello,world!")
#加载并转换图像
background = pygame.image.load('D:\\new\output\Python\pygame\image\keromatsu.png').convert()

#主循环
while True:
  #如果事件为退出
  for event in pygame.event.get():
    if event.type == pygame.QUIT:
      pygame.quit()
      exit()
    if event.type == pygame.MOUSEBUTTONDOWN:
      background = pygame.image.load('D:\\new\output\Python\pygame\image\hui.png').convert()
  #加载背景图
  screen.blit(background,(0,0))
  #刷新画面
  pygame.display.update()
```

## 图像

pygame画图

`pygame.draw.rect(screen, color, rect, width)` width=0:fill

`pygame.draw.polygen(screen, color, points, width)` points 是一组坐标

`pygame.draw.circle(screen, color, center, radius)`
