+++
title = 'Cargo 会自动使用 Git 的 HTTP 代理'
published = 2025-10-01
description = ''
image = ''
tags = []
category = ''
draft = false
lang = ''
+++

# Cargo 会自动使用 Git 的 HTTP 代理

Cargo（ Rust 包管理器）采用了 [Git 仓库](https://github.com/rust-lang/crates.io-index) 作为包注册索引。因此，在执行 Cargo 事务时，其会先尝试同步更新 Git 仓库。在这个过程中，Cargo 被实现为自动采用 Git 的 `http.proxy` 指定的 HTTP 代理。

> [!NOTE]
> 
> 较新版本的 Cargo 实现了稀疏索引机制，允许快速地通过 HTTP API 检索包。虽然，尊重 `http.proxy` 的机制没有受到影响。

这个问题的起因是作者发现当本地的 HTTP 代理服务尚未启动时，Cargo 表现为不能执行几乎任何事务，即使在配置文件 `$HOME/.cargo/config.toml` 中未指定任何 HTTP 代理也是如此。造成这一令人困惑的现象的原因就是 Cargo 隐式地读取了 Git 的配置项。
