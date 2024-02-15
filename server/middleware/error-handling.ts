import type { ErrorRequestHandler } from 'express'

import ApiError from '../error/api-error'

const errorHandlingMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message })
  }

  return res.status(500).json({ message: 'Unexpected error' })
}

export default errorHandlingMiddleware
