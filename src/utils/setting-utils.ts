import {
  AUTO_MODE,
  DARK_MODE,
  DEFAULT_THEME,
  LIGHT_MODE,
} from '@constants/constants.ts'
import config from '@/config'
import type { LIGHT_DARK_MODE } from '@/types/config'

export const getDefaultHue = (): number => {
  const fallback = '250'
  const configCarrier = document.getElementById('config-carrier')
  return Number.parseInt(configCarrier?.dataset.hue || fallback, 10)
}

export const getHue = (): number => {
  const stored = localStorage.getItem('hue')
  return stored ? Number.parseInt(stored, 10) : getDefaultHue()
}

export const setHue = (hue: number): void => {
  localStorage.setItem('hue', String(hue))
  const r = document.querySelector(':root') as HTMLElement
  if (!r) {
    return
  }
  r.style.setProperty('--hue', String(hue))
}

export const applyThemeToDocument = (theme: LIGHT_DARK_MODE) => {
  switch (theme) {
    case LIGHT_MODE:
      document.documentElement.classList.remove('dark')
      break
    case DARK_MODE:
      document.documentElement.classList.add('dark')
      break
    case AUTO_MODE:
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      break
  }

  // Set the theme for Expressive Code
  document.documentElement.setAttribute(
    'data-theme',
    config.expressiveCode.theme,
  )
}

export const setTheme = (theme: LIGHT_DARK_MODE): void => {
  localStorage.setItem('theme', theme)
  applyThemeToDocument(theme)
}

export const getStoredTheme = (): LIGHT_DARK_MODE => {
  return (localStorage.getItem('theme') as LIGHT_DARK_MODE) || DEFAULT_THEME
}
