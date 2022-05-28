# Manim

## 目录

*   [基础函数](#基础函数)

    *   *   [创建图形](#创建图形)

        *   [创建文字](#创建文字)

        *   [播放动画](#播放动画)

        *   [the .animate syntax](#the-animate-syntax)

        *   [创建公式](#创建公式)

        *   [公式变换](#公式变换)

        *   [其他例子](#其他例子)

*   [运行方式](#运行方式)

    *   [记录](#记录)

## 基础函数

`from manim import *`

#### 创建图形

*   `blue_circle = Circle(color=BLUE, fill_opacity=0.5)`

*   `blue_circle = circle.set_color(BLUE).set_opacity(0.5)`

#### 创建文字

```python
label = Text("A wild circle appears!")
  label.next_to(blue_circle, DOWN, buff=0.5)
```

*   与`next_to`类似的有`shift` `to_edge`,` to_corner`, `move_to`, 参数不一样

#### 播放动画

*   `self.play(*animations, **kwargs)`

*   `self.wait()`

*   `self.play(Create(blue_circle), Write(label))`

*   `Create`, `FadeIn`, `DrawBorderThenFill`

#### the .animate syntax

*   给定开始个结束状态，生成过程动画

*   可接`next_to`, `shift`, `rotate`, `scale`

*   下面是例子

```python
%%manim -v WARNING -qm CircleAnnouncement

class CircleAnnouncement(Scene):
    # 字幕本来在中间，字幕向上移动的同时在中间画个圆
    def construct(self):
        blue_circle = Circle(color=BLUE, fill_opacity=0.5)
        announcement = Text("Let us draw a circle.")
        
        self.play(Write(announcement))
        self.wait()
        
        self.play(announcement.animate.next_to(blue_circle, UP, buff=0.5))
        self.play(Create(blue_circle))
```

```python
%%manim -v WARNING -qm AnimateSyntax

class AnimateSyntax(Scene):
    # 图形的各种变化
    def construct(self):
        triangle = Triangle(color=RED, fill_opacity=1)
        self.play(DrawBorderThenFill(triangle))
        self.play(triangle.animate.shift(LEFT))
        self.play(triangle.animate.shift(RIGHT).scale(2))
        self.play(triangle.animate.rotate(PI/3))
```

```python
%%manim -v WARNING -qm DifferentRotations

class DifferentRotations(Scene):
    # 左边方形缩小再放大 (实际上是旋转了PI)
    # 右边方形逆时针旋转
    # 这是.animate语法的特性，只指定开始和终止状态，但不对过程作要求
    def construct(self):
        left_square = Square(color=BLUE, fill_opacity=0.7).shift(3*LEFT)
        right_square = Square(color=GREEN, fill_opacity=0.7).shift(2*RIGHT)
        self.play(left_square.animate.rotate(PI), Rotate(right_square, angle=PI), run_time=2)
        self.wait()
```

#### 创建公式

*   `MathTex` 可以用来创建简单的 LaTeX, 如果要 LaTeX 的 normal mode, 要用`Tex`

```python
%%manim -v WARNING -qm CauchyIntegralFormula

class CauchyIntegralFormula(Scene):
    def construct(self):
        formula = MathTex(r"[z^n]f(z) = \frac{1}{2\pi i}\oint_{\gamma} \frac{f(z)}{z^{n+1}}~dz")
        self.play(Write(formula), run_time=3)
        self.wait()
```

#### 公式变换

*   下面这个例子中，双花括号起到在变化过程中分组的作用

*   `TransformMatchingTex` 会去试图识别式子里的 Tex 分组

*   `TransformMatchingShapes` 没有那么智能，只追求形状上的相近

```python
%%manim -v WARNING -qm TransformEquation

class TransformEquation(Scene):
    def construct(self):
        eq1 = MathTex("42 {{ a^2 }} + {{ b^2 }} = {{ c^2 }}")
        eq2 = MathTex("42 {{ a^2 }} = {{ c^2 }} - {{ b^2 }}")
        eq3 = MathTex(r"a^2 = \frac{c^2 - b^2}{42}")
        self.add(eq1)
        self.wait()
        self.play(TransformMatchingTex(eq1, eq2))
        self.wait()
        self.play(TransformMatchingShapes(eq2, eq3))
        self.wait()
```

#### 其他例子

重点框

```python
%%manim -v WARNING -qm FormulaEmphasis

class FormulaEmphasis(Scene):
    def construct(self):
        product_formula = MathTex(
            r"\frac{d}{dx} f(x)g(x) =",
            r"f(x) \frac{d}{dx} g(x)",
            r"+",
            r"g(x) \frac{d}{dx} f(x)"
        )
        self.play(Write(product_formula))
        box1 = SurroundingRectangle(product_formula[1], buff=0.1)
        box2 = SurroundingRectangle(product_formula[3], buff=0.1)
        self.play(Create(box1))
        self.wait()
        self.play(Transform(box1, box2))
        self.wait()
```

渲染代码

```python
%manim -v WARNING -qm CodeFromString

class CodeFromString(Scene):
    def construct(self):
        code = '''from manim import Scene, Square

class FadeInSquare(Scene):
    def construct(self):
        s = Square()
        self.play(FadeIn(s))
        self.play(s.animate.scale(2))
        self.wait()
'''
        rendered_code = Code(code=code, tab_width=4, background="window",
                            language="Python", font="Monospace")
        self.play(Write(rendered_code))
        self.wait(2)
```

花里胡哨

```python
%%manim -qm -v WARNING OpeningManim

class OpeningManim(Scene):
    def construct(self):
        title = Tex(r"This is some \LaTeX")
        basel = MathTex(r"\sum_{n=1}^\infty \frac{1}{n^2} = \frac{\pi^2}{6}")
        VGroup(title, basel).arrange(DOWN)
        self.play(
            Write(title),
            FadeIn(basel, shift=UP),
        )
        self.wait()

        transform_title = Tex("That was a transform")
        transform_title.to_corner(UP + LEFT)
        self.play(
            Transform(title, transform_title),
            LaggedStart(*[FadeOut(obj, shift=DOWN) for obj in basel]),
        )
        self.wait()

        grid = NumberPlane(x_range=(-10, 10, 1), y_range=(-6.0, 6.0, 1))
        grid_title = Tex("This is a grid")
        grid_title.scale(1.5)
        grid_title.move_to(transform_title)

        self.add(grid, grid_title)
        self.play(
            FadeOut(title),
            FadeIn(grid_title, shift=DOWN),
            Create(grid, run_time=3, lag_ratio=0.1),
        )
        self.wait()

        grid_transform_title = Tex(
            r"That was a non-linear function \\ applied to the grid"
        )
        grid_transform_title.move_to(grid_title, UL)
        grid.prepare_for_nonlinear_transform()
        self.play(
            grid.animate.apply_function(
                lambda p: p + np.array([np.sin(p[1]), np.sin(p[0]), 0])
            ),
            run_time=3,
        )
        self.wait()
        self.play(Transform(grid_title, grid_transform_title))
        self.wait()
```

[OpeningManim@2022-02-23@21-43-14\_1645652861450\_0.mp4](video/OpeningManim@2022-02-23@21-43-14_1645652861450_0_x.mp4)

## 运行方式

*   Jupyter notebook

    *   `%%manim -v WARNING -qm CircleAnnouncement` Jupyter Notebook magic command

*   本地

    *   cmd: `manim -pqm [script_name].py [class_name]`

        *   \-qm 是 -quality=medium, 还有 -ql -qh

### 记录

写了个倒数动画放b站
