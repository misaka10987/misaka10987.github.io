/**
 * Based on the discussion at https://github.com/expressive-code/expressive-code/issues/153#issuecomment-2282218684
 */
import { definePlugin } from '@expressive-code/core'
import css from './language-badge.css?inline'

export function pluginLanguageBadge() {
  return definePlugin({
    name: 'Language Badge',
    baseStyles: css,
  })
}
