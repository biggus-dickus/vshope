import path from 'path'
import { v4 as uuidv4 } from 'uuid'

import type { RequestHandler } from 'express'
import type { WhereOptions } from 'sequelize'
import type { UploadedFile } from 'express-fileupload'

import ApiError from '../error/api-error'
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '../constants'
import Product from '../models/Product'
import ProductInfo from '../models/ProductInfo'

const productsHandler: { [method: string]: RequestHandler } = {
  async getAll(req, res) {
    const { brandId, categoryId, limit = DEFAULT_LIMIT, page = DEFAULT_PAGE } = req.query

    const numPage = +page || DEFAULT_PAGE
    const numLimit = +limit || DEFAULT_LIMIT
    const offset = numLimit * (numPage - 1)

    let where: WhereOptions = {}
    if (brandId) {
      where.brandId = Number(brandId) || null
    }
    if (categoryId) {
      where.categoryId = Number(categoryId) || null
    }

    const products = await Product.findAndCountAll({
      where,
      limit: numLimit,
      offset,
    })

    return res.json(products)
  },

  async getOne(req, res) {
    const { id } = req.params
    const product = await Product.findOne({
      where: { id },
      include: [{ model: ProductInfo, as: 'details' }],
    })

    return res.json(product)
  },

  async create(req, res, next) {
    try {
      const { brandId, categoryId, details, name, price } = req.body
      const img = req.files?.img as UploadedFile  // <input name="img" type="file" />
      let fileName = ''

      if (img) {
        fileName = uuidv4() + path.extname(img.name)
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
      }

      const newProduct = await Product.create({
        brandId,
        categoryId,
        details,
        name,
        price,
        ...img && { img: fileName },
      })

      if (details) {
        const infoParts = JSON.parse(details) as ProductInfo[]
        infoParts.forEach((it) =>
          ProductInfo.create({
            title: it.title,
            description: it.description,
            productId: newProduct.id,
          }),
        )
      }

      return res.json(newProduct.id)
    } catch (e) {
      next(ApiError.badRequest((e as Error).message))
    }
  },
}

export default productsHandler
