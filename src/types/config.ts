import type { AUTO_MODE, DARK_MODE, LIGHT_MODE } from '@constants/constants'

type SiteLang =
  | 'en'
  | 'zh_CN'
  | 'zh_TW'
  | 'ja'
  | 'ko'
  | 'es'
  | 'th'
  | 'vi'
  | 'tr'
  | 'id'

export type SiteConfig = {
  title: string
  subtitle: string

  lang: SiteLang

  themeColor: {
    hue: number
    fixed: boolean
  }

  banner: {
    enable: boolean
    src: string
    position?: 'top' | 'center' | 'bottom'
    credit: {
      enable: boolean
      text: string
      url?: string
    }
  }

  toc: {
    enable: boolean
    depth: 1 | 2 | 3
  }

  favicon: Favicon[]

  navBar: {
    links: (NavBarLink | LinkPreset)[]
  }

  profile: {
    avatar?: string
    avatarSet?: Record<string, number>
    name: string
    bio?: string
    links: {
      name: string
      url: string
      icon: string
    }[]
  }

  license: {
    enable: boolean
    name: string
    url: string
  }

  expressiveCode: {
    theme: string
  }
}

export type Favicon = {
  src: string
  theme?: 'light' | 'dark'
  sizes?: string
}

export enum LinkPreset {
  Home = 0,
  Archive = 1,
  About = 2,
}

export type NavBarLink = {
  name: string
  url: string
  external?: boolean
}

export type LIGHT_DARK_MODE =
  | typeof LIGHT_MODE
  | typeof DARK_MODE
  | typeof AUTO_MODE

export type BlogPostData = {
  body: string
  title: string
  published: Date
  description: string
  tags: string[]
  draft?: boolean
  image?: string
  category?: string
  prevTitle?: string
  prevSlug?: string
  nextTitle?: string
  nextSlug?: string
}

export type ExpressiveCodeConfig = {
  theme: string
}
