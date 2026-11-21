import Button from '@components/Button'
import I18nKey from '@i18n/i18nKey'
import { i18n } from '@i18n/translation'
import { Icon } from '@iconify-icon/solid'
import clsx from 'clsx'
import { createSignal, splitProps } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'

type Props = JSX.HTMLAttributes<HTMLDivElement> & {
  name?: string
  collapsed?: boolean
  'collapsed-height'?: string
}

export default (props: Props) => {
  const [local, others] = splitProps(props, [
    'name',
    'collapsed',
    'collapsed-height',
    'children',
    'class',
  ])

  const [collapsed, setCollapsed] = createSignal(local.collapsed ?? false)

  return (
    <div
      class={clsx(
        // copied from `@/components/fiberglass/Card.tsx`
        'relative before:rounded-[var(--radius-large)] overflow-hidden before:absolute before:inset-0 before:bg-white/75 before:dark:bg-black/75 before:backdrop-blur-xl transition before:-z-10',
        'pb-4 flex flex-col gap-2',
        local.class,
      )}
      {...others}
    >
      <div
        class="font-bold transition text-lg text-neutral-900 dark:text-neutral-100 relative ml-8 mt-4 mb-2
        before:w-1 before:h-4 before:rounded-md before:bg-[var(--primary)]
        before:absolute before:left-[-16px] before:top-[5.5px]"
      >
        {local.name}
      </div>
      <div
        class={clsx(
          'px-4 overflow-hidden',
          collapsed() && `h-[var(--collapsedHeight)]`,
        )}
        style={{ '--collapsedHeight': local['collapsed-height'] }}
      >
        {local.children}
      </div>
      {collapsed() && (
        <div class={clsx('px-4 -mb-2 select-none', !collapsed() && 'hidden')}>
          <Button
            variant="plain"
            class="rounded-lg w-full h-9"
            onclick={() => setCollapsed(false)}
          >
            <div class="text-[var(--primary)] flex items-center justify-center gap-2 -translate-x-2">
              <Icon icon="material-symbols:more-horiz" class="text-[1.75rem]" />{' '}
              {i18n(I18nKey.more)}
            </div>
          </Button>
        </div>
      )}
    </div>
  )
}
