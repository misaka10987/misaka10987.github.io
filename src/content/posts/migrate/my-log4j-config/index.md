+++
title = '一个 Minecraft 用 log4j 配置文件'
published = 2025-06-25
image = "tracing.svg"
+++

# 一个 Minecraft 用 log4j 配置文件

采用类似 [tracing-subscriber](https://crates.io/crates/tracing-subscriber) 库的格式化输出。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="WARN">
    <Appenders>
        <Console name="SysOut" target="SYSTEM_OUT">
            <PatternLayout pattern="%style{%d{yyyy-MM-dd'T'HH:mm:ss.SSSSSS'Z'}}{dim} %highlight{%5level}{ERROR=RED, WARN=Yellow, INFO=Green, DEBUG=Blue, TRACE=Magenta} %style{%c:%L:}{dim} %msg%n" />
        </Console>
        <Queue name="ServerGuiConsole">
            <PatternLayout pattern="%style{%d{yyyy-MM-dd'T'HH:mm:ss.SSSSSS'Z'}}{dim} %highlight{%5level}{ERROR=RED, WARN=Yellow, INFO=Green, DEBUG=Blue, TRACE=Magenta} %style{%c:%L:}{dim} %msg%n" />
        </Queue>
        <RollingRandomAccessFile name="File" fileName="logs/latest.log" filePattern="logs/%d{yyyy-MM-dd}-%i.log.gz">
            <PatternLayout pattern="%d{yyyy-MM-dd'T'HH:mm:ss.SSSSSS'Z'} %5level %c:%L: %msg%n" />
            <Policies>
                <TimeBasedTriggeringPolicy />
                <OnStartupTriggeringPolicy />
            </Policies>
        </RollingRandomAccessFile>
    </Appenders>
    <Loggers>
        <Root level="info">
            <filters>
                <MarkerFilter marker="NETWORK_PACKETS" onMatch="DENY" onMismatch="NEUTRAL" />
            </filters>
            <AppenderRef ref="SysOut"/>
            <AppenderRef ref="File"/>
        </Root>
    </Loggers>
</Configuration>
```
