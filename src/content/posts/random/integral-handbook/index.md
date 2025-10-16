+++
title = '常用积分快速参考手册'
published = 2025-10-10
description = ''
image = ''
tags = ['Reference', 'Analysis']
category = ''
draft = false
lang = ''
+++

# 常用积分快速参考手册

> [!NOTE]
> 
> 如果需要计算不定积分，请注意本文中均省略了常数 $+C$ .

## 幂函数

幂函数

$$
\int x^p \,\mathrm d x
= \frac{1}{p+1} x^{p+1}
$$

特别地，$x^{-1}$ , 如果积分有定义

$$
\int \frac{1}{x} \,\mathrm d x
= \ln \left| x \right|
$$

## 指数函数

指数函数

$$
\int \exp x \,\mathrm d x
= \exp x
$$

以任意 $a: \R > 0$ 为底

$$
\int a^x \,\mathrm d x
= \frac{1}{\ln a} a^x
$$

## 对数函数

自然对数

$$
\int \ln x \,\mathrm d x
= x \ln x - x
$$

以任意 $a: \R > 0$ 为底

$$
\int \log_a x \,\mathrm d x
= \frac{1}{\ln a}(x \ln x - x)
$$

## 三角函数

正弦

$$
\int \sin x \,\mathrm d x
= \cos x
$$

余弦

$$
\int \cos x \,\mathrm d x
= -\sin x
$$

正切，如果积分有定义

$$
\int \tan x \,\mathrm d x
= - \ln \left| \cos x \right|
$$

## 反三角函数

反正弦导数

$$
\int \frac{1}{\sqrt{1 - x^2}} \,\mathrm d x
= \arcsin x
$$

反正切导数

$$
\int \frac{1}{1 + x^2} \,\mathrm d x
= \arctan x
$$

## 双曲函数

双曲正弦

$$
\int \sinh x \,\mathrm d x
= \cosh x
$$

双曲余弦

$$
\int \cosh x \,\mathrm d x
= \sinh x
$$

## 反双曲函数

> [!TIP]
> 
> 这与反三角函数类似。

反双曲正弦导数

$$
\int \frac{1}{\sqrt{x^2 + 1}} \,\mathrm d x
= \operatorname{arsinh} x
$$

反双曲余弦导数

$$
\int \frac{1}{\sqrt{x^2 - 1}} \,\mathrm d x
= \operatorname{arcosh} x
$$

## 二级结论

导数除以自身

$$
\int \frac{f'(x)}{f(x)} \,\mathrm d x
= \ln \left| f(x) \right|
$$

反正弦推广，如果积分有定义

$$
\int \frac{1}{\sqrt{a^2 - x^2}} \,\mathrm d x
= \arcsin \frac{x}{a}
$$

反正切推广

$$
\int \frac{1}{a^2 + x^2} \,\mathrm d x
= \frac{1}{a} \arctan \frac{x}{a}
$$

反双曲正弦推广

$$
\int \frac{1}{\sqrt{x^2 + a^2}}
= \operatorname{arsinh} \frac{x}{\left| a \right|}
$$

反双曲余弦推广，如果积分有定义

$$
\int \frac{1}{\sqrt{x^2 - a^2}}
= \operatorname{arcosh} \frac{x}{\left| a \right|}
$$
