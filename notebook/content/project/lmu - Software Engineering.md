---
title: "lmu - Software Engineering"
date: "2023-06-16"
---

swt

## Organization
GMT+2
`Vorlesung` Mittwoch 9:15-11:45
`Tutorium` Mittwoch 18:15-19:45

`Zentralübung` auf: Mitt, ab: Mitt, unbenotet
Individuelles Feedback durch studentische Tutoren
Lösungsvorschläge von uns, nach der R¨uckgabe
der Korrekturen.

## Statische Code-Analyse

##### 静态代码分析
即通过审查源代码, 不真正运行代码来分析

### Software Metrics 软件指标
src: Software-Qualität 5

#### Criteria

##### Objektivity
de. Objektivität
客观性, 不受主观因素影响

##### Robustness
de. Robustheit
健壮性是指程序能在不正常输入的情况下仍正常表现.
即使终止执行, 也要准确的输出错误信息

##### Comparability
de. Vergleichbarkeit
必须能够与竞品在同一参数下比较

##### Economy
de. Ökonomie
作为一个项目, 必须考虑成本问题

##### Correlation
de. Korrelation
指观测参数和软件指标之间的相关性, 越相关, 得出的结果越可靠

##### Valuability
de. Verwertbarkeit
只有当不同的测量结果以不同的方式影响未来的行动时，软件指标的使用才有实际意义。


#### LOC and NCSS

##### LOC
Lines of Code


##### NCSS
Non Commented Source Statements


##### LOC 和 NCSS 的变体
基础的两者只能差不多满足 Comparability
- 统计可执行代码行数
- 统计可执行代码行数和变量声明数
- 统计 tokens
- 统计语句分隔符(例如';'')


#### McCabe Metrics
|N| 节点数, 程序开始和程序结束也各算作一个节点
|E| 边数

##### Zyklomatische Zahl
对强连接图, 计算公式为
$V(Z) = |E| - |N| + 1$
而编程常见的流程控制图并不满足强连接图, 公式为
$V(G) = |E| - |N| + 2$

##### Zyklomatische Komplexität
对流程控制图, Zyklomatische Zahl 也称为 Zyklomatische Komplexität, 记作 $V(C)$.
但实际上, 程序的理解难度和 ZK 并不一定是成正比的. 反例: U2-a2.

##### 计算类的 V(C)
等于类中所有方法的 $V(C)$ 的加总.

#### OO Metrics

##### 为什么面向对象程序需要特殊的分析方式?
- 纯粹的命令式度量只能不完整地反映面向对象程序的复杂性。面向对象设计的一个核心组成部分是将思想模型划分为类以及它们之间的关系。
- 继承机制使得代码大小和类的复杂性之间的任何关联都无法被(LOC, NCSS)计算。

![[attachments/Pasted image 20221122221224.png]]

##### WAC
weighted attributes per class
$$WAC = \sum^{|A|}_{i=1}v_A(a_i)$$
$a \in A$ attribute
$v_A(a)$ complexity of attribute a

##### WMC
weighted methods per class
$$WMC = \sum^{|M|}_{i=1}v_M(m_i)$$
$m \in M$ Method
$v_M(m)$ complexity of method m

##### LCOM
lack of cohesion in method
描述一个类、包或库的内聚程度
相关性还没得到确认

##### Fan-In
$F_{in}(C)$ 表示一个类 C 被链接的次数(别人连它), 通常高层级的类有较低的 Fan-In

##### Fan-Out
$F_{out}(C)$ 表示一个类 C 链接其他类的次数(它连别人), 通常低层级的类有较低的 Fan-Out


##### Systemcomplexity $v_{CG}$
$$ v_{CG} = s_{CG} + d_{CG} $$
$s_{CG}$ structural complexity
$$s_{CG} = \sum^n_{i=1}F_{out}(C_i)^2$$
$d_{CG}$ data complexity
$$d_{CG} = \sum^n_{i=1}\frac{IO(C_i)}{F_{out}(C_i)+1}$$
$C_i$ 第 i 个类
$IO(C_i)$ IO-variable

$\bar{v_{CG}}$ relative systemcomplexity
$$\overline{v_{CG}} = \frac{V_{CG}}{n} = \frac{1}{n}(\sum^n_{i=1}F_{out}(C_i)^2 + \sum^n_{i=1}\frac{IO(C)}{F_{out}(C_i)+1})$$

### Manuelle Sofrware-Prüfung
src: Software-Qualität 5.5

#### 分类
- informel/formal
- spontan/geplant
- moderiert/unmoderiert 是否有人主持

#### Walkthroughs
非正式, 随时发生的审查, 不限于对代码, 也可以对配置文件, 测试案例等.

以下原则可能会有帮助:

**Mehraugenprinzip**

**Erzählstil 小黄鸭法** 

**Externalisierung 外部化**

#### Reviews
正式, 通常是有计划的
原则上: 全面, 可比较
可以是人工也可以是自动
![[attachments/Pasted image 20221123113129.png]]


#### Inspections
正式而有计划有主持

1. Plannungsphase
	- 准备场地, 人员, 日期相关
2. Überblicksphase
	- 分发角色, 提供项目背景信息. 
	- 建议浏览速度 500NCSS
3. Vorbereitungsphase
	- 初步评估, 每个人准备 Fehlerliste
4. Inspektionssitzung
	- 建议浏览速度 90 NCSS 
	- **Moderator** 控制流程, 氛围和方向
	- **Gutachter** 指导检查员小组阅读个别方案源代码和文件. 从自己的角度解释设计和程序构造. 需要较强的专业能力.
	- **Autor** 不可担任主持人, 记录员, 审查员, 而是以外部人的角度, 避免过度辩解.
	- **Protokollführer** 起草一份检查报告, 记录发现的问题并分配权重
6. Nachbearbeitungsphase
	- 作者更正错误, 如果认为被指出的不是错误, 则会在重新审查阶段讨论.
7. Überprüfungsphase
	- 还有没有要讨论的要改的?
	- 准备最终报告


## Software Verification
src: Software-Qualität 6.1

### 概论
![[attachments/Pasted image 20221124111455.png|500]]

#### Verifikation vs. Validation

##### Verifikation
Is the product work correctly?
##### Validation
Does the product satisfy the demand?

#### Verifikationstechnik
- Deduktion
	- 就是数学归纳法
- Modellprüfung
	- 转成 Kripke 结构
	- 用遍历和时间逻辑验证
	- 由于规范语言的表达能力较低, 证明可以自动化
- Abstrakte Interpretation
	- 将一个方案理解为一组方程式(Gleichungssystems).由此产生的方程组的解决方案对应于一个程序可以承担的一组状态.
	- 由于许多动态属性可以被映射到相应的状态集上，它们的有效性(Gültigkeit)可以通过简单的集合操作来检查, 在出现错误的情况下(im Fehlerfall), 可以从交集(Schnittmenge)处生成一个反例(Gegenbeispiel).

![[attachments/Pasted image 20221124112056.png|600]]

#### Verification techniques 的优势力衡量
- Ausdrucksstärke
	- 一个程序的表达能力越高，其理论性能就越高。在消极方面，这种增长伴随着复杂性的爆炸性增长，这使得证明性能变得不成比例地困难。
- Skalierung
	- 表达能力越强, 可扩展性就越差
		![[attachments/Pasted image 20221124114001.png|400]]
- Automatisierung

## Software Test
src: Einführung in die Softwaretechnik 12.2

### 软件测试

- 测试只能发现不正确, 而不保证正确性
- 系统的测试需要对需求精确的描述
- 测试可以占到软件开发工作的50%
- 需要搭建测试环境, 可能非常昂贵

#### 为什么需要测试? 测试的目的?
Fehler finden, Code verhält sich erwartet für Testfall, *Codequalität* (nichtfunktionale Eigenschaften), *Diagnostizierbarkeit bei unerwarteten  
Ausgaben, Spezifikation (TDD), Testbarkeit* von Code als Gütekriterium

#### 软件测试的原则
- 开发人员避免测试自己的程序
- 总是假设方案是错误的
- 测试案例必须包括有效和无效的输入
- 必须对结果彻底分析
- 测试应当嵌入到开发过程中, 越早发现问题, 修改的成本就越小

##### FIRST 自动化测试设计原则
- fast
- independent
- repeatable
- self-validating 自我验证
- timely

#### 软件测试的一般流程
1. 测试规划 Test Design. 定义具体测试任务等
2. 设计测试 Test Plannung. 定义基本测试架构, 功能测试环境
3. 测试案例 Testspezifikation. 设计具体的测试案例, 确定需要达到的指标或阈值, 准备测试数据.
4. 执行测试 Durchführung. 这个步骤可以很大程度自动化. 执行测试, 并收集各种结果
5. 评估测试 Auswertung. 比较测试结果与预期, 确定进一步的工作.

#### 基本测试形式

##### White Box Test 白盒测试
- 可以查看程序源码和结构, 并由这些内部视图 (Innensicht) 决定测试案例.
- 目标是尽可能测试每条指令, 和尽可能多地测试可能的指令序列.
- 可用于测试指令, 条件, 路径覆盖率. (Statement, Condition, Branch)

##### Black Box Test 黑盒测试
- 测试用例由外部视图 (Außensicht) 决定, 也就是由需求和接口规范决定而无法查看源代码.
- 目标是功能的特殊方面, 比如经典用例, 边缘测试, 负载测试等, 不合法输入测试.

##### Grey Box Test 灰盒测试
- 灰盒测试通常专注于整个模块或系统的集成功能, 以及模块之间的互动, 而不关注具体实现.
- 集成测试经常被理解为灰盒测试.

#### 测试对象/焦点

##### 数据流
以面向输入/输入的方式检查. 例如用等价类

##### 控制流
测试对象是否如预期执行.

##### 功能测试
功能是否正常, 系统是否正确.

#### 等价类
在自动化单元测试中经常被使用的测试方法, 所有可能的输入被划分为等价类, 并假定系统在输入一个等价类的元素时, 其行为与该类其他元素相同.

等价类应该是精简而准确的.

##### 分类树法 Klassifikationsbaummethode
用树表示等价类关系, 只有叶算一个等价类.
![[attachments/Pasted image 20221128141325.png|400]]

### 单元测试

#### 单元测试
单元测试是对少量代码的自动测试, 目的是在早期发现和消除新开发活动带来的副作用 (回归).
应该经常进行.
应被设计得有效和高效.

#### 单元测试设计

##### One Asset per Test
有这样的说法, 但也不是必须只能有一个. 每个单元测试中有多个断言也是有意义的, 但断言的数量应得到限制.

##### Single Concept per Test
类似于一个方法只为一个目的服务. 每个测试用例应该只测试一个概念.

### Test-Driven Development
[[permanent/测试驱动开发 Test-Driven Devlopment]]

![[attachments/permanent/测试驱动开发 Test-Driven Devlopment#TDD 的规则]]

![[attachments/permanent/测试驱动开发 Test-Driven Devlopment#TDD 的影响]]


## Continuous Integration

### 集成的理论
src: Einführung in die Softwaretechnik 12.3

#### Def. Integration
将模块和组件集成到整个系统, 并测试整个系统正确性的过程.

#### 集成需要准备和完成什么
1. (在开发早期)创建整合了整个系统或组件的可执行框架([[#集成的先决条件]])
2. 一步一步将实现的模块连接到框架([[#集成方法]])
3. 完成模块的单独测试后, 移交给集成团队(通常是自动化的)
4. 在交接过程中再次测试(集成测试), 通过后插入到集成框架中

#### 集成的先决条件
- 架构, 架构的描述(系统的结构和通信路径)
- 组件规范(接口和接口行为的描述)

#### 集成测试的流程
1. 将测试过程分解为可管理和可控制的单元
2. (模块)提供可演示的功能
3. 测试过程的正规化(确定测试和需求的关系)
4. 规划集成和测试
5. 推导出集成的顺序
6. 开始集成
    1. 各个模块的测试
    2. 整合系统
    3. 整个系统的测试
    4. 识别并纠正错误
    5. 重新检测

#### 集成过程中的任务
- 协调集成计划, 测试和时间
- 模块测试的验收和文件收集
- 集成测试的规划和执行
- 错误追踪跟进
- 回归测试

#### 配置管理
Konfigurationsmanagements
配置管理的目标是对软件单元的管理, 并保证组成一致的, 可执行的系统.
如果在集成过程中发现设计的接口不能被遵守, 就必须对相关组件进行调整.

#### Architekturfehler 架构错误
指架构包含错误, 因此, 尽管所有组件都符合它们的要求, 但在互动时并没有产生预期的结果.
可能因为:
- 耦合错误(Kopplung): 正确的模块加载、连接或调用有误
- 接口错误: 不适合(例如兼容性), 类型不匹配
- 协议错误: 不正确的函数调用顺序
- 时间错误
- 同步错误

#### 集成开始的时间
建议在可以集成的早期就开始集成测试
在部分模块就绪时就可以开始集成测试, 每次新集成的模块越少, 就越容易定位错误

#### 系统测试
分类:
- 验收测试
- Betatest
- Bestätigungstest
- Leistungstests

**针对产品要求的系统测试**
- 每个需求至少有一个系统测试案例, 通常多个
- 用例来自于使用场景

**针对质量要求的系统测试**
|质量参数|测试方法|备注|
|:--|:--|:--|
|Sicherheit|Penetrationstest||
|Zeitverhalten|Performance-Test||
|Ausführbarkeit|Stresstest|极限性能下是否稳定|
|Skalierbarkeit|Lasttest|高负载下是否快速|
|Adaptierbarkeit|Konfigurationstest|更换软件和硬件配置测试|

##### 比较: 集成测试和系统测试的区别是什么?
集成测试, 是在组合两个或几个经过了单元测试的模块后, 检查这个组合是否会出现问题.
系统测试是所有模块集成完毕后测试整体体能/表现.

#### 验收测试
de. Abnahmetest
验收测试是在软件系统交付给客户和用户时对其进行检查, 通常具有法律意义. 需确定所有规定的要求是否得到满足. 使用黑盒测试, 通常由项目管理部门和客户共同负责.
从整体考虑:
- 从用户角度证明正确性
- 有客户确认开发目标已实现
从低层面考虑, 重点是测试技术规格:
- 根据要求进行功能测试
- 测试正常用户操作下的行为
- 在特殊情况下和连续运行中的行为测试
- 测试性能参数

#### 生产和测试环境
系统测试应该在尽可能接近生产环境或操作环境的测试环境中进行. 
一个工具是模拟(Simulation). 模拟的对象可以是硬件, 软件和模型. 模拟的数据由模拟器产生(相对于简单测试的固定输入).

##### X-in-the-loop Simulation 
指的是 X 在较长时间的环境中被执行. 例如 Hardware-in-the-loop(HIL). 

##### Staging-Environment
暂存环境, 指测试中逐渐接近开发环境的测试环境

#### 集成中的错误处理
首先, 模块的测试要充分, 才方便更好地定位集成时的错误
然后, 定位和处理[[#Architekturfehler 架构错误|架构错误]]

### 集成方法
通常分三类:
- Big-Bang
- Top-Down
- Bottom-Up
src: Einführung in die Softwaretechnik 12.3

#### Big-Bang 集成

![[attachments/Pasted image 20221214134333.png|500]]
1. 所有模块单独测试
2. 直接整个集成并测试

好处是测试较少, 坏处是定位和处理错误难
pass

#### Bottom-Up 集成

![[attachments/Pasted image 20221214134546.png|500]]

1. 对最低层的模块各自测试.
2. 部分模块集成为组件, 对组件进行测试
3. 将组件逐层集成并测试

好处
- 在每个步骤都可以完成所有测试
- 不需要 dummy
- 快速识别和定位错误

#### Top-Down 集成

![[attachments/Pasted image 20221214135002.png|500]]

1. 对顶层的组件进行测试, 这时低一层的组件是用 dummy 实现
2. 开发和集成下一层的组件, 这时更低层的用 dummy
3. 重复2直到完整开发
4. 最低层的组件测试

#### 集成方法的适用性
自下而上和自上而下方法都有各自适用的场景.
自下而上在个模块已成熟时更方便测试, 在敏捷开发时也行合适.
自上而下在以验收测试为目标的整个系统连续测试时更合适.


### CI/CD 持续集成和交付
Continuous Integration und Continuous Delivery
de. Kontinuierliche Integration und Auslieferung
src: Einführung in die Softwaretechnik 12.4

#### 概念

##### 持续开发
de. kontinuierlichen Softwareentwicklung
软件持续开发的基本理念是: 开发(coding), 测试(test), 集成(Integration)三项任务的联动执行, 以缩短开发周期. 如有必要, 会增加持续交付(delivery)和持续部署(deployment).

![[attachments/Pasted image 20221214141452.png|500]]
持续开发背景下的开发步骤示意图.

##### 持续集成
在持续集成方法中, 单个模块开发和测试完成后, 定期(持续)集成到公共代码库中.
每一个 commit  不允许出现影响代码库的结果(如语法不正确).
CI: develop 分支的 commit

##### 持续交付
如果达到质量指标或到了交付日期, 就自动创建并交付软件的版本.
通常先在测试系统中交付.
CD: main 分支的 commit

##### 持续部署
开发版本在很短的时间内从开发环境转移到生产环境, 在那里进行测试.

##### DevOps
development + operation

#### CI/CD Pipeline
持续集成, 交付和部署的附加步骤在技术上是通过 CI/CD Pipeline 实现的.
![[attachments/Pasted image 20221214144718.png|350]]

开发团队可以通过 CI/CD Pipeline 快速得到反馈.

#### CI/CD 对开发的影响
- 系统架构必须允许 CI/CD
- 必须有集成和测试框架
- 需要对模块, 构建周期等进行设计
- 每个版本的功能范围必须被定义并定期测试


## Version Controll System(VCS)

### Git
[[permanent/Git]]

## UML

### 类图
[[permanent/UML 图#Class Diagram]]
- 类图可以用来展示一个类的静态模型

### 状态图
[[permanent/UML 图#State Diagram]]

### 活动图
[[permanent/UML 图#Activity Diagram]]

### 序列图
[[permanent/UML 图#Sequence Diagram]]

### 协作图
[[permanent/UML 图#Communication Diagram]]

### 用例图
[[permanent/UML 图#Use-case Diagram]]

## OOAD
Object Oriented Analyse and Design

### 软件设计流程模型
• Anforderungen erfassen [[#捕获需求]]
• Analyse-Objekte finden [[#识别分析对象]]
• Aufgaben verteilen 分配任务
• Klassen strukturieren [[#结构化类]]
• Schnittstellen spezifizieren [[#指定接口]]
• Verhalten festlegen 定义行为
• Komponenten zusammenstecken 组装组件
• System implementieren 实现系统
• Modularisie [[#模块化]]

### 说明
- 以用例为中心来设计, 在文档中指出每个类所贡献的用例会使得代码结构变得清晰
- 如果某一内容有些复杂, 用合适的图模拟它

### 捕获需求
1. 通常自然语言(不推荐), 表格, 枚举的合适的方法*描述需求*, 
2. 建模
    - 通过 [[permanent/UML 图#Use-case Diagram|用例图]] 描述*操作*与其*参与者*
    - 通过 [[permanent/UML 图#Activity Diagram|活动图]] 描述*行为*流程
3. 需求分析的结论应该是所有应用程序和它们之间的关系的表格化概述
    - ![[attachments/Pasted image 20230219153035.png|L|300]]

- 例子: 一个`会议`流程
    - ![[attachments/Pasted image 20230219150044.png|L|300]]
    - ![[attachments/Pasted image 20230219145949.png|L|300]]

### 分析

#### 识别分析对象
- 面向对象的软件设计, 识别对象是重要的任务
- 在捕获需求后, 从其中的某一个对象入手, 不必一次理清所有对象, 在分析过程中会慢慢补全

#### 结构化类
- 可以借助 [[permanent/CRC 卡片]]

#### 分配责任
- 将用例/CRC卡片中的职责分配到具体的类
- 关联协作类, 这里可以用 [[permanent/UML 图#Communication Diagram|协作图]] 疏理协作行为的顺序


### 设计

#### 分析类到设计类
- ![[attachments/Pasted image 20230222205911.png|L|400]]
- 分析对象 -> (多个)设计类/软件解决方案
- 为什么会分? 有时候实现某些需求, 结构, 或者设计模式上的安排
- 但设计类的职责边界是明确的

#### 指定接口
- 借助 [[permanent/UML 图#Interaction Diagram]] 交互图来分析
- 这一步与分析类到设计类应该是并行的, 一边是类的设计, 一边是类与类连接的设计

![[attachments/Pasted image 20230222211428.png|L|400]]

#### 设计细节
- 根据使用的编程语言的特性

### 实现
- 定义类
- 实现方法

### 模块化
- 模块应该是自成一体的, 在没有外界信息的情况下能够被理解
- 高内联: 模块内组件都是为同一个任务工作, 应该能访问共同的数据结构和方法
- 低耦合: 模块之间的依赖和联系应该减少
- 在开发过程中, 各模块独立地设计, 实施和测试

## 设计模式

### 熟练
- Singleton
- Adapter
- Composite
- Proxy
- Observer

### 了解
- Abstract Factory
- Factory Method
- Iterator
- State
- Template Method
- Visitor

## Project Management
- 目标: 如果让一个(软件)项目成功

#### Grundbegriff

##### 项目应当
- 明确的任务定义 
- 与公司的运营任务相区别 
- 明确的开始和结束日期 
- 独特和新颖，即创新，该任务以前没有以这种形式进行过 
- 对资源的竞争 
- 往往对公司的存在或至少是增长至关重要 
- 高风险

##### 任务的分类
- ![[attachments/Pasted image 20230228103258.png||L|400]]
##### 项目的分类
- Entwicklungsprojekte, z.B. Strategie- oder Innovationsprojekte sowie Eigenentwicklungen 开发项目
- Wartungsprojekte  维护项目
- Organisationsprojekte (Evaluations- und Ausführungsprojekte, z.B. System- einführungen)  组织项目
- Unterstützungsprojekte  支持项目
- Versuchsprojekte, z.B. Prototypen für spätere komplexe System 试用项目

##### Magisches Dreieck des Projektmanagement
- 项目的 Volumn 由三个因素决定:
    - 时间
    - 目标
    - 资源
- ![[attachments/Pasted image 20230228110402.png|L|300]]

##### 「管理」意味着
- 广义上的指导
- 总是包含责任

##### 项目管理
- 制定流程, 规范
- 任务分配
- 技术选型
- 定义好的方法和程序
- ...

#### Krisen- und Konfliktmanageme

##### 项目负责人的任务
- 尽管有最谨慎的时间估计，但在IT项目中，巨大的最后期限压力会一再出现在项目组身上。并非所有的员工都能应对这些压力，有时很难估计原本头脑冷静的员工的反应。正是在这些危急情况下，需要项目负责人的个性，他必须以他的能力、冷静和全局性来**促进局势的缓解**(Deeskalation der Situation beitragen)。最重要的是，他**必须表现出他 "控制住了事情"**(„die Angelegenheit im Griff hat")。有许多关于冲突管理的理论讨论，其中一些是作为例子给出的。

##### 权衡冲突的策略
- Gewinner-Gewinner 策略：通过讨论、权衡和重新制定并调整对立的意见，寻求合作策略，即共同的解决方法。其目的是协调对手的需求。
- 赢家-Verlierer策略：一方的收益成为另一方的损失，或者反之亦然。在这种情况下，一种意见被强制执行。
    - 由于*时间限制*，这种策略经常被使用。
    - 谈判者必须运用他的外交技巧来消除与失败者之间仍然存在的分歧。这通常是通过过度强调解决方案的积极方面来实现的。
- 失败者-失败者策略：没有一方获胜。没有人实现他们想要的东西。
    - 找到一个折中的解决方案，通常是所谓的 "懒惰的妥协"。
    - 在这种情况下，解决方案对任何一方都不公平，往往人际关系问题甚至没有得到解决，而只是被推迟了。

##### 冲突的主要来源
- Meinungsverschiedenheiten über terminliche Prioritäte

#### Allgemeines Vorgehen, Ablauf- und Terminplanung

##### Begriff
- Projektabwicklungs-Zyklen 项目完成周期

##### 项目主要阶段
- Phase 1 – Initialisierung: 
    - Anforderungsanalyse 需求分析
    - Lösungsauswahl 解决方案选择
    - Projekt- klassifizierung 项目分类
    - Projektbeantragung  项目申请
- Phase 2 – Definition: 
    - Projektbeauftragung 分配
    - Erstellung Gesamtprojektplan 总体计划
    - Festlegung Projektorganisationsform 组织形式的定义
    - Kick-off-Veranstaltung 启动活动
    - Projektstart- sitzung  启动会议
- Phase 3 – Planung: 
    - Planungsarten 
    - Planungsinstrumente 规划工具
    - Planungszuständigkeit 规划责任
    - Planungszeitpunkt
    - Planungsentscheide  
- Phase 4 – Vorgehen
    - inkrementelle, konzeptionelle, empirische und evaluative Vorgehensmodelle insbesondere für Multiprojekte  
- Phase 5 – Kontrolle:
    - Kontrollzeitpunkt
    - Kontrollsichten
    - Kontrollverfahren
    - Kontrollprozess
    - Kontrollberichte  
- Phase 6 – Abschluss: 
    - Projektabnahme 验收
    - Projektabschlussbeurteilung 最终评估
    - Projektabschlussbericht
    - Erfahrungssicherung 
    - Einführungsnachbearbeitung 跟踪
    - Projektauflösung 项目解散

##### 九个计划步骤
1. Abwicklungszielplanung  
2. Projektstrukturplanung zur Gliederung und Abgrenzung von Aufgaben  
3. Ablaufplanung  
4. Einsatzmittelplanung  
5. Projektorganisationsplanung  
6. Kostenplanung  
7. Terminplanung  
8. Projektbudgetplanung  
9. Dokumentationsplanung

1.项目结构规划 2.用于构建和划分任务 3.顺序规划 4.资源规划 5.项目组织规划 6.成本规划 7.进度规划 8.项目预算规划 9.文件规划

- Critical Path Method

#### GANTT- und PERT-Diagramm
- 关键路径: 一系列 Arbeitspaketen, 其中节点时间延长会导致整个项目的工期延长
- ![[attachments/Pasted image 20230228231454.png|L|400]]

##### Gantt
- 甘特图是 Balkendiagramm 的最简单形式。它是以其开发者美国人亨利-劳伦斯-甘特命名的。在甘特技术中，单个过程根据其持续时间和最早的开始和结束日期沿时间轴以水平线表示。
- 该技术的缺点是，当有几个任务时，条形图会变得很混乱，因为个别任务和它们的缓冲时间之间的关系不能直接可视化。
- ![[attachments/Pasted image 20230228111246.png|L|400]]

##### PERT
- Program Evaluation and Review Technique
- 用来规划项目
- 事件节点网络, 显示事件顺序的依赖性
- ![[attachments/Pasted image 20230228111539.png|L|400]]
- 项目时间估算
    - ![[attachments/Pasted image 20230228112101.png|L|400]]

#### Aufwandsschätzung in IT-Projekte

##### 影响因素
- 数量
- 复杂度
- 质量
- 参与者的经验与技术水平
- 使用的工具和编程语言
- 估计期限

##### 具体估算方法
Eine weitere Separierung von Vergleichsmethoden erfolgt in die Analogie- und in die Relationenmethode, von algorithmischen in die Gewichtungs- und in die Stichprobenmethode und schließlich von den Kennzahlenmethoden in die Multiplikatoren- sowie in die  
Prozentsatzmethode.  

#### Gründe für das Scheitern von IT-Projekten und Erfolgsfaktore

##### 影响项目成功的因素
![[attachments/Pasted image 20230228182836.png|L|300]]
- Top-Management Engagement
    - 高层表现出承诺和关注
    - motivierend
- Nutzer-Einbeziehung
    - 用户参与开发
- erfahrene Projektleitung
    - 项目管理者有经验
- Umternehmensstrategie
    - 公司战略
    - 项目目标和重要性都来源于公司战略
- überschaubare Projektgröße
    - 项目后期所需要的成本是很难估计的
    - 项目越大也越难估计
    - 执行中最困难的就是遵守预算和时间安排
- Standardisierte Software Infrastruktur
    - 为了不分散精力
- Anforderungsmanagement
    - 需求管理, 也就是进度管理
    - 需求很可能是变化的
- Standardisierte Projektablauf
- zuverlässige Aufwandschätzung
    - 后期的估算才可能准一点
- 其他
    - 预先准备补救方案
    - ...

##### 为什么会失败
- 项目没有被专业地执行, 比如说没有设置 Milestone(小项目可能没事, 但大项目很容易混乱)
- 缺乏合格的工作人员, 尤其是项目经理
- 没有可预期的利益

##### 为什么软件项目管理比工程管理要难
- Immaterialität: 难以追踪进度 nicht exakt nachvollziehbar
- 理解尚浅: 应用开发的历史可能只有30年
- 技术的独特性: 旧经验可能阻碍发展

##### 项目的结果
- Erfolgreich: 功能和素质达标, 按时完成, 在预算内
- Gefährdet: 阉割了, 或者超时或者超预算
- Gescheitert: 失败/被叫停

#### Risikomanagemen

##### 分类
- 直接风险: 可以清楚识别的
- 间接风险: 隐藏的

##### 主要风险来源
- 商业风险 Geschäftliche: 
    - 比如竞争对手的项目提前投放. 可能应对: 发布先行版
    - 财务支持减少
- 技术风险
    - 使用的技术是否稳定/经过考验
    - 本项目是否依赖另一个项目

##### 风险级别
- Allgemeine Risikoklassen  
- Spezifische Risikoklassen bei internen Projekten  
- Spezifische Risikoklassen bei der Produktentwicklung

#### Meilenstein

##### Release
- Release 不一定是一个成品
    - interne Release: 开发团队内部发布的 release, 通常是到达一个 Milestone
    - externe Release: 交给客户的 Release, 通常有更高的质量指标

##### 四种主要的 Milestone
- Life-cycle Objective(LCO)
    - beendet die **Konzeptualisierungs**
    - 检查: 项目的*范围, 时间, 预算, 风险, 用例已经双方确认*
    - 检查: 用例模型的基本框架完成
- Life-cycle Architecture(LCA)
    - beendet die **Entwurfsphase** des Rational Unified Process
    - 检查: 设计符合客户期望
    - 检查: 用例模型 80% 完成
- Initial Operational Capability(IOC)
    - beendet die **Konstruktionsphase** des Rational Unified Proces
    - 检查: 产品稳定, 预算稳定, 用户手册足够
- Product Release
    - Produktrelease einer individuellen Lösung: 交付的是单个解决方案, 则核算成本与客户的需求
    - Release eines Produktes, das großflächig verteilt wird: 交付的是大规模分发的产品, 则还需要考虑销售方案

## Process model
- Vorgehensmodell
- Wie werden welche Phasen im Projekt umgesetz? 每个阶段在项目中是如何实施的
- e.g. 抽象程序模型--收获：1.收集收获物 2.分类/组织 3.准备 4.包装
- 描述了一个项目的组织结构和过程组织

#### 什么是 过程模型
- ![[attachments/Pasted image 20230228213240.png|L|400]]
- 描述了
    - Aufbau-organization: 项目结构, 人员的任务
    - Ablauf-organization: 什么阶段要做什么

##### Def. Vorgehensmodell
- Ein Vorgehensmodell beschreibt systematische, organisatorische, ingenieurmäßige und quantifizierbare *Vorgehensweisen*, um Aufgaben einer bestimmten Klasse wiederholbar zu lösen.

#### 德国的情况
- 地区特点似乎也在发挥作用，例如通过在国家层面上对标准程序模型的规范\[39, 64]。这方面的一个例子是V-Modell XT与Scrum的结合，这在德国很常见\[39]。*V-Modell XT*（见第3.3节）提供了组织框架，并在基本层面上描述了项目及其与周围组织的接口（例如，需求分析、合同设计、客户/承包商沟通或验收），而*Scrum*（见第3.4节），通常与特定的敏捷实践相结合，为软件开发中的具体程序提供了基础

#### 过程模型的主要类型

##### Phasenorientierte Modelle und sequenzielles Vorgehen
- 每一个阶段以一个确定的状态结束, 检查, 再"流"向下一个阶段
- 典型的比如 瀑布流模型(Waterfall)
- 优点: 清晰的进度, 简单的结构
- 缺点: 灵活性差, 大修改会导致整个流程重来; 
- 适用于低风险的项目，在这些项目中，需求和期望的解决方案从一开始就比较明确，并且在项目过程中只需要进行少量的修改就可以了

###### 瀑布流模型 
经典的瀑布模型中使用了以下几个阶段。
    - 分析和需求征询 
    - 架构设计 
    - 实施 
    - 验证和集成 
    - 运行和维护
    
##### Iteratives und inkrementelles Vorgehen
- 在迭代法中，有一组标准活动在每个迭代中重复进行，如代码构建测试。
- 在增量方法中，首先实现了一个具有有限功能范围的系统核心。随着项目的进展，这个核心被逐渐扩大和完成。
- 已实现的系统部分（模块、组件和整个子系统）必须在一定程度上是可持续集成和可运行的。如果有必要，必须提供替代或虚拟对象

###### Spiral Model
- Boehm的螺旋模型[15]是最著名的早期迭代/增量方法的代表之一。它的目的是通过创造不断发展的原型来最小化项目风险
- 四个(重复进行的)步骤
    1. analyse
    2. evaluation
    3. realization
    4. planning
- ![[attachments/Pasted image 20230228222019.png|L|400]]

##### Prototyping
- 原型 是一个具体的探索或演示对象
- 好处
    - 任务变得具体
    - 风险, 关键点更容易识别
    - 为开发提供基础
- 原型的类型
    - Demonstrator: 展示潜在的发展方向
    - Labormuster: 用来调查某些可行性
    - Pilotsystem: 参与验收测试用

##### Agile Vorgehensweisen
- 敏捷方法的核心组成部分是早期进入编码、强大的用户参与、持续的测试和进一步的架构发展
- 基于可执行代码的快速反馈回路

###### 敏捷价值观/ Manifest Agile Developing
- Individuals and interactions over processes and tools
- Working software over comprehensive documentation
- customer collaboration over contract negotiation
- responding to changes over following a plan

###### 敏捷开发实践
- refactoring
- pair programming
- DevOps
- [[permanent/测试驱动开发 Test-Driven Devlopment|TDD]]
- Behavior-Driven Development(BDD)
- Collective Code Ownership

#### V-Model XT
- 产品导向
- 与敏捷程序还是有区别的：V-Modell XT的规划性更强，因为必须始终保持对整个项目的关注
- ![[attachments/Pasted image 20230228224202.png|L|500]]

#### Scrum

##### 角色
- Product owner
- 开发团队
- scrum master

##### Scrum Artefacts
- Product Backlog 包含软件的所有已知需求（到相应的时间点）。由产品所有者创建和维护 
- Sprint Backlog 由项目团队创建，通过选择产品Backlog的内容来反映一个冲刺的目标。在一个Sprint期间，Sprint Backlog不会被新的条目所扩展 
- Release 每个Sprint结束时都有一个可交付的Release，通常由客户测试。请注意，在官方的Scrum指南\[59]中，使用了 Product Increment 这个术语。一个增量在指南\[59]中被描述为 "产品积压中所有条目的总和"，这些条目应该被完成并可能被使用。然而，为了与软件开发项目中的核心任务所使用的术语保持一致（见第1.3章），我们只使用 Release 这个术语。
- Sprint 是Scrum流程模型的核心要素（图3.10）。它以时间框的形式描述了一个迭代（Scrum规定每个冲刺最多只能有30个日历日[58]）。

##### 具体操作
- Daily Scrum
- 回答
    1. 从昨天开始，我为实现Sprint的目标做了什么？
    2. 为了实现冲刺目标，我明天要做什么？
    3. 什么阻碍了我的工作？
- ![[attachments/Pasted image 20230228230020.png|L|500]]

##### 方法和实践
- ![[attachments/Pasted image 20230228225715.png|L|500]]

#### 敏捷开发的要求

##### 需求征询
- 需求是在项目过程中逐步定义的
- 轻而灵活, 随时准备被改变
- ![[attachments/Pasted image 20230228230518.png|L|500]]

##### User Story
- Schema: As WHO I want WHAT so that WHY
- ![[attachments/Pasted image 20230228230631.png|L|500]]

## Architecture

#### Begrifflichkeite

##### Def. Architecture
Architecture is defined \[...] as the fundamental organiza-  
tion of a system, embodied in its components, their rela-  
tionships to each other and to the environment, and the  
principles governing its design and evolution.

#### Architekturprinzipien
- 这些原则的目标通常是
    - 可维护性
    - 清晰的代码结构
    - 避免错误的调用和修改

##### K.I.S.S.  
- keep it simple and stupid

##### Kopplung niedrig halten, Kohäsion verstärken  
- 系统应低耦合, 高内聚
- 一个系统的*耦合程度*是指系统内各组件互相依赖的程度
- 一个系统的*内聚程度*描述了一个系统的组件、类甚至单个方法的内部一致性程度

##### Kapselung und Information-Hiding
- 从系统的外部视图不应该看到其实现细节
- 封装, 即通过接口和信息隐藏原则, 以实现内外分离

##### Separation of Concerns
- 如果可能的话，不同的方面不应该混合在一起，以减少任务的复杂性

##### Teile und Herrsche  
- 模块化和分解

##### Design by Contract
- 接口描述在用户和接口的实现者之间形成了一个契约（见4.6.1章）。用户依赖于接口中指定的行为，实现者则保证接口的实现
- 契约式设计的主要目的是希望程序员能够在设计程序时明确地规定一个模块单元（具体到面向对象，就是一个类的实例）在调用某个操作前后应当属于何种状态。
- 契约式设计强调三个概念：前置条件，后置条件和不变式。

#### Architekturmuster

##### 架构模式的分类
- Systemstruktur
- Interaction
- Verteilung
- Adaptivität

###### System structure
- 组件要被巧妙地组织起来，系统的整体功能要适当地分布在各组件之间。
- e.g. [[#Pipes-and-Filters]], Layer architecture

###### Interaction
- 这一类的模式主要是组织用户与系统之间或系统之间的交互
- e.g. [[#MVC]](Model-View-Controller)

###### Distribution
- 这一类的模式主要解决分布式资源的组织问题, 这涉及到网络中服务的提供和使用
- e.g. [[#Client-Server]], Service-oriented

###### Adaptation
- 这类模式主要支持系统在扩展性和适应性方面的灵活性，例如，在系统运行时动态加载特定情况的组件
- e.g. Dependency Injection, Micro Kernel

##### Pipes-and-Filters
- ![[attachments/Pasted image 20230228211337.png|L|400]]

##### MVC
- ![[attachments/Pasted image 20230228211400.png|L|400]]
- ![[attachments/Pasted image 20230228211505.png|L|500]]

##### Client-Server
- ![[attachments/Pasted image 20230228211556.png|L|500]]

#### S.O.L.I.D

##### Single-Responsibility Principle
- 单一的类或模块应该只有一个任务

##### Open-Closed Principle  
- 对扩展开放: 原有的行为在细化后保持完整并可访问
- 对修改封闭: 原有行为不被修改
- e.g. IShape 和新的形状类

##### Liskov’sches Substitutionsprinzip
- 一个类必须可以被由它派生出来的精炼的子类所替换

##### Interface-Segregation Principle  
- 接口隔离原则（ISP）规定不应强迫客户端依赖它不使用的方法
    - 解释一下, 比如一个 Car 类实现了 Drive 和 Repair 两个抽象接口, 那么 Drive 就应该只能调用 car.drive()
- 旨在使系统分离，从而更容易重构，更改和重新部署

##### Dependency Inversion
- "高"层的组件不应该直接依赖于"低"层组件的实现(而应该依赖抽象)
    - ![[attachments/Pasted image 20230228203147.png|L|400]]
