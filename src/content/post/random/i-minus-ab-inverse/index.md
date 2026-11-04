+++
title = '关于一个逆矩阵问题的构造思路'
published = 2025-09-25
description = '如果 I - AB 可逆，是否 I - BA 可逆？'
image = ''
tags = ['Linear Alg']
category = ''
draft = false
lang = ''
+++

# 关于一个逆矩阵问题的构造思路

这事实上是笔者遇到的某道作业题。我们有结论

> 如果 $A: \R^{m \times n}$ , $B: \R^{n \times m}$ , 如果 $\mathbf 1_m - AB$ 可逆，则 $\mathbf 1_n - BA$ 可逆。

这个结论的证明不难检验。我们构造

$$
X = \mathbf 1_n + B (\mathbf 1_m - AB)^{-1} A
$$

并计算

$$
\begin{align*}
(\mathbf 1_n - BA) X
& = (\mathbf 1_n - BA) (\mathbf 1_n + B (\mathbf 1_m - AB)^{-1} A) \\
& = \mathbf 1_n + B (\mathbf 1_m - AB)^{-1} A
- BA + BAB (\mathbf 1_m - AB)^{-1} A \\
& = \mathbf 1_n - BA
+ B ((\mathbf 1_m - AB)^{-1} + AB (\mathbf 1_m - AB)^{-1}) A \\
& = \mathbf 1_n - BA + B (\mathbf 1_m + AB) (\mathbf 1_m - AB)^{-1} A \\
& = \mathbf 1_n - BA + BA \\
& = \mathbf 1_n
\end{align*}
$$

即可。但是，这个构造似乎有些复杂，直接猜想多半是找不到的。因此，我们事实上需要通过某些方式「解」出这个构造。

直接设 $(\mathbf 1_n - BA)^{-1} = X$ 并不是一个好主意，读者可以自行尝试如此，我们除了应用定义以外似乎做不了任何事情。因此我们需要让问题复杂化一点。

观察条件，事实上我们需要求一个 $X$ , 使得 $(\mathbf 1_n - BA) X = \mathbf 1_n$ . 我们发现等式的两边都有 $\mathbf 1_n$ , 或许可以联想到 $\mathbf 1_n \mathbf 1_n = \mathbf 1_n$ 这一事实。我们可以设 $X = \mathbf 1_n + X_1$ 的形式。这样，等式的左边就已经有一个 $\mathbf 1_n$ , 只要让 $X_1$ 满足能够抵消掉其他的项即可。

$$
X_1 - BA - BAX_1 = \mathbf 0_{n \times n}
$$

这个方程至少有了更多可处理的方式。现在是整个过程中最难想到的一步。我们想要利用上 $(\mathbf 1_m - AB)^{-1}$ , 就需要有 $AB$ 的形式。但是现在等式中只有 $BA$ . 我们希望在与 $X_1$ 的乘法中出现 $AB$ , 观察到现在 $(\mathbf 1_n - BA)$ 结尾已经有一个 $A$ , 我们让 $X_1$ 的开头补上一个 $B$ 来凑成 $AB$ .

设 $X_1 = B X_2$ . 则有

$$
BX_2 - BA - BABX_2 = \mathbf 0_{n \times n}
$$

化简

$$
B (\mathbf 1_m - AB) X_2 = BA
$$

这时就可以看出令 $X_2 = (\mathbf 1_m - AB)^{-1} A$ 即可。于是就有了 $X = \mathbf 1_n + B (\mathbf 1_m - AB)^{-1} A$ .
