+++
title = "向量空间公理蕴含加法交换律"
published = 2026-08-04
description = ""
image = "cover.jpg"
tags = ["Linear Alg"]
category = ""
draft = false
lang = ""
+++

# 向量空间公理蕴含加法交换律

看到这一道练习题：

> Prove that for a vector space $V$ over a field that does not have characteristic $2$ , the hypothesis that $V$ is commutative under addition is redundant.[^1]

虽然题目说加法交换的条件是多余的，但其实 $\mathrm{char} = 2$ 的条件也是多余的，只要满足模块定义中的四条公理，向量加法群就一定交换（考虑 $2(\mathbf v + \mathbf u)$ , 始终能展开成 $\mathbf v + \mathbf v + \mathbf u + \mathbf u$ 和 $\mathbf v + \mathbf u + \mathbf v + \mathbf u$ , 然后消去就有 $\mathbf v + \mathbf u = \mathbf u + \mathbf v$ ）.

另外，不得不吐槽用 AI 检查时坚信我们的「证明」引用加法交换律，所以认定为循环论证。

```lean4
import Mathlib
import Mathlib.Algebra.Group.Defs
import Mathlib.Algebra.Field.Defs

variable (V F : Type) (_: AddGroup V) (_: Field F)

variable (_ : SMul F V)

variable (smul_add : ∀ (a : F) (v u : V), a • (v + u) = a • v + a • u)

variable (add_smul : ∀ (a b : F) (v : V), (a + b) • v = a • v + b • v)

variable (mul_smul : ∀ (a b : F) (v : V), (a * b) • v = a • (b • v))

variable (one_smul : ∀ (v : V), (1 : F) • v = v)

example (v u : V) : v + u = u + v := by
  suffices h : v + v + u + u = v + u + v + u by
    simpa [add_assoc] using add_right_cancel h

  have two : (2 : F) = 1 + 1 := by ring

  have h1: (2 : F) • (v + u) = v + v + u + u := by
    simp [two, smul_add, add_smul, one_smul, add_assoc]

  have h2: (2 : F) • (v + u) = v + u + v + u := by
    simp [two, add_smul, smul_add, one_smul, add_assoc]

  simp [←h1, ←h2]
```

[^1]: J. Gallian, "Vector Spaces" in *Contemporary Abstract Algebra*, ninth ed. Cengage Learning, 2015.
