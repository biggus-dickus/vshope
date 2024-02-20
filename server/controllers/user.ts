import jwt from 'jsonwebtoken'
import { z } from 'zod'

import type { CrudParams, ICrud } from './meta'
import type { RequestWithUser } from '../config/shared-types'
import type { Role } from '../models/User'
import type { WhereOptions } from 'sequelize'
import type { ZodError } from 'zod'

import Cart from '../models/Cart'
import User from '../models/User'

import ApiError from '../error/api-error'
import { getPaginationOptions } from './utils'

const userFields = ['id', 'email', 'firstName', 'lastName', 'role']

const userSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  password: z.string().min(7).max(50),
  role: z.enum(['ADMIN', 'USER']).optional().default('USER' as Role),
}).strict()

const generateJwt = (id: string, email: string, role: Role) => {
  return jwt.sign({ id, email, role }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: '24h',
  })
}

class UserController implements ICrud<User> {
  async create(...[req, res, next]: CrudParams) {
    try {
      const userInput = userSchema.parse(req.body)
      const { email, firstName, lastName, password, role = 'USER' } = userInput

      if (await User.findOne({ where: { email } })) {
        return next(ApiError.badRequest('User with this email already exists'))
      }

      const hashedPassword = await Bun.password.hash(password)
      const user = await User.create({
        email,
        firstName,
        lastName,
        role,
        password: hashedPassword,
      })

      await Cart.create({ userId: user.id })

      const token = generateJwt(user.id, user.email, user.role)
      return res.json({ token })
    } catch (e) {
      const flatError = (e as ZodError).flatten()
      next(ApiError.badRequest(flatError as any))
    }
  }

  async getOne(...[req, res]: CrudParams) {
    const { id } = req.params
    const product = await User.findOne({
      where: { id },
      attributes: userFields,
    })

    return res.json(product)
  }

  async getMany(...[req, res]: CrudParams) {
    const { role } = req.query
    const { limit, offset } = getPaginationOptions(req.query)

    let where: WhereOptions = {}
    if (role) {
      where.role = role
    }

    const users = await User.findAndCountAll({
      where,
      limit,
      offset,
      attributes: userFields,
    })
    return res.json(users)
  }

  async update(...[req, res, next]: CrudParams) {
    try {
      const updateFields = userSchema.partial().extend({ id: z.number() })
      const validation = updateFields.safeParse(req.body)
      if (!validation.success) {
        return next(ApiError.badRequest(validation.error.flatten() as any))
      }

      const { id, ...fields } = req.body
      const [updateCount] = await User.update(fields, {
        where: { id },
      })

      return res.json(updateCount ? req.body : null)
    } catch (e) {
      next(ApiError.internal((e as Error).message))
    }
  }

  async login(...[req, res, next]: CrudParams) {
    const emailField = z.string().email()
    const validation = emailField.safeParse(req.body.email)
    if (!validation.success) {
      return next(ApiError.badRequest('Invalid email format'))
    }

    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })

    if (!user || !(await Bun.password.verify(password, user.password))) {
      return next(ApiError.badRequest('Invalid email or password'))
    }

    const token = generateJwt(user.id, user.email, user.role)
    return res.json({ token })
  }

  async refreshToken(...[req, res, next]: CrudParams) {
    const user = (req as RequestWithUser).user
    if (!user) {
      return next(new ApiError(401, 'Unauthorized'))
    }
    const token = generateJwt(user?.id, user?.email, user?.role)
    return res.json({ token })
  }
}

const userController = new UserController()

export default userController
