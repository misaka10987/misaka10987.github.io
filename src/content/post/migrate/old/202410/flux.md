+++
title = '通量和散度'
published = 2024-10-13
+++

## 通量

通量 (Flux) 用以描述一个向量场“穿过”曲面的部分的大小。

向量场 $\bold A$ 在曲面 $\Sigma$ 上的通量 $\Phi_{\bold A}(\Sigma)$ 定义为：

$$
\Phi_{\bold A}(\Sigma)=\iint_\Sigma\bold A\cdot\bold n{\rm d}S
$$

其中 $\bold n$ 为曲面在每一点上的**单位法向量**。一点上的单位法向量是自这一点垂直曲面向外的单位向量。

上述形式的通量是标量。

### 混乱邪恶

在一些情境下，通量还可以指向量场在曲面上**某一点**的**向量**在其**单位法向量**上的投影。

*相当于上文中 $\bold A\cdot\bold n$ .*

我们不采用这种说法。在需要时，用「通量密度」代替。

## 散度

散度 (Divergence) 用以描述向量场中的某一点附近的向量“趋向”或“远离”该点的趋势。标量。

向量场 $\bold A$ 在点 $x$ 的散度 ${\rm div}\bold A(x)$ 定义为：

$$
{\rm div}\bold A(x)=\lim_{\delta V\rightarrow\{x\}}\frac{\Phi_\bold A(\Sigma)}{|\delta V|}
$$

其中 $\Sigma$ 是包含点 $x$ 的一个封闭曲面， $\delta V$ 为该曲面内的微小体元， $|\delta V|$ 为此微小体元的体积。上述定义可直观理解为以 $x$ 为球心的无穷小球上的通量。

向量场 $\bold A$ 的散度场记作 $\nabla\cdot\bold A$ .

## 散度定理

散度定理（或高斯散度定理）指出：

> 曲面上的通量等于散度在曲面内体积上的积分。

即对于曲面 $\Sigma$ , 围起的体积为 $\Omega$ 时：

$$
\iiint_\Omega{\rm div}\bold A(x){\rm d}v=\Phi_\bold A(\Sigma)
$$

可以如是直观理解：向量从体积中的所有点“涌出”的的相加，就是向量在整个体积内“产生”的量，也就是通过曲面“外溢”的量。

「散度是通量的体密度。」
