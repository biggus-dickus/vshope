import type { JwtPayload } from 'jsonwebtoken'
import type { Request } from 'express'

export interface RequestWithUser extends Request {
  user?: JwtPayload;
}
