---
title: "MotionBERT"
date: "2026-03-30"
tags:
---
主要的需要功能在于 3D Pose Estimation

- [ ] 准备 AMASS 数据
- [x] 准备 human3.6m 数据 ✅ 2026-03-30
- [x] 准备 instaVariety 数据 ✅ 2026-03-30


## 记录

### 环境准备

插件自行装 uv, py
```bash
powershell -ExecutionPolicy Bypass -c 'irm https://astral.sh/uv/install.ps1 | iex'
uv python install
```

conda 环境
```bash
# 创建
conda create -n motionbert python=3.7 anaconda
# 激活
conda activate motionbert
```

激活过程出现不能执行脚本的权限问题, powershell 管理员运行:
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

激活 conda 后安装 requirements
```bash
conda install pytorch torchvision torchaudio pytorch-cuda=11.6 -c pytorch -c nvidia
# 临时换源
pip install -r .\requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
```

永久换源设置:(在虚拟环境用的话就只在虚拟环境生效)
```bash
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

导出成清单文件（给别人打包用）

```
conda env export > environment.yml
```

### 数据准备

#### AMASS

创建文件夹, 名称应与 `compress_amaas.py`  中的路径名相同

![[attachments/Pasted image 20260330110755.png]]

从 [AMASS]([AMASS](https://amass.is.tue.mpg.de/download.php)) 下载 SMPL+H 数据文件 (除了 GRAB 和 SOMA, 这两个没有 dmpls 参数), 

win 上 用 7zip 解两层压

`compress_amass.py` 执行结束后会在 AMASS 文件夹生成 .pkl 和 .csv 文件
```bash
python ./tools/compress_amass.py
```

`preprocess_amass.py` 会报错

报错1: 先装个缺少的包
```bash
pip install human_body_prior
```

报错2: 从[这里]([Pose2Mesh_RELEASE/data/Human36M/J_regressor_h36m_correct.npy at master · hongsukchoi/Pose2Mesh_RELEASE](https://github.com/hongsukchoi/Pose2Mesh_RELEASE/blob/master/data/Human36M/J_regressor_h36m_correct.npy))能下载到另一个缺少的文件 `J_regressor_h36m_correct.npy`, 放进 `data/AMASS/`

```
python ./tools/preprocess_amass.py
```
#### Human 3.6M
[下载](https://1drv.ms/u/s!AvAdh0LSjEOlgU7BuUZcyafu8kzc?e=vobkjZ)并解压到 `data/motion3d`

然后执行 `python ./tools/convert_h36m.py`, 会生成一个文件夹
#### PoseTrack
从[网站]([2D Body Keypoint Datasets — MMPose 1.3.2 documentation](https://mmpose.readthedocs.io/en/latest/dataset_zoo/2d_body_keypoint.html#posetrack18))下载并解压到 `MotionBERT\data\motion2d`, 直接可用