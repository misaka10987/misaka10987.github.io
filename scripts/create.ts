#!/usr/bin/env -S bun run

import { mkdir, writeFile, access } from 'fs/promises'
import path from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'
import TOML from 'smol-toml'

const main = async () => {
  const url = new URL(import.meta.url)
  const scriptPath = url.pathname
  const root = path.resolve(scriptPath, '../../')

  const post = process.argv[2]

  if (!post) {
    console.error('Usage: create.ts <POST>')
    return
  }

  const folder = path.join(root, 'src/content/posts', post)

  const exists = (path: string) =>
    access(path)
      .then(() => true)
      .catch(() => false)

  if (await exists(folder)) {
    console.error(`Post already exists: ${folder}`)
    return
  }

  await mkdir(folder, { recursive: true })

  const today = new Date().toISOString().split('T')[0]

  const frontmatter = {
    title: post,
    published: today,
    description: '',
    image: '',
    tags: [],
    category: '',
    draft: true,
    lang: '',
  }

  const toml = TOML.stringify(frontmatter).trim()

  await writeFile(path.join(folder, 'index.md'), `+++\n${toml}\n+++\n`, 'utf-8')

  console.info(`Created post: ${folder}/index.md`)

  try {
    await promisify(exec)(`xdg-open "${folder}"`)
  } catch (_) {
    console.warn('Failed to open folder with `xdg-open`')
  }
}

await main()
