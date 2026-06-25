// Usage : import { highlight } from 'src/utils/highlight'
// Then in HTML : <div v-html="highlight(text)" />

import { filterKey } from 'src/controllers/mapDataController'

export function highlight(text) {
  if (!filterKey.value || text == null) return text

  // Remove spaces from the search key
  const normalizedKey = filterKey.value.replace(/\s/g, '')

  // Escape regex characters
  const escaped = normalizedKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  // Allow spaces between every character
  const pattern = escaped.split('').join('\\s*')

  const regex = new RegExp(`(${pattern})`, 'gi')

  return String(text).replace(
    regex,
    '<span class="search-highlight">$1</span>'
  )
}
