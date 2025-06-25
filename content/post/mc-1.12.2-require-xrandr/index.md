+++
title = 'Minecraft 1.12.2 依赖于 X RandR 扩展'
date = '2025-06-25T19:59:19+08:00'

comments = true
# math = true

image = 'xorg.png'
# license =

hidden = false
# draft = true
+++

# Minecraft 1.12.2 依赖于 X RandR 扩展

如 [Arch 论坛](https://bbs.archlinux.org/viewtopic.php?id=292015) 提到，对于 Minecraft 启动时

> No OpenGL context found in the current thread

崩溃问题，需要安装 X RandR 扩展。

```shell
pacman -S xorg-xrandr
```

经测试，该问题存在于 Minecraft 1.12.2 中。Minecraft 1.16.5 及更新版本无此问题。
