import clsx from 'clsx'
import { splitProps, type JSX } from 'solid-js'

type Props = JSX.HTMLAttributes<HTMLDivElement> & {
  opacity?: 25 | 50 | 75
}

/**
 * This SolidJS component is not reactive and therefore can be directly used in astro without `client` directive.
 */
export default (props: Props) => {
  const [local, others] = splitProps(props, ['class', 'children', 'opacity'])

  const opacity = local.opacity ?? 75

  const opacityClass = clsx(
    opacity === 25 && 'before:bg-white/25 before:dark:bg-black/25',
    opacity === 50 && 'before:bg-white/50 before:dark:bg-black/50',
    opacity === 75 && 'before:bg-white/75 before:dark:bg-black/75',
  )

  return (
    <div
      class={clsx(
        opacityClass,
        'relative before:rounded-[var(--radius-large)] overflow-hidden before:absolute before:inset-0 before:backdrop-blur-xl before:-z-10 transition',
        local.class,
      )}
      {...others}
    >
      {local.children}
    </div>
  )
}
