---
title: Resume draft
date: 2025-01-27
tags:
---

罗锘恒
#### 教育经历
**慕尼黑大学** 德国慕尼黑   2019.4 - 至今

主修: 计算机科学, 辅修: 计算机语言学     成绩: 1.7/1.0
#### 工作经历
**系统编程实习生(校内)** | 慕尼黑大学
- 大同棋游戏客户端开发: 开发了一款基于 Windows 原生 API 的大同棋客户端，具备简单的人机对战智能和多人在线对战功能。
    - 基于 **Socket 通信技术** 实现客户端与服务器的实时数据交互，支持多玩家在线对战。    
    - 利用 **共享内存 (Shared Memory)** 和 **信号量 (Signaling)** 实现多进程间的高效通信与资源协调，提升系统并发性能。     
    - 设计电脑玩家应对策略, 实现简单的**人机对战功能**.
    - 使用 **Git** 提高团队合作的效率。  

**软件开发实习生** | Zodiac Plus GmbH, 德国不伦瑞克
- 图片录入程序: 使用 **PaddleOCR** 模块开发球鞋入库程序, 通过扫描鞋盒上的条码和文字, 自动识别货号, 鞋码和颜色, 并录入到 .csv 文件中.
- 商业网站部署: 编写 **Docker-compose** 脚本, 将本地网站代码部署在 Docker 容器中. 使用 **Nginx** 代理网关兼容高并发情况.
- 产品展示后台: 使用 **SpringBoot** 搭建后台框架, 使用 **MySql** 数据库和 **Mybatis** 框架展示分页数据和实现数据的持久化.
- Excel 脚本编写: 在保密限制的电脑上编写 **VBA** 脚本处理超过十万行的 Excel 数据.
#### 项目经历
**电影评论情感分析模型**
- 开发了一个基于深度学习的电影评论情感分析模型，能够对输入的文本段落进行情感二分类（正面/负面）
- 使用 **NLTK** 库对**预处理**输入, 而后使用 **Word2Vec** 转换为适合模型输入的词向量.
- 使用 **Keras** 构建一个基于**双向 LSTM** 的多层神经网络模型，用于文本分类。
- 使用 **Binary Crossentropy** 作为损失函数，优化模型参数。
- 通过监督学习训练模型，并在验证集上评估性能，最终达到 85% 的分类准确率。

**基于 OpenAI 的概念学习助手**
- 开发了一款基于 OpenAI API 的多轮对话 AI 助手，旨在帮助用户快速理解和掌握复杂概念。用户输入某个概念后，AI 会提供该概念的定义，并通过正例和反例辅助用户理解，最后生成练习题以检验用户的掌握程度。
- 通过 **Prompt Engineering** 技巧设计提示词，确保 AI 按照指定格式和顺序输出内容。
- 使用 **Streamlit** 框架搭建轻量化的网页端 UI，提供友好的用户交互界面, 引导用户完成从概念解析到练习巩固的完整学习闭环。


Nuoheng Luo

nuohengluo@outlook.com | 13268879015 | Dongguan, Guangdong

#### **Education**

**Ludwig Maximilian University of Munich (LMU)**  
_Munich, Germany | Apr 2019 – Present_

- **Bachelor of Science in Computer Science** (Major)
    
- **Minor in Computational Linguistics**
    
- **GPA**: 1.7/1.0 (German grading scale: 1.0 = highest, 5.0 = fail)
    

---

#### **Work Experience**

**Systems Programming Intern (On-Campus)** | _Ludwig Maximilian University of Munich | Oct 2022 – Jan 2023_

- **Quarto Game Client Development**:
    
    - Developed a **Windows Native API-based Quarto game client** with single-player (AI) and multiplayer modes.
        
    - Implemented real-time multiplayer functionality using **Socket communication**, enabling synchronized gameplay across clients.
        
    - Optimized inter-process communication via **Shared Memory** and **Semaphores**, reducing latency by 30% in concurrent operations.
        
    - Designed AI decision-making logic for computer opponents using heuristic algorithms.
        
    - Collaborated with a 4-member team using **Git**, achieving 95% code integration efficiency.
        

**Software Development Intern** | _Zodiac Plus GmbH | Braunschweig, Germany | May 2024 – Aug 2024_

- **Shoe Inventory Automation**:
    
    - Built a Python-based OCR pipeline using **PaddleOCR** to extract shoe metadata (SKU, size, color) from images, achieving 98% accuracy.
        
    - Automated CSV data entry, reducing manual processing time by 70%.
        
- **E-commerce Platform Deployment**:
    
    - Containerized a SpringBoot-based product showcase platform using **Docker-compose** and **Nginx**, handling 1k+ concurrent users.
        
    - Implemented pagination and data persistence with **MySQL** and **MyBatis**, improving query response time by 40%.
        
- **Data Processing Automation**:
     
    - Developed **VBA scripts** to clean and transform 100k+ row Excel datasets under strict security constraints.
        

---

#### **Projects**

**Movie Review Sentiment Analysis Model**

- Engineered a **bidirectional LSTM** model using **Keras** to classify movie reviews as positive/negative with **85% accuracy**.
    
- Preprocessed text data via **NLTK** (tokenization, stopword removal, stemming) and converted to embeddings using **Word2Vec**.
    
- Optimized training with **Binary Crossentropy loss** and Adam optimizer, reducing validation loss by 22% over baseline models.
    

**OpenAI-Powered Concept Learning Assistant**

- Developed a multi-turn dialogue AI using **OpenAI API** to explain complex concepts through definitions, examples, and quizzes.
    
- Designed structured prompts via **Prompt Engineering** to enforce consistent JSON output formatting.
    
- Built an interactive web UI with **Streamlit**, serving 500+ weekly users during beta testing.
    

---

### **Technical Skills**

- **Proficient**: Python, C, Java, SQL, Git, Docker, Nginx, MyBatis, Windows API
    
- **Familiar**: TypeScript, Haskell, VBA, Shell Scripting, C++, C#, SpringBoot, PaddleOCR
    
- **Tools**: PyCharm, VS Code, MySQL Workbench, Jira

---