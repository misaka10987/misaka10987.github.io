/** @jsxImportSource hastscript */

import type { RootContent } from 'mdast'
import type { Result } from 'hastscript'

export type AdmonitionType =
  | 'tip'
  | 'note'
  | 'important'
  | 'caution'
  | 'warning'

type Props = {
  'admonition-type': AdmonitionType
  'has-directive-label'?: boolean
  children: RootContent[]
}

export const Admonition = (props: Props): Result => {
  if (!Array.isArray(props.children) || props.children.length === 0) {
    throw new Error(
      'Invalid admonition directive. (Admonition directives must be of block type ":::note{name="name"} <content> :::")',
    )
  }

  const hasDirectiveLabel = props['has-directive-label'] ?? false

  const [label, children] = hasDirectiveLabel
    ? [{ ...props.children[0], tagName: 'div' } as any, props.children.slice(1)]
    : [props['admonition-type'].toUpperCase(), props.children]

  return (
    <blockquote class={`admonition bdm-${props['admonition-type']}`}>
      <span class="bdm-title">{label}</span>
      {children as any}
    </blockquote>
  )
}

export const admonitionComponent =
  (admonitionType: AdmonitionType) =>
  (x: any, y: any): Result =>
    Admonition({
      children: y,
      'admonition-type': admonitionType,
      ...x,
    })
