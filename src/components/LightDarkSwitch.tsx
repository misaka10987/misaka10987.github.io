import { AUTO_MODE, DARK_MODE, LIGHT_MODE } from '@constants/constants.ts'
import I18nKey from '@i18n/i18nKey'
import { i18n } from '@i18n/translation'
import {
  applyThemeToDocument,
  getStoredTheme,
  setTheme,
} from '@utils/setting-utils.ts'
import type { LIGHT_DARK_MODE } from '@/types/config.ts'
import { createSignal } from 'solid-js'
import { Icon } from '@iconify-icon/solid'

const seq = [LIGHT_MODE, DARK_MODE, AUTO_MODE] as LIGHT_DARK_MODE[]

const [mode, setMode] = createSignal<LIGHT_DARK_MODE>(AUTO_MODE)

const switchScheme = (newMode: LIGHT_DARK_MODE) => {
  setMode(newMode)
  setTheme(newMode)
}

const toggleScheme = () => {
  const idx = seq.findIndex((x) => x == mode())

  switchScheme(seq[(idx + 1) % seq.length])
}

const showPanel = () => {
  const panel = document.querySelector('#light-dark-panel')
  panel?.classList.remove('float-panel-closed')
}

const hidePanel = () => {
  const panel = document.querySelector('#light-dark-panel')
  panel?.classList.add('float-panel-closed')
}

export default () => {
  return (
    <div
      class="relative z-50"
      role="menu"
      tabindex="-1"
      onmouseleave={hidePanel}
    >
      <button
        aria-label="Light/Dark Mode"
        role="menuitem"
        class="relative btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90"
        id="scheme-switch"
        onclick={toggleScheme}
        onmouseenter={showPanel}
      >
        <div
          class="absolute flex justify-center"
          class:opacity-0={mode() !== LIGHT_MODE}
        >
          <Icon
            icon="material-symbols:wb-sunny-outline-rounded"
            class="text-[1.25rem]"
          ></Icon>
        </div>
        <div
          class="absolute flex justify-center"
          class:opacity-0={mode() !== DARK_MODE}
        >
          <Icon
            icon="material-symbols:dark-mode-outline-rounded"
            class="text-[1.25rem]"
          ></Icon>
        </div>
        <div
          class="absolute flex justify-center"
          class:opacity-0={mode() !== AUTO_MODE}
        >
          <Icon
            icon="material-symbols:radio-button-partial-outline"
            class="text-[1.25rem]"
          ></Icon>
        </div>
      </button>

      <div
        id="light-dark-panel"
        class="hidden lg:block absolute transition float-panel-closed top-11 -right-2 pt-5"
      >
        <div class="card-base float-panel p-2">
          <button
            class="flex transition whitespace-nowrap items-center !justify-start w-full btn-plain scale-animation rounded-lg h-9 px-3 font-medium active:scale-95 mb-0.5"
            class:current-theme-btn={mode() === LIGHT_MODE}
            onclick={() => switchScheme(LIGHT_MODE)}
          >
            <Icon
              icon="material-symbols:wb-sunny-outline-rounded"
              class="text-[1.25rem] mr-3"
            ></Icon>
            {i18n(I18nKey.lightMode)}
          </button>
          <button
            class="flex transition whitespace-nowrap items-center !justify-start w-full btn-plain scale-animation rounded-lg h-9 px-3 font-medium active:scale-95 mb-0.5"
            class:current-theme-btn={mode() === DARK_MODE}
            onclick={() => switchScheme(DARK_MODE)}
          >
            <Icon
              icon="material-symbols:dark-mode-outline-rounded"
              class="text-[1.25rem] mr-3"
            ></Icon>
            {i18n(I18nKey.darkMode)}
          </button>
          <button
            class="flex transition whitespace-nowrap items-center !justify-start w-full btn-plain scale-animation rounded-lg h-9 px-3 font-medium active:scale-95"
            class:current-theme-btn={mode() === AUTO_MODE}
            onclick={() => switchScheme(AUTO_MODE)}
          >
            <Icon
              icon="material-symbols:radio-button-partial-outline"
              class="text-[1.25rem] mr-3"
            ></Icon>
            {i18n(I18nKey.systemMode)}
          </button>
        </div>
      </div>
    </div>
  )
}
