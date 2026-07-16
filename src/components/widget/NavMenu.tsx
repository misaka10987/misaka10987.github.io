import { createFloatPanel } from '@components/float-panel'
import { type NavBarLink } from '../../types/config'
import { url } from '../../utils/url-utils'
import { Icon } from '@iconify-icon/solid'

interface Props {
  links: NavBarLink[]
}

export default ({ links }: Props) => {
  const [Panel, panelActive, setPanelActive] = createFloatPanel([
    'nav-menu-panel',
    'nav-menu-switch',
  ])

  return (
    <>
      <button
        aria-label="Menu"
        name="Nav Menu"
        class="btn-plain scale-animation rounded-lg w-11 h-11 active:scale-90 md:!hidden"
        id="nav-menu-switch"
        onclick={() => setPanelActive(!panelActive())}
      >
        <Icon
          icon="material-symbols:menu-rounded"
          class="text-[1.25rem]"
        ></Icon>
      </button>
      <Panel class="top-[5.25rem] rounded-[var(--radius-large)] overflow-hidden bg-[var(--float-panel-bg)] shadow-xl dark:shadow-none transition-all fixed right-4 px-2 py-2">
        {links.map((link) => (
          <a
            href={link.external ? link.url : url(link.url)}
            class="group flex justify-between items-center py-2 pl-3 pr-1 rounded-lg gap-8
            hover:bg-[var(--btn-plain-bg-hover)] active:bg-[var(--btn-plain-bg-active)] transition
        "
            target={link.external ? '_blank' : undefined}
          >
            <div class="transition text-black/75 dark:text-white/75 font-bold group-hover:text-[var(--primary)] group-active:text-[var(--primary)]">
              {link.name}
            </div>
            {!link.external && (
              <Icon
                icon="material-symbols:chevron-right-rounded"
                class="transition text-[1.25rem] text-[var(--primary)]"
              ></Icon>
            )}
            {link.external && (
              <Icon
                icon="fa6-solid:arrow-up-right-from-square"
                class="transition text-[0.75rem] text-black/25 dark:text-white/25 -translate-x-1"
              ></Icon>
            )}
          </a>
        ))}
      </Panel>
    </>
  )
}
