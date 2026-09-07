import { siteConfig } from '@/config'
import { Icon } from '@iconify-icon/solid'
import clsx from 'clsx'

const hasBannerCredit =
  siteConfig.banner.enable && siteConfig.banner.credit.enable
const hasBannerLink = !!siteConfig.banner.credit.url

/**
 * Banner image credit component.
 *
 * No hydration needed.
 */
export default () => {
  return (
    hasBannerCredit && (
      <a
        href={siteConfig.banner.credit.url}
        id="banner-credit"
        target="_blank"
        rel="noopener"
        aria-label="Visit image source"
        class={clsx(
          'group onload-animation transition-all absolute flex justify-center items-center rounded-full px-3 right-4 -top-[3.25rem] bg-black/60 hover:bg-black/70 h-9',
          hasBannerLink && 'hover:pr-9 active:bg-black/80',
        )}
      >
        <Icon
          icon="material-symbols:copyright-outline-rounded"
          class="text-white/75 text-[1.25rem] mr-1"
        />
        <div class="text-white/75 text-xs">{siteConfig.banner.credit.text}</div>
        <Icon
          icon="fa6-solid:arrow-up-right-from-square"
          class={clsx(
            'transition absolute text-[oklch(0.75_0.14_var(--hue))] right-4 text-[0.75rem] opacity-0',
            hasBannerLink && 'group-hover:opacity-100',
          )}
        />
      </a>
    )
  )
}
