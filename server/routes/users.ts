import express from 'express'

import authMW from '../middleware/auth'
import permissionMW from '../middleware/permission'
import userController from '../controllers/user'

const usersRouter = express.Router()

usersRouter.get('/', authMW, userController.getMany)
usersRouter.get('/:id', authMW, userController.getOne)
usersRouter.get('/refresh', authMW, userController.refreshToken)

usersRouter.post('/registration', userController.create)
usersRouter.post('/login', userController.login)

usersRouter.patch('/', authMW, permissionMW, userController.update)

export default usersRouter
