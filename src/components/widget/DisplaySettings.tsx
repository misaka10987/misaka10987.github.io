import I18nKey from '@i18n/i18nKey'
import { i18n } from '@i18n/translation'
import { Icon } from '@iconify-icon/solid'
import { getDefaultHue, getHue, setHue } from '@utils/setting-utils'
import clsx from 'clsx'
import { createEffect, createSignal, type JSX } from 'solid-js'
import './display-setting.css'
import { createFloatPanel } from '@components/float-panel'
import Button from '@components/Button'

export default () => {
  const toggleId = crypto.randomUUID()

  const [Panel, panelActive, setPanelActive] = createFloatPanel([toggleId])

  let [currHue, setCurrHue] = createSignal(getHue())
  const defaultHue = getDefaultHue()

  function resetHue() {
    setCurrHue(getDefaultHue())
  }

  createEffect(() => {
    if (currHue() !== 0 || currHue() === 0) {
      setHue(currHue())
    }
  })

  return (
    <>
      <Button
        variant="plain"
        scale-animation
        id={toggleId}
        aria-label="Display Settings"
        class="rounded-lg h-11 w-11 active:scale-90"
        onclick={() => setPanelActive(!panelActive())}
      >
        <Icon
          icon="material-symbols:palette-outline"
          class="text-[1.25rem]"
        ></Icon>
      </Button>

      <Panel class="top-[5.25rem] rounded-[var(--radius-large)] overflow-hidden bg-[var(--float-panel-bg)] shadow-xl dark:shadow-none absolute transition-all w-80 right-4 px-4 py-4 display-setting-panel">
        <div class="flex flex-row gap-2 mb-3 items-center justify-between">
          <div
            class="flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3
            before:w-1 before:h-4 before:rounded-md before:bg-[var(--primary)]
            before:absolute before:-left-3 before:top-[0.33rem]"
          >
            {i18n(I18nKey.themeColor)}
            <Button
              variant="regular"
              aria-label="Reset to Default"
              class={clsx(
                'w-7 h-7 rounded-md active:scale-90',
                currHue() === defaultHue && 'opacity-0 pointer-events-none',
              )}
              on:click={resetHue}
            >
              <div class="text-[var(--btn-content)]">
                <Icon
                  icon="fa6-solid:arrow-rotate-left"
                  class="text-[0.875rem]"
                ></Icon>
              </div>
            </Button>
          </div>
          <div class="flex gap-1">
            <div
              id="hueValue"
              class="transition bg-[var(--btn-regular-bg)] w-10 h-7 rounded-md flex justify-center
            font-bold text-sm items-center text-[var(--btn-content)]"
            >
              {currHue()}
            </div>
          </div>
        </div>
        <div class="w-full h-6 px-1 bg-[oklch(0.80_0.10_0)] dark:bg-[oklch(0.70_0.10_0)] rounded select-none">
          <input
            aria-label={i18n(I18nKey.themeColor)}
            type="range"
            min="0"
            max="360"
            value={currHue()}
            oninput={(e) => setCurrHue(parseInt(e.currentTarget.value))}
            class="slider w-full"
            id="colorSlider"
            step="5"
          />
        </div>
      </Panel>
    </>
  )
}
