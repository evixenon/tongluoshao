---
title: "OpenCV 库"
date: "2026-03-19"
tags:
---

## 快速入门

新手入门建议：先吃透 `cv::Mat` 和基础图像处理（滤波、轮廓），再结合具体场景（如目标检测、视频处理）深入，最后关注性能和工程化。

- **底层基石**：`cv::Mat` 的数据表示与内存管理（所有操作的基础）；
- **操作核心**：图像读写 / 色彩转换 / 滤波 / 轮廓检测 / 视频处理（解决具体视觉问题）；
- **工程保障**：性能优化 / 错误处理 / 内存管理（保证程序稳定高效）。

### 核心数据类型

#### cv::Mat

- `rows/cols`：图像的高（行数）/ 宽（列数）；
- `channels()`：通道数（1 = 灰度图，3=RGB/BGR，4=RGBA）；
- `depth()`：像素数据类型（`CV_8U`=8 位无符号（0-255）、`CV_32F`=32 位浮点、`CV_64F`=64 位浮点等）；
- `type()`：结合通道数和深度（如 `CV_8UC3`=8 位无符号 3 通道，`CV_32FC1`=32 位浮点单通道）；
- `data`：指向像素数据的指针（底层内存，慎用直接操作）；
- `step`：每行像素的字节数（含对齐，避免手动计算）。

**关键特性**：
- **内存管理**：自动引用计数，赋值 / 拷贝仅复制 “头信息”（浅拷贝），`clone()`/`copyTo()` 才是深拷贝；
- **构造与初始化**：`cv::Mat(rows, cols, type)` 创建空矩阵，`imread()` 读取图像返回 `cv::Mat`；
- **像素访问**：三种方式（效率从低到高）：
    - 便捷但慢：`mat.at<Vec3b>(y, x)[c]`（适合少量像素）；
    - 中等效率：`mat.ptr<uchar>(y)[x*channels + c]`（按行指针访问）；
    - 最高效：提前锁定内存 + 连续访问（适合大图像遍历）。

#### 基础数据结构
OpenCV 封装了视觉开发常用的几何 / 数据类型，是函数参数的标配：

- `cv::Point`/`cv::Point2f`/`cv::Point3f`：2D/3D 点（整数 / 浮点），如 `Point(x,y)`；
- `cv::Size`/`cv::Size2f`：尺寸（`width/height`），常和 `Point` 配合（如 `Rect(Point(x1,y1), Size(w,h))`）；
- `cv::Rect`/`cv::Rect2f`：矩形（`x/y` 左上角坐标，`width/height`），用于 ROI（感兴趣区域）截取；
- `cv::VecNx`：固定长度向量（如 `Vec2i`=2 个 int、`Vec3b`=3 个 uchar（对应 BGR 像素）、`Vec4i`=4 个 int（轮廓层级））；
- `cv::Scalar`：标量（可表示多通道值，如 `Scalar(255,0,0)` 对应蓝色（BGR））。

### 图像处理基础
#### 图像读写和显示
- `cv::imread(path, flags)`：*读取*图像，`flags` 控制格式（`IMREAD_GRAYSCALE`= 灰度，`IMREAD_COLOR`=BGR 彩色，`IMREAD_UNCHANGED`= 保留透明通道）；
- `cv::imshow(window_name, mat)`：*显示*图像（需配合 `cv::waitKey(delay)`，否则窗口一闪而过）；
- `cv::imwrite(path, mat)`：*保存*图像（支持 JPG/PNG 等，注意压缩参数）；

#### 色彩空间转换
**关键坑点**：OpenCV 默认色彩空间是 **BGR**（而非 RGB），和 PIL/Matplotlib 等库交互时需转换（`cvtColor(mat, mat, COLOR_BGR2RGB)`）。

色彩空间转换函数 `cv::cvtColor(mat, mat, COLOR_BGR2RGB)`
- `COLOR_BGR2GRAY`：BGR 转灰度（减少计算量，多数算法先转灰度）；
- `COLOR_BGR2HSV`：BGR 转 HSV（适合颜色分割，如识别红色物体 ——HSV 对光照不敏感）；
- `COLOR_BGR2RGB`：适配其他库（如 Qt/Matplotlib）；
- `COLOR_GRAY2BGR`：灰度图转 3 通道（适配需彩色输入的函数）。

#### 几何变换
调整图像的尺寸、位置、角度，是预处理的核心：

- `cv::resize`：缩放（指定尺寸 / 比例，插值方式：`INTER_LINEAR`（默认，平滑）、`INTER_NEAREST`（快速，像素化）、`INTER_CUBIC`（高清缩放））；
- `cv::warpAffine`：仿射变换（平移、旋转、缩放，需仿射矩阵 `cv::getRotationMatrix2D` 生成旋转矩阵）；
- `cv::warpPerspective`：透视变换（矫正倾斜图像，如二维码 / 文档矫正，需透视矩阵 `cv::getPerspectiveTransform`）；
- `cv::flip`：翻转（水平 / 垂直 / 双向，如镜像处理）。

#### 滤波和降噪

- **线性滤波**：`cv::blur`（均值滤波）、`cv::GaussianBlur`（高斯滤波，最常用，平滑噪声且保留边缘）；
- **非线性滤波**：`cv::medianBlur`（中值滤波，去椒盐噪声）、`cv::bilateralFilter`（双边滤波，保边降噪，适合人像 / 纹理图）；
- **形态学操作**：基于灰度图的形状变换，核心是 `cv::morphologyEx`：
    - 膨胀（`MORPH_DILATE`）：扩大亮区域（如填补物体缺口）；
    - 腐蚀（`MORPH_ERODE`）：缩小亮区域（如去除小噪点）；
    - 开运算（先腐蚀后膨胀，去小噪点）、闭运算（先膨胀后腐蚀，填缺口）。

适用场景
- 高斯滤波（`GaussianBlur`）：适合高斯噪声（如相机噪点），核大小（`Size(5,5)`）可调整（奇数，越大降噪越强，但会模糊边缘）；
- 中值滤波（`medianBlur`）：适合椒盐噪声（如图片中的白点 / 黑点），参数为核大小（如 `3`）。

### 视觉问题核心功能模块

#### 特征点检测
用于目标识别、拼接、定位，核心：

- **关键点检测**：`cv::ORB`（免费替代 SIFT/SURF）、`cv::SIFT`/`cv::SURF`（专利，需编译时开启），检测图像中的 “特征点”（角点、边缘等）；
- **描述子提取**：每个特征点生成唯一的描述子（如 ORB 描述子），用于匹配；
- **特征匹配**：`cv::BFMatcher`（暴力匹配，简单）、`cv::FlannBasedMatcher`（快速匹配，适合大数据）。
#### 轮廓检测
用于目标分割、形状识别（如二维码定位、物体轮廓提取）：

核心函数：`cv::findContours(二值图, contours, hierarchy, 检索模式, 逼近方法)`

关键概念：
- `contours`：`std::vector<std::vector<cv::Point>>`，存储所有轮廓的点集；
- `hierarchy`：`std::vector<cv::Vec4i>`，存储轮廓的层级关系（父子 / 相邻）；
- 轮廓逼近：`cv::approxPolyDP`（将复杂轮廓简化为多边形，如矩形 / 圆形）；
- 轮廓属性：面积（`contourArea`）、周长（`arcLength`）、外接矩形（`boundingRect`/`minAreaRect`(RotatedRect)）、最小外接圆（`minEnclosingCircle`）。
#### 目标检测
- **滑动窗口 + 模板匹配**：`cv::matchTemplate`（简单场景，如固定模板的目标查找）；
- **霍夫变换**：
    
    - `cv::HoughLines`/`cv::HoughLinesP`：检测直线（如车道线、边缘）；
    - `cv::HoughCircles`：检测圆形（如球类、表盘）。
    
- （进阶）：OpenCV 也支持集成 Haar 级联分类器（`cv::CascadeClassifier`，如人脸检测）、DNN 模块调用深度学习模型（如 YOLO）。
- 
#### 视频处理
- `cv::VideoCapture`：读取摄像头 / 视频文件（`cap.open(0)` 打开默认摄像头，`cap.open("test.mp4")` 读取视频）；
- `cv::VideoWriter`：保存处理后的视频（需指定编码格式、帧率、尺寸）；
- 关键：视频帧的循环读取（`cap.read(frame)`），逐帧处理后显示 / 保存。

### 工程化与性能
#### 1. 内存管理

- `cv::Mat` 的浅拷贝 / 深拷贝：避免重复拷贝大图像（`clone()` 仅在必要时用）；
- 及时释放资源：如 `VideoCapture`/`VideoWriter` 使用后调用 `release()`，尤其嵌入式 / 低内存场景；
- 避免内存泄漏：循环处理图像时，及时清空临时 `cv::Mat`（`mat.release()`）。

#### 2. 性能优化

- **数据类型优化**：优先用 `CV_8U`（8 位）而非浮点型，减少计算量；
- **ROI 操作**：只处理感兴趣区域（`cv::Mat roi = mat(Rect(x,y,w,h))`），避免全图处理；
- **多线程 / 并行**：OpenCV 内置并行化（如 `cv::parallel_for_`），或结合 C++ 线程处理视频帧；
- **硬件加速**：启用 OpenCV 的 CUDA 模块（NVIDIA 显卡）、OpenCL 模块，大幅提升速度。

#### 3. 错误处理

- 检查 `imread`/`VideoCapture` 的返回值：如 `Mat img = imread("test.jpg"); if (img.empty()) { 报错处理 }`；
- 像素访问越界：避免 `at<Vec3b>(y, x)` 中 `y>=rows` 或 `x>=cols`；
- 数据类型匹配：如浮点型图像不能直接用 `imshow`（需归一化到 0-255）。


## Appendices

#### cv::Mat 提前锁定内存
`cv::Mat` 的像素在内存中默认是**按行存储**的，每行末尾可能有 “内存对齐填充”（`step` > `cols * channels`），导致内存不连续。提前锁定内存的核心是：

1. **检查 / 强制内存连续**：用 `mat.isContinuous()` 判断，若不连续则用 `mat = mat.clone()` 或 `mat.reshape()` 转为连续；
2. **缓存核心参数**：将 `rows`、`cols`、`channels` 缓存到局部变量（栈上访问比堆上快）；
3. **一维指针遍历**：将 2D 图像的像素视为一维数组，用单个指针从头遍历到尾（避免逐行调用 `ptr<uchar>`


#### 二值化阈值选择
- 固定阈值（`threshold`）：适合光照均匀的场景，阈值（127）可根据图像调整（比如调为 80 或 150）；
- 自适应阈值（`adaptiveThreshold`）：适合光照不均的场景（如阴影中的目标），替代固定阈值