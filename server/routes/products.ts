import express from 'express'

import authMW from '../middleware/auth'
import permissionMW from '../middleware/permission'
import productController from '../controllers/product'

const productsRouter = express.Router()

productsRouter.get('/', productController.getMany)
productsRouter.get('/:id', productController.getOne)

productsRouter.post('/', authMW, permissionMW, productController.create)

productsRouter.delete('/:id', authMW, permissionMW, productController.deleteOne)
productsRouter.delete('/', authMW, permissionMW, productController.deleteMany)

productsRouter.patch('/', authMW, permissionMW, productController.update)

export default productsRouter
