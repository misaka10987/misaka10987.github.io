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

export const defineConfig = (config: AphrosConfig) => {
  return config
}

type AphrosConfig = {
  title: string
  subtitle: string

  /**
   * Language code, e.g. `en`, `zh_CN`, `ja`, etc.
   */
  lang: SiteLang

  themeColor: {
    /**
     * Default hue for the theme color, from 0 to 360.
     *
     * For reference:
     * - red: `0`
     * - teal: `200`
     * - cyan: `250`
     * - pink: `345`
     */
    hue: number

    /**
     * Hide the theme color picker for visitors.
     */
    fixed: boolean
  }

  banner: {
    enable: boolean

    /**
     * Relative to the `/src` directory, or relative to the `/public` directory if it starts with `/`.
     */
    src: string

    /**
     * Equivalent to object-position, only supports `top`, `center`, and `bottom`. `center` by default.
     */
    position?: 'top' | 'center' | 'bottom'

    credit: {
      /**
       * Display the credit text of the banner image.
       */
      enable: boolean

      /**
       * Credit text to be displayed.
       */
      text: string

      /**
       * (Optional) URL link to the original artwork or artist's page.
       */
      url?: string
    }
  }

  toc: {
    /**
     *  Display the table of contents on the right side of the post.
     */
    enable: boolean

    /**
     * Maximum heading depth to show in the table, from 1 to 3.
     */
    depth: 1 | 2 | 3
  }

  /**
   * Leave this array empty to use the default favicon.
   */
  favicon: Favicon[]

  navBar: {
    links: (NavBarLink | LinkPreset)[]
  }

  profile: {
    /**
     * Relative to the `/src` directory, or relative to the `/public` directory if it starts with `/`.
     */
    avatar?: string
    avatarSet?: Record<string, number>
    name: string
    bio?: string
    links: {
      name: string
      url: string

      /**
       * Visit https://icones.js.org/ for icon codes.
       *
       * You will need to install the corresponding icon set if it's not already included:
       *
       * ```shell
       * npm add "@iconify-json/${icon-set-name}"
       * ```
       *
       * Note: VS Code may have a bug displaying `@` as a javadoc tag in the above.
       */
      icon: string
    }[]
  }

  license: {
    enable: boolean
    name: string
    url: string
  }

  expressiveCode: {
    /**
     * Note: Some styles (such as background color) are being overridden, see the `astro.config.mjs` file.
     *
     * Please select a dark theme, as this blog theme currently only supports dark background color.
     */
    theme: string
  }
}

export type Favicon = {
  /**
   * Path of the favicon, relative to the `/public` directory.
   */
  src: string

  /**
   * (Optional) Either `light` or `dark`, set only if you have different favicons for light and dark mode
   */
  theme?: 'light' | 'dark'

  /**
   * (Optional) Size of the favicon, set only if you have favicons of different sizes
   */
  sizes?: string
}

export enum LinkPreset {
  Home = 0,
  Archive = 1,
  About = 2,
}

export type NavBarLink = {
  name: string

  /**
   * Internal links should not include the base path, as it is automatically added.
   */
  url: string

  /**
   * Show an external link icon and will open in a new tab.
   */
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
