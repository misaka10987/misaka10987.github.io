+++
title = '代数视角下的秩零度定理'
published = 2025-11-06
description = ''
image = ''
tags = ['Linear Alg']
category = ''
draft = false
lang = ''
+++

# 代数视角下的秩零度定理

我们可能见过如下关于矩阵的结论

> **线性代数基本定理** 对于矩阵 $A : \R^{m \times n}$ , 有
> 
> - $\dim(\operatorname{Col} A) = \dim(\operatorname{Row} A) = \operatorname{rank} A$ ;
> 
> - $\dim(\operatorname{Null} A) = n - \operatorname{rank} A$ ;
> 
> - $\dim(\operatorname{Null} A^\mathrm T) = m - \operatorname{rank} A$ .

或者，去掉两个关于 $A^\mathrm T$ 的结论，我们可以得到一个方向上的等价形式

> **秩零度定理** 对于矩阵 $A : \R^{m \times n}$ , $\operatorname{rank} A + \operatorname{nullity} A = n$ .

初学线性代数时，通常采用朴素方法直接考虑向量空间的基来处理该问题。本文旨在从代数视角下重新审视这一定理，并作出证明。

## 从矩阵到线性变换

一个矩阵 $A : \R^{m \times n}$ 可以看作线性变换 $f_A : \R^n \to \R^m = \mathbf x \mapsto A \mathbf x$ , 而矩阵之间的乘法就是函数之间的复合。有了这种对应关系，我们在下文中可以始终从线性变换的视角来看待矩阵。

同时，在线性变换的视角下，矩阵作为函数的话，不难注意到其零空间和列空间直接就是映射的 [核](https://zh.wikipedia.org/wiki/%E6%A0%B8_(%E4%BB%A3%E6%95%B0)) 与 [像](https://zh.wikipedia.org/wiki/%E5%83%8F_(%E6%95%B8%E5%AD%B8)) 。

因此，我们可以将秩零度定理改写成这样的形式

> $A : \R^n \to \R^m$ , $\dim(\operatorname{im} A) + \dim(\ker A) = n$ .

即，线性变换的定义域的维度等于像的维度加上核的维度。

## 推广形式

由于 [维度](https://zh.wikipedia.org/wiki/%E7%B6%AD%E5%BA%A6) 被定义为基向量的数量，类似的命题在所有 $\mathbb F$ - 向量空间内都可以定义。我们给出线性代数基本定理在这样推广后的版本

> **线性代数基本定理** 设 $V$ , $W$ 是向量空间，$A : V \to W$ 是其间的线性变换，则有
> 
> $$
> \dim(\operatorname{im} A) + \dim(\ker A) = \dim V
> $$

而这个定理的证明可以从向量空间的视角来展开思考。我们直觉认为 $\ker A$ 中的元素都被映到 $\mathbf 0_W$ 上，可以视作「对像的维度没有任何贡献」，而去掉这部分之后的定义域应该和像有相同的维度，也就是线性同构于像。

> **证明** 
> 
> 将目标简单恒等变换即
> 
> $$
> \dim(\operatorname{im} A) = \dim V - \dim (\ker A)
> $$
> 
> 显然 $\ker A$ 是 $V$ 的子空间。我们 [商](https://zh.wikipedia.org/wiki/%E5%95%86%E7%A9%BA%E9%97%B4_(%E7%BA%BF%E6%80%A7%E4%BB%A3%E6%95%B0)#%E4%BE%8B%E5%AD%90%E4%B8%8E%E6%80%A7%E8%B4%A8) 掉它即
> 
> $$
> \dim(\operatorname{im} A) = \dim(V / \ker A)
> $$
> 
> 维度相等等价于线性同构，即
> 
> $$
> \operatorname{im} A \cong V / \ker A
> $$
> 
> 要证线性同构，我们构造一个映射
> 
> $$
> T : V / \ker A \to \operatorname{im} A = [\mathbf v] \mapsto A(\mathbf v)
> $$
> 
> 并证明它是线性同构。
> 
> > [**第一同构定理**](https://en.wikipedia.org/wiki/Quotient_space_(linear_algebra)#First_Isomorphism_Theorem) 令 $T : V \to W$ 是 $\mathbb F$ - 向量空间 $V$ , $W$ 之间的线性变换，则 $\tilde T : V / \ker T \to W = [\mathbf v] \mapsto T(\mathbf v)$ 是良定义的线性同构。
> > 
> > **证明** 
> > 
> > - **良定义** 令 $\mathbf v_1, \mathbf v_2 \in [\mathbf v]$ , 则 $\mathbf v_1 - \mathbf v_2 \in \ker T$ , $T(\mathbf v_1 - \mathbf v_2) = \mathbf 0_W$ , $T(\mathbf v_1) = T(\mathbf v_2)$ .
> > 
> > - **双射** 
> >   
> >   - **单射** 若 $\tilde T([\mathbf v_1]) = \tilde T([\mathbf v_2])$ , 则 $T(\mathbf v_1) = T(\mathbf v_2)$ , $T(\mathbf v_1 - \mathbf v_2) = \mathbf 0_W$ , $\mathbf v_1 - \mathbf v_2 \in \ker T$ , 由定义可知 $[\mathbf v_1] = [\mathbf v_2]$ . 
> >   
> >   - **满射** 因为 $T$ 是到 $\operatorname{im} T$ 的满射，对定义域中的每个元素取其生成的等价类，显然 $\tilde T$ 是满射。
> > 
> > - **线性** $\tilde T([\mathbf v_1] + [\mathbf v_2]) = \tilde T([\mathbf v_1 + \mathbf v_2]) = T(\mathbf v_1 + \mathbf v_2) = T(\mathbf v_1) + T(\mathbf v_2) = \tilde T([\mathbf v_1]) + \tilde T([\mathbf v_2])$ .
> > 
> > $\square$ .
> 
> $\square$ .

这是一个纯代数角度的证明，对所有的向量空间都有效。

## 秩零度定理的本质含义

一种从「信息」出发的理解方式是，线性映射 $T : \mathbb F^n \to \mathbb F^m$ 输入的信息量一共有 $n$ , 输出的信息量却只有 $m$ , 因此，有 $n - m$ 的信息在这个过程中被摧毁了，这是通过重复映射到 $0$ 上从而不可逆来实现的。被摧毁的部分即 $\ker T$ .

类似地，在群论中也有表达这一结论的定理

> **第一同构定理** 若 $G$ , $H$ 是群，$f : G \to H$ 是同态，则 $G / \ker f \cong \operatorname{im} f$ .

这些结论通过 [阿贝尔范畴](https://zh.wikipedia.org/wiki/%E9%98%BF%E8%B2%9D%E7%88%BE%E7%AF%84%E7%96%87) 统一描述。
