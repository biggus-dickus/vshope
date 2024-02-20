import type { CrudParams, ICrud } from './meta'

import ApiError from '../error/api-error'
import Category from '../models/Category'
import { getPaginationOptions } from './utils'

class CategoryCrud implements ICrud<Category> {
  async create(...[req, res, next]: CrudParams) {
    try {
      const { name } = req.body
      if (!name) return next(ApiError.badRequest('Name is required'))

      const newCategory = await Category.create({ name })
      return res.json(newCategory.id)
    } catch (e) {
      next(ApiError.badRequest((e as Error).message))
    }
  }

  async getOne(...[req, res]: CrudParams) {
    const category = await Category.findOne({
      where: { id: req.params.id },
    })

    return res.json(category)
  }

  async getMany(...[req, res]: CrudParams) {
    const { limit, offset } = getPaginationOptions(req.query)
    const categories = await Category.findAndCountAll({ limit, offset })

    return res.json(categories)
  }

  async update(...[req, res]: CrudParams) {
    const { id, ...fields } = req.body
    const [updateCount] = await Category.update(fields, {
      where: { id },
    })

    return res.json(updateCount ? req.body : null)
  }
}

const categoryController = new CategoryCrud()

export default categoryController
