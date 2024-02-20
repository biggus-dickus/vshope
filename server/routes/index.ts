import express from 'express'

import brandsRouter from './brands'
import categoriesRouter from './categories'
import productsRouter from './products'
import usersRouter from './users'

const apiRouter = express.Router()

apiRouter.use('/brands', brandsRouter)
apiRouter.use('/categories', categoriesRouter)
apiRouter.use('/products', productsRouter)
apiRouter.use('/users', usersRouter)

export default apiRouter
