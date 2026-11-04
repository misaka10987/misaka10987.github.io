+++
title = 'Arch Linux 睡眠后唤醒时黑屏问题'
published = 2025-07-18
+++

# Arch Linux 睡眠后唤醒时黑屏问题

如果您的 Arch Linux 正在使用 AMD 显卡与 `amdgpu` 驱动，系统可以正常启动，但在睡眠后唤醒时，显示黑屏，或睡眠前的最后一帧画面，则可能是显卡驱动未及时加载所导致。此时内核日志很可能不记录任何睡眠后，尝试唤醒的消息。

经测试，一种可行的解决方法是要求内核先加载显卡驱动：

`/etc/mkinitcpio.conf` 

```shell
MODULES+=(amdgpu)
```

记得重新生成镜像：

```shell
mkinitcpio -P
```
