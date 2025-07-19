import './waifu-tips.js'

// 避免图片资源跨域问题
window.Image = new Proxy(window.Image, {
  construct: (target, args) => {
    const img = new target(...args)
    img.crossOrigin = 'anonymous'
    return img
  },
})

// 配置选项的具体用法见 README.md
initWidget({
  waifuPath: '/live2d/config.json',
  cubism2Path: '/live2d/live2d.min.js',
  cubism5Path:
    'https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js',
  tools: ['hitokoto', 'asteroids', 'photo', 'info', 'quit'],
  logLevel: 'warn',
  drag: false,
})

console.debug('Loading Live2D')
