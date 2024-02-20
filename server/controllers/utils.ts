import { DEFAULT_LIMIT, DEFAULT_PAGE } from '../constants'

export const getPaginationOptions = (q: Stub) => {
  const { limit = DEFAULT_LIMIT, page = DEFAULT_PAGE } = q

  const numPage = Number(page) || DEFAULT_PAGE
  const numLimit = Number(limit) || DEFAULT_LIMIT
  const offset = numLimit * (numPage - 1)

  return { limit: numLimit, offset }
}
