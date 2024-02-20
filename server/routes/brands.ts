import express from 'express'

import authMW from '../middleware/auth'
import controller from '../controllers/brand'
import permissionMW from '../middleware/permission'

const brandsRouter = express.Router()

brandsRouter.get('/', controller.getMany)
brandsRouter.get('/:id', controller.getOne)

brandsRouter.post('/', authMW, permissionMW, controller.create)

brandsRouter.patch('/', authMW, permissionMW, controller.update)

export default brandsRouter
