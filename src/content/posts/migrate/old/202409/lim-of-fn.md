+++
title = 'epsilon-delta极限定义的思维过程'
published = 2024-09-10
+++

## Attempt 1

“极限就是越来越近。”

定义 $\lim_{x\rightarrow a^-}f(x)=L$ iff:

$\forall \Delta_x'\le\Delta_x$, $|f(a-\Delta_x')-L|\le|f(a-\Delta_x)-L|$.

依样定义右极限，并定义左右极限相等时极限存在。

容易发现根据上述定义，$\lim_{x\rightarrow+\infin}\frac{1}{x}$ 鉴于在 $\R^+$ 上单调减，其极限可以是任意非正实数。

这不是我们所期待的。我们希望上述极限定义为 $0$ 。

## Attempt 2

“极限是越来越近，且可以无限接近。”

定义 $\lim_{x\rightarrow a^-}f(x)=L$ iff:

- $\forall \Delta_x'\le\Delta_x$ , $|f(a-\Delta_x')-L|\le|f(a-\Delta_x)-L|$; and

- $\forall \Delta_y\in\R^+$, $\exist\Delta_x$ s.t. $|f(a-\Delta_x)-L|\le\Delta_y$.

上述定义成功排除了多余的极限值。但是，可以发现，鉴于其对函数整个定义域上的单调性作要求，这似乎严格地排除了过多函数，使得定义不甚实用。

我们希望得到能使类似于 $\lim_{x\rightarrow0}\cos x=1$ 的极限定义（而非现在的未定义）。

## Attempt 3

“在 $a$ 上的极限是在一个包含 $a$ 的范围内越来越近，且可以无限接近。”

定义 $\lim_{x\rightarrow a^-}f(x)=L$ iff $\exist\Delta_0\in\R^+$ s.t.:

- $\forall0\lt\Delta_x'\le\Delta_x<\Delta_0$ , $|f(a-\Delta_x')-L|\le|f(a-\Delta_x)-L|$; and

- $\forall \Delta_y\in\R^+$, $\exist\Delta_x\le\Delta_0$ s.t. $|f(a-\Delta_x)-L|\le\Delta_y$.

上述定义允许更多函数的极限被定义。

这似乎是完备的。但是，知晓数列极限的定义，依然能容易地给出定义的不足之处：此定义对于不断振荡——不单调，但在接近确定值的函数未能给出定义。例如，我们希望像 $\lim_{x\rightarrow0}x\sin\frac{1}{x}$ 这样的极限被定义为 $0$ ，而非未定义。

## Attempt 4

“在 $a$ 上的极限是在一个包含 $a$ 的范围内可以无限接近，且对于某个值，总存在一个更小的值使得在更小的值以后的所有函数值都要更近。”

定义 $\lim_{x\rightarrow a^-}f(x)=L$ , iff $\exist \Delta_0\in\R^+$ s.t.:

let $g(x)=|f(a-x)-L|$ ;

- $\forall \Delta y\in\mathbb{R}^+$ , $\exist \Delta x\le\Delta_0$ s.t. $g(\Delta x)\le\Delta y$ ; and

- $\forall \Delta_1\le\Delta_0$ , $\exist\Delta x\le\Delta_1$ s.t. $\forall\Delta'x\le\Delta x$ , $g(\Delta'x)\le g(\Delta_1)$ .

这个定义很完美！

## 简化版本

我们对 Attempt 4 作出一些简化，便可以得到极限的 $\epsilon$ - $\delta$ 定义：

$\lim_{x\rightarrow a}f(x)=L$ iff $\forall\epsilon\in\R^+$, $\exist\delta$ s.t. $\forall|x-a|<\delta$, $|f(x)-L|<\epsilon$.

- 很显然此定义满足 Attempt 4 的第一条；

- 对于 Attempt 4 的第二条，由于规定了差小于 $\delta$ 的所有值，因此函数确实在越来越近；

- 此定义不会排除 Attempt 3 类似的函数，这是由于 $\delta$ 可以任意小。
