# C 语言

## 目录

*   [基础语法](#基础语法)

*   [变量](#变量)

    *   [C标识符规范](#c标识符规范)

    *   [变量的作用域](#变量的作用域)

*   [运算符](#运算符)

*   [流程控制](#流程控制)

*   [数据类型](#数据类型)

*   [指针](#指针)

    *   [指针的初始化](#指针的初始化)

    *   [指针的运算](#指针的运算)

*   [函数](#函数)

    *   [传参方式](#传参方式)

    *   [函数指针](#函数指针)

    *   [exit()](#exit)

    *   [函数说明符](#函数说明符)

    *   [可变参数](#可变参数)

*   [数组](#数组)

    *   [数组初始化](#数组初始化)

    *   [变长数组](#变长数组)

    *   [数组的复制](#数组的复制)

    *   [数组作为函数的参数](#数组作为函数的参数)

*   [字符串](#字符串)

    *   [字符串声明](#字符串声明)

    *   [字符串函数](#字符串函数)

    *   [字符串数组](#字符串数组)

*   [内存管理](#内存管理)

    *   [void 指针](#void-指针)

    *   [内存管理函数](#内存管理函数)

    *   [restrict](#restrict)

*   [struct](#struct)

    *   [结构的创建](#结构的创建)

    *   [结构的占用内存](#结构的占用内存)

    *   [结构数组](#结构数组)

    *   [结构的复制](#结构的复制)

    *   [结构指针](#结构指针)

    *   [链表结构](#链表结构)

    *   [位字段](#位字段)

    *   [弹性数组](#弹性数组)

*   [typedef](#typedef)

*   [Union](#union)

*   [Enum](#enum)

*   [预处理器](#预处理器)

    *   [预处理器的工作](#预处理器的工作)

    *   [预处理指令](#预处理指令)

## 基础语法

*   /\* \*/ 注释可以用于行内代码之间，会被替换成一个空格

*   `%f` 包含 float 和 double, `h`代表short, `l` long, `e` 或`E`使用科学计数法的浮点数

*   format 默认右对齐, `6.2`占6位，显示2位小数，`-`左对齐， `+` 显示正负号

    ```c
    int main()
    {
        printf("%6.2f\n", 4.543255);
        printf("%-6.2f\n", 4.543255);
        printf("%-+6.2f\n", 4.543255);
        return 0;
    }
    /*
       4.54
    4.54
    +4.54
    */
    ```

    ```c
    /* %*.*f的两个星号通过printf()的两个参数6和2传入。 */
    printf("%*.*f\n", 6, 2, 0.5);
    ```

*   format 占位符一览

    *   `%a`：浮点数。

    *   `%A`：浮点数。

    *   `%c`：字符。

    *   `%d`：十进制整数。

    *   `%e`：使用科学计数法的浮点数，指数部分的`e`为小写。

    *   `%E`：使用科学计数法的浮点数，指数部分的`E`为大写。

    *   `%i`：整数，基本等同于`%d`。

    *   `%f`：小数（包含`float`类型和`double`类型）。

    *   `%g`：6个有效数字的浮点数。整数部分一旦超过6位，就会自动转为科学计数法，指数部分的`e`为小写。

    *   `%G`：等同于`%g`，唯一的区别是指数部分的`E`为大写。

    *   `%hd`：十进制 short int 类型。

    *   `%ho`：八进制 short int 类型。

    *   `%hx`：十六进制 short int 类型。

    *   `%hu`：unsigned short int 类型。

    *   `%ld`：十进制 long int 类型。

    *   `%lo`：八进制 long int 类型。

    *   `%lx`：十六进制 long int 类型。

    *   `%lu`：unsigned long int 类型。

    *   `%lld`：十进制 long long int 类型。

    *   `%llo`：八进制 long long int 类型。

    *   `%llx`：十六进制 long long int 类型。

    *   `%llu`：unsigned long long int 类型。

    *   `%Le`：科学计数法表示的 long double 类型浮点数。

    *   `%Lf`：long double 类型浮点数。

    *   `%n`：已输出的字符串数量。该占位符本身不输出，只将值存储在指定变量之中。

    *   `%o`：八进制整数。

    *   `%p`：指针。

    *   `%s`：字符串。

    *   `%u`：无符号整数（unsigned int）。

    *   `%x`：十六进制整数。

    *   `%zd`：`size_t`类型。

    *   `%%`：输出一个百分号。

*   `#include`, `#define` 不用分号结尾

## 变量

### C标识符规范

*   只能由字母（包括大写和小写）、数字和下划线（`_`）组成。

*   不能以数字开头。

*   长度不能超过63个字符。

*   区分大小写

*   保留关键字

    auto, break, case, char, const, continue, default, do, double, else, enum, extern, float, for, goto, if, inline, int, long, register, restrict, return, short, signed, sizeof, static, struct, switch, typedef, union, unsigned, void, volatile, while

*   保留 `__变量名`

### 变量的作用域

**块作用域（block scope）** 指的是由大括号（`{}`）组成的代码块，它形成一个单独的作用域

内层代码块中使用外层声明的变量，只在当前作用域生效，不会覆盖外层声明的变量

## 运算符

多个运算符不宜连用， `i < j < k` 会执行 `(i < j) < k` , 其中 `(i < j)` 返回 `0` 或 `1`

右移运算符 `>>` 最好只用于无符号整数，不要用于负数。因为不同系统对于右移后如何处理负数的符号位，有不同的做法，可能会得到不一样的结果。(逻辑右移：直接补0；算术右移: 补最高位值）

**运算符优先级**

（按照从高到低排列)

*   圆括号（`()`）

*   自增运算符（`++`），自减运算符（`--`）

*   一元运算符（`+`和`-`）

*   乘法（`*`），除法（`/`）

*   加法（`+`），减法（`-`）

*   关系运算符（`<`、`>`等）

*   赋值运算符（`=`）

## 流程控制

goto

*   ！不要轻易使用

*   与 `label_name: ` 配合使用

*   一个主要用法是跳出多层循环

## 数据类型

pass

## 指针

指针本质上就是一个无符号整数，代表了内存地址

### 指针的初始化

```c
int* p;
*p = 1; // 错误, 因为指针指向了随机地址

int i;
*p = &i; // 正确
```

### 指针的运算

指针只能与整数值**相加**，两个指针相加是非法的。

指针运算中的`1` 是单位，与指针类型相关。

```c
short* j;
j = (short*)0x1234;
j = j + 1; // 0x1236, 因为 sizeof(short)为2
```

相同类型的指针允许进行**减法**运算，返回它们之间的距离，即相隔多少个数据单位，减法返回的值属于`ptrdiff_t`类型，这是一个带符号的整数类型别名。

指针**比较**运算比较哪个内存地址更大，返回`0`或`1`.

## 函数

### 传参方式

**传值**

```c
void Swap(int x, int y) {
  int temp;
  temp = x;
  x = y;
  y = temp;
}

int a = 1;
int b = 2;
Swap(a, b); // 无效

```

**传地址**

```c
void Swap(int* x, int* y) {
  int temp;
  temp = *x;
  *x = *y;
  *y = temp;
}

int a = 1;
int b = 2;
Swap(&a, &b);

```

### 函数指针

[https://wangdoc.com/clang/function.html#函数指针](https://wangdoc.com/clang/function.html#函数指针 "https://wangdoc.com/clang/function.html#函数指针")

*   向函数地址的指针

*   示例 (`&print`和`print`效果一样)

    ```c
    void print(int a){
      print("%d\n", a);
    }

    void (*print_ptr)(int) = &print;

    (*print_ptr)(10);
    // 等同于
    print(10);

    ```

*   这种特性的一个应用是，如果一个函数的参数或返回值，也是一个函数，那么函数原型可以写成下面这样。

    ```c
    int compute(int (*myfunc)(int), int, int);
    ```

    函数`compute()`的第一个参数也是一个函数。

注意：函数不要返回内部变量的指针, 当函数结束时，内部变量就消失了

```c
int* f(void) {
  int i;
  // ...
  return &i;
} 
// 返回了无效地址 &i，非常危险
```

### exit()

`exit()`函数用来终止整个程序的运行。一旦执行到该函数，程序就会立即结束。该函数的原型定义在头文件`stdlib.h`里面。

`atexit()`函数，用来登记`exit()`执行时额外执行的函数, 函数原型定义在头文件`stdlib.h`。

```c
int atexit(void (*func)(void));
```

### 函数说明符

*   **extern**

    当用到其他文件声明的函数，需要给出外部函数的原型，并用`extern`说明该函数来自其他文件。

    ```c
    extern int foo(int arg1, char arg2);
    ```

    函数原型默认就是`extern`，所以这里不加`extern`，效果是一样的。

*   **static**

    修饰函数本身或函数内部的变量。修饰函数时，该函数只能在当前文件使用。也可以用在参数里面，修饰参数数组。

    `static`用于函数内部声明变量时，表示该变量只需要初始化一次，不需要在每次调用时都进行初始化。通常函数每次调用都会重新初始化。

    也就是说，在下一次调用时，保持上一次结束时的内部变量状态。

    `static`修饰的变量初始化时，只能赋值为常量，不能赋值为变量。

*   **const**

    在指针参数前面加上`const`说明符，告诉编译器，函数内部不能修改该参数所指向的值。

    只限制修改`p`所指向的值，而`p`本身的地址是可以修改的：

    ```c
    void f(const int* p) {
      *p = 0; // 该行报错
      
      int x = 13;
      p = &x; // 允许修改
    }
    ```

    如果想限制修改`p`，可以把`const`放在`p`前面：

    ```c
    void f(int* const p) {
      int x = 13;
      p = &x; // 该行报错
    }
    ```

### 可变参数

pass

## 数组

`sizeof(a) / sizeof(a[0])` 求长度

### 数组初始化

大括号赋值只能在初始化时使用，因为会改变指向的地址。大括号未初始化到的值自动初始化为0.

可以选择为特定位置成员赋值

```c
int a[15] = {[9] = 7, [14] = 48, [2] = 29};
```

### 变长数组

pass

要实验一下

### 数组的复制

*   一个方法是逐个复制

*   另一个是`memcpy(a, b, sizeof(b))` 从b复制到a

### 数组作为函数的参数

数组作为函数的参数，一般同时传入数组名和长度

```c
int sum_array(int a[], int n) {
  // ...
}
```

多维数组则要将其他维的长度标明

```c
int sum_array(int a[][4], int n) {
  // ...
}
```

变长数组作为函数参数，需要将变量n也一起作为函数参数，且放在数组之前

```c
int sum_array(int n, int a[n]) {
  // ...
}

```

因为函数原型可以省略参数名，所以变长数组的原型中，可以使用\*代替变量名，也可以省略变量名。

```c
int sum_array(int, int [*]);
int sum_array(int, int []);
```

数组字面量作为传入参数：

```c
int sum = sum_array((int []){2, 3, 4, 5}, 4);
```

## 字符串

*   字符单引号， 字符串双引号

*   反斜杠 `\` 转义双引号，或拆成两行（第二行必须顶格）

*   多行字符串的另一种写法

    ```c
    char greeting[50] = "Hello, "
      "how are you "
      "today!";

    ```

*   结尾字符 `\0`

### 字符串声明

1.  声明为字符数组。

2.  声明为指针

*   指针指向的字符串，在 C 语言内部被当作常量，不能修改字符串本身。

    ```c
    char* s = "Hello, world!";
    s[0] = 'z'; // 错误
    ```

*   但字符数组的字符串可以这样改。

*   原因：内存分配方式不同
    [https://wangdoc.com/clang/string.html#字符串变量的声明](https://wangdoc.com/clang/string.html#字符串变量的声明 "https://wangdoc.com/clang/string.html#字符串变量的声明")

*   指针变量可以指向其他字符串，字符数组不能。

### 字符串函数

*   strlen()

    `strlen()` 返回`\0`之前的字符数，`sizeof()` 返回字符串变量的长度

    ```c
    size_t strlen(const char* s);
    ```

    size\_t 是无符号整数

*   strcpy()

    将一个字符串赋值给字符数组变量。必须自行保证dest长度不小于source

    strcpy(char dest\[], const char source\[])

    字符串指针可以直接指向另一个字符串，不需要使用 `strcpy()`

    实现的关键：while (\*dest++ = \*source++);&#x20;

    `*dest++`这个表达式等同于`*(dest++)`，即先返回`dest`这个地址，再进行自增运算移向下一个位置，而`*dest`可以对当前位置赋值。

*   strncpy()

    `strncpy()`跟`strcpy()`的用法完全一样，只是多了第3个参数，用来指定复制的最大字符数，防止溢出目标字符串变量的边界。

    如果达到了最大字符数，就会立刻终止，此时目标字符串将没有`\0`

    ```c
    strncpy(str1, str2, sizeof(str1) - 1;
    str1[sizeof(str1) - 1] = '\0';
    ```

*   strcat()

    将第二个字符串的副本添加到第一个字符串的末尾

    ```c
    char* strcat(char* s1, const char* s2);
    ```

*   strncat()

    `strncat()`用于连接两个字符串，用法与`strcat()`完全一致，只是增加了第三个参数，指定最大添加的字符数。一旦达到指定的字符数，或者在源字符串中遇到空字符`\0`，就不再添加了.

    ```c
    char* strncat(
      const char* dest,
      const char* src,
      size_t n
    );
    ```

*   strcmp()

    按照字典顺序，如果两个字符串相同，返回值为`0`；如果`s1`小于`s2`，`strcmp()`返回值小于0；如果`s1`大于`s2`，返回值大于0。

*   strncmp()

    指定了比较的字符数。

*   sprintf()

    `sprintf()`函数跟`printf()`类似，但是用于将数据写入字符串，而不是输出到显示器

    ```c
    int sprintf(char* s, const char* format, ...);
    ```

### 字符串数组

```c
char* weekdays[] = {
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
};
```

*   因为第一维的长度，编译器可以自动计算，所以可以省略。

*   数组的第二维，长度统一定为10，有点浪费空间，因为大多数成员的长度都小于10。解决方法就是把数组的第二维，从字符数组改成字符指针。

## 内存管理

### void 指针

void 指针是不定类型指针。使用时需要向编译器补充说明是什么类型指针。

可强制转换，也可隐式转换。

### 内存管理函数

*   malloc()

    返回void\*

    通常配合sizeof()

    检查: `if (NULL == p)`

*   free()

    接受不定指针作为参数，释放分配给该指针的内存

*   calloc()

    `calloc()`接受两个参数，第一个参数是某种数据类型的值的数量，第二个是该数据类型的单位字节长度。

    `calloc()`会将所分配的内存全部初始化为`0`。`malloc()`不会对内存进行初始化，如果想要初始化为`0`，还要额外调用`memset()`函数。

    ```c
    int* p = calloc(10, sizeof(int));

    // 等同于
    int* p = malloc(sizeof(int) * 10);
    memset(p, 0, sizeof(int) * 10);
    ```

*   realloc()

    ```c
    void* realloc(void* block, size_t size)
    ```

    参数：重新分配的指针，新内存大小

    和malloc()一样，不会初始化内存

*   memcpy()

    ```c
    void* memcpy(
      void* restrict dest, 
      void* restrict source, 
      size_t n
    );

    ```

    目标地址和源地址都是受限指针，说明两者不能有重叠

    是strcpy的高位替代。更安全也更快

    `memcpy(t, s, sizeof(s));`

*   memmove()

    `memcpy()` 的允许重叠版

    它很聪明的, 如果地址src\<dst, 就从后往前复制，反之从前往后

    ```c
    char[] str = "foo-bar";
    memcpy(&str[3],&str[4],4); //might blow up
    memmove(&str[3],&str[4],4); //fine

    ```

    ```c
    /* memcpy might work fine, but we should'n do.
    a, b, c, d */
    0, 0, 0, 0
    1, 1, 1, 1
    2, 2, 2, 2
    3, 3, 3, 3
    4, 4, 4, 4
    memmove(&a[0], &a[1], ..);
    memmove(&b[1], &b[0], ..);
    memcpy(&c[0], &c[1], ..);
    memcpy(&d[1], &d[0], ..)
    1, 0, 1, 0
    2, 0, 2, 0
    3, 1, 3, 1
    4, 2, 4, 2
    4, 3, 4, 3
    ```

*   memcpy()

    ```c
    int memcmp(
      const void* s1,
      const void* s2,
      size_t n
    );

    ```

    按字典顺序比较两个字符串的前n个字符，中间有`\0` 也可以

    \-1， 0， 1

### restrict

声明指针变量时，可以使用`restrict`说明符，告诉编译器，该块内存区域只有当前指针一种访问方式，其他指针不能读写该块内存。这种指针称为“受限指针”（restrict pointer）。

```c
int* restrict p;
p = malloc(sizeof(int));
```

## struct

### 结构的创建

建议配合typedef

```c
struct car {
  char* name;
  float price;
  int speed;
};

// 1. 按顺序
struct car saturn = {"Saturn SL/2", 16000.99, 175};

// 2. 不按顺序，要指定属性名
struct car saturn = {.speed=172, .name="Saturn SL/2"};

// 一次性结构体变量（可以先不赋值）
struct {
  char title[500];
  char author[100];
  float value;
} b1 = {"Harry Potter", "J. K. Rowling", 10.0},
  b2 = {"Cancer Ward", "Aleksandr Solzhenitsyn", 7.85};

```

### 结构的占用内存

不是各个属性的总和。而是每个属性都会向上取到int(多为4)的倍数。

### 结构数组

跟普通数组差不多那么用

```c
struct fraction numbers[1000];
```

### 结构的复制

*   struct 变量可以直接用等号`=`复制，这会生成一个全新的副本。和数组不一样。不同类型的结构体无法赋值。

*   只有含有指针属性时，修改结构副本才会对原本有影响。

### 结构指针

如果将 struct 变量传入函数，函数内部得到的是一个原始值的副本。因此需要指针。

`→` 取一个结构指针的属性，`.`取一个结构的属性

```c
// ptr == &myStruct
myStruct.prop == (*ptr).prop == ptr->prop
```

```c
void happy(struct turtle* t) {
  (*t).age = (*t).age + 1;
}
// 或者
void happy(struct turtle* t) {
  t->age = t->age + 1;
}

```

### 链表结构

```c
#include<stdio.h>
#include<stdlib.h>

struct node {
    int data;
    struct node* next;
};

void add_node(struct node* head, int x) {
    if (NULL == head) {
        return;
    }

    struct node* cur = NULL;
    for(cur = head; cur->next != NULL; cur = cur->next);
    cur->next = malloc(sizeof(struct node));
    cur->next->data = x;
    cur->next->next = NULL;
}

void print_list(struct node* head) {
    if (NULL == head) {
        printf("Empty list!\n");
        return;
    }

    printf("%d ", head->data);

    struct node *cur = NULL;
    for (cur = head->next; cur!= NULL; cur = cur->next) {
       printf("-> %d ", cur->data);
    }
    printf("\n");
}

int main(void) {
    struct node nums = {4, NULL};
    print_list(&nums);

    add_node(&nums, 8);
    print_list(&nums);

    add_node(&nums, 7);
    print_list(&nums);

    print_list(NULL);

    return 0;
}

```

输出：

```c
4
4 -> 8
4 -> 8 -> 7
Empty list!
```

### 位字段

*

```c
#include<stdio.h>
#include<stdlib.h>
#include<string.h>

struct syn {
    unsigned int f1:1;
    unsigned int   :1;
    unsigned int f2:2;
} synth;

int main(void) {
    printf("struct length: %ld\n", sizeof(struct syn));

    printf("%d %d\n", synth.f1, synth.f2);
    synth.f1 = 1 - synth.f1;
    synth.f2 += 1;
    printf("%d %d\n", synth.f1, synth.f2);

    return 0;
}

```

```c
// 输出
struct length: 4
0 0
1 1
```

### 弹性数组

*   struct 中的数组可以不预设长度，但应该用属性记录实际使用时的长度

```c
struct vstring {
  int len;
  char chars[];
};

```

```c
// 分配空间要手动加上 长度n * sizeof(char)
struct vstring* str = malloc(sizeof(struct vstring) + n * sizeof(char));
str->len = n;
```

((id#oty1HA8pXf5Bw4redoYonS))

## typedef

*   同时有`[]`和`*` ，`[]`优先级更高

```c
char (*(*x(void))[5])(void);

// 等价于

typedef char (*Func)(void);
typedef Func Arr[5];
Arr* x(void);

```

*   `x`是一个函数，返回一个指向 Arr 类型的指针。

*   `Arr`是一个数组，有5个成员，每个成员是`Func`类型。

*   `Func`是一个函数指针，指向一个无参数、返回字符值的函数。

## Union

*   语法类似struct

*   一个Union可以包含不同类型的属性

*   同时只会有一个属性生效, 赋值了其中一个属性，其他属性就会失效

*   它内部可以包含各种属性，但同一时间只能有一个属性，因为所有属性都保存在同一个内存地址，后面写入的属性会覆盖前面的属性。这样做的最大好处是节省空间。

```c
#include<stdio.h>
#include<stdlib.h>

union quantity {
    short count;
    float weight;
    float volume;
};

int main() {
    union quantity q;
    q.count = 4;
    printf("count: %d\n", q.count); //count: 4

    // 不用->直接取(符合类型的)属性
    int *int_p = (int *)&q;
    printf("count: %d\n", *int_p); //count: 4
    return 0;
}
```

## Enum

*   枚举类型的定义是此类型的变量所有可能的取值

*   每种取值会对应一个常量

```c
enum colors {RED, GREEN, BLUE};

printf("%d\n", RED); // 0
printf("%d\n", GREEN);  // 1
printf("%d\n", BLUE);  // 2
```

*   可以指定常量，其后的常量值递增

*   常量值可以相等

```c
enum {
  A,    // 0
  B,    // 1
  C = 4,  // 4
  D,    // 5
  E,    // 6
  F = 3   // 3
  G,    // 4
  H     // 5
}
```

## 预处理器

### 预处理器的工作

*   清理代码：删除注释，多行语句合成一个逻辑行

*   执行`#` 开头的预处理指令

### 预处理指令

*   每个预处理指令都以`#`开头，放在一行的行首，指令前面可以有空白字符（比如空格或制表符）。

*   所有预处理指令都是一行的，除非在行尾使用反斜杠，将其折行。指令结尾处不需要分号。

\*\* #define\*\* 宏

*   直接替换

*   命名规则和变量一样，习惯大写

*   习惯上放头部，其实可以放任何地方

*   宏可以包含宏

*   可以重复定义，但重复定义必须相同

**带参数宏**

```c
#define SQUARE(X) X*X
```

*   为了避免意外的错误，最好多加一层括号

```c
#define SQUARE(X) (X*X)
```

*   也可以空参（其实括号可以省略）

```c
#define getchar() getc(stdin)
```

*   可以宏嵌套

*   可以方便地代替函数

\*\* 不定参数宏\*\*

*   有点像python 的拆包，但只能省略尾部

*   `__VA_ARGS__`代表多余的参数

*   下面这个宏只要要两个参数

```c
#define X(a, b, ...) (10*(a) + 20*(b)), __VA_ARGS__

X(5, 4, 3.14, "Hi!", 12)
// 替换成
(10*(5) + 20*(4)), 3.14, "Hi!", 12

```

`#`\*\*\*\* 还能把剩下的参数转成一个字符串

\*\*\*\*\*\* 运算符\*\*（酷诶）

在被替换部分前面加上`#` ， 可以指定替换为字符串类型

```c
#define STR(x) #x

// 等同于 printf("%s\n", "3.14159");
printf("%s\n", STR(3.14159));
```

```c
#define XNAME(n) "x"#n

// 输出 x4
printf("%s\n", XNAME(4));
```

\*\*\*\*\*\* 运算符 \*\*（这个才更醋！批量生成变量名和标识符！）

`##`运算符起到粘合作用，将参数“嵌入”一个标识符之中。

```c
#define MK_ID(n) i##n

int MK_ID(1), MK_ID(2), MK_ID(3);
// 替换成
int i1, i2, i3;

```

**#undef**

*   取消已经定义的宏

```c
#define LIMIT 400
#undef LIMIT 
```

这个`#undef` 相当于`$ gcc -ULIMIT foo.c`

**#include**

`<>`表示该文件是系统提供的, 通常是标准库文件，不需要写路径

`""` 表示该文件由用户提供，具体的路径取决于编译器的设置，可能是当前目录，也可能是项目的工作目录。

*   GCC 编译器的`-I`参数，也可以用来指定`include`命令中用户文件的加载路径。

*   `$ gcc -Iinclude/ -o code code.c`

**#if...#endif**

*   符合条件时执行宏

```c
#if HAPPY_FACTOR == 0
  printf("I'm not happy!\n");
#elif HAPPY_FACTOR == 1
  printf("I'm just regular\n");
#else
  printf("I'm extra happy!\n");
#endi
```

**#ifdef...#endif**

*   `#ifdef...#endif`指令用于判断某个宏是否定义过。

*   可以配合`#else`

*   `#ifdef`指令，等同于`#if defined`

    ```c
    #if defined FOO
      x = 2;
    #elif defined BAR
      x = 3;
    #endif
    ```

**#ifndef**

*   通常为了防止头文件`myheader.h`被重复加载，可以把它放在`#ifndef...#endif`里面加载。

<!---->

*   **预定义宏** （又一个酷诶的东西出现了）

    *   `__DATE__`：编译日期，格式为“Mmm dd yyyy”的字符串（比如 Nov 23 2021）。

    *   `__TIME__`：编译时间，格式为“hh:mm:ss”。

    *   `__FILE__`：当前文件名。

    *   `__LINE__`：当前行号。

        `#line`指令用于覆盖预定义宏`__LINE__`，将其改为自定义的行号。后面的行将从`__LINE__`的新值开始计数。

    *   `__func__`：当前正在执行的函数名。该预定义宏必须在函数作用域使用。

    *   `__STDC__`：如果被设为1，表示当前编译器遵循 C 标准。

    *   `__STDC_HOSTED__`：如果被设为1，表示当前编译器可以提供完整的标准库；否则被设为0（嵌入式系统的标准库常常是不完整的）。

    *   `__STDC_VERSION__`：编译所使用的 C 语言版本，是一个格式为`yyyymmL`的长整数，C99 版本为“199901L”，C11 版本为“201112L”，C17 版本为“201710L”。

    ```c
    #include <stdio.h>

    int main(void) {
      printf("This function: %s\n", __func__);
      printf("This file: %s\n", __FILE__);
      printf("This line: %d\n", __LINE__);
      printf("Compiled on: %s %s\n", __DATE__, __TIME__);
      printf("C Version: %ld\n", __STDC_VERSION__);
    }

    /* 输出如下

    This function: main
    This file: test.c
    This line: 7
    Compiled on: Mar 29 2021 19:19:37
    C Version: 201710

    */
    ```

**#error**

`#error`指令用于让预处理器抛出一个错误，终止编译。

```c
#if __STDC_VERSION__ != 201112L
  #error Not C11
#endif

```

```bash
// 报错信息
$ gcc -std=c99 newish.c
newish.c:14:2: error: #error Not C11

```

**#pragma**

`#pragma`指令用来修改编译器属性。

```bash
// 使用 C99 标准
#pragma c9x on
```

回到目录
