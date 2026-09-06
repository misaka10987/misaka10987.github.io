import { siteConfig } from '@/config'
import {
  BANNER_HEIGHT,
  BANNER_HEIGHT_HOME,
  MAIN_PANEL_OVERLAPS_BANNER_HEIGHT,
} from '@constants/constants'
import clsx from 'clsx'
import { createSignal, onMount, splitProps } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'

type Props = JSX.HTMLAttributes<HTMLDivElement>

export default (props: Props) => {
  const [hidden, setHidden] = createSignal(false)

  const [local, others] = splitProps(props, ['class', 'children'])

  onMount(() => {
    const setup = () => {
      window.swup.hooks.on('link:click', () => {
        const threshold = window.innerHeight * (BANNER_HEIGHT / 100) - 72 - 16

        if (
          document.body.scrollTop >= threshold ||
          document.documentElement.scrollTop >= threshold
        ) {
          setHidden(true)
        }
      })
    }

    if (window?.swup?.hooks) {
      setup()
    } else {
      document.addEventListener('swup:enable', setup)
    }

    const onscroll = () => {
      const NAVBAR_HEIGHT = 72
      const MAIN_PANEL_EXCESS_HEIGHT = MAIN_PANEL_OVERLAPS_BANNER_HEIGHT * 16 // The height the main panel overlaps the banner

      const bannerHeight =
        document.body.classList.contains('lg:is-home') &&
        window.innerWidth >= 1024
          ? BANNER_HEIGHT_HOME
          : BANNER_HEIGHT

      const threshold =
        window.innerHeight * (bannerHeight / 100) -
        NAVBAR_HEIGHT -
        MAIN_PANEL_EXCESS_HEIGHT -
        16

      if (
        document.body.scrollTop >= threshold ||
        document.documentElement.scrollTop >= threshold
      ) {
        setHidden(true)
      } else {
        setHidden(false)
      }
    }

    window.addEventListener('scroll', onscroll, { passive: true })
  })

  return (
    <div
      class={clsx(
        'z-50 pointer-events-none relative transition-all duration-700 max-w-[var(--page-width)] px-0 md:px-4 mx-auto',
        siteConfig.banner.enable &&
          'h-[calc(var(--banner-height-home)_-_4.5rem)] duration-300',
        local.class,
      )}
      {...others}
    >
      <div
        class={clsx(
          'pointer-events-auto sticky top-0 transition-all',
          hidden() && 'opacity-0 -translate-y-16',
        )}
      >
        {local.children}
      </div>
    </div>
  )
}
