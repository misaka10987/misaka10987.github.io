import clsx from 'clsx'
import { splitProps, type JSX } from 'solid-js'

interface Props extends JSX.AnchorHTMLAttributes<HTMLAnchorElement> {
  size?: 'md' | 'lg'
}

export default (props: Props) => {
  const [local, others] = splitProps(props, ['children', 'class'])

  const size = props.size ?? 'md'

  return (
    <a
      class={clsx(
        'transition rounded-md p-1 -m-1 expand-animation',
        size == 'lg' && 'p-1.5 -m-1.5',
        local.class,
      )}
      {...others}
    >
      {local.children}
    </a>
  )
}
