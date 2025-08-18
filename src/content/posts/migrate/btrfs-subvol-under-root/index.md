+++
title = 'BTRFS 踩坑：根目录下的子卷'
published = 2025-07-05
image = 'nahida.png'
+++

# BTRFS 踩坑：根目录下的子卷

**TL; DR:** 不能假设你的 `/` 是文件系统的「根目录」，可能是任何东西的挂载点，例如 BTRFS 子卷 `/@` .

事件的起因是我们希望给 `/srv` 目录一个单独的子卷，以便增量备份。

```shell
btrfs subvolume create /@srv
```

但是，在我们尝试挂载新创建的子卷时，会得到如下错误：

```shell-session
# mount -o subvol=@srv /dev/nvme0n1p2 /srv
mount: /srv: fsconfig() failed: 没有那个文件或目录.
       dmesg(1) may have more information after failed mount system call.
```

这看似很奇怪，因为如果我们尝试列出子卷：

```shell-session
# btrfs subvolume list /
ID 256 gen 85363 top level 5 path @
ID 257 gen 85363 top level 5 path @home
ID 258 gen 85363 top level 5 path @log
ID 259 gen 85170 top level 5 path @pkg
ID 260 gen 68985 top level 5 path @.snapshots
ID 261 gen 13 top level 256 path var/lib/portables
ID 262 gen 13 top level 256 path var/lib/machines
ID 271 gen 85142 top level 5 path @srv
```

会发现同样的操作可以成功挂载类似的子卷（如 `@home` ），却无法挂载我们的 `@srv` .

问题的原因在于，此时我们系统的根目录 `/` 并不是 BTRFS 文件系统的根目录 `/` , 而是其下的子卷 `@` 的挂载点（这是 Arch Linux 默认安装下的行为）。

```shell-session
# mount -t btrfs /dev/nvme0n1p2 /tmp/rootfs
# ls /tmp/rootfs
'@'/  '@home'/  '@log'/  '@pkg'/  '@.snapshots'/
# ls /tmp/rootfs/@
 bin@    dev/  '@foo'/   lib@     logs/   opt/    root/   sbin@   sys/   usr/
 boot/   etc/   home/    lib64@   mnt/    proc/   run/    srv/    tmp/   var/
```

因此，在我们创建子卷 `/@srv` 时，看似在「根目录」`/` 下创建的子卷，实际上位于 `/@/@srv` . 这也是我们无法通过 `@srv` 访问的原因。

```shell-session
# btrfs subvolume show /@srv | head -n 2
@/@srv
	Name: 			@srv
```

为解决这个问题，可以将 BTRFS 挂载到其它挂载点后再操作：

```shell
mount -t btrfs /dev/nvme0n1p2 /tmp/rootfs
btrfs subvolume create /tmp/rootfs/@srv
```

或使用 `@/@srv` 而非 `@srv` 引用这个子卷。
