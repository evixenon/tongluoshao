---
title: MotionBERT 评估
date: 2026-04-02
tags:
---
GitHub: [链接](https://github.com/Walter0807/MotionBERT)

Paper: [链接](https://arxiv.org/pdf/2210.06551.pdf)

#### 简介
**MotionBERT** 是针对 Human-centric 任务构建的模型, 在我们的项目中, 可以用到它 *从有损 2D 关节点坐标还原 3D 关节点坐标* 的功能. 

#### Method
MotionBERT 通过设计 DSTformer 双流时空 Transformer, 从时间(单关节跨帧运动) 和 空间(同帧内关节关联) 两个维度设计损失函数, 由此提高 3D 还原的准确性.

模型首先通过**预训练**得到一种通用的 Human-centric 模型, 然后通过 **Finetune** 的方式 完成不同的分支任务.

官方完成的下游任务:
- **3D 姿态预测 (我们的重点)**
- 动作类型识别
- Mesh 还原(人体网格还原)

![[attachments/Pasted image 20260402142308.png]]

#### 模型官方用法(从有损 2D 关节点坐标还原 3D 关节点坐标)
输入: 
- 通过 AlphaPose 模型得到的 Halpe 26 关节点数据, 格式为 JSON
- 原视频, 但不参与模型推理, 只提取视频元信息用于坐标还原和可视化

![[attachments/Pasted image 20260402173841.png]]

输出: 
- .npy 数据, 存储坐标 (NumPy 专用的二进制数据文件格式，专门用来存储数组（矩阵）数据)
- (可选)可视化 3D 骨骼 17 关节点渲染视频

```shell
# 官方 inference 命令
python infer_wild.py \
--vid_path <your_video.mp4> \
--json_path <alphapose-results.json> \
--out_path <output_path>

# 示例
python infer_wild.py  --vid_path ./test_demo/test.mp4  --json_path ./test_demo/alphapose-results.json  --out_path ./test_demo
```

效率测试(3070Ti Mobile, X5 的效率应该是这个结果的 50% 左右):

![[attachments/Pasted image 20260402140100.png]]

实际效果见 compare.mp4
#### 模型预训练
[MotionBERT 官方预训练说明](https://github.com/Walter0807/MotionBERT/blob/main/docs/pretrain.md)

在预训练阶段, 官方使用了 AMASS, Human3.6M 作为 3D 有标注数据集, PoseTrack, InstaVariety 作为 2D 无标注数据集

训练输入格式为 .pkl
- 3D: 时间 \* 关节数 \* (x, y, z)
- 2D: 时间 \* 关节数 \* (x, y, 置信度)

.pkl 是 Python 专用的序列化文件格式，全称 Pickle
- 输入文件内容实际为切割好的 motion 片段
- 2D 点的文件在格式上与 3D 是一样的, 只是把第三维从 z 轴坐标换成了置信度
- 2D 点也可以用 3D 直接投影得到, 设置置信度为 1

输出格式为 .bin, 即 checkpoint 文件

在预训练阶段, 模型首先会单独用 3D 数据跑 30 个左右 epoch, 再使用 3D+2D 数据跑 60 个左右 epoch. 3D 数据用于基础训练, 让模型理解人体结构和运动规律; 2D 数据用于多样化数据场景(比如3D数据集大多是室内素材). **有标注的 3D 数据始终是需要的.** 而 2D 数据仅作辅助, 没有那么重要.

#### 针对 3D 姿态估计的下游任务微调
[MotionBERT 官方 pose3d 指南](https://github.com/Walter0807/MotionBERT/blob/main/docs/pose3d.md)

对于 3D 姿态估计, 官方其实是直接复用 pretrain 的脚本(`train.py`). 也就是说, 实际上不需要额外的 finetuning.

