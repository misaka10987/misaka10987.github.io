+++
title = '给 Hugo 网站添加 Live2D 看板娘'
published = 2025-07-15
image = 'ronava.jpg'
+++

UPDATE: 由于很多细节不够完善，我暂时禁用了 Live2D.

`params.toml`

```toml
[live2d]
enable = false
```

# 给 Hugo 网站添加 Live2D 看板娘

完成效果参考本站左下角。Live2D 基于 [Cubism](https://www.live2d.com/en/) 模型，通过 [Live2D Widget](https://github.com/stevenjoezhang/live2d-widget) 在网页端渲染。此处的胡桃模型由 [@根瘤菌rkzj](https://space.bilibili.com/23315579) 创作。

## 准备模型

一个 Cubism 模型资源一般以目录的形式存在，通过指向其下 `model3.json` 的 URL 引用。由于 Live2D 模型多体积较大，可使用 CDN 加快分发。本站使用了 [Cloudflare Pages](https://pages.cloudflare.com/) 部署静态文件。

### 贴图大小

有些模型的贴图分辨率过高，可适当缩小贴图，减小文件体积以加速。

## Hugo 自定义 JavaScript 加载

Hugo 会将网站渲染为静态 HTML. 因此，我们需要在客户端插入 JavaScript 来渲染自定义组件。

本站使用 [Stack](https://stack.jimmycai.com/) 主题。查阅其文档可知：

> There are two empty files reserved for custom HTML in the theme, useful for adding custom scripts or stylesheets:
> 
> - `layouts/partials/head/custom.html`
> - `layouts/partials/footer/custom.html`

Live2D 的加载较为费时，因此我们将其插入到页脚中，不拖慢网页主体加载。

`layouts/partials/footer/custom.html` 

```html
<script type="module" src="/live2d/main.js"></script>
```

将加载我们将会放在 `static/live2d/main.js` 下的脚本。Hugo 将 `static/$path` 下的文件映射到 `/$path` 路由上。

## 安装依赖

我们从 Live2D Widget 仓库的分发中下载其代码库本体 `waifu-tips.js` 与 Cubism 渲染器依赖 `live2d.min.js` , 置于静态目录中。

## 编写 JavaScript

我们使用 ES Module 来简化动态资源的加载过程。导入并调用 Live2D Widget 库：

```javascript
import './waifu-tips.js'

initWidget({
  waifuPath: '/live2d/config.json',
  cubism2Path: '/live2d/live2d.min.js',
  cubism5Path:
    'https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js',
  tools: ['hitokoto', 'asteroids', 'photo', 'info', 'quit'],
  logLevel: 'warn',
  drag: false,
})
```

`initWidget` 的参数可在原仓库 [README](https://github.com/stevenjoezhang/live2d-widget?tab=readme-ov-file#%E9%85%8D%E7%BD%AE) 找到解释。

## 配置模型

注意到，我们在 JavaScript 中引用了 `/live2d/config.json` , 这是模型的配置文件，我们现在需要编写它。

我们从仓库的分发中复制 `waifu-tips.json` 进行修改。为加载自定义的模型，修改 `.models` :

```json
[
    {
      "name": "Hu Tao",
      "paths": ["https://hutao-live2d.pages.dev/model3.json"],
      "message": "太阳出来我晒太阳，月亮出来我晒月亮~"
    }
]
```

其余选项亦可参照默认配置进行修改。

## 调整样式

默认的 CSS 在不同网站上可能显示效果不佳。可以复制并修改原仓库的 `waifu.css` 来自定义样式。

记得在脚本加载前引入自定义的 CSS:

```html
<link rel="stylesheet" href="/live2d/waifu.css" />
```

完成！

## 跨域请求问题

如果我们要从互联网上请求 Live2D 模型资源，而非直接在网站上静态部署，则可能需要处理跨域请求：

```javascript
window.Image = new Proxy(window.Image, {
  construct: (target, args) => {
    const img = new target(...args)
    img.crossOrigin = 'anonymous'
    return img
  },
})
```

此处提供了一种暴力方法，给所有 `<img>` 添加 `crossorigin='anonymous'` .
