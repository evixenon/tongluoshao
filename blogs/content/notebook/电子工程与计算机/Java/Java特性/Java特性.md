# Java特性

## 目录

### Garbage-Collection

*   创建对象时, 对象会被存储在\[\[堆]]中, 这是个可回收垃圾的堆(Garbage-Collectible Heap)

*   当某个对象被\[\[JVM]]察觉到不会再使用时, 就会将其标记为「可回收」, 如果内存不足, 这个对象就会被清理

### Overwrite

*

<!---->

    ```java

<!---->

    public class Overwrite {

        public static void main(String[] args) {
            Animal a1 = new Animal();
            a1.foo();   // Animal

            Dog d1 = new Dog();
            d1.foo();   // Dog

            Animal a2 = (Dog) d1;
            a2.foo();   // Dog  父类Cast子类: 调用的还是子类方法

            // Dog d2 = (Animal) a1; // 子类Cast父类: 报错

        }
    }

    class Animal {

        public void foo(){
            System.out.println("Animal");
        }

        public Animal() {
        }
    }

    class Dog extends Animal {
        public void foo(){
            System.out.println("Dog");
        }

        public Dog() {
        }
    }

    ```
