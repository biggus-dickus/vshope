import express from 'express'
import db from './db'

const PORT = process.env.PORT || 4242

const app = express()

;(async function start() {
  try {
    await db.authenticate()
    await db.sync()

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`)
    })
  } catch (e) {
    console.error(e)
  }
})()
