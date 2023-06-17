---
title: "NLTK"
date: "2023-06-16"
tags:
- NLP
- ML
- Python
---

https://www.nltk.org/book/ 
## Introduction
natural language toolkit, python 库

##### help
```python
nltk.help.upenn_tagset('DT')
nltk.help.brown_tagset('DT')
```

- [ ] 大类:预处理
- [ ] 根据两个任务拆分 syntax analyse
- [ ]  parser 的简要说明

## Syntax Analyse with formal Grammar
根据输入的语法规则, 分析给定句子的结构

syntax analyse 的任务主要是两种
- Strukturkennung 结构识别: 句子是否符合语法/是否有一种符合规则的推导
- Strukturzuweisung 结构分配: 重现找到的语法推导

### Grammar types in NLTK
[[project/lmu - Syntax of natural language(Germany)#Grammatikformalismus]]


> sent = ['I', 'shot', 'an', 'elephant', 'in', 'my', 'pajamas']
```python
sent = "I shot an elephant in my pajamas.".split()
```

### 用 CFG 生成句子
- nltk.CFG.fromstring
- nltk.ChartParser/nltk.RecursiveDescentParser
```python
# 语法输入
grammar = nltk.CFG.fromstring("""
    S -> NP VP
    PP -> P NP
    NP -> Det N | Det N PP | Pron
    VP -> V NP | VP PP
    
    Pron -> 'I'
    Det -> 'an' | 'my'
    N -> 'elephant' | 'pajamas'
    V -> 'shot'
    P -> 'in'
    """)
# 根据语法创建解析器
parser = nltk.ChartParser(grammar) # ops: trace=3
# 可视化结果
for tree in parser.parse(sent):
	tree.pretty_print(unicodelines=False)
```

![[attachments/Pasted image 20221028150112.png|L|350]]


PCFG
- nltk.PCFG.fromstring
- nltk.ViterbiParser

FCFG
- 基于 RegExp
- grammar = string
- nltk.grammar.FeatureGrammar.fromstring
- nltk.parse.FeatureChartParser

详参 `01-vorlesung.ipynb`

#### 给定语法规则生成不同句子
```python
grammar = nltk.CFG.fromstring("""
    S -> NP VP
    VP -> 'V' | 'V' NP | 'V' NP NP
    NP -> 'DET' 'N' | 'N'
""")

from nltk.parse.generate import generate
# depth=3: 使用三次规则
for sentence in generate(grammar, depth=3):
    print(' '.join(sentence))
# out:
# DET N V
# N V

# 有多少种?
print(len(list(generate(grammar, depth=3)))
# out:
# 2
```

#### grammar.productions()
```python
grammar = nltk.CFG.fromstring("""
    S -> NP VP
    VP -> 'V' | 'V' NP | 'V' NP NP
    NP -> 'DET' 'N' | 'N'
""")

# 会把规则一条一条打印出来
for p in grammar.productions():
    print(p)
```
out:
```text
S -> NP VP
VP -> 'V'
VP -> 'V' NP
VP -> 'V' NP NP
NP -> 'DET' 'N'
NP -> 'N'
```

### 用 Dependcy Grammar 生成句子
- nltk.DependencyGrammar.fromstring
- nltk.ProjectiveDependencyParser

```python
#Dependency Grammar (unlabeled):
grammar = nltk.DependencyGrammar.fromstring("""
    'shot' -> 'I' | 'elephant' | 'in'
    'elephant' -> 'an' | 'in'
    'in' -> 'pajamas'
    'pajamas' -> 'my'
    """)
parser = nltk.ProjectiveDependencyParser(grammar)
for tree in parser.parse(sent):
    tree.pretty_print()
```

![[attachments/Pasted image 20221028150949.png|L|300]]

### 用 Chunk Parser 生成句子
- regexp
- nltk.RegexpParser(grammar)

```python
# partielle, flache RegExp-Grammatik:
grammar = r"""
    NP: {<DET>?<ADJ>*<N>} 
        {<PRON>}  
    PP: {<P>}
"""

sent = [("I", "PRON"), ("shot", "V"), ("an", "DET"), ("elephant", "N"), 
        ("in", "P"), ("my", "DET"), ("pajamas", "N")]
parser = nltk.RegexpParser(grammar)
tree = parser.parse(sent)
tree.pretty_print()
```
![[attachments/Pasted image 20221028151427.png|L|400]]

#### Constituent Tests

##### 用 CFG 进行删除测试 
[[project/lmu - Syntax of natural language(Germany)#Eliminierungstest]]
1. 给定原句的 syntaktische 和 lexicalische 规则
2. 确保原句可以按 [[#用 CFG 生成句子]] 这里这样生成树.
3. 输入的句子用删除后的句
详参 `vorlesung-notebook/04-vorlesung.ipynb`

### 用 Feature-based语法生成句子
- [[#创建 FeatStruct]]
- nltk.grammar.FeatureGrammar.fromstring()
- nltk.parse.FeatureChartParser()
```python
# tracing = 0/2
grammar = nltk.grammar.FeatureGrammar.fromstring(gramstring)
parser = nltk.parse.FeatureChartParser(grammar,trace=tracing)


## POS Tagging

#### 使用指定 tagset 标记指定 text
```python
import nltk

text = "We want to tag the words in this text example."

tokens = nltk.word_tokenize(text)

tags1 = nltk.pos_tag(tokens) # Penn?
tags2 = nltk.pos_tag(tokens, tagset="universal")

print(tags1)
print(tags2)
```
```text
out: 
[('We', 'PRP'), ('want', 'VBP'), ...]
[('We', 'PRON'), ('want', 'VERB'), ...]
```

## Distribution Analyse
常用来确认词的类别

```python
# 加载 Text
from nltk.corpus import brown
text = nltk.Text(word.lower() for word in nltk.corpus.brown.words())
```

#### similar()
```python
# text.similar(w) 找出与 w 上下文相同的词
text.similar('woman')
```

#### 读取 corpus 中自带的 tag
```python
from nltk.corpus import brown
brown_tagged = brown.tagged_words(categories='news', tagset='universal')
```

## 句子结构分析

### Dependency Graph
```python
sent = """John N 2
loves V 0
Mary N 2
"""

dg = DependencyGraph(sent)
tree = dg.tree()

print(tree)
tree.pretty_print(unicodelines=False)
```
![[attachments/Pasted image 20230204141454.png|L|200]]


IPython.display(), 需要 pip install `svgling` 包
```python
from IPython.display import display
display(dg)
```

## Feature-based 结构

#### 创建 FeatStruct

**第一种**
```python
import nltk
from nltk import Tree
from nltk import FeatStruct
fs1 = FeatStruct(number='singular', person=3, )
print(fs1)
```
out:
```text
[ number = 'singular' ]
[ person = 3          ]
```

```python
fs2 = FeatStruct(type='NP', agr=fs1)
print(fs2)
```
out:
```text
[ agr  = [ number = 'singular' ] ]
[        [ person = 3          ] ]
[                                ]
[ type = 'NP'                    ]
```

**第二种**
```python
# folgen
FeatStruct("[CAT=V, LEMMA=folgen,"+
            "SYN=[SBJ=?x, OBJ=?y],"+
            "SEM=[AGT=?x, PAT=?y]]")
```

#### Unifikation
- 返回将两个 Feat Struct 统一成的结构, 或者 None
- 只有在两个结构(的内容)不冲突时才能成功

上接 [[#创建 FeatStruct]]

```python
fs3 = FeatStruct(agr=FeatStruct(number=Variable('?n')), subj=FeatStruct(number=Variable('?n'))) # 变量n
print(fs3)
```
out:
```text
[ agr  = [ number = ?n ] ]
[                        ]
[ subj = [ number = ?n ] ]
```

```python
print(fs2.unify(fs3))
```
out:
```text
[ agr  = [ number = 'singular' ] ]
[        [ person = 3          ] ]
[                                ]
[ subj = [ number = 'singular' ] ]
[                                ]
[ type = 'NP'                    ]
```

#### 创建 Feature 语法
```python
#Feature-Grammar NP-Agreement:
gramstring = r"""
% start NP

    NP[AGR=?x]  -> DET[AGR=?x] N[AGR=?x]

    N[AGR=[NUM=sg, GEN=mask]]   -> "Hund"
    N[AGR=[NUM=sg, GEN=fem]]   -> "Katze"
    
    DET[AGR=[NUM=sg, GEN=mask, CASE=nom]] -> "der"
    DET[AGR=[NUM=sg, GEN=mask, CASE=akk]] -> "den"
    DET[AGR=[NUM=sg, GEN=fem]] -> "die"     
"""
```
然后就可以用这个语法分析句子了, `notebook/06-vorlesung` 中有例子

![[attachments/Pasted image 20230205210610.png|L|500]]
out:
```text
[ GEN = 'neu' ]
[ NUM = 'sg' ]
[ KAS = 'nom' ]
```

#### GPSG
- Generalized Phrase Structure Grammar 
- 在 [[#Formal Grammar]] 中, 标注 V 的子类型
![[attachments/Pasted image 20230206223757.png|L|400]]

#### HPSG
- Head-driven Phrase Structure Grammar
- 给动词 Feature-based 框架里标注上相关信息
![[attachments/Pasted image 20230206224611.png|L|400]]

#### 如何得到句子的的动词 FeatStruct
```python
import spacy
nlp = spacy.load('de_core_news_sm')

# In: sentence as a string
# Out: semantic feature structure
def semantic_parse(sentence):
    sbj, obj, verb = None, None, None
    analyzed = nlp(sentence)
    for token in analyzed:
        if token.dep_ == 'sb':
            sbj = token.text
        elif token.dep_ == 'oa' or token.dep_ == 'da':
            obj = token.text
        elif token.pos_ == 'VERB':
            verb = token.lemma_
    if sbj is None or obj is None or verb is None:
        raise RuntimeError('I could not identify all relevant parts: {} - {} - {}'.format(sbj, verb, obj))
    return lexicon[verb].unify(
        FeatStruct(SYN=FeatStruct(SBJ=sbj, OBJ=obj))
    )
```

```python
for sent in sentences:
    fs = semantic_parse(sent)
    print()
    print(sent)
    print(fs)
```
![[attachments/Pasted image 20230207142852.png|L|300]]

```python
from spacy import displacy

for sentence in sentences:
    sent = nlp(sentence)
    for token in sent:
        print(token.text, token.lemma_, token.pos_, token.tag_, token.dep_,
            token.shape_, token.is_alpha, token.is_stop, sep='\t')
    displacy.render(sent, style='dep', options={'distance':100}) 
```
![[attachments/Pasted image 20230207142935.png|L|500]]

#### Subsumption
- f1.subsumes(f2), 返回 True/False
- f1 的内容 f2 也有

## Parsers
- ChartParser
- RecursiveDescentParser
- ShiftReduceParser
- EarleyChartParser
- ViterbiParser
由于目前很忙所以先空着, 在[[#Syntax Analyse with formal Grammar]] 和 [[project/lmu - Syntax of natural language(Germany)#Parsers]] 的部分内容应该整合到这里


PCFG(u12)
```python
# 根据 treebank 中的 parsed_sents() 为输入, 推测 带权重的语法规则

# Production count: the number of times a given production occurs
pcount = defaultdict(int)

# LHS-count: counts the number of times a given lhs occurs
lcount = defaultdict(int)

for tree in treebank.parsed_sents():
    for p in tree.productions():
        pcount[p] += 1
        lcount[p.lhs()] += 1
        
productions = [
    ProbabilisticProduction(
        p.lhs(), p.rhs(),
        prob = pcount[p] / lcount[p.lhs()] # TODO
    )
    for p in pcount
]

# test
start = nltk.Nonterminal('S')
grammar = PCFG(start, productions)
parser = nltk.ViterbiParser(grammar)

for s in test_sentences:
    for t in parser.parse(nltk.word_tokenize(s)):
        print(t.prob())
        t.pretty_print(unicodelines=False)
```
