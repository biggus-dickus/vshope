import { Op } from 'sequelize'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

import type { CrudParams, ICrud } from './meta'
import type { WhereOptions } from 'sequelize'
import type { UploadedFile } from 'express-fileupload'

import ApiError from '../error/api-error'
import { getPaginationOptions } from './utils'
import Product from '../models/Product'

class ProductCrud implements ICrud<Product> {
  async create(...[req, res, next]: CrudParams) {
    try {
      const { brandId, categoryId, description, name, price } = req.body
      const img = req.files?.img as UploadedFile  // <input name="img" type="file" />
      let fileName = ''

      if (img) {
        fileName = uuidv4() + path.extname(img.name)
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
      }

      const newProduct = await Product.create({
        brandId,
        categoryId,
        description,
        name,
        price,
        ...img && { img: fileName },
      })

      return res.json(newProduct.id)
    } catch (e) {
      next(ApiError.badRequest((e as Error).message))
    }
  }

  async getOne(...[req, res]: CrudParams) {
    const { id } = req.params
    const product = await Product.findOne({
      where: { id },
    })

    return res.json(product)
  }

  async getMany(...[req, res]: CrudParams) {
    const { brandId, categoryId } = req.query
    const { limit, offset } = getPaginationOptions(req.query)

    let where: WhereOptions = {}
    if (brandId) {
      where.brandId = Number(brandId) || null
    }
    if (categoryId) {
      where.categoryId = Number(categoryId) || null
    }

    const products = await Product.findAndCountAll({ where, limit, offset })
    return res.json(products)
  }

  async deleteOne(...[req, res]: CrudParams) {
    const numDeleted = await Product.destroy({
      where: {
        id: Number(req.params.id) || 0
      },
    })

    return res.json(numDeleted || null)
  }

  async deleteMany(...[req, res]: CrudParams) {
    const deleteIds = (req.body.ids as number[]) || []
    const count = await Product.destroy({
      where: {
        id: {
          [Op.in]: deleteIds,
        },
      },
    })

    return res.json(count ? deleteIds : null)
  }

  async update(...[req, res]: CrudParams) {
    const { id, ...fields } = req.body
    const [updateCount] = await Product.update(fields, {
      where: { id },
    })

    return res.json(updateCount ? req.body : null)
  }
}

const productController = new ProductCrud()

export default productController
