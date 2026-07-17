import I18nKey from '@i18n/i18nKey'
import { i18n } from '@i18n/translation'
import { Icon } from '@iconify-icon/solid'
import { url } from '@utils/url-utils.ts'
import { createEffect, createSignal, onMount } from 'solid-js'
import type { SearchResult } from '@/global'
import { createFloatPanel } from './float-panel'
import Button from './Button'

const fakeResult = [
  {
    url: url('/'),
    meta: {
      title: 'This Is a Fake Search Result',
    },
    excerpt:
      'Because the search cannot work in the <mark>dev</mark> environment.',
  },
  {
    url: url('/'),
    meta: {
      title: 'If You Want to Test the Search',
    },
    excerpt: 'Try running <mark>npm build && npm preview</mark> instead.',
  },
]

export default () => {
  const [keywordDesktop, setKeywordDesktop] = createSignal('')
  const [keywordMobile, setKeywordMobile] = createSignal('')
  const [result, setResult] = createSignal<SearchResult[]>([])
  const [pagefindLoaded, setPagefindLoaded] = createSignal(false)
  const [initialized, setInitialized] = createSignal(false)

  const [Panel, panelActive, setPanelActive] = createFloatPanel([
    'search-panel',
    'search-bar',
    'search-switch',
  ])

  const setPanelVisibility = (show: boolean, isDesktop: boolean): void => {
    if (!isDesktop) return
    setPanelActive(show)
  }

  const togglePanel = () => {
    setPanelActive(!panelActive())
  }

  const search = async (keyword: string, isDesktop: boolean): Promise<void> => {
    if (!keyword) {
      setPanelVisibility(false, isDesktop)
      setResult([])
      return
    }

    if (!initialized) {
      return
    }

    try {
      let searchResults: SearchResult[] = []

      if (import.meta.env.PROD && pagefindLoaded() && window.pagefind) {
        const response = await window.pagefind.search(keyword)
        searchResults = await Promise.all(
          response.results.map((item) => item.data()),
        )
      } else if (import.meta.env.DEV) {
        searchResults = fakeResult
      } else {
        searchResults = []
        console.error('Pagefind is not available in production environment.')
      }

      setResult(searchResults)
      setPanelVisibility(result().length > 0, isDesktop)
    } catch (error) {
      console.error('Search error:', error)
      setResult([])
      setPanelVisibility(false, isDesktop)
    }
  }

  createEffect(async () => {
    if (initialized() && keywordDesktop()) {
      await search(keywordDesktop(), true)
    }
  })

  createEffect(async () => {
    if (initialized() && keywordMobile()) {
      await search(keywordMobile(), false)
    }
  })

  onMount(() => {
    const initializeSearch = () => {
      setInitialized(true)

      const loaded =
        typeof window !== 'undefined' &&
        !!window.pagefind &&
        typeof window.pagefind.search === 'function'

      setPagefindLoaded(loaded)

      console.log('Pagefind status on init:', pagefindLoaded())

      if (keywordDesktop()) search(keywordDesktop(), true)
      if (keywordMobile()) search(keywordMobile(), false)
    }

    if (import.meta.env.DEV) {
      console.log(
        'Pagefind is not available in development mode. Using mock data.',
      )
      initializeSearch()
    } else {
      document.addEventListener('pagefindready', () => {
        console.log('Pagefind ready event received.')
        initializeSearch()
      })
      document.addEventListener('pagefindloaderror', () => {
        console.warn(
          'Pagefind load error event received. Search functionality will be limited.',
        )
        initializeSearch() // Initialize with pagefindLoaded as false
      })

      // Fallback in case events are not caught or pagefind is already loaded by the time this script runs
      setTimeout(() => {
        if (!initialized) {
          console.log('Fallback: Initializing search after timeout.')
          initializeSearch()
        }
      }, 2000) // Adjust timeout as needed
    }
  })

  return (
    <>
      {/* <!-- search bar for desktop view --> */}
      <div
        id="search-bar"
        class="hidden lg:flex transition-all items-center h-11 mr-2 rounded-lg
      bg-black/[0.04] hover:bg-black/[0.06] focus-within:bg-black/[0.06]
      dark:bg-white/5 dark:hover:bg-white/10 dark:focus-within:bg-white/10"
      >
        <Icon
          icon="material-symbols:search"
          class="absolute text-[1.25rem] pointer-events-none ml-3 transition my-auto text-black/30 dark:text-white/30"
        ></Icon>
        <input
          placeholder={i18n(I18nKey.search)}
          value={keywordDesktop()}
          oninput={(e) => setKeywordDesktop(e.currentTarget.value)}
          //   bind:value={keywordDesktop}
          onfocus={() => search(keywordDesktop(), true)}
          class="transition-all pl-10 text-sm bg-transparent outline-0
         h-full w-40 active:w-60 focus:w-60 text-black/50 dark:text-white/50 focus:[outline:0]"
        />
      </div>

      {/* <!-- toggle btn for phone/tablet view --> */}
      <Button
        variant="plain"
        scale-animation
        onclick={togglePanel}
        aria-label="Search Panel"
        id="search-switch"
        class="lg:!hidden rounded-lg w-11 h-11 active:scale-90"
      >
        <Icon icon="material-symbols:search" class="text-[1.25rem]"></Icon>
      </Button>

      <Panel class="overflow-hidden bg-[var(--float-panel-bg)] transition dark:shadow-none max-h-[calc(100vh-100px)] overflow-y-auto absolute md:w-[30rem] top-20 left-4 md:left-[unset] right-4 shadow-2xl rounded-2xl p-2 [&_mark]:bg-transparent [&_mark]:text-[var(--primary)]">
        {/* <!-- search bar inside panel for phone/tablet --> */}
        <div
          id="search-bar-inside"
          class="flex relative lg:hidden transition-all items-center h-11 rounded-xl
        bg-black/[0.04] hover:bg-black/[0.06] focus-within:bg-black/[0.06]
        dark:bg-white/5 dark:hover:bg-white/10 dark:focus-within:bg-white/10"
        >
          <Icon
            icon="material-symbols:search"
            class="absolute text-[1.25rem] pointer-events-none ml-3 transition my-auto text-black/30 dark:text-white/30"
          ></Icon>
          <input
            placeholder="Search"
            value={keywordMobile()}
            oninput={(e) => setKeywordMobile(e.currentTarget.value)}
            class="pl-10 absolute inset-0 text-sm bg-transparent outline-0
               focus:w-60 text-black/50 dark:text-white/50 focus:[outline:0]"
          />
        </div>

        {/* <!-- search results --> */}
        {result().map((item) => (
          <a
            href={item.url}
            class="transition first-of-type:mt-2 lg:first-of-type:mt-0 group block
            rounded-xl text-lg px-3 py-2 hover:bg-[var(--btn-plain-bg-hover)] active:bg-[var(--btn-plain-bg-active)]"
          >
            <div class="transition text-90 inline-flex font-bold group-hover:text-[var(--primary)]">
              {item.meta.title}
              <Icon
                icon="fa6-solid:chevron-right"
                class="transition text-[0.75rem] translate-x-1 my-auto text-[var(--primary)]"
              ></Icon>
            </div>
            <div class="transition text-sm text-50" innerHTML={item.excerpt}>
              {/* {@html item.excerpt} */}
            </div>
          </a>
        ))}
      </Panel>
    </>
  )
}
