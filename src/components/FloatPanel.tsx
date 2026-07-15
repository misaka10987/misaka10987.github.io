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
  const id = crypto.randomUUID()

  const [active, setActive] = createSignal(false)

  onMount(() => {
    document.addEventListener('click', (evt) => {
      const panelDom = document.getElementById(id)
      if (panelDom === null) return

      const targetDom = evt.target
      if (!(targetDom instanceof Node)) return

      for (const friend of [id, ...friends]) {
        const friendDom = document.getElementById(friend)
        if (friendDom === null) continue

        if (friendDom === targetDom || friendDom.contains(targetDom)) return
      }

      setActive(false)
    })
  })

  return [
    (props) => {
      const [local, others] = splitProps(props, ['class', 'children'])

      return (
        <div
          id={id}
          class={clsx(
            'top-[5.25rem] rounded-[var(--radius-large)] overflow-hidden bg-[var(--float-panel-bg)] transition shadow-xl dark:shadow-none',
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
