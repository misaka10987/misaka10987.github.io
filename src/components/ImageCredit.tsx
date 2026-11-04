import { Icon } from '@iconify-icon/solid'
import clsx from 'clsx'

interface Props {
  url?: string
  text?: string
}

/**
 * Image credit component.
 *
 * No hydration needed because only uses CSS animation.
 */
export default ({ url, text }: Props) => {
  if (url === undefined && text === undefined) {
    console.warn('image credit with neither URL or text')
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener"
      aria-label="Visit image source"
      class={clsx(
        // `[animation-delay:400ms]` is `!important` to override `onload-animation`
        'group onload-animation ![animation-delay:400ms] transition-all absolute flex justify-center items-center rounded-full px-3 right-4 -top-[3.25rem] bg-black/60 hover:bg-black/70 h-9',
        url && 'hover:pr-9 active:bg-black/80',
      )}
    >
      <Icon
        icon="material-symbols:copyright-outline-rounded"
        class="text-white/75 text-[1.25rem] mr-1"
      />

      {text && <div class="text-white/75 text-xs">{text}</div>}

      <Icon
        icon="fa6-solid:arrow-up-right-from-square"
        class={clsx(
          'transition absolute text-[oklch(0.75_0.14_var(--hue))] right-4 text-[0.75rem] opacity-0',
          url && 'group-hover:opacity-100',
        )}
      />
    </a>
  )
}
