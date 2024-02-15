import cors from 'cors'
import express from 'express'
import fileUpload from 'express-fileupload'
import path from 'path'

import apiRouter from './routes'
import db from './db'
import errorHandler from './middleware/error-handling'

const PORT = process.env.PORT || 4242
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))

app.use('/api/v1', apiRouter)
app.use(errorHandler)

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
