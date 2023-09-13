---
title: Java 序列化
date: 2023-09-09
tags: []
---

#### 什么是序列化
序列化是一种保存 Java 类(以及其当前状态) 的方式, 在需要保存状态时很有用

#### 将序列化对象写入文件
```java
try {
    // 1. 创建 FileOutputStream
    FileOutputStream fileStream = new FileOutputStream(new File("Checkbox.ser"));

    // 2. 创建 ObjectOutputStream
    ObjectOutputStream os = new ObjectOutputStream(fileStream);

    // 3.写入对象
    os.writeObject(checkboxState);

    // 4. 关闭 ObjectOutputStream
    os.close();

} catch (Exception ex) {
    ex.printStackTrace();
}
```

#### 读取序列化对象
```java
boolean[] checkboxStates = new boolean[256];

// 选择序列化文件
JFileChooser chooser = new JFileChooser();
chooser.showOpenDialog(root);
File file = chooser.getSelectedFile();

try {
    // 1. 创建 FileInputStream
    FileInputStream fileStream = new FileInputStream(file);
    // 2. 创建 ObjectInputStream
    ObjectInputStream os = new ObjectInputStream(fileStream);
    // 3. 读取对象
    checkboxStates = (boolean[]) os.readObject();
    // 4. 关闭流
    os.close();
} catch (Exception ex) {
    ex.printStackTrace();
}
```