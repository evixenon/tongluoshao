---
title: "lmu - Syntax of natural language(Germany)"
date: "2023-06-16"
---


## Introduction

使用: [[permanent/Jupyter Notebook]]


#### Programmsysteme
具体的使用方法都会放在各自页面
- [[permanent/NLTK]]
- [[permanent/spaCy]]
- [[permanent/Standford Parser]]

#### Grammatikformalismus

1. CFGs
	- 组成结构
	- 语法结构可以用树的**节点**表示出来
	- PCFG(优势: 多 position 词歧义分辨)
	- FCFG(优势: 屈折)
2. Dependcy grammar
	- 描述 tokens 间的关系
	- 语法结构可以用树的**边**表示出来
3. Chunk Parser
	- 部分语法分析
	- 扁平结构(flache), 非层次型结构

CFGs ->
- PCFGs: Probabilistische CFGs, 用于解决语义分歧问题(同一语法多种含义)(Anbiguity)
- FCFGs: Feature-based CFGs, 用于解决过生成

##### Overgeneration
(CFG语法规则产生的不合实际语法的句子)(Übergenerierung)

### 复习资料
[[wdh-aufgaben-01-solution.pdf]]
[[wdh-aufgaben-02-solution.pdf]]
[[summaries.pdf]]

### 工具
- 在线语句结构分析: https://corenlp.run/
## Syntax Analyse
Konstituenz vs. Dependency

### Syntax
Satz wohlgeformt?

#### Syntax 定义
Syntax: Satzstruktur
Morphologie: Wortstruktur
Phonologie: Lautstruktur

Syntax~Morphologie: oberhalb der Wortebene
Syntax~Semantik&Pragmatik: unabhängig von semantische Interpretation

#### 句子组成成分
- Wortstellung(SVO Subject 那些)
- Kausus 格
- Kongruenz 词尾

#### 相关定义

##### Wohlgeformtheit
指一个语句的结构符合(指定) formalen Grammatik 的规则

##### Syntaxbaum
- auch: Parsebaum, Ableitungsbaum
- 层级结构的数学表达方式

##### Klammerausdruck
( S ( N Hund ) ( VP ( V jagt ) ( N Katze ) ) )

##### Gerund
指的是动词的各种形态, 简写 G, e.g. VBG

### Relationtype
- =modellierte Relation
- 也是两种常用的句子结构分析方法

#### Konstituenten-Struktur
- syntagmatische Satzanalyse, 和 [[#Dependenz-Struktur]] 相对, 是一种 Relationtype
- Phrasenstuktur

##### Konstituente
- Bestandteil einer syntaktische Struktur
- e.g. NP, VP, Det
- Konstituente $\in$ Phrase

##### CFG
S -> NP VP
NP -> Det N
Det -> "die" | "den"
N -> "Katze" | "Hund"

- keine Disambiguierung
- [[project/lmu - Syntax of natural language(Germany)#Overgeneration|Übergenerierung]]

#### Dependenz-Struktur
- Abhängigkeitsstruktur
- Funkionale Satzanalyse
- syntaktische-Beziehung?


### Auomatische Syntaxanalyse

语法分析方法分类
1. 描述语言系统(教科书)
2. 穷举符合语法的句子
3. 用规范语法(formale Grammatik)描述

#### Formal Grammar
- de. formale Grammatik
- Syntaxmodelle
- Formale Regelsystem zur eindeutigen Beschreibung und Erzeugung einer formalen Sprache
- 会生成 [[#Wohlgeformtheit|wohlgeformten]] Satz
- e.g. NP -> N

**Produktionsregel**
- Startsymbol
- links -> rechts

##### Formale Sprache
*Menge* aller aus Grundsymbolen ({a, b}) mit den Grammatikregeln ableitbaren formalsprachliche *Wörter* ({a, aa, ab, ...})

##### Präterminale
Wortarten, lexikalische Kategorien, e.g. DET, N

##### Komplexität der Grammatik(Chomsky-Hierarchie)
= regular/kontextfrei/kontext-sensitiv/rekursiv aufzählbar

##### Analysetiefe der Grammatik(Rekursion?)
= flach/verschachtelt

#### Parsing als automatische Syntaxanalyse

**Aufgabe**
- Strukturkennung 结构识别: 句子是否符合语法/是否有一种符合规则的推导
- Strukturzuweisung 结构分配: 重现找到的语法推导

#### Ambiguität
Disambiguität -> PCFG

##### strukturelle/syntaktische Ambiguität (PP-Attachment Amb.)
I shot an elephant in my pajamas

##### Koordinierungsambiguität
alte Männer und Frauen

##### Temporale Amb(Garden-Path-Sätze)
the old man the boat
实际上会有一种正确的解读 (man v. 操作)

#### Rekursive Regeln
center-embedding: mindestens kontextfreie Grammatik

#### Non-projektive Strukturen(in CFG)
- auch: diskontinuierliche Strukturen, long distance dependencies
- ![[attachments/Pasted image 20221104225507.png]]

#### Parsing in NLP
- Sentence Segmentation 
- Tokenisierung 
- Part-of-Speech-Tagging 
- Stemming
- morphologisches Parsing (Kasus, Agreement)

![[attachments/Pasted image 20221104225746.png]]
![[attachments/Pasted image 20221104225755.png]]


## Syntaktische Kategorien

### 分析规则

##### Syntagmatische vs. Paradigmatische Dimension

###### Syntagmatische Dimension
- lineare Kombinierbarkeit
- 在这个层面的分析方法: Segmentierung

###### Paradigmatische Dimension
- vertikale Austauschbarkeit
- 在这个层面的分析方法: Klassifizierung

##### Phrasenstrukturregeln
- e.g. S → NP VP, VP → V
- 解决用传统方法分析 句子结构少的问题

###### Syntaktische Regeln
- e.g. S -> NP
###### POS-Satzschemata
- 描述句式, S 开头的,  e.g. S → DET N V
###### Lexikalische Regeln
- 指向 terminal, e.g. DET -> 'the'

### Konstituententests
- zur **Feststellung** syntagmatischer Einheiten (Konstituenten)
- Hauptkriterien: Ersetzbarkeit und Verschiebbarkeit unter Erhalt der Grammatikalität

#### Substitutionstest
- =Ersatzprobe, 这个部分能换成别的吗, 能的就是(指换了之后保持语法正确)
- 把一个或多个单词整体替换成一个比如说代词, 来确定它是不是一个整体 Konstituent

e.g. 
**Der Junge** verkauft **die Äpfel des Bauern**.
Er verkauft sie.

#### Permutationstest
- 这个部分能移动吗
- 还能解决歧义(吗)
![[attachments/Pasted image 20230202150743.png|L|400]]

#### Eliminierungstest
- =Weglassprobe, 这个部分能删掉吗

e.g.
Der Junge verkauft die Äpfel des Bauern.
Der Junge verkauft die Äpfel. 


#### Koordinationstest
- 能用 and/or 之类的连词接上其他同类成分吗
- 适用于分析短语, 分析复杂结构

![[attachments/Pasted image 20230202151338.png|L|500]]

### Lexikalische Kategorien

##### Wort
atomare syntaktische Einheit

##### Wortart
具有相同属性的一类词, 也是 pre-terminal Konstituenten

#### 通过 Morphologische Kriterien 分辨

##### Flexionsparadigmen
同类词词尾的变化(有些)具有同样规则, 如名词复数加en, 动词词尾加t

##### Derivationsmorphologie
同类词 转变词类时的变化形式相同, 如 adj. → adv. 加ly

#### 通过 Syntaktische Kriterien 分辨

##### 位置 Distribution 分辨法
例如 形容词常常在 DET 和 NOUN 中间

##### 词态变化 分辨法
例如 分辨 Präposition vs. Konjunktion, 一个是接二格, 一个是接一格

##### syntaktische Funktion 分辨法
通常
- Prädikat: Verb  
- Subjekt/Objekt: Nomen  
- Adverbial: Adverb  
- Attribut: Adjektiv
但实际上, 词的取决于语言和语境

#### 通过 Semantische Kriterien 分辨

##### 语义分辨
- Verb: bezeichnet Zustände, Vorgänge, Tätigkeiten, Handlungen (Sachverhalte)  
- Nomen: bezeichnet Lebewesen, Sachen (Dinge), Begriffe (Abstrakta), Individuen  
- Adverb: bezeichnet nähere Umstände von Sachverhalten  
- Adjektiv: bezeichnet Eigenschaften und Merkmale von Sachen

##### Auto- vs. Synsemantika 
Inhaltswörter 内容词：独立的词汇意义；句子的一部分(起短语中心的作用)
Funktionswörter 功能词：语法意义(取决于参考词)

##### offene vs. geschlossene Klassen
开放类: 就是可能会拓展新词的词类, 如名词
闭合类: 就是不会再拓展的, 如连词

#### Deutsche Wortarten

##### Nomen
- NOUN, NN, N
- bezeichnet Lebewesen, Sachen (Dinge), Begriffe (Abstrakta), Individuen  
- offene Klasse
- delinierbares Wort
- 子类: Substantive, Eingennamen(NNP), nominalisierte Adjektive

##### Verb
- VERB, VB, V
- bezeichnet Zustände, Vorgänge, Tätigkeiten, Handlungen (Sachverhalte)  
- offene Klasse
- konjugierbares Wort
- 子类: intransitive, transitiv, ditransitiv

##### Adjektiv
- ADJ, JJ
- bezeichnet Eigenschaften und Merkmale von Sachen
- offene Klasse
- deklinierbar und komparierbar

##### Adverb
- ADV, RB
- bezeichnet nähere Umstände von Sachverhalten  
- nicht flektierbares Wort
- modifiziert Verben, Sätze, Adjektive, und Adverbien

##### Pronomen
- PRON, PR
- deklinierbares Wort, das eine Nominalphrase vertritt (Proform)
- Nominale Begleiter und Proformen
- 子类: Personal-(PRP), Indefinit-, Demonstrativ, Fragepronomen

##### Determinative
- DET, DT
- geschlossene Klassen
- unflexierbares Wort
- Nominale Begleiter und Proformen
- 子类: bestimmt, unbestimmt, Quantifizierer, attributiv gebrauchte Pronomen(Possesiv-(PRP$), Reflexiv-, Demonstrativ-, Fragepronomen)

##### Präposition
- P, IN, APPR, APPO
- geschlossene Klasse
- bezeichnet Verhältnisse, Beziehungen
- Überbegriff: Adposition (ADP)
- Funktionswort

##### Konjuktion
- CONJ
- geschlossene Klasse
- bezeichnet Verknüpfungen im logischen, zeitlichen, begründenden, modalen u. ä. Sinn
- 子类: koordinierende (CCONJ) und subordinierende (SCONJ) Konjunktionen

##### Partikel
- PRT, RP
- geschlossene Klasse
- bezeichnet die Sprechereinstellung, -bewertung
- e.g. nicht, zu, sehr, doch, ja

### Syntaktische Kategorien
„Eine syntaktische Kategorie umfasst eine Menge von *sprachlichen Einheiten*, die *bestimmte Eigenschaften* gemeinsam haben und deren Eigenschaften *relevant* sind *für die Beschreibung syntaktischer Strukturen*.“ (Dürscheid)

#### Phrasenkategorien des Deutschen
以下说谁就是指谁是 Kopf 组成的短语

##### Phrasenschema NP
(DET | NP) (ADJP)* N (PP / NP / Relativsatz)*
![[attachments/Pasted image 20230202170232.png|400]]

##### Phrasenschema VP
(ADVP)* V

##### Phrasenschema ADJP
(ADV) (PP)* (PRT) ADJ
![[attachments/Pasted image 20230202170259.png|400]]

##### Phrasenschema ADVP
(ADV) (PRT) ADV
![[attachments/Pasted image 20230202170335.png|180]]

##### Phrasenschema PP
(ADJ/ADV/PRT) P NP
![[attachments/Pasted image 20230202170401.png|200]]

### Tagsets
tagset = Sammlung von Kategorienlabels

#### POS-Tagsets
- 是传统的词类分析方法
- 标示一个词可能的 Part of Speech

- Universal POS-Tagset: 17 tags, 在[[#Deutsche Wortarten|每个词类介绍]]的第一行的那些
- Penn Treebank POS-Tagset: 45 tags, 简化的 Brown Corpus POS-Tagset
- Brown Corpus POS-Tagset: 87 tags
- TIGER/STTS-POS Tagset: 53 POS-Tags(de.)

#### Syntaktische Tagsets

##### Konstituenten-Tagesets
- Penn-Treebank Constituent Tags (Stanford: english.pcfg)  
- TIGER Konstituenten Labels (Stanford: german.pcfg)  

##### Dependency-Tagsets  
- UD-Tagset (Universal Dependencies) (Stanford: en. DependencyParser)  
- TIGER-Dependencies (spaCy: dt. Modell)


## Konstituentenstruktur

### Konstituentenstruktur

##### Konstituenz
**Teil-Ganzes-Beziehung** zwischen sprachlichen Einheiten (Konstituenten)

##### unmittelbare Konstituenten
- = immediate constituents(IC)
- maximalen Konstituenten einer Einheit

##### mittelbare Konstituenten
- 一个 Konstituent 里可以拆分出的小成分

##### Dominanz
看图
![[attachments/Pasted image 20230203141442.png|L|500]]

##### Rekursive Kategorien
- → Nicht-Endlichkeit natürlicher Sprachen

###### direkte Rekursion
e.g. NP → DET N NP

###### indirekte Rekursion
e.g. NP → DET N PP, PP → P NP

#### Konstituentenstruktur
- Menge der durch die Relation der unmittelbaren Dominanz verbundenen Konstituenten
![[attachments/Pasted image 20230203141700.png|L|400]]

**Elemente der Struktur(Knoten)**
- **Wörter**: terminale Knoten
- **lexikalische** Kategorien: präterminale Knoten
- **syntaktische** Kategorien: nicht terminale Knoten → Phrasen

**Relationen(Kante)**:
- Teil-Ganzes-Beziehung
- Dominanz Beziehung

##### Kopf Perkolation(Phrasenstruktur)
昂, 在 Phrasen 结构里通常看 Phrasen 名字就行了, 如 NP 就是 N

#### Konstituentenanalyse
1. **Zerlegung** syntaktischer Einheit in ihre Teile (Konstituenten)  
2. Bildung von **Konstituentenklassen** (lexikalische und syntaktische Kategorien)  
3. Ermittlung über **Konstituententests**  
4. Ergebnis ist eine hierarchisch gegliederte Struktur

#### Satzschema

通常:
- S = NP + VP
- VP = VERB + Komplemente + Adjunkte
- NP = NOUN + nominale Adjunkte(Attribute)
- 上面这些规则不指示顺序, 仅类型
![[attachments/Pasted image 20230203143000.png|L|400]]

![[attachments/Pasted image 20230203145346.png|L|200]]

### Phrasenstrkturgrammatik(PSG)
- CFG 在 句子分析时的实际用法

#### PSG 的组成
- Startsymbol: S  
- Nichtterminalsymbole: NP, VP, DET, N, V  
- Terminalsymbole: ’der’, ’Hund’, ’schläft’  
- Produktionsregeln(Ersetzungsregeln): S → NP VP, NP → DET N, VP → V

#### Phrasenstrukturregeln des Deutschen
仅供参考, 要用看是看下面 [[#X-Bar Regeln|X'版]] 的 

##### Phrasenschema NP
(DET | NP) (ADJP)* N (PP / NP / Relativsatz)*
![[attachments/Pasted image 20230202170232.png|L|500]]

(DET) (ADJP)* N (PP)*

- NP → N | DET N  
- NP → ADJP N | DET ADJP N  
- NP → N PP | DET N PP  
- NP → ADJP N PP | DET ADJP N PP
 
- NP → ADJP NP  
- NP → NP PP
- NP → DET NP (?)
    - 不能在错误的位置重复 如 ADJP DET N

##### Phrasenschema VP
V + Komplemente + (Adjunkte)*
![[attachments/Pasted image 20230203151516.png|L|500]]
- VP → VP PP (rekursive Adjunkte)  
- VP → V (ohne Kompl. = intransitiv)  
- VP → V NP (1 Kompl. = transitiv)  
- VP → V NP NP (2 Kompl. = ditrans.)

##### Phrasenschema ADJP
(ADV) (PP)* (PRT) ADJ
![[attachments/Pasted image 20230202170259.png|L|400]]
- ADJP → ADJ  
- ADJP → PRT ADJ  
- ADJP → PP ADJ  
- ADJP → PP PRT ADJ  
- ADJP → PP PP ADJ

 (rekursive)
- ADJP → PP ADJP  

##### Phrasenschema ADVP
(ADV) (PRT) ADV
![[attachments/Pasted image 20230202170335.png|L|180]]
- ADVP → ADV
- ADVP → PRT ADV
- ADVP → ADV PRT ADV

##### Phrasenschema PP
(ADJ/ADV/PRT) P NP
![[attachments/Pasted image 20230202170401.png|L|200]]
- PP → P NP
- PP →ADJ P NP

#### Penn-Treebank 和 TIGER/NEGRA Korpus 的标注
Penn: 英语报纸语料库, 比较扁平的结构
![[attachments/Pasted image 20230203160639.png|L|500]]

TIGER: 重要的德语 Treebank
![[attachments/Pasted image 20230203160704.png|L|500]]

### X-Bar-Phrasenstrukturschema
X-Bar: $\bar{X}$(一开始), X'

![[attachments/Pasted image 20230203154022.png|L|400]]

##### phrasale Zwischenebene X'
- 在 Phrase内部 和 Kopf层 之间引入中间层 X'
![[attachments/Pasted image 20230203153515.png|L|400]]

##### Komplement
- = Ergänzung
- obligatorische Erweiterung, valenzgeforderte Erweiterung
- 组成 X'

##### Adjunkt
- = Angabe
- nicht-obligatorische Erweiterung 
- 在 X' 层

#### X-Bar Regeln

##### X-Bar NP Regeln
- NP → DET N'

- N' → ADJP N'
- N' → N' PP
- N' → N NP
- N' → N

##### X-Bar VP Regeln
- VP → V'

- V' → V' PP
- V' → V (intransitives Verb)
- V' → V NP (transitives Verb)
- V' → V NP NP (ditransitives Verb)

#### Adäquatheit einer CFG als Syntaxmodell
X-Bar 规则虽然限制了一部分 Übergenerierung, 但仍存在词态上的过度生成
- 如 Kasus 的问题: der Mann sieht des Kindes
- 如单复数

解决方法
- 再把有词态变化的词类细分(无疑会麻烦很多)
    - SgN, PlN, SgDET, PlDET...
- 通过 PCFG 选择
    - 允许过度生成, 然后不概率上不可能的句子删除

## Dependenzstruktur

### Dependenzstruktur

#### 定义

##### unilaterale Abhängigkeit
- 删了依赖方还保持语法正确
- e.g. eine (sehr) schwierige Aufgabe
- Rektion
- 在 Konstituentenstruktur 里是 Komplement

##### bilaterale Abhängigkeit
- 互相依赖, 不分依赖方和被依赖方, 删了哪一方都会破坏语法正确
- e.g. (Beantworte) den Brief/Beantworte (den Brief)
- Modifikation
- 在 Konstituentenstruktur 里是 Adjunkt/Attribut

##### Dependenzrelation
- Dependenzrelation <Y, X> 
- Y abhängig von X
- X kontrolliert/regiert Y, X ist Kopf/Regens von Y
- X 指向 Y

##### unmittelbaren und der mittelbaren Abhängigkeit(Dependenz)
![[attachments/Pasted image 20230203212634.png|L|400]]

##### Obligatorische, fakultative und optionale Dependenten

###### obligatorische dependent
- = Komplement
- 完全不能删的部分

###### fakultative dependent
- e.g. Er schreibt (einen Brief)
- 删掉其实不破坏语法正确, 但实际上是更改了语法结构

###### optionaler dependent
- = Adjunkt
- 总是可以删掉而维持语法正确性

#### Dependenzstruktur
- Menge der durch die Relation der Dependenz/Kontrolle verbundenen lexikalischen Einheiten (Wörter; ggf. auch Stämme und Affixe)
- 通常动词为根
- Knoten: Wörter
- Kanten: Dependenzrelationen
- syntaktische Kategorien: girichtete Kante=DR
- Kategorientyp: funktional/relational

#### 分辨 Komplement 和 Adjunkt
- [[#Eliminierungstest]]
- [[#Adverbialsatz-Test]]
- [[#geschehen-Test]]
注意, 这些方法只是用来分辨 K/A 的, 和前面的 Konstituententest 可不一样

##### Adverbialsatz-Test
- 首先, 对时间指示不管用
- 将 Konstituente 放在 Adverbialsatz
e.g.
![[attachments/Pasted image 20230203215544.png|L|500]]

##### geschehen-Test
- 将 Konstituente 放在一个有 geschehen 这个动词的句子里
![[attachments/Pasted image 20230203215826.png|L|500]]

### Modellierung mit formaler Grammatik
![[attachments/NLTK#用 Dependcy Grammar 生成句子]]


### Syntaktische Funktionen

#### Grammatische Relation
- = Satzgliedfunktion
- zentrale syntaktische Funtionen im Satz
- Hierarchie: Subjekt > Direktes Objekt > Indir. Objekt > Adverbiale

![[attachments/Pasted image 20230204134846.png|L|500]]
![[attachments/Pasted image 20230204134947.png|L|500]]
##### Prädikat
- root

##### nsubj/csubj
- noun subject/clause subject

##### obj/ocomp
- (direct) object/Komplementsatz

##### iobj
- indirect object
- ditransitive 动词的另一个宾语, 由**动词支配格**,德语中通常是 Dativ
- 属于 Komplement

##### obl
- obliques object
- 介词宾语(e.g. er glaubt an sich), 属于 Komplement, 由**介词支配格**
- 介词状语(e.g. er glaubt daran, dass...), 属于 Adjunkt

##### advmod/advcl
- adverb modified/ adverb clause
- 属于 Adjunkt

##### case
- PP 中的介词对宾格的关系

##### mod
- modifier
- 表语, 冠词

#### Universal Dependency Relation(UD)
https://universaldependencies.org/u/dep/  
以下没写的默认和 [[#Grammatische Relation]] 中一样

在线分析器: https://corenlp.run/

##### 总览
![[attachments/Tagsets#总览]]

##### flat
多个单词的名词
New York
1 new 0 ROOT
2 York 1 flat

##### nsubj

##### expl
![[attachments/Pasted image 20230204135155.png|L|200]]

##### obj

##### iobj

##### obl
- 介词宾语
TIGER: op = Objekt, präpositional

##### det
- DET

##### amod/nmod/advmod/nummod
- adjectival modifier/modifier of nominal/adv/numerus
- 形容词状语/名词状语

##### appos
- 分句关系

##### ccomp, xcomp
- xcomp: Infinitivkomplement, 从句没有主语
- ccomp: 通常指向 obj dass从句 的 V

##### acomp
- adj comp
- e.g. visiting relatives can **be** *tiresome* (head:be)

##### prep, pcomp
- 动词指向介词/动词指向介词短语的宾语
- 通常用 obl(动词指向介词宾语)/case(宾语指向介词) 就不会有 prep, pcomp

##### acl
- admonimal cl

#### TIGER
`notebook/05-vorlesung.ipynb` 有很多 TIGER 和 Uiversal 的对比

![[attachments/Pasted image 20230204145050.png|L|500]]
![[attachments/Pasted image 20230204145026.png|L|500]]
![[attachments/Pasted image 20230204145138.png|L|500]]
![[attachments/Pasted image 20230204145535.png|L|500]]

##### nk
- noun kernel element
- det 或者 PP中介词指向宾语

##### sb
- subject

##### oa/da/ag
- accusative object/dativ attribute/genitive attribute
- oa 也作代替主语关系(*es* geht)

##### mnr
- postnominal modifier

##### mo 
- modifier

##### oc
- = UD ccomp, xcomp
- 

### Valenz, Dependenz
(Valenz 好像是廷臣?)
valenz 还能有 dependenz

Die **Valenz** bezieht sich auf die Verbindungsfähigkeit von relationalen Wörtern (Verben, Adjektiven, Substantiven), während die **Dependenz** Abhängigkeitsbeziehungen verschiedener Art zusammenfasst

### MALT/CONLL-Format
这个呢, 格式就是

| No. | Word | Head | Relation |
| --- | ---- | ---- | -------- |
| 1   | der  | 2    | det      |
| 2   | Mann | 3    | nsubj    |
| 3   | gibt | 0    | ROOT     |
| 4   | der  | 5    | det      |
| 5   | Frau | 3    | nobj     |
| 6   | das  | 7    | det      |
| 7   | Buch | 3    | iobj     |

![[attachments/Pasted image 20230204175700.png|L|200]]

## Feature-based Grammar
-> Feature based Grammar

### Sprachliche Ausdrucksmittel

##### FCFG
- 通过 Merkmalsstrukturen 对语法特征进行建模
- 用 morphosyntaktische Constraintregeln 对特征结构进行 Unifikation

##### Typen syntaktiscer Kodierung

- A: Strukturelle Kodierung
    - Wortstellung (8. [[#Wortstellung & komplexe Sätze]])
- B: Morphologische Kodierung(本章)
    - Kasus-Markierung
    - Aggrement-Markierung(如动词词尾根据主语的变化)

##### Typen der Sprachtypologie
语言类型学, 与语法结构和其编码差异相关的语言比较. 其分类有:

- **Isolierender Sprachbau** primär durch Wortstellung kodiert(e.g. Vietnamesisch)
- **Analytischer Sprachbau** primär durch freie Morpheme = Funktionswörter(e.g. Deutsch)
- **Synthetischer Sprachbau** primär durch freie gebundene Morpheme(e.g. Latein)

其他分类
- synthetischer/analytischer
- Agglutinierender/Flektierender
- dependent-marking/head-marking
- akkusativ-/ergativ-/Aktiv-System
- topic-/subject-prominent

![[attachments/Pasted image 20230205153755.png|L|400]]

##### Unifikation
- 将两个 Feature-based 结构统一成一样的, 或者说, 检验两个结构能否统一, 能就返回统一了的结构
- 符号是 ⊔
- Zwei Merkmalsstrukturen unifizieren, wenn sie vereinbar sind.

##### Koreferenz
Zwei Merkmale sind koreferent, wenn sie denselben Wert (bzw. bei komplexen Merkmalen dieselbe Merkmalsstruktur) teilen.
e.g. `VP -> V[OBJCASE=?y] NP[CASE=?y]`

##### Unterspezifikation
- In diesem Beispiel ist die zweite Merkmalsstruktur unterspezifiert, weil kein Merkmal-Wert-Paar für den Kasus angegeben wird:
![[attachments/Pasted image 20230205210155.png|L|400]]
- 类似向下兼容未指定的项

##### Subsumption
- Eine Merkmalsstruktur f1 *subsumiert* eine andere Merkmalsstruktur f2 genau dann, *wenn die in f1 enthaltene Information auch in f2 enthalten ist*.
- 符号是 ⊑

##### Typhierarchie
![[attachments/Pasted image 20230209225732.png|L|400]]
- 垂直符号是最底层的意思吧
- unify 找共同上层: 3rd ⊔ plu = 3-plu
- subsumes 低层->高层: 3rd ⊑ 3-sing, 3rd ⊑ (3rd ⊔ 3-sing)

### Grammatische Merkmale

#### Morphosyntaktische Constraints
- Kasusrektion 支配格
- Kongruenz 词尾变化
    - Übereinstimmung von Wörtern oder Satzteilen hinsichtlich grammatischer Merkmale
- [[#Subkategorisieung|Subkategorien]] vi/vt/vd

#### Flextionskategorien
- = grammatisches Merkmale
- e.g. Kategorie Numerus: SG, PL

- Affigierung: Suffixe, Präfixe, Infixe
- Funkionswöter
- Ablaut
- Reduplikation 

##### Deklination
- = nominale Flexion
- Kasus: N, G, D, A
- Genus: Maskulin/Feminin/Neutrum
- Numerus: Singular/Plural
- Person: 1/2/3
- Definitheit: definit/indefinit

##### Agreement
- 名词（作为短语的头）与附属定语和形容词在属、数和大小写上的特征一致
- Merkmaleskongruenz

##### Kunjugation
verbale Flexionskategorien des Deutschen
- Person+Numerus-Kongruenz: 1sg, 2pl...
- Tempus: Präs./Prät./Perf./Plsqperf./Futur1/Futur2
- Modus: Indikativ/Imperativ/Konjunktiv
- Genus verbi: Aktiv/Passiv


#### Kasus und Agreement
- 两个都是标记 syntaktische Funktion
![[attachments/Pasted image 20230205170514.png|L|400]]

### Merkmalstrukturen
- = Attribut-Wert-Matrix (AVM)
![[attachments/Pasted image 20230205171104.png|L|300]]

![[attachments/Pasted image 20230205171224.png|L|400]]
左: var1, Kategoriensymbol + MS
右: var2, Kategorien 也作为 MS 的属性

- 在 POS Tagging 里是 feature extraction(werden aus der Eingabe extrahiert)
- 在 Formalen Grammatiken 里是 feature lexicon (werden im Vorhinein deklariert)

##### Def. Merkmalstruktur
![[attachments/Pasted image 20230209223516.png|L|400]]

##### Def. Feat
Sei Feat eine endliche Menge von Merkmalen (engl. features).

e.g. Feat = {GEN, CASE, NUM, AGR, PER, MOOD, CAT, TENSE}

##### Merkmalsgraph
![[attachments/Pasted image 20230205171737.png|L|300]]

##### Lexiconeinträge
![[attachments/Pasted image 20230205172756.png|L|400]]

### Constraintregeln und Unifikation

#### Constraintregel als Pfadgleichung
仅仅把形如 NP → DET N 的路径规则替换成 Merkmal 版是不能限制过度生成的, 因此有 Constraintregel, e.g.
```text
NP → DET N  
<DET AGR>=<N AGR>
```

或者用 变量描述的方式(nltk: ?x)
![[attachments/Pasted image 20230205173144.png|L|400]]

#### Constraintregel als Unifikationsanweisung
- Constraitregel 还能作为 Unifikation 规则, 以确认 Vereinbarkeit
 
![[attachments/Pasted image 20230205173627.png|L|400]]

```text
Ablehnung (da: <DET AGR GEN> ≠ <N AGR GEN>):  
die Hund (<DET AGR GEN> = FEM, <N AGR GEN> = MASK)  
der Katze (<DET AGR GEN> = MASK, <N AGR GEN> = FEM)  
den Katze (<DET AGR GEN> = MASK, <N AGR GEN> = FEM)
```

### Subkategorisieung
- 动词的分类
- nach Valenztypen

#### 动词的具体分类

**intransitive Verben**
Subjekt im Nominativ 

**transitive Verben**
Subjekt im Nominativ + direktes Objekt

**ditransitive Verben**
Subjekt im Nominativ + direktes Objekt + inderekted Objekt

**Verben mit fester Präposition**
Subjekt im Nominativ + Präpositionalobjekt
(e.g. Sie warten auf den Zug.)

**Verben mit direktem Objekt und Präpositionalobjekt**
Subjekt im Nominativ + Präpositionalobjekt + direktes Obj.
(e.g. Sie stellt das Gepäch auf den Bahnsteig.)

**Verben, die einen Nebensatz einleiten**
Subj. im Nom. + Nebensatz
(e.g. Er sagt, dass der Zug zehn Minuten Verspätung hat.)

#### 看一下语法树例子
![[attachments/Pasted image 20230206230916.png|L|400]]

![[attachments/Pasted image 20230206230932.png|L|400]]

#### 在 GPSG 中
![[attachments/NLTK#GPSG]]

#### 在 HPSG 中
![[attachments/NLTK#HPSG]]

### Invertierte Wortstellung(Auxiliare)

#### Inversion
- Entscheidungsfragesatz im Englisch
- 名词短语主语和助动词的位置发生交换

##### Inversion 实例
```text
S[+INV] -> V[+AUX] NP VP[-AUX]
VP[-AUX] -> V[-AUX] NP
```

![[attachments/Pasted image 20230206232124.png|L|400]]

**SQ(Penn-Treebank)**: inverted yes/no question, or main clause of a wh-question, following the wh-phrase in SBARQ
![[attachments/Pasted image 20230206232331.png|L|400]]

**SINV(Penn-Treebank)**: inverted declarative sentence, i.e. one in which the subject follows the tensed verb or modal.
- e.g. Rarely do you see Kim.

#### Inversion im Deutschen

**Spezifiererregeln**
```text
VP[-INV] -> VERBAR         (für Präsens)
VP[+INV] -> V[+AUX] VERBAL (für Perfekt)
```

**Komplementregeln**
```text
VERBAL -> V[-PP] NP       (für Präsens)
VERBAL -> NP V[-AUX, +PP] (für Perfekt)
```
这里的 +PP 指的是 动词的Partizip Perfekt, +/-AUX 指 是否是助动词

![[attachments/Pasted image 20230206232611.png|L|550]]

### Gap-Feature
- 用于 wh-question 
- S/NP = S without NP
    - "what do you like"
    - S -> NP S/NP
- 疑问代词(e.g. wen)用 PRON[+QUEST], 也有[+WH]
- S[+MOVEMENT] 表示疑问句

e.g.
![[attachments/Pasted image 20230206234940.png|L|400]]

![[attachments/Pasted image 20230206235103.png|L|400]]

## Wortstellung & komplexe Sätze

### Wortstellung

#### Verbstellungstypen des Deutschen

##### Verberstsatz(V1)
- VSO
- 疑问句: Glaubst du an den Weihnachtsmann?
- 命令式 Imperative: Komm mit!

##### Verbzweitsatz(V2)
- SVO
- 大部分陈述句: Ich glaube an den Weihnachtsmann.
- 包括倒装的陈述句

##### Verbendsatz(VE)
- SOV
- Nebensatz
- e.g. ... weil ich an den Weihnachtsmann glaube.

#### Stellungsfeldermodell
- Vorfeld
- linke Satzklammer
    - V2: finites Verb
    - VE: Konjunktion, Relativpronomen, Interrogativpronomen
- Mittelfeld
- rechte Satzklamme
    - V2: infinites Verb, Verbzusaz oder leer
    - VE: finites Verb
- Nachfeld


### Komplexe Sätze

#### Koordinierte-/Subordinierte Sätze

##### Koordinierte Sätze
- Verkettung 同类相连: und, aber, denn
- Satzreihe: Parataxe

##### Subordinierte Sätze
- Einbettung : weil, dass, ob
- Satzgefüge: Hypotaxe

#### Koordination Konstituenz
- S -> S CConj S, NP -> NP CConj NP
- 通过 Conjunktion 同类 Phrase 相连

#### Subordination Konstituenz

##### Subordination 
1) Komplementsatz
    - 用 dass 引导 SBJ/OBJ 从句
2) Adverbialsatz
    - als der Weihnachtsmann kam, lachte er.
3) Attributsatz
    - ..., der rot ist, ...

##### Objektsatz
Für finite eingebettete Sätze verwenden wir das Lebel **SBAR**
```text
S -> NP VP
VP -> V SBAR
SBAR -> Comp S
```
![[attachments/Pasted image 20230207203111.png|L|200]]

##### Subjektsatz
```text
S -> SBAR VP
SBAR -> Comp S
```
![[attachments/Pasted image 20230207203336.png|L|200]]

##### Adverbialsatz
```text
S -> SBAR VP NP
S -> NP VP SBAR
SBAP -> SConj S
```
![[attachments/Pasted image 20230207203527.png|L|200]]

##### Relativsatz
```text
NP -> NP SBAR
SBAR -> WP S
S -> VP
```
![[attachments/Pasted image 20230207203635.png|L|200]]

#### Infinitivkonstruktionen Konstituenz

##### Komplexe Sätze mit Infinitivkonstruktion
1) Infinitivkonstruktion ist Komplement
    - *Infinitiv-Objektsatz*: „Ich möchte an den Weihnachtsmann glauben.“  
    - *Infinitiv-Subjektsatz*: „Zu kommen wäre richtig."
2) Satz mit komplexer VP
    - Das kann nicht gut sein.

##### Infinitiv-Objektsatz
```text
S -> NP VP
VP -> V (NP) S
S -> VP
VP -> TO VP
```
![[attachments/Pasted image 20230207204556.png|L|200]]

##### Infinitiv-Subjektsatz
```text
S -> S VP
S -> VP
VP -> TO VP
```
![[attachments/Pasted image 20230207205508.png|L|200]]

##### Satz mit komplexer VP
```text
VP -> Aux VP
VP -> ADJ V
```
![[attachments/Pasted image 20230207205646.png|L|200]]

#### Dependenz extend
![[attachments/Tagsets#总览]]

- Deutsche Kopulaverben: sein, werden, scheinen
 
#### Koordination Dependenz
- cc: conj word
![[attachments/Pasted image 20230207211540.png|L|400]]

#### Subordination Dependenz
- dass: mark

##### Objektsatz
- ccomp: 并列关系
![[attachments/Pasted image 20230207211446.png|L|400]]

##### Subjektsatz
- csubj
![[attachments/Pasted image 20230207211826.png|L|400]]

##### Adverbialsatz
- als: mark
- advcl: adv clause
![[attachments/Pasted image 20230207211932.png|L|400]]

##### Relativesatz
- acl:relcl, 指向关系从句的动词
![[attachments/Pasted image 20230207212153.png|L|400]]

#### Infinitivkonstruktionen Dependenz

##### Infinitiv-Objektsatz
- zu: mark
![[attachments/Pasted image 20230207212532.png|L|400]]

##### Infinitiv-Subjektsatz
- sein: cop(Kopula)
![[attachments/Pasted image 20230207212556.png|L|400]]

##### Satz mit komplexer VP
- sein: cop(Kopula)
- aux
![[attachments/Pasted image 20230207212659.png|L|400]]

### UD vs. TIGER
![[attachments/Pasted image 20230207211241.png|L|500]]


### Komplexe formale
K13

#### center embeded
- _My brother opened the window the maid the janitor uncle bill had hired had married had closed._
- 上面这个句子是三重循环
- Schema: N1(N2(N3 V3)V2)V1
- 需要至少 contextfree 语法
![[attachments/Pasted image 20230213130047.png|L|400]]

#### cross-serial
- N1 N2 V1 V2  
- N1 N2 N3 V1 V2 V3

#### Garden Path
- 从左往右分析时会有临时歧义的
- the old man the boat
- _The complex houses married and single soldiers and their families._ (fragen13)
## Parsers

### Parsing Strategy

#### Top-Down
- [[#Recursive Descent Parsing|Recursive Descent]]
- LL(Left to right Leftmost(derivation))
- LL(k)
- L(\*)
- [[#Earley Parsing|Earley]]

#### Bottom-Up
- Recursive Ascent
- GLR(Generalized Left-to-right Rightmost(derivation))
- [[#Shift-Reduce]]
- CYK

### Recursive Descent Parsing
- 按着规则表从上往下深搜, 然后回溯(backtracking)
- 2 Operations: 
    - predict: 可能走什么规则
    - scan: 和输入对比
- 能比较好的解决 Ambiguität 问题

##### Recursive Descent Parsing 的问题
- 遇到左循环的规则(e.g. VP -> VP PP) 会陷入死循环
- exponentieller Blow Up: 复杂度(最坏的情况)指数增长

### Shift-Reduce
- 每读一个 token 就往上套规则, 能往上组合就组合
- 2 Operations:
    - shift: 读下一个
    - reduce: 试图根据 RHS 往回推规则
- 比 Top-Down 高效
- 会导致 Teilstrukturen, 就是 即使有正确解, 可能推不出或者只推出几个不相关的部分解
- potentiell exponentielle Laufzeit(也是回溯)

#### Übergangbarsiertes Shift-Reduce-Dependency Parsing
- 在原版的基础上增加了两个操作 LEFTARC, RIGHTARC

**LIFTARC**
- 向左指, head 在右

**RIGHTARC**
- 向右指, head 在左
- Dependent 必须是不能作为另一个关系的 head 时才能做 RIGHTARC

**流程**
- 被指的一方会移出 stack
![[attachments/Pasted image 20230212213654.png|L|400]]
- 最后 Buffer 和 Stack 剩下 ROOT 结束
![[attachments/Pasted image 20230212213921.png|L|400]]
- RIGHTARC 的限制: 下图如果取走 Ticket 就没法分析剩下的句子了
![[attachments/Pasted image 20230212214055.png|L|400]]
![[attachments/Pasted image 20230212214144.png|L|400]]

##### Nicht-Projektive Struktur
- [[#Übergangbarsiertes Shift-Reduce-Dependency Parsing]] 不好处理的一类结构, 会触发 RIGHTARC 限制的结构
![[attachments/Pasted image 20230212214428.png|L|400]]

### Earley Parsing
- Chart Parsing
- 3 Operations
    - PREDICT
    - SCAN
    - COMPLETE

#### Earley Algorithmus
![[attachments/Pasted image 20230209220618.png|L|500]]
![[attachments/Pasted image 20230209220808.png|L|500]]

**Input**
- Eingabesequenz s = s$_1$, ..., s$_n$,
- Grammatik G = (T, N, P, S)
    - Terminal, Nonterminal, Produktion rules, Start

**Data structure**
- Position
- Q set of state
- state:= (X → $\alpha \cdot \beta$, i)
    - 点是现在的位置

**Operation**
![[attachments/Pasted image 20230209212433.png|L|400]]
- 主要看 RHS, 注意点的位置, 预测看点后, 补充看点前

**Algorithm**
![[attachments/Pasted image 20230209212502.png|L|400]]

#### 示例

**init**
![[attachments/Pasted image 20230209212606.png|L|400]]

**Q0 predict**
- for g in G, for q in Q
    - if g.RHS = q.LHS.l(最左符号): g 加入 Z
- 循环以上直到 Q 不变化
![[attachments/Pasted image 20230209213558.png|L|400]]

**Q1 scan**
- i++, 符合 token 的结果加入 Qi
- 注意, 点的位置往后移了
![[attachments/Pasted image 20230209213621.png|L|400]]

**Q1 Completion**
- 所有(能往下推出 (当前Q中规则的 LHS) 的) 规则 也加进去
![[attachments/Pasted image 20230209213645.png|L|400]]

q1 predict, q2 scan, q2 completion...

#### Earley mit Merkmalen
第一种可能性 
- 像以前一样解析，并在最后尝试统一 
- 不吸引人：可能的分析数量没有尽早限制 → 优化潜力
- 相对昂贵
第二种可能性 
- 为每个Earley状态添加特征结构 
- 完成操作统一两个状态的特征结构 预测操作仅在新状态没有被任何现有状态归入时添加 
- 使用非破坏性的统一! (复制！)

## PCFG

### PCFG

#### PCFG
- 通过语料库建模的加权的 CFG, e.g. NP -> DET N 0.7
- 如果一个句子有多种解析(歧义), 那么每个歧义的可能性为所用到的所有规则的权重相乘, 取 n best

![[attachments/Pasted image 20230212214751.png|L|400]]

### Grammar Induction
- 给定 Corpus, 从文本中自行分析语法规则和权重
- $P(\alpha \rightarrow \beta) = \frac{count(\alpha \rightarrow \beta)}{count(\alpha)}$ 

#### Chomsky Normalform
只包含一下三类规则:
- A -> $\alpha$ (terminal)
- A -> B C (non-terminal)
- S -> $\varepsilon$ 

#### 示例转换为 Chomsky Normalform
1. 把 A -> b C D e 转换成: 
    -  B -> b, E -> e
    -  A -> B C D E
2. 再把 A -> BCDE 转换成:
    - A -> B X1
    - X1 -> C X2
    - X2 -> D E

#### F1 Metrics
[[permanent/F1 Metrics]]

### Annotation PCFG

#### Unabhängigkeitsannahmen von PCFG
在基础版的 PCFG 中默认有两个假设:
- 假设 规则与 terminal 词无关
- 假设 规则的权重与上级规则无关

于是有两个衍生版本, 分别去除这两种(不该有的) 假设

#### Lexikalische PCFG
- Kopfannotation, 首先在每个关系会标注目前的 head
![[attachments/Pasted image 20230212225436.png|L|500]]
![[attachments/Pasted image 20230212225509.png|L|500]]

#### History-based PCFG
- Parent Annotation
![[attachments/Pasted image 20230212225602.png|L|500]]
![[attachments/Pasted image 20230212225616.png|L|500]]


## Chunking

### Chunking
- 识别最重要的句法单位（NP、VP、PP）
- 部分的、平面的成分结构分析
- 通过串联语法：生成高层次的结构--用常规语法或统计模型（从IOB标签序列中学习）进行形式化建模。
![[attachments/Pasted image 20230212232136.png|L|500]]

##### Chunks
- 指定要 chunking 的 Phrase 中的 **单一 token**
- 通常短于 Phrase
- Tag pattern 和正则类似(RegExp Chunk Parser)

#### Chinking
- Chink 是无法用 Chunk 定义的片段, 比如 两个不同类Phrase的组合
- Chunking: `{}`,`NP: {<NNP>+}`; Chinking: `}{`, `}<VBD|IN>+{`
- **Chinking-Regel:** Definition eines Musters einer POS-Folge, die nicht in Chunk enthalten ist

Chinking 可以做什么?
![[attachments/Pasted image 20230213134707.png|L|400]]

### IOB Format
- begin
- inside
- outside

首先要确认找什么 phrase, 然后就按字面意思地标

![[attachments/Pasted image 20230212232413.png|L|500]]
