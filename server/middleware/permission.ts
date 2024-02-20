import type { RequestHandler } from 'express'
import type { RequestWithUser } from '../config/shared-types'

import ApiError from '../error/api-error'

// This middleware expects a `user` field to be set on the request object,
// so it must run AFTER the `auth` middleware, which does this.
const checkPermission: RequestHandler = (req: RequestWithUser, _res, next) => {
    const { user } = req
    if (!user || user?.role !== 'ADMIN') {
      return next(ApiError.forbidden('Access denied'))
    }
    next()
}

export default checkPermission
