/*!
 * Live2D Widget
 * https://github.com/stevenjoezhang/live2d-widget
 */

// Recommended to use absolute path for live2d_path parameter
// live2d_path 参数建议使用绝对路径
const LIVE2D_HOME = '/live2d/'

// Method to encapsulate asynchronous resource loading
// 封装异步加载资源的方法
const loadExternalResource = async (url, type) => {
  let tag
  if (type === 'css') {
    tag = document.createElement('link')
    tag.rel = 'stylesheet'
    tag.href = url
  } else if (type === 'js') {
    tag = document.createElement('script')
    tag.type = 'module'
    tag.src = url
  }
  await new Promise((resolve, reject) => {
    if (tag) {
      tag.onload = () => resolve(url)
      tag.onerror = () => reject(url)
      document.head.appendChild(tag)
    }
  })
}

// 如果担心手机上显示效果不佳，可以根据屏幕宽度来判断是否加载
// if (screen.width < 768) return;

// 避免图片资源跨域问题
const OriginalImage = window.Image
window.Image = function (...args) {
  const img = new OriginalImage(...args)
  img.crossOrigin = 'anonymous'
  return img
}
window.Image.prototype = OriginalImage.prototype

// 加载 waifu.css 和 waifu-tips.js
await Promise.all([
  loadExternalResource(LIVE2D_HOME + 'waifu.css', 'css'),
  loadExternalResource(LIVE2D_HOME + 'waifu-tips.js', 'js'),
])

// For detailed usage of configuration options, see README.en.md
// 配置选项的具体用法见 README.md
initWidget({
  waifuPath: LIVE2D_HOME + 'config.json',
  // cdnPath: 'https://fastly.jsdelivr.net/gh/fghrsh/live2d_api/',
  cubism2Path: LIVE2D_HOME + 'live2d.min.js',
  cubism5Path:
    'https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js',
  tools: [
    'hitokoto',
    'asteroids',
    // "switch-model",
    // "switch-texture",
    'photo',
    'info',
    'quit',
  ],
  logLevel: 'warn',
  drag: false,
})

document.querySelector('#live2d').addEventListener('click', () => {
  document.querySelector('#dark-mode-toggle').click()
})

console.debug('Loading Live2D')
