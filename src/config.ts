import { defineConfig } from './types/config'
import { LinkPreset } from './types/config'

const getAvatar = (size: number) =>
  `https://misaka10987-avatar.pages.dev/dist/avatar-square-${size}.webp`

export const siteConfig = defineConfig({
  title: 'Daydream',
  subtitle: 'misaka10987',
  lang: 'en',
  themeColor: {
    hue: 200,
    fixed: false,
  },
  banner: {
    enable: true,
    src: 'assets/images/banner.jpg',
    position: 'top',
    credit: {
      enable: true,
      text: 'baek_hyang / Furina & Rafale',
      url: 'https://www.pixiv.net/artworks/128209639',
    },
  },
  toc: {
    enable: true,
    depth: 2,
  },
  favicon: [
    {
      src: '/favicon.png',
    },
  ],

  navBar: {
    links: [
      LinkPreset.Home,
      LinkPreset.Archive,
      LinkPreset.About,
      {
        name: 'GitHub',
        url: 'https://github.com/misaka10987/misaka10987.github.io',
        external: true,
      },
    ],
  },

  profile: {
    avatar: 'https://misaka10987-avatar.pages.dev/dist/avatar-square-1000.webp',
    avatarSet: {
      [getAvatar(250)]: 250,
      [getAvatar(500)]: 500,
      [getAvatar(1000)]: 1000,
    },
    name: 'misaka10987',
    bio: 'Ex falso',
    links: [
      {
        name: 'EMail',
        icon: 'material-symbols:mail-outline',
        url: 'mailto:misaka10987@outlook.com',
      },
      {
        name: 'QQ',
        icon: 'fa6-brands:qq',
        url: 'http://2208129531.qzone.qq.com',
      },
      {
        name: '微信',
        icon: 'fa6-brands:weixin',
        url: '/wechat.jpg',
      },
      {
        name: 'GitHub',
        icon: 'fa6-brands:github',
        url: 'https://github.com/misaka10987',
      },
      {
        name: 'Reddit',
        icon: 'fa6-brands:reddit',
        url: 'https://www.reddit.com/user/misaka10987/',
      },
      {
        name: '知乎',
        icon: 'fa6-brands:zhihu',
        url: 'https://www.zhihu.com/people/misaka10987',
      },
      {
        name: 'lichess.org',
        icon: 'material-symbols:chess-knight-outline',
        url: 'https://lichess.org/@/misaka10987',
      },
      {
        name: 'Steam',
        icon: 'fa6-brands:steam',
        url: 'https://steamcommunity.com/id/misaka10987/',
      },
      {
        name: 'Diplicity',
        icon: 'boxicons:globe-europe',
        url: 'https://www.diplicity.com/player/2985',
      },
    ],
  },

  license: {
    enable: true,
    name: 'CC BY-NC-ND 4.0',
    url: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
  },

  expressiveCode: {
    theme: 'github-dark',
  },
})
