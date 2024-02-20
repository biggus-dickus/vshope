import express from 'express'

import authMW from '../middleware/auth'
import controller from '../controllers/category'
import permissionMW from '../middleware/permission'

const categoriesRouter = express.Router()

categoriesRouter.get('/', controller.getMany)
categoriesRouter.get('/:id', controller.getOne)

categoriesRouter.post('/', authMW, permissionMW, controller.create)

categoriesRouter.patch('/', authMW, permissionMW, controller.update)

export default categoriesRouter
