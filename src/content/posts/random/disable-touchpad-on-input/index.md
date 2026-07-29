+++
title = "KDE 键盘输入时禁用触控板"
published = 2026-07-29
description = ""
image = ""
tags = ["Unix"]
category = ""
lang = ""
+++

# KDE 键盘输入时禁用触控板

我曾经定义了一个 libinput quirk 来支持新笔记本的触控板。libinput 更新后，里面的配置键被弃用，使得解析失败。具体来说，表现出 KDE 设置的「键盘输入时禁用触控板」功能不起效。删掉旧的配置解决了问题。
