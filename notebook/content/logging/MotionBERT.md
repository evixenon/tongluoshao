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

### 环境其他

永久换源设置:(在虚拟环境用的话就只在虚拟环境生效)
```bash
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

conda 加源
```bash
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/ 
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r/ 
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2/ 
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/ 
conda config --set show_channel_urls yes
```


### 环境 FX16
[MotionBert论文解读及详细复现教程 - http://www.tpcf.cn/](http://www.tpcf.cn/news/1844.shtml)

#### 配置 AlphaPose

```bash
# 无报错
conda install pytorch==1.12.1 torchvision==0.13.1 torchaudio==0.12.1 cudatoolkit=11.3 -c pytorch

pip install cython ninja easydict halpecocotools munkres natsort opencv-python pyyaml scipy tensorboardx  terminaltables timm==0.1.20 tqdm visdom jinja2 typeguard pycocotools
```

```
# 6. Install PyTorch3D (Optional, only for visualization)
conda install -c fvcore -c iopath -c conda-forge fvcore iopath
conda install -c bottler nvidiacub
pip install pytorch3d
```

[下载](https://drive.google.com/open?id=1D47msNOOiJKvPOXlnpyzdKA3k6E97NTC)`yolov3-spp.weights`到`AlphaPose/detector/yolo/data`

[下载](https://drive.google.com/file/d/1S-ROA28de-1zvLv-hVfPFJ5tFBYOSITb/view?usp=sharing)`halpe26_fast_res50_256x192.pth` 到 `pretrained_models`

#### 配置 MotionBert
nvidia-smi 查看 cuda 版本

```bash
conda create -n motionbert python=3.7 anaconda
conda activate motionbert
# Please install PyTorch according to your CUDA version. 
# cuda v=13.0 但是没有这个版本的 
conda install pytorch torchvision torchaudio pytorch-cuda=11.6 -c pytorch -c nvidia
pip install -r requirements.txt
```

有下载断连问题
pytorch 太新也会崩, 所以又降了版本

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
跑通版本 torch 1.13.1 cuda 11.6
```bash
# cpu 版本
conda install pytorch torchvision torchaudio cpuonly -c pytorch

# no nvidia
# ext_modules=get_ext_modules(),

#  下载模型（自动下载）
mkdir detector\yolo\data
curl -o detector/yolo/data/yolov3-spp.weights https://pjreddie.com/media/files/yolov3-spp.weights
```

[weights](https://pjreddie.com/media/files/yolov3-spp.weights) -> `AlphaPose\detector\yolo\data\`

下载[Model]([AlphaPose/docs/MODEL_ZOO.md at master · MVIG-SJTU/AlphaPose](https://github.com/MVIG-SJTU/AlphaPose/blob/master/docs/MODEL_ZOO.md)) -> `AlphaPose\pretrained_models`


```bash
python scripts/demo_inference.py \
--cfg configs/halpe_26/resnet/256x192_res50_lr1e-3_1x.yaml \
--checkpoint pretrained_models/halpe26_fast_res50_256x192.pth \
--video venc2_train_1.mp4 \
--save_video \
--format open \
--outdir result
```

run for a video
```bash
python scripts/demo_inference_stats.py --cfg configs/halpe_26/resnet/256x192_res50_lr1e-3_1x.yaml --checkpoint pretrained_models/halpe26_fast_res50_256x192.pth --video examples/test_video/test.mp4 --outdir examples/test_video
```

```
./scripts/inference.sh configs/halpe_26/resnet/256x192_res50_lr1e-3_1x.yaml pretrained_models/halpe26_fast_res50_256x192.pth examples/test_video/test.mp4 examples/test_video
./scripts/inference.sh ${CONFIG} ${CHECKPOINT} ${VIDEO_NAME} # ${OUTPUT_DIR}
```

```bash
python scripts/demo_inference.py --cfg configs/halpe_26/resnet/256x192_res50_lr1e-3_1x.yaml --checkpoint pretrained_models/halpe26_fast_res50_256x192.pth --video examples/demo/test_video/venc2_train_1.mp4.mp4 --save_video
```
### pretrain

[MotionBERT 源码复现-CSDN博客](https://blog.csdn.net/KangXi_TangYuan/article/details/134194719)

### inference

AlphaPose -> json ->MotionBert

[Windows Install]([AlphaPose/docs/win_install.md at master · MVIG-SJTU/AlphaPose](https://github.com/MVIG-SJTU/AlphaPose/blob/master/docs/win_install.md)) 跟这里下载 dll

```bash
python infer_wild.py  --vid_path ./test_demo2/test.mp4  --json_path ./test_demo/alphapose-results.json  --out_path ./test_demo2
```

### pose3d
ft
```
python train.py --config configs/pose3d/MB_ft_h36m.yaml  --pretrained checkpoint/pretrain/MB_release  --checkpoint checkpoint/pose3d/FT_MB_release_MB_ft_h36m
```

evaluate
```
python train.py  --config configs/pose3d/MB_train_h36m.yaml  --evaluate checkpoint/pose3d/MB_train_h36m/best_epoch.bin         
```

### 测试记录

alphapose 
python scripts/demo_inference_stats.py 
--cfg configs/halpe_26/resnet/256x192_res50_lr1e-3_1x.yaml 
--checkpoint pretrained_models/halpe26_fast_res50_256x192.pth 
--video examples/test_video/test.mp4 
--outdir examples/test_video

📊 Average Time per frame (ALL STEPS)
DET      :   7.45 ms
READ     :   7.45 ms
INFERENCE:  26.47 ms
POST     :  20.69 ms
SAVE     :   0.03 ms
TOTAL    :  54.67 ms
FPS      : 18.29

### 训练

MotionBERT 采用 **两阶段训练**：**大规模统一预训练 (Pretrain)** + **下游任务微调 (Finetune)**，核心是用 **DSTformer (双流时空 Transformer)** 从含噪 2D 姿态中学习通用 3D 运动表征motionbert.github.io。

#### 一、核心思想：从 2D 恢复 3D 的预训练任务

**Pretext Task (前置任务)**：
- 输入：**损坏的 2D 骨架序列**（从 3D 真值投影而来，加随机 Mask、噪声、缺失帧，模拟真实检测误差）
- 输出：**预测完整 3D 姿态序列**
- 目标：强迫模型理解人体运动的**几何、运动学、时序规律**，学到通用表征motionbert.github.io

#### 二、训练阶段详解

##### 1. 第一阶段：统一预训练 (Unified Pretraining)

**目标**：在海量异构数据上预训练 Motion Encoder (DSTformer)motionbert.github.io。

**(1) 数据准备（关键：.pkl 文件）**
- **数据源**：AMASS、Human3.6M (H36M)、3DPW、PoseTrack 等
- **格式**：预处理为 `.pkl` 文件，内含：
    - `keypoints_2d`：2D 关键点 (x, y, conf)
    - `keypoints_3d`：3D 真值 (x, y, z)
    - `imgname`, `bbox`, `camera` 等
- **路径**：`data/motion3d/MB3D_f243s81/xxx.pkl`

**(2) 数据增强（模拟真实噪声）**
- **关节 Mask**：随机掩盖部分关节
- **帧 Mask**：随机丢掉连续几帧
- **高斯噪声**：给 2D 坐标加噪
- **根相对化 (Root-Relative)**：以骨盆为原点归一化

**(3) 模型架构：DSTformer**
- **双流设计**：
    - **Spatial Stream**：建模单帧人体关节空间关系
    - **Temporal Stream**：建模多帧时序依赖
- **多头自注意力 (MHSA)**：捕捉长距离依赖
- **输入**：(Batch, Frames, Joints, 3) → (x, y, confidence)
- **输出**：(Batch, Frames, Joints, 3) → 3D 坐标 (x, y, z)

**(4) 损失函数 (多约束复合)**
- **MPJPE (L_3d_pos)**：3D 关节位置误差（主损失）
- **Velocity Loss (L_vel)**：关节速度误差（时序平滑）
- **Scale Loss (L_scale)**：全局尺度误差
- **Limb / Angle Loss**：肢体长度、角度约束（人体先验）

**(5) 预训练命令 (Linux)**

```bash
# 进入项目根目录
cd MotionBERT

# 启动预训练 (configs/pretrain/MB_pretrain.yaml)
python train.py \
  --config configs/pretrain/MB_pretrain.yaml \
  --checkpoint checkpoint/pretrain/MB_pretrain
```

- **参数**：batch 64、epoch 90、lr 5e-4
- **输出**：`checkpoint/pretrain/MB_pretrain/best_epoch.bin`

##### 2. 第二阶段：下游任务微调 (Finetune)

**(1) 3D 姿态估计 (H36M/3DPW)**

```bash
# 从预训练权重微调 (Finetune)
python train.py \
  --config configs/pose3d/MB_ft_h36m.yaml \
  --pretrained checkpoint/pretrain/MB_release \
  --checkpoint checkpoint/pose3d/FT_MB_release
```

- **仅新增**：1-2 层线性回归头 (Regressor Head)motionbert.github.io
- **冻结 / 微调**：Encoder 微调，Head 随机初始化


MotionBERT 模型:
- 目的: 从有损的 2d 坐标数据预测 3d 坐标
- 有监督, 先跑 30 epoch 纯 3d, 再加入 2d 跑 60 epoch
- (必需)3D 数据用于基础训练, 让模型理解人体结构和运动规律; 
- 2D 数据用于多样化数据场景(比如3D数据集大多是室内素材)

训练输入 .pkl 数据(切割好的 motion 片段)包括:
- 3D 监督数据: 时间 * 关节数 * (x, y, z)
- 2D 点数据: 时间 * 关节数 * (x, y, 置信度)
    - 2D 也可以用 3D 直接投影, 设置置信度为 1

- [x] 如果想要改变骨骼点

首先, 虽然模型使用时输入的是 Halpe 的 26 关节点格式, 但实际上, 预测之前模型会将它转化另 17 个关节点的 h36m 格式 (详见 `lib/data/dataset_wild.py` 的 `halpe2h36m()` 函数)

其次, 在很多操作中, 骨骼节点是被硬编码定义的, 如:
- `lib/utils/utils_data.py` `flip_data()` 翻转关节点
- `lib/mode/loss.py` `get_limb_lens()` loss 函数计算