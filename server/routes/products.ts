import express from 'express'
import productsHandler from '../controllers/products-handler'

const productsRouter = express.Router()

productsRouter.post('/', productsHandler.create)
productsRouter.get('/', productsHandler.getAll)
productsRouter.get('/:id', productsHandler.getOne)

export default productsRouter
