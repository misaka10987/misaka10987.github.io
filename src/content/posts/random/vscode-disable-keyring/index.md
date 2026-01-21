+++
title = '禁用 VS Code 的操作系统密钥环支持'
published = 2026-01-21
description = ''
image = ''
tags = ['Unix']
category = ''
draft = false
lang = ''
+++

# 禁用 VS Code 的操作系统密钥环支持

编辑

```json5
// ~/.vscode/argv.json
{
    "password-store": "basic"
}
```
