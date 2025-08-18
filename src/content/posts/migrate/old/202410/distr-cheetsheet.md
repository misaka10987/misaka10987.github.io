+++
title = 'Distribution Cheetsheet'
published = 2024-10-14
+++

## 分布

分布是一个高阶函数。

- 二项分布：$B:\Z\Rightarrow\R\Rightarrow(\Z\Rightarrow\R)=(n,p)\mapsto x\mapsto{n\choose x}p^x(1-p)^{n-x}$ ;

- 超几何分布：$H:\Z\Rightarrow\Z\Rightarrow\Z\Rightarrow(\Z\Rightarrow\R)=(n,K,N)\mapsto x\mapsto\frac{{K\choose x}{N-K\choose n-x}}{N\choose n}$ ;

- 正态分布：$N:\R\Rightarrow\R\Rightarrow(\R\Rightarrow\R)=(\mu,\sigma)\mapsto x\mapsto\frac{1}{\sigma\sqrt{2\pi}}\exp(-\frac{(x-\mu)^2}{2\sigma^2})$ .

## 期望

$$
{\rm E}:({\rm Dom}\Rightarrow\R)\Rightarrow\R=f\mapsto x\mapsto\int_{\rm Dom}xf(x){\rm d}x
$$

${\rm E}(l\circ f)=l\circ{\rm E}(f)$ 对于线性映射 $l$ .

${\rm E}(x\mapsto f(x)g(x))=E(f)E(g)$ 当 $f$ 与 $g$ 无关。

## 方差

$$
\begin{align*}
{\rm D}&:({\rm Dom}\Rightarrow\R)\Rightarrow\R\newline
&=f\mapsto x\mapsto \int_{\rm Dom}(x-{\rm E}(f))^2{\rm d}x\newline
&=f\mapsto {\rm E}((x\mapsto x^2)\circ f)-{\rm E}(f)^2
\end{align*}
$$

${\rm D}((x\mapsto x+a)\circ f)={\rm D}(f)$ .

${\rm D}((x\mapsto ax)\circ f)=a^2{\rm D}(f)$ .

## 协方差

$$
\begin{align*}
{\rm cov}&:(\R\Rightarrow\R)\Rightarrow(\R\Rightarrow\R)\Rightarrow\R\newline
&=(f,g)\mapsto{\rm E}(x\mapsto(f(x)-{\rm E}(f))(g(x)-{\rm E}(g)))\newline
&={\rm E}(x\mapsto f(x)g(x))-{\rm E}(f){\rm E}(g)
\end{align*}
$$

${\rm cov}(f,f)={\rm D}(f)$ .

${\rm cov}(f,g)={\rm cov}(g,f)$ .

${\rm cov}((x\mapsto ax)\circ f,(x\mapsto bx)\circ g)=ab{\rm cov}(f,g)$ .

## 常用公式

${\rm E}(B(n,p))=np$ .

${\rm D}(B(n,p))=np(1-p)$ .

${\rm E}(H(n,K,N))=\frac{Kn}N$ .

${\rm D}(H(n,K,N))=\frac{n(N-n)K(N-K)}{N^2(N-1)}$ .

${\rm D}(x\mapsto af(x)+bg(x))=a^2{\rm D}(f)+b^2{\rm D}(g)+2ab{\rm cov}(f,g)$ .

${\rm D}(\sum_nf_n)=\sum_{i=0}^n{\rm D}(f_i)+2\sum_{j=0}^i{\rm cov}(f_i,f_j)$ .

${\rm cov}(\sum_nf_n,\sum_mg_m)=\sum_n\sum_m{\rm cov}(f_n,g_m)$ .
