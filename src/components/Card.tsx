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
        'rounded-[var(--radius-large)] overflow-hidden bg-[var(--card-bg)] transition',
        local.class,
      )}
      {...others}
    >
      {local.children}
    </div>
  )
}
