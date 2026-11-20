import clsx from 'clsx'
import { splitProps, type JSX } from 'solid-js'

interface Props extends JSX.HTMLAttributes<HTMLDivElement> {}

/**
 * This SolidJS component is not reactive and therefore can be directly used in astro without `client` directive.
 */
export default (props: Props) => {
  const [local, others] = splitProps(props, ['class', 'children'])

  return (
    <div
      class={clsx(
        'before:rounded-[var(--radius-large)] overflow-hidden before:absolute before:inset-0 before:bg-white/75 before:dark:bg-black/75 before:backdrop-blur-xl transition',
        local.class,
      )}
      {...others}
    >
      {local.children}
    </div>
  )
}
