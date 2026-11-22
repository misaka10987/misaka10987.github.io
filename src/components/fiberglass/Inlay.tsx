import clsx from 'clsx'
import { splitProps } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'

type Props = JSX.HTMLAttributes<HTMLDivElement> & {}

export const Inlay = (props: Props) => {
  const [local, others] = splitProps(props, ['class', 'children'])

  return (
    <div
      class={clsx(
        'transition rounded-md flex items-center justify-center bg-[var(--btn-regular-bg)] text-[var(--btn-content)]',
        local.class,
      )}
      {...others}
    >
      {local.children}
    </div>
  )
}

export default Inlay
