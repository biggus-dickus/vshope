import express from 'express'

import productsHandler from './products'

const apiRouter = express.Router()

apiRouter.use('/products', productsHandler)

export default apiRouter
