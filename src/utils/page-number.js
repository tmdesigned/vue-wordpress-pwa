/**
 * Parse user-entered page number text into a valid page within [1, totalPages].
 * Returns null when the input is not a whole number or there are no pages.
 */
export function parsePageNumber (input, totalPages) {
  if (!Number.isInteger(totalPages) || totalPages < 1) return null
  const page = Number(String(input).trim())
  if (!Number.isInteger(page)) return null
  if (page < 1 || page > totalPages) return null
  return page
}

export function pageCount (totalPosts, perPage) {
  return Math.max(1, Math.ceil(totalPosts / perPage))
}
