import type { JSX } from 'solid-js/jsx-runtime'
import Fumo from './fumo.svg?component-solid'
import { splitProps } from 'solid-js'
import clsx from 'clsx'

type Props = JSX.HTMLAttributes<HTMLDivElement> & {}

export const Aya = (props: Props) => {
  const [local, others] = splitProps(props, ['class', 'children'])

  if (local.children !== undefined) {
    throw new Error('Does not accept children element')
  }

  return (
    <div class={clsx('w-fit h-fit', local.class)} {...others}>
      <Fumo />
    </div>
  )
}

export default Aya
