+++
title = 'FRC Programming: Start From Zero'
date = 2024-09-10T14:31:28+08:00
+++

# 先决条件

- 安装有 *Windows* 操作系统的 x86_64 计算机

- 网络环境

# 配置开发环境

1. 根据[官方教程](https://docs.wpilib.org/en/stable/docs/zero-to-robot/step-2/index.html)安装「WPILib」与「FRC Game Tools」。这分别是开发和部署 FRC 程序所使用的工具。

2. 安装「Phoenix Tuner X」。
   
   2.1 您可以从 Microsoft Store 中安装；或
   
   2.2 下载[离线安装包](https://github.com/CrossTheRoadElec/Phoenix-Releases/releases)。

# 配置项目

- 打开「FRC VS Code」，运行 `WPILib: Create a new project` 命令（为打开命令输入对话，请按下 Ctrl+Shift+P 快捷键）。根据提示，在GUI中操作。项目类型选择「Command Robot」。
- 安装商家依赖库，这使得我们能正确驱动第三方商家的产品。您可以运行 `WPILib: Manage Vendor Libraries` 命令，选择在线安装，并输入商家提供的依赖描述文件链接。对于6353，常用 *CTRE* 提供的产品，因此可以前往其[官网](https://v6.docs.ctr-electronics.com/en/2023-v6/docs/installation/installation.html#online)获取下载连接。

现在 FRC 程序的开发工作准备就绪。请注意，对于新的项目，您需要重复上述步骤。

# 部署代码

为了将代码部署到机器人，您需要检查机器人的电路（见后续章节）并开机。

您可以有线或无线连接机器：

- **有线连接**：将打印机线的 USB 口插入计算机，PIN5 口插入「RoboRIO」；

- **无线连接**：将无线路由器通过网线连接「RoboRIO」，待其发出提示音后连接无限局域网。

启动「FRC Driver Station」，待面板显示连接成功后，运行 `WPILIb: Deploy Robot Code` 命令，或在项目目录下执行 `./gradlew deploy` 。

# 运行和调试

在「FRC Driver Station」中，您可以通过 GUI 控制机器人的启用/禁用，并切换程序模式。

**若出现任何意外情况，您可以直接按下空格键或 Enter 键紧急停止机器。**

在「FRC Driver Station」运行后，您可以随时使用「Phoenix Tuner X」对机器人进行调试。在 GUI 中选择相应设备，您可以审阅和修改其 CAN ID 、PID 控制参数，查看其运转状态和更新固件等。

# 问题解决

1. 编译代码时报网络错误。
   
   这是因为 `gradle` 默认不使用代理环境变量。为了启用 HTTP 代理，您可以在 `${HOME}/.gradle/gradle.properties` 中如下加入配置：

```properties
systemProp.https.proxyHost=example-host.name
systemProp.https.proxyPort=10000
```

2. 「FRC Driver Station」无法连接到机器。
   
   这常常是因为您开启了防火墙/全局代理。请先禁用之。若仍无法连接，尝试切换有线/无线并重启机器人。
   
   <s>连接问题很玄学，实在连不上不一定是你的问题</s>
