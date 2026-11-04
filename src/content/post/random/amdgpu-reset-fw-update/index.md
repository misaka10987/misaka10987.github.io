+++
title = '固件更新或导致 AMD 显卡频繁重置'
published = 2025-12-16
description = ''
image = ''
tags = ['Unix']
category = ''
draft = false
lang = ''
+++

# 固件更新或导致 AMD 显卡频繁重置

在 Arch Linux 上自从 [`linux-firmware-amdgpu`](https://archlinux.org/packages/core/any/linux-firmware-amdgpu/) 版本 20251125-1 起，AMD 显卡可能在低负载下不必要的重置，表现为约 15-30min 出现一次。

可以考虑锁定版本。
