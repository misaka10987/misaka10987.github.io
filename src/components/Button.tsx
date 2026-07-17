import clsx from 'clsx'
import { splitProps, type JSX } from 'solid-js'

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: 'button'
}

interface AnchorProps extends JSX.AnchorHTMLAttributes<HTMLAnchorElement> {
  as: 'a'
}

interface CardVariant {
  variant: 'card'
  disabled?: boolean
  'scale-animation'?: never
  sucess?: never
}

interface PlainVariant {
  variant: 'plain'
  disabled?: never
  'scale-animation'?: boolean
  sucess?: never
}

interface RegularVariant {
  variant: 'regular'
  disabled?: never
  'scale-animation'?: never
  sucess?: never
}

interface DarkRegularVariant {
  variant: 'regular-dark'
  disabled?: never
  'scale-animation'?: never
  success?: boolean
}

type Variant = CardVariant | PlainVariant | RegularVariant | DarkRegularVariant

type Props = (ButtonProps | AnchorProps) & Variant

export const getButtonClass = (variant: Variant): string => {
  switch (variant.variant) {
    case 'card':
      return clsx(
        'transition flex items-center justify-center bg-[var(--card-bg)] hover:bg-[var(--btn-card-bg-hover)] active:bg-[var(--btn-card-bg-active)]',
        (variant.disabled ?? false) &&
          'pointer-events-none text-black/10 dark:text-white/10',
      )
    case 'plain':
      return clsx(
        'transition relative flex items-center justify-center bg-none text-black/75 hover:text-[var(--primary)] dark:text-white/75 dark:hover:text-[var(--primary)]',
        variant['scale-animation'] ?? false
          ? 'expand-animation'
          : 'hover:bg-[var(--btn-plain-bg-hover)] active:bg-[var(--btn-plain-bg-active)]',
      )

    case 'regular':
      return 'transition flex items-center justify-center bg-[var(--btn-regular-bg)] hover:bg-[var(--btn-regular-bg-hover)] active:bg-[var(--btn-regular-bg-active)] text-[var(--btn-content)] dark:text-white/75'

    case 'regular-dark':
      return clsx(
        'flex items-center justify-center bg-[oklch(0.45_0.01_var(--hue))] hover:bg-[oklch(0.50_0.01_var(--hue))] active:bg-[oklch(0.55_0.01_var(--hue))] dark:bg-[oklch(0.30_0.02_var(--hue))] dark:hover:bg-[oklch(0.35_0.03_var(--hue))] dark:active:bg-[oklch(0.40_0.03_var(--hue))]',
        (variant.success ?? false) &&
          'bg-[oklch(0.75_0.14_var(--hue))] dark:bg-[oklch(0.75_0.14_var(--hue))]',
      )
  }
}

export default (props: Props) => {
  const variantClass = getButtonClass(props)

  const ignore = ['as', 'variant', 'disabled', 'scale-animation'] as const

  switch (props.as) {
    case 'a': {
      const [local, others] = splitProps(props, [
        'class',
        'children',
        ...ignore,
      ])
      return (
        <a class={clsx(variantClass, local.class)} {...others}>
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
        <button class={clsx(variantClass, local.class)} {...others}>
          {local.children}
        </button>
      )
    }
  }
}
