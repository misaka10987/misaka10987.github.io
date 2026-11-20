import clsx from 'clsx'
import { splitProps, type JSX } from 'solid-js'

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: 'button'
}

type AnchorProps = JSX.AnchorHTMLAttributes<HTMLAnchorElement> & {
  as: 'a'
}

type RegularVariant = {
  variant?: 'regular'
}

type GhostLinkVariant = {
  variant: 'ghost-link'
}

type Variant = RegularVariant | GhostLinkVariant

type Props = (ButtonProps | AnchorProps) & Variant

export const getButtonClass = (variant: Variant): string => {
  switch (variant.variant) {
    case 'ghost-link':
      return 'bg-none rounded-lg text-black/75 hover:text-[var(--primary)] dark:text-white/75 dark:hover:text-[var(--primary)] z-0 before:-z-10 before:ease-out before:transition active:bg-none hover:before:bg-[var(--btn-regular-bg-hover)] active:before:bg-[var(--btn-regular-bg-active)] before:absolute before:rounded-[inherit] before:inset-0 before:scale-[0.85] hover:before:scale-100 active:scale-95 hover:underline hover:underline-offset-4'
    default:
      return 'bg-[var(--primary)] text-black/75 rounded-full hover:shadow-2xl hover:scale-[1.01] active:scale-95 duration-100 ease-in-out'
  }
}

export default (props: Props) => {
  const variantClass = getButtonClass(props)

  const ignore = ['as'] as const

  switch (props.as) {
    case 'a': {
      const [local, others] = splitProps(props, [
        'class',
        'children',
        ...ignore,
      ])

      return (
        <a
          class={clsx(
            variantClass,
            'transition relative flex items-center justify-center',
            local.class,
          )}
          {...others}
        >
          {local.children}
        </a>
      )
    }

    default: {
      const [local, others] = splitProps(props, [
        'class',
        'children',
        ...ignore,
      ])

      return (
        <button
          class={clsx(
            variantClass,
            'transition relative flex items-center justify-center',
            local.class,
          )}
          {...others}
        >
          {local.children}
        </button>
      )
    }
  }
}
