---
title: Java IO
date: 2023-08-30
tags:
  - Java
---

#### 写入文件示例 IO+swing
```java
// 浏览文件保存位置
JFileChooser fileChooser = new JFileChooser();
fileChooser.showSaveDialog(root);
saveFile(fileChooser.getSelectedFile());

private void saveFile(File file) {
    try {
        // Buffered 的好处就是 写满缓冲区再一次写入文件, 节省开销
        BufferedWriter writer = new BufferedWriter(new FileWriter(file));

        for (QuizCard card:list) {
            writer.write(card.getQuestion() + "/" + card.getAnswer() + "\n");
        }

        writer.close();

    } catch (IOException e) {
        System.out.println("couldn't write the card list out");
        e.printStackTrace();
    }
}

```

#### 读取文件示例 IO+swing
```java
// 浏览要读取的文件
JFileChooser chooser = new JFileChooser();
chooser.showOpenDialog(root);
loadFromTxt(chooser.getSelectedFile());

private void loadFromTxt(File file) {
    list = new ArrayList<QuizCard>();
    try {
        BufferedReader reader = new BufferedReader(new FileReader(file));
        String line = null;
        while ((line = reader.readLine()) != null) {
            // do something...
        }
        reader.close();
    } catch (Exception e) {
        e.printStackTrace();
    }
}

```
#### 这是什么?
```java
import java.io.*;

public class GameHelper {

    public String getUserInput(String prompt) {
        String inputLine = null;
        System.out.print(prompt + " ");
        try {
            BufferedReader is = new BufferedReader(new InputStreamReader(System.in));
            inputLine = is.readLine();
            if (inputLine.length() == 0) return null;
        } catch (IOException e) {
            System.out.println("IOException: " + e);
        }
        return inputLine;
    }
}
```