import I18nKey from '@i18n/i18nKey'
import { i18n } from '@i18n/translation'

export const pathsEqual = (path1: string, path2: string) => {
  const normalizedPath1 = path1.replace(/^\/|\/$/g, '').toLowerCase()
  const normalizedPath2 = path2.replace(/^\/|\/$/g, '').toLowerCase()
  return normalizedPath1 === normalizedPath2
}

const joinUrl = (...parts: string[]): string => {
  const joined = parts.join('/')
  return joined.replace(/\/+/g, '/')
}

export const getPostUrl = (id: string) => {
  return url(`/p/${id}/`)
}

export const getTagUrl = (tag: string): string => {
  if (!tag) return url('/archive/')
  return url(`/archive/?tag=${encodeURIComponent(tag.trim())}`)
}

export const getCategoryUrl = (category: string | null): string => {
  if (
    !category ||
    category.trim() === '' ||
    category.trim().toLowerCase() === i18n(I18nKey.uncategorized).toLowerCase()
  )
    return url('/archive/?uncategorized=true')
  return url(`/archive/?category=${encodeURIComponent(category.trim())}`)
}

export const url = (path: string) => {
  return joinUrl('', import.meta.env.BASE_URL, path)
}
