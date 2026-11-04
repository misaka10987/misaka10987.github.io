+++
title = '部署 SolidStart 项目到 Cloudflare Workers'
published = 2025-12-06
description = ''
image = ''
tags = ['Web']
category = ''
draft = false
lang = ''
+++

# 部署 SolidStart 项目到 Cloudflare Workers

[SolidStart](https://start.solidjs.com/) 是一个基于 [SolidJS](https://www.solidjs.com/) 的 Web 全栈开发框架。然而，其对 [Cloudflare Workers](https://workers.cloudflare.com/) 部署的适配器已 [弃用](https://www.npmjs.com/package/solid-start-cloudflare-workers) ，而 SolidStart 的官方文档并未更新。如果选择部署到 [Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-solid-start-site/) , 则会失去 SSR 支持。本文描述如何将最新的 SolidStart 项目部署到 Cloudflare Workers.

SolidStart 采用 [Nitro](https://nitro.build/) 作为服务器实现。因此，我们可以很方便地利用 Nitro 的 Cloudflare 集成。

```js
// app.config.ts
export default defineConfig({
  server: {
    preset: 'cloudflare-module',
    cloudflare: {
      deployConfig: true,
    },
  }
)
```

参考 Nitro [文档](https://nitro.build/deploy/providers/cloudflare#cloudflare-workers) ，我们将服务器的编译后端配置为 `cloudflare-module` , 即 Cloudflare Workers. `deployConfig` 会自动为我们生成 [Wrangler](https://developers.cloudflare.com/workers/wrangler/) 的配置文件。此时生成的 `.output` 目录是可以直接通过 Wrangler 部署的。

如果项目托管在 GitHub 上，则可以使用 Cloudflare 的 GitHub App 监听存储库来自动部署。这需要在 Cloudflare 网页端创建新的 Worker 并绑定到指定的存储库。

> [!IMPORTANT]
> 
> 在配置 Worker 构建时，务必注意将构建目录设置为相对于仓库根目录正确的路径，并将部署命令设为 `npx wrangler --cwd .output deploy`（ `npm run build` 所提示的命令）。
