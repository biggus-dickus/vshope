import cors from 'cors'
import express from 'express'
import path from 'path'

import './models/models'

import apiRouter from './routes'
import db from './db'

const PORT = process.env.PORT || 4242

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', apiRouter)

;(async function start() {
  try {
    await db.authenticate()
    await db.sync()

    app.listen(PORT, () => {
      console.info(`🚀 Server is running on port ${PORT}`)
    })
  } catch (e) {
    console.error(e)
  }
})()
