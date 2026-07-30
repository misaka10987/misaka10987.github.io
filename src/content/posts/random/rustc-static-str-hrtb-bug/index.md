+++
title = "rustc 错误添加 HRTB"
published = 2026-07-30
description = ""
image = ""
tags = []
category = ""
draft = false
lang = ""
+++

# rustc 错误添加 HRTB

我第一次遇见 rustc 编译器 bug. 简单来说，因为 `&'static str` 看上去像引用，rustc 在某些触发条件下，总是会给接受它的闭包添加一个 HRTB（高阶特征约束，也就是 `for<'a>` 这种语法），以致于要求一个固定接受 `&'static str` 的闭包能接受任意生命周期的 `&str` .

我在写 [creeper](https://github.com/misaka10987/creeper) 的 [并行更新](https://github.com/misaka10987/creeper/blob/10327d39b1179977e0ecb1fb72ad7d4a14c5ffda/src/builtin/mod.rs#L166) 时用了 `futures::stream::iter` 从而发现了这个问题。另一个有趣的现象是报错一般出现在别的文件，而不是定义闭包的地方。看上去，rustc 的这个行为只会在让 `Future` 试图满足 trait bound 时发生。

一个尽量最小的可复现实例，需要 `futures = "0.3.32"` :

```rust
#![allow(unused)]

// futures = "0.3.32"
use futures::{StreamExt, TryStreamExt, stream};

const ID: [&str; 2] = ["foo", "bar"];

struct Library;

impl Library {
    async fn update(&self) -> Result<(), ()> {
        // compiles
        #[cfg(true)]
        stream::iter([0, 1])
            .map(|idx| async move {
                let _ = ID[idx];
                Ok(())
            })
            .buffer_unordered(2)
            .try_collect::<()>()
            .await?;

        // error
        #[cfg(false)]
        stream::iter(ID)
            .map(|id| async move {
                let _ = id;
                Ok(())
            })
            .buffer_unordered(2)
            .try_collect::<()>()
            .await?;

        Ok(())
    }
}

trait Execute {
    fn execute(self, lib: &Library) -> impl std::future::Future<Output = Result<(), ()>> + Send;
}

struct Update;

impl Execute for Update {
    async fn execute(self, lib: &Library) -> Result<(), ()> {
        lib.update().await?;
        Ok(())
    }
}
```
