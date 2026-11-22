import clsx from 'clsx'
import { splitProps, type JSX } from 'solid-js'
import {
  getCardClass,
  type Props as CardProps,
} from '@/components/fiberglass/Card'

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: 'button'
}

type AnchorProps = JSX.AnchorHTMLAttributes<HTMLAnchorElement> & {
  as: 'a'
}

type RegularVariant = {
  variant?: 'regular'
}

type LinkVariant = {
  variant: 'link'
}

type GhostLinkVariant = {
  variant: 'ghost-link'
}

type CardVariant = {
  variant: 'card'
  disabled?: boolean
} & CardProps

type Variant = RegularVariant | GhostLinkVariant | CardVariant | LinkVariant

type Props = (ButtonProps | AnchorProps) & Variant

export const getButtonClass = (variant: Variant): string => {
  switch (variant.variant) {
    case 'link':
      return clsx(
        'transition relative flex items-center justify-center',
        'bg-none rounded-lg text-black/75 hover:text-[var(--primary)] dark:text-white/75 dark:hover:text-[var(--primary)] z-0 active:scale-95 hover:underline hover:underline-offset-4',
      )
    case 'ghost-link':
      return clsx(
        'transition relative flex items-center justify-center',
        'bg-none rounded-lg text-black/75 hover:text-[var(--primary)] dark:text-white/75 dark:hover:text-[var(--primary)] z-0 before:-z-10 before:ease-out before:transition active:bg-none hover:before:bg-[var(--btn-regular-bg-hover)] active:before:bg-[var(--btn-regular-bg-active)] before:absolute before:rounded-[inherit] before:inset-0 before:scale-[0.85] hover:before:scale-100 active:scale-95 hover:underline hover:underline-offset-4',
      )
    case 'card': {
      const disabled = variant.disabled ?? false
      return clsx(
        'transition relative flex items-center justify-center',
        getCardClass(variant),
        disabled && 'pointer-events-none text-black/10 dark:text-white/10',
      )
    }
    default:
      return clsx(
        'transition relative flex items-center justify-center',
        'bg-[var(--primary)] text-black/75 rounded-full hover:shadow-2xl hover:scale-[1.01] active:scale-95 duration-100 ease-in-out',
      )
  }
}

export default (props: Props) => {
  const buttonClass = getButtonClass(props)

  const ignore = ['as'] as const

  switch (props.as) {
    case 'a': {
      const [local, others] = splitProps(props, [
        'class',
        'children',
        ...ignore,
      ])

      return (
        <a class={clsx(buttonClass, local.class)} {...others}>
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
        <button class={clsx(buttonClass, local.class)} {...others}>
          {local.children}
        </button>
      )
    }
  }
}
