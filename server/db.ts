import { Sequelize } from 'sequelize'

const db = new Sequelize({
  database: process.env.DB_NAME,
  dialect: 'postgres',
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
})

export default db
