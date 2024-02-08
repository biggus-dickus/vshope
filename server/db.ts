import type { Options } from 'sequelize'
import { Sequelize } from 'sequelize'

import config from './config/db-connect.js'

const env = (process.env.NODE_ENV || 'development') as keyof typeof config
const db = new Sequelize(config[env] as Options)

export default db
