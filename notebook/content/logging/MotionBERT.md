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
# conda install pytorch torchvision torchaudio pytorch-cuda=11.6 -c pytorch -c nvidia
# cpu 版本
conda install pytorch torchvision torchaudio cpuonly -c pytorch -y 
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

### 环境重装
发现官方给的 python3.7 和现在的 human_body_prior 不兼容, 然后又重启了

```bash
conda deactivate

# -y 无须确认
conda remove -n motionbert --all -y

# anaconda = 100 + 个常用预装库的大礼包
conda create -n motionbert python=3.10 anaconda

activate

# cpu 版本 pytorch
conda install pytorch torchvision torchaudio cpuonly -c pytorch -y 
```

 开始装 requirements
 
```bash
# 然后 chumpy 太老了强制 import pip 出了问题:
python -m ensurepip --upgrade
python -m pip install setuptools
pip install chumpy --no-build-isolation
```

matplotlib 也出问题, 缺少 C++ 编译环境. 安装[开发工具](https://visualstudio.microsoft.com/visual-cpp-build-tools/), 只勾选 `Desktop development with C++（桌面 C++ 开发工具）`
打断 -> trae


继续装环境
```
pip install -r .\requirements.txt
```

### Trae 装环境

跳过前面的一段, 直接来到 requirements 之后的阶段, 然后同样 BodyModel 不兼容

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

报错1: 先装个缺少的包 `human_body_prior`
pip 直接安装的包版本不兼容, 要去 [Github]([nghorbani/human_body_prior: VPoser: Variational Human Pose Prior](https://github.com/nghorbani/human_body_prior)) 下载安装

```bash
pip install git+https://github.com/nghorbani/human_body_prior.git
```

报错2: 从[这里]([Pose2Mesh_RELEASE/data/Human36M/J_regressor_h36m_correct.npy at master · hongsukchoi/Pose2Mesh_RELEASE](https://github.com/hongsukchoi/Pose2Mesh_RELEASE/blob/master/data/Human36M/J_regressor_h36m_correct.npy))能下载到另一个缺少的文件 `J_regressor_h36m_correct.npy`, 放进 `data/AMASS/`

```
python ./tools/preprocess_amass.py
```

报错3: 下[模型]([MANO](https://mano.is.tue.mpg.de/download.php))

![[attachments/Pasted image 20260330135921.png]]

报错4: 下[模型]([SMPL](https://smpl.is.tue.mpg.de/index.html))

![[attachments/Pasted image 20260330141902.png]]

#### Human 3.6M
[下载](https://1drv.ms/u/s!AvAdh0LSjEOlgU7BuUZcyafu8kzc?e=vobkjZ)并解压到 `data/motion3d`

然后执行 `python ./tools/convert_h36m.py`, 会生成一个文件夹
#### PoseTrack
从[网站]([2D Body Keypoint Datasets — MMPose 1.3.2 documentation](https://mmpose.readthedocs.io/en/latest/dataset_zoo/2d_body_keypoint.html#posetrack18))下载并解压到 `MotionBERT\data\motion2d`, 直接可用

### AlphaPose

```bash
conda create -n alphapose python=3.8 -y 
conda activate alphapose
conda install pytorch==1.13.1 torchvision==0.14.1 torchaudio==0.13.1 cpuonly -c pytorch -y

pip install -r requirements.txt 
python setup.py develop


#  下载模型（自动下载）
mkdir detector\yolo\data
curl -o detector/yolo/data/yolov3-spp.weights https://pjreddie.com/media/files/yolov3-spp.weights

mkdir pretrained_models
curl -o pretrained_models/fast_res50_256x192.pth https://download.openmmlab.com/mmpose/alphapose/fast_res50_256x192.pth
```

全部运行完 = **AlphaPose 安装成功**。

### pretrain

[MotionBERT 源码复现-CSDN博客](https://blog.csdn.net/KangXi_TangYuan/article/details/134194719)

### inference

AlphaPose -> json ->MotionBert

[Windows Install]([AlphaPose/docs/win_install.md at master · MVIG-SJTU/AlphaPose](https://github.com/MVIG-SJTU/AlphaPose/blob/master/docs/win_install.md))

下载[Model]([AlphaPose/docs/MODEL_ZOO.md at master · MVIG-SJTU/AlphaPose](https://github.com/MVIG-SJTU/AlphaPose/blob/master/docs/MODEL_ZOO.md)) -> `AlphaPose\pretrained_models`

[weights](https://pjreddie.com/media/files/yolov3-spp.weights) -> `AlphaPose\detector\yolo\data\`

```bash
python scripts/demo_inference.py \
--cfg configs/coco/resnet/256x192_res50_lr1e-3_1x.yaml \
--checkpoint pretrained_models/halpe26_fast_res50_256x192.pth \
--video venc2_train_1.mp4 \
--save_video \
--format open \
--outdir result
```