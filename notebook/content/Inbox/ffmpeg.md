---
title: "ffmpeg"
date: "2026-04-01"
tags:
---
当前目录 h264 转 mp4
```bash
for %i in (*.h264) do ffmpeg -i "%i" -c copy "%~ni.mp4"
```