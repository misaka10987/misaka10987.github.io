import Button from '@components/Button'
import { BANNER_HEIGHT } from '@constants/constants'
import { Icon } from '@iconify-icon/solid'
import clsx from 'clsx'
import { createSignal, onMount } from 'solid-js'

export default () => {
  const [hidden, setHidden] = createSignal(true)

  onMount(() => {
    const onscroll = () => {
      const bannerHeight = window.innerHeight * (BANNER_HEIGHT / 100)

      if (
        document.body.scrollTop > bannerHeight ||
        document.documentElement.scrollTop > bannerHeight
      ) {
        setHidden(false)
      } else {
        setHidden(true)
      }
    }

    window.addEventListener('scroll', onscroll, { passive: true })
  })

  return (
    <div class="hidden lg:block w-[3.75rem] h-[3.75rem] absolute right-0 top-0 pointer-events-none">
      <div
        class={clsx(
          'flex items-center rounded-2xl overflow-hidden transition fixed bottom-[10rem] cursor-pointer translate-x-20 [&_i]:text-[1.75rem] [&:active]:scale-90 [color:var(--primary)] [font-size:2.25rem] [font-weight:bold] border-none',
          hidden()
            ? 'scale-90 opacity-0 pointer-events-none'
            : 'opacity-100 pointer-events-auto',
        )}
        onclick={() => window.scroll({ top: 0, behavior: 'smooth' })}
      >
        <Button
          variant="card"
          aria-label="Back to Top"
          class="h-[3.75rem] w-[3.75rem]"
        >
          <Icon
            icon="material-symbols:keyboard-arrow-up-rounded"
            class="mx-auto"
          />
        </Button>
      </div>
    </div>
  )
}
