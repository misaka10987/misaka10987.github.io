import { siteConfig } from '@/config'
import type { MarkdownHeading } from 'astro'
import clsx from 'clsx'
import { splitProps } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'

type Props = JSX.HTMLAttributes<HTMLDivElement> & {
  headings?: MarkdownHeading[]
}

export default (props: Props) => {
  const [local, others] = splitProps(props, ['headings'])

  const headings = local.headings ?? []

  if (headings.filter((h) => h.depth === 1).length > 1) {
    throw new Error('Multiple H1 headings in one post')
  }

  const minLevel = headings
    .map((h) => h.depth)
    .filter((x) => x > 1)
    .reduce((a, b) => Math.min(a, b), Infinity)

  const displayHeadings = headings.filter(
    (h) => h.depth < minLevel + siteConfig.toc.depth,
  )

  let toc!: HTMLDivElement
  let activeIndicator!: HTMLDivElement
  let tocEntries: HTMLAnchorElement[] = []

  let minHeadingCount = 1

  return (
    siteConfig.toc.enable && (
      <div
        id='toc-wrapper'
        class={clsx(
          'hidden lg:block transition absolute top-0 -right-[var(--toc-width)] w-[var(--toc-width)] items-center',
          siteConfig.banner.enable && 'toc-hide',
        )}
        {...others}
      >
        <div
          ref={toc}
          id='toc-inner-wrapper'
          class='fixed top-14 w-[var(--toc-width)] h-[calc(100vh_-_20rem)] overflow-y-scroll overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'
          style={{
            'mask-image':
              'linear-gradient(to bottom, transparent 0%, black 2rem, black calc(100% - 2rem), transparent 100%)',
          }}
        >
          <div id='toc' class='w-full h-full transition-swup-fade '>
            <div class='h-8 w-full' />
            <aside aria-label='Table of Contents'>
              {displayHeadings.map((h, idx) => (
                <a
                  ref={(ref) => tocEntries.push(ref)}
                  href={`#${h.slug}`}
                  class='px-2 flex gap-2 relative transition w-full min-h-9 rounded-xl hover:bg-[var(--toc-btn-hover)] active:bg-[var(--toc-btn-active)] py-2'
                >
                  <div
                    class={clsx(
                      'transition w-5 h-5 shrink-0 rounded-lg text-xs flex items-center justify-center font-bold',
                      (h.depth === minLevel || h.depth === 1) &&
                        'bg-[var(--toc-badge-bg)] text-[var(--btn-content)]',
                      h.depth === minLevel + 1 && 'ml-4',
                      h.depth === minLevel + 2 && 'ml-8',
                    )}
                  >
                    {h.depth === 1 && 0}
                    {h.depth === minLevel && minHeadingCount++}
                    {h.depth == minLevel + 1 && (
                      <div class='transition w-2 h-2 rounded-[0.1875rem] bg-[var(--toc-badge-bg)]' />
                    )}
                    {h.depth == minLevel + 2 && (
                      <div class='transition w-1.5 h-1.5 rounded-sm bg-black/5 dark:bg-white/10' />
                    )}
                  </div>
                  <div
                    class={clsx(
                      'transition text-sm',
                      (h.depth <= minLevel || h.depth == minLevel + 1) &&
                        'text-50',
                      h.depth === minLevel + 2 && 'text-30',
                    )}
                  >
                    {removeTailingHash(h.text)}
                  </div>
                </a>
              ))}
              <div
                ref={activeIndicator}
                id='active-indicator'
                style='opacity: 0'
                class={clsx(
                  displayHeadings.length === 0 && 'hidden',
                  '-z-10 absolute bg-[var(--toc-btn-hover)] left-0 right-0 rounded-xl transition-all',
                  'group-hover:bg-transparent border-2 border-[var(--toc-btn-hover)] group-hover:border-[var(--toc-btn-active)] border-dashed',
                )}
              />
            </aside>
            <div class='h-8 w-full' />
          </div>
        </div>
      </div>
    )
  )
}

const removeTailingHash = (text: string) => {
  let lastIndexOfHash = text.lastIndexOf('#')
  if (lastIndexOfHash !== text.length - 1) {
    return text
  }

  return text.substring(0, lastIndexOfHash)
}
