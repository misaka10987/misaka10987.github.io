import { AUTO_MODE, DARK_MODE, LIGHT_MODE } from '@constants/constants.ts'
import I18nKey from '@i18n/i18nKey'
import { i18n } from '@i18n/translation'
import {
  applyThemeToDocument,
  getStoredTheme,
  setTheme,
} from '@utils/setting-utils.ts'
import type { LIGHT_DARK_MODE } from '@/types/config.ts'
import { createSignal, onMount } from 'solid-js'
import { Icon } from '@iconify-icon/solid'
import clsx from 'clsx'
import { createFloatPanel } from './float-panel'
import Card from './Card'
import Button from './Button'

const seq = [LIGHT_MODE, DARK_MODE, AUTO_MODE] as LIGHT_DARK_MODE[]

export default () => {
  const toggleId = crypto.randomUUID()

  const [mode, setMode] = createSignal<LIGHT_DARK_MODE>(AUTO_MODE)

  const switchScheme = (newMode: LIGHT_DARK_MODE) => {
    setMode(newMode)
    setTheme(newMode)
  }

  const toggleScheme = () => {
    const idx = seq.findIndex((x) => x == mode())

    switchScheme(seq[(idx + 1) % seq.length])
  }

  const [Panel, _panelActive, setPanelActive] = createFloatPanel([toggleId])

  onMount(() => {
    setMode(getStoredTheme())
    const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)')

    const changeThemeWhenSchemeChanged: Parameters<
      typeof darkModePreference.addEventListener<'change'>
    >[1] = (_e) => {
      applyThemeToDocument(mode())
    }

    darkModePreference.addEventListener('change', changeThemeWhenSchemeChanged)
    return () => {
      darkModePreference.removeEventListener(
        'change',
        changeThemeWhenSchemeChanged,
      )
    }
  })

  return (
    <div
      class="relative z-50"
      role="menu"
      tabindex="-1"
      id={toggleId}
      onmouseleave={() => setPanelActive(false)}
    >
      <Button
        variant="plain"
        scale-animation
        aria-label="Light/Dark Mode"
        role="menuitem"
        class="relative rounded-lg h-11 w-11 active:scale-90"
        onclick={toggleScheme}
        onmouseenter={() => setPanelActive(true)}
      >
        <div
          class={clsx(
            'absolute flex justify-center',
            mode() !== LIGHT_MODE && 'opacity-0',
          )}
        >
          <Icon
            icon="material-symbols:wb-sunny-outline-rounded"
            class="text-[1.25rem]"
          ></Icon>
        </div>
        <div
          class={clsx(
            'absolute flex justify-center',
            mode() !== DARK_MODE && 'opacity-0',
          )}
        >
          <Icon
            icon="material-symbols:dark-mode-outline-rounded"
            class="text-[1.25rem]"
          ></Icon>
        </div>
        <div
          class={clsx(
            'absolute flex justify-center',
            mode() !== AUTO_MODE && 'opacity-0',
          )}
        >
          <Icon
            icon="material-symbols:radio-button-partial-outline"
            class="text-[1.25rem]"
          ></Icon>
        </div>
      </Button>

      <Panel class="lg:block absolute transition top-11 -right-2 pt-5">
        <Card class="top-[5.25rem] rounded-[var(--radius-large)] overflow-hidden bg-[var(--float-panel-bg)] transition shadow-xl dark:shadow-none p-2">
          <Button
            variant="plain"
            scale-animation
            class={clsx(
              'flex transition whitespace-nowrap items-center !justify-start w-full rounded-lg h-9 px-3 font-medium active:scale-95 mb-0.5',
              mode() === LIGHT_MODE &&
                'before:scale-100 before:opacity-100 before:bg-[var(--btn-plain-bg-hover)] text-[var(--primary)]',
            )}
            onclick={() => switchScheme(LIGHT_MODE)}
          >
            <Icon
              icon="material-symbols:wb-sunny-outline-rounded"
              class="text-[1.25rem] mr-3"
            ></Icon>
            {i18n(I18nKey.lightMode)}
          </Button>
          <Button
            variant="plain"
            scale-animation
            class={clsx(
              'flex transition whitespace-nowrap items-center !justify-start w-full rounded-lg h-9 px-3 font-medium active:scale-95 mb-0.5',
              mode() === DARK_MODE &&
                'before:scale-100 before:opacity-100 before:bg-[var(--btn-plain-bg-hover)] text-[var(--primary)]',
            )}
            onclick={() => switchScheme(DARK_MODE)}
          >
            <Icon
              icon="material-symbols:dark-mode-outline-rounded"
              class="text-[1.25rem] mr-3"
            ></Icon>
            {i18n(I18nKey.darkMode)}
          </Button>
          <Button
            variant="plain"
            scale-animation
            class={clsx(
              'flex transition whitespace-nowrap items-center !justify-start w-full rounded-lg h-9 px-3 font-medium active:scale-95',
              mode() === AUTO_MODE &&
                'before:scale-100 before:opacity-100 before:bg-[var(--btn-plain-bg-hover)] text-[var(--primary)]',
            )}
            onclick={() => switchScheme(AUTO_MODE)}
          >
            <Icon
              icon="material-symbols:radio-button-partial-outline"
              class="text-[1.25rem] mr-3"
            ></Icon>
            {i18n(I18nKey.systemMode)}
          </Button>
        </Card>
      </Panel>
    </div>
  )
}
