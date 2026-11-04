+++
title = '在 Maxima 中计算矩阵的简化行阶梯形式'
published = 2025-09-06
description = ''
image = ''
tags = ['Maxima', 'Linear Alg']
category = ''
draft = false
lang = ''
+++

# 在 Maxima 中计算矩阵的简化行阶梯形式

[Maxima](https://maxima.sourceforge.io/) 中仅提供了 `echelon` 函数用于计算矩阵的行阶梯形式 (row echelon form), 默认并不能计算简化行阶梯形式 (reduced row echelon form).

笔者在完成数学作业时具有计算简化行阶梯形式的需求，最终在这一 [Stack Overflow](https://stackoverflow.com/questions/30693793/how-to-find-the-reduced-row-echelon-form-of-a-matrix-in-maxima) 找到了手动实现。

```c
rref(a):=block([p,q,k],[p,q]:matrix_size(a),a:echelon(a),
    k:min(p,q),
    for i thru min(p,q) do (if a[i,i]=0 then (k:i-1,return())),
    for i:k thru 2 step -1 do (for j from i-1 thru 1 step -1 do a:rowop(a,j,i,a[j,i])),
    a)
```

实现采用了朴素的循环方法，将矩阵化为行阶梯形式后从上到下消每一个主元上面的元素。
