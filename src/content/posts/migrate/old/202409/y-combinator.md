+++
title = 'Y-组合子及其推导过程'
published = 2024-09-21
+++

在传统方法下，我们很难在无类型 $\lambda$ - 演算这样的**匿名**上下文中进行函数的递归。

为解决此问题，我们希望有一个函数用以“得到函数自身”，即为 Y - 组合子。

Y - 组合子使用 $\lambda$ - 演算定义为：

$$
Y=\lambda f.(\lambda x.f(x\space x))\space(\lambda x.f(x\space x))
$$

Y - 组合子应用于函数：

$$
\begin{align}
Y\space f
&=(\lambda x.f(x\space x))\space(\lambda x.f(x\space x))\newline
&=f\space((\lambda x.f(x\space x)\space(\lambda x.f(x\space x)))\newline
&=f(Y\space f)
\end{align}
$$

即进行两次 $\beta$ - 规约并将 (1) 代入 (3)。最终我们得到：

$$
Y\space f=f\space(Y\space f)
$$

Y - 组合子或称不动点组合子，因其将函数映射到其不动点上。

> 若 $f\space x=x$ ，则称 $x$ 是 $f$ 的一个不动点。

## 推导

Y - 组合子的推导过程实质上就是解不动点方程 $Y\space f=f\space(Y\space f)$ 的过程。

考虑不断迭代该不动点方程：

$$
Y\space f=f\space(Y\space f)=f\space f\space(Y\space f)=f\space f\space f\space...
$$

将这个无限长的序列称作 $g$ ，则有 $g = f\space g$.

由于序列无限长，不妨将其截半，设 $g=g'\space g'$. 这是因为我们希望可以得一个带有函数的参数的表达式在方程中，以便于解得函数。

则有

$$
g'\space g'=f(g'\space g')
$$

如此构成了一个合法的函数定义：

$$
g'=\lambda x.f(x\space x)
$$

代入原方程即可得：

$$
Y\space f=g=g'\space g'=(\lambda x.f(x\space x))\space(\lambda x.f(x\space x))\\
Y=\lambda f.(\lambda x.f(x\space x))\space(\lambda x.f(x\space x))
$$

这样就得到了 $Y$ 的定义。
