import clsx from 'clsx'
import {
  createSignal,
  onMount,
  splitProps,
  type Accessor,
  type JSX,
  type Setter,
} from 'solid-js'

export const createFloatPanel = (
  friends: string[] = [],
): [
  (props: Omit<JSX.HTMLAttributes<HTMLDivElement>, 'id'>) => JSX.Element,
  Accessor<boolean>,
  Setter<boolean>,
] => {
  let ref!: HTMLDivElement

  const [active, setActive] = createSignal(false)

  return [
    (props) => {
      const [local, others] = splitProps(props, ['class', 'children'])

      onMount(() => {
        document.addEventListener('click', (evt) => {
          if (!active()) return

          const targetDom = evt.target
          if (!(targetDom instanceof Node)) return

          for (const friend of friends) {
            const friendDom = document.getElementById(friend)
            if (friendDom === null) continue

            if (
              friendDom === targetDom ||
              friendDom.contains(targetDom) ||
              targetDom === ref ||
              ref.contains(targetDom)
            )
              return
          }

          setActive(false)
        })
      })

      return (
        <div
          ref={ref}
          class={clsx(
            !active() && '-translate-y-1 opacity-0 pointer-events-none',
            local.class,
          )}
          {...others}
        >
          {local.children}
        </div>
      )
    },
    active,
    setActive,
  ]
}
