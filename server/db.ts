import type { SequelizeOptions } from 'sequelize-typescript'
import { Sequelize } from 'sequelize-typescript'

import config from './config/db-connect'

const env = (process.env.NODE_ENV || 'development') as keyof typeof config

const db = new Sequelize({
  ...config[env],
  models: [__dirname + '/models'],
} as SequelizeOptions)

export default db
