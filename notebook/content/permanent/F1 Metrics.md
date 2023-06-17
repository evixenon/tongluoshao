---
title: "F1 Metrics"
date: "2023-06-15"
---

#### F1 Metrics
TP = true positive, 实为 pos, 预测为 pos
TN = true negative, 实为 neg, 预测为 neg
FP = false positive, 实为 neg, 预测为 pos
FN = false positive, 实为 pos, 预测为 neg

##### Accuracy
- A = (TP +TN) / all

##### Precision
- 预测为 pos 的样本中, 有多少是正确的
- P = TP (TP + FP)
- P(neg) = TN (TN + FN)

##### Recall
- 所有的 pos 样本中, 有多少被准确预测为 pos
- R = TP / (TP + FN)
- R(neg) = TN / (TN + FP)

##### F1-score
- 是 [[#Precision|Precision]] 和 [[#Recall|Recall]] 的 [[permanent/平均指标#调和平均数|调和平均数]]
- F1 = 2 * P * R / (P + R)
