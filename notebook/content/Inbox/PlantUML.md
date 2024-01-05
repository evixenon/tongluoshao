---
title: PlantUML
date: 2024-01-05
tags:
  - 工具使用
---
[使用简单的文字描述画UML图的开源工具。](https://plantuml.com/zh/)

## Class Diagram
```plantuml
@startuml
skinparam classAttributeIconSize 0
Class SubClass {
 -privateParam
 +publicParam
 #protectedParam
 ~defaultParam
}
SubClass --> Class1
@enduml
```

框架. 使用 +-#~ 而不是几何
```
@startuml
skinparam classAttributeIconSize 0
@enduml
```

![[attachments/Pasted image 20240105160936.png]]

```plantuml
@startuml
class A {
{static} int counter
+void {abstract} start(int timeout)
}
note left of A::counter
  该成员已注释
end note
note right of A::start
  在 UML 注释了此方法
end note
@enduml
```


```plantuml
@startuml

class Dummy
Dummy --> Foo : A link
note on link #red: note that is red

Dummy --> Foo2 : Another link
note right on link #blue
this is my note on right link
and in blue
end note

@enduml
```
