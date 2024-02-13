import type { RequestHandler } from 'express'
import type { WhereOptions } from 'sequelize'

import ApiError from '../error/api-error'
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '../constants'
import { Product, ProductInfo } from '../models/models'

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
      include: [{ model: ProductInfo, as: 'info' }],
    })

    return res.json(product)
  },

  // async create(req, res, next) {
  //   try {
  //     let { brandId, categoryId, info, name, price } = req.body
  //     const { img } = req.files
  //
  //     let fileName = uuid.v4() + '.jpg'
  //     img.mv(path.resolve(__dirname, '..', 'static', fileName))
  //
  //     const newProduct = await Product.create({
  //       brandId,
  //       categoryId,
  //       img: fileName,
  //       info,
  //       name,
  //       price,
  //     })
  //
  //     if (info) {
  //       info = JSON.parse(info)
  //       info.forEach((it) =>
  //         ProductInfo.create({
  //           title: it.title,
  //           description: it.description,
  //           deviceId: newProduct.id,
  //         }),
  //       )
  //     }
  //
  //     return res.json(newProduct.id)
  //   } catch (e) {
  //     next(ApiError.badRequest((e as Error).message))
  //   }
  // },
}

export default productsHandler
