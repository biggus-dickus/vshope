import type { CrudParams, ICrud } from './meta'

import ApiError from '../error/api-error'
import Brand from '../models/Brand'
import { getPaginationOptions } from './utils'

class BrandCrud implements ICrud<Brand> {
  async create(...[req, res, next]: CrudParams) {
    try {
      const { name } = req.body
      if (!name) return next(ApiError.badRequest('Name is required'))

      const newBrand = await Brand.create({ name })
      return res.json(newBrand.id)
    } catch (e) {
      next(ApiError.badRequest((e as Error).message))
    }
  }

  async getOne(...[req, res]: CrudParams) {
    const brand = await Brand.findOne({
      where: { id: req.params.id },
    })

    return res.json(brand)
  }

  async getMany(...[req, res]: CrudParams) {
    const { limit, offset } = getPaginationOptions(req.query)
    const items = await Brand.findAndCountAll({ limit, offset })

    return res.json(items)
  }

  async update(...[req, res]: CrudParams) {
    const { id, ...fields } = req.body
    const [updateCount] = await Brand.update(fields, {
      where: { id },
    })

    return res.json(updateCount ? req.body : null)
  }
}

const brandController = new BrandCrud()

export default brandController
