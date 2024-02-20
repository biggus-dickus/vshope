import jwt from 'jsonwebtoken'

import type { JwtPayload } from 'jsonwebtoken'
import type { RequestHandler } from 'express'
import type { RequestWithUser } from '../config/shared-types'

import ApiError from '../error/api-error'

const unauthorized = ApiError.unauthorized()

const authMiddleware: RequestHandler = (req, _res, next) => {
  if (req.method === 'OPTIONS') return next()

  try {
    const token = req.headers.authorization?.split(' ')[1] // 'Bearer TOKEN'
    if (!token) {
      return next(unauthorized)
    }

    (req as RequestWithUser).user = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload
    next()
  } catch (e) {
    return next(unauthorized)
  }
}

export default authMiddleware
