import type {
  ExpressiveCodeConfig,
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from './types/config'
import { LinkPreset } from './types/config'

export const siteConfig: SiteConfig = {
  title: 'Thus spoke misaka10987',
  subtitle: 'Blog',
  lang: 'en', // Language code, e.g. 'en', 'zh_CN', 'ja', etc.
  themeColor: {
    hue: 200, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
    fixed: false, // Hide the theme color picker for visitors
  },
  banner: {
    enable: true,
    src: 'assets/images/banner.jpg', // Relative to the /src directory. Relative to the /public directory if it starts with '/'
    position: 'top', // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
    credit: {
      enable: true, // Display the credit text of the banner image
      text: 'baek_hyang / Furina & Rafale', // Credit text to be displayed
      url: 'https://www.pixiv.net/artworks/128209639', // (Optional) URL link to the original artwork or artist's page
    },
  },
  toc: {
    enable: true, // Display the table of contents on the right side of the post
    depth: 2, // Maximum heading depth to show in the table, from 1 to 3
  },
  favicon: [
    {
      src: '/favicon.png',
    },
    // Leave this array empty to use the default favicon
    // {
    //   src: '/favicon/icon.png',    // Path of the favicon, relative to the /public directory
    //   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
    //   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
    // }
  ],
}

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,
    LinkPreset.About,
    {
      name: 'GitHub',
      url: 'https://github.com/saicaca/fuwari', // Internal links should not include the base path, as it is automatically added
      external: true, // Show an external link icon and will open in a new tab
    },
  ],
}

export const profileConfig: ProfileConfig = {
  avatar: 'https://misaka10987-avatar.pages.dev/avatar-square-1000.jpg', // Relative to the /src directory. Relative to the /public directory if it starts with '/'
  name: 'misaka10987',
  bio: 'And the universe loves you.',
  links: [
    // {
    //   name: 'Twitter',
    //   icon: 'fa6-brands:twitter', // Visit https://icones.js.org/ for icon codes
    //   // You will need to install the corresponding icon set if it's not already included
    //   // `pnpm add @iconify-json/<icon-set-name>`
    //   url: 'https://twitter.com',
    // },
    // {
    //   name: 'Steam',
    //   icon: 'fa6-brands:steam',
    //   url: 'https://store.steampowered.com',
    // },

    // [[social]]
    // identifier = "lichess"
    // name = "lichess.org"
    // url = "https://lichess.org/@/misaka10987"
    // params.icon = "chess-knight"
    {
      name: 'EMail',
      icon: 'material-symbols:contact-mail',
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
      icon: 'material-symbols:chess',
      url: 'https://lichess.org/@/misaka10987',
    },
  ],
}

export const licenseConfig: LicenseConfig = {
  enable: true,
  name: 'CC BY-NC-ND 4.0',
  url: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
}

export const expressiveCodeConfig: ExpressiveCodeConfig = {
  // Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
  // Please select a dark theme, as this blog theme currently only supports dark background color
  theme: 'github-dark',
}
