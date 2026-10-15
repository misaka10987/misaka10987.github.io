/** @jsxImportSource hastscript */

import type { Result } from 'hastscript'
import type { RootContent } from 'mdast'
import style from './rehype-component-github-card.module.css'
import clsx from 'clsx'

interface Props {
  repo: string
  children: RootContent[]
}

/**
 * Creates a GitHub Card component.
 *
 * @param {Object} properties - The properties of the component.
 * @param {string} properties.repo - The GitHub repository in the format "owner/repo".
 * @param {import('mdast').RootContent[]} children - The children elements of the component.
 * @returns {import('mdast').Parent} The created GitHub Card component.
 */
export const GithubCard = (
  props: Props,
  // properties: any,
  // children: RootContent[],
): Result => {
  if (Array.isArray(props.children) && props.children.length !== 0) {
    return (
      <div class="hidden">
        {`Invalid directive. ("github" directive must be leaf type "::github
        {(repo = 'owner/repo')}")`}
      </div>
    )
  }

  if (!props.repo?.includes('/')) {
    return (
      <div class="hidden">
        {`Invalid repository. ("repo" attributte must be in the format "owner/repo")`}
      </div>
    )
  }

  const repo = props.repo
  const cardUuid = `GC${Math.random().toString(36).slice(-6)}` // Collisions are not important

  const s = `
        fetch('https://api.github.com/repos/${repo}', { referrerPolicy: "no-referrer" }).then(response => response.json()).then(data => {
        document.getElementById('${cardUuid}-description').innerText = data.description?.replace(/:[a-zA-Z0-9_]+:/g, '') || "Description not set";
        document.getElementById('${cardUuid}-language').innerText = data.language;
        document.getElementById('${cardUuid}-forks').innerText = Intl.NumberFormat('en-us', { notation: "compact", maximumFractionDigits: 1 }).format(data.forks).replaceAll("\u202f", '');
        document.getElementById('${cardUuid}-stars').innerText = Intl.NumberFormat('en-us', { notation: "compact", maximumFractionDigits: 1 }).format(data.stargazers_count).replaceAll("\u202f", '');
        const avatarEl = document.getElementById('${cardUuid}-avatar');
        avatarEl.style.backgroundImage = 'url(' + data.owner.avatar_url + ')';
        avatarEl.style.backgroundColor = 'transparent';
        document.getElementById('${cardUuid}-license').innerText = data.license?.spdx_id || "no-license";
        document.getElementById('${cardUuid}-card').classList.remove("fetch-waiting");
        console.log("[GITHUB-CARD] Loaded card for ${repo} | ${cardUuid}.")
      }).catch(err => {
        const c = document.getElementById('${cardUuid}-card');
        c?.classList.add("fetch-error");
        console.warn("[GITHUB-CARD] (Error) Loading card for ${repo} | ${cardUuid}.")
      })
  `

  return (
    <a
      id={`${cardUuid}-card`}
      href={`https://github.com/${repo}`}
      target="_blank"
      rel="noopener noreferrer"
      repo={repo}
      class={clsx(style['card-github'], 'fetch-waiting no-styling')}
    >
      {/* title */}
      <div class={style['gc-titlebar']}>
        <div class={style['gc-titlebar-left']}>
          <div class={style['gc-owner']}>
            <div id={`${cardUuid}-avatar`} class={style['gc-avatar']} />
            <div class={style['gc-user']}>{repo.split('/')[0]}</div>
          </div>
          <div class={style['gc-divider']}>/</div>
          <div class={style['gc-repo']}>{repo.split('/')[1]}</div>
        </div>
        <div class={style['github-logo']} />
      </div>
      {/* description */}
      <div id={`${cardUuid}-description`} class={style['gc-description']}>
        Waiting for api.github.com...
      </div>
      <div class={style['gc-infobar']}>
        <div id={`${cardUuid}-stars`} class={style['gc-stars']}>
          00K
        </div>
        <div id={`${cardUuid}-forks`} class={style['gc-forks']}>
          0K
        </div>
        <div id={`${cardUuid}-license`} class={style['gc-license']}>
          0K
        </div>
        <span id={`${cardUuid}-language`} class={style['gc-language']}>
          Waiting...
        </span>
      </div>
      <script id={`${cardUuid}-script`} type="text/javascript" defer>
        {s}
      </script>
    </a>
  )
}

export const githubCardComponent = (properties: any, children: any): Result =>
  GithubCard({
    repo: properties.repo,
    children,
  })
