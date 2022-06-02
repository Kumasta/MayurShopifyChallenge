import express from 'express'
import mongoose from 'mongoose'
import router from './config/routes.js'
import { port, dbURI } from './config/environment.js'
import cors from 'cors'

const app = express()

const startServer = async () => {
  try {
    // Attempt mongodb connection
    await mongoose.connect(dbURI)
    console.log('Mongodb connected')

    // --Middleware--
    app.use(cors())


    // JSON Parser
    app.use(express.json())

    // Logger
    app.use((req, _res, next) => {
      console.log(`🚨 Request received: ${req.method} - ${req.url}`)
      next()
    })

    // Routes
    app.use('/api', router)


    // Catch All
    app.use((_req, res) => {
      return res.status(404).json({ message: 'Route Not Found' })
    })

    // If mongodb connects successfully
    app.listen(port, () => console.log(`🚀 Server listening on port ${port}`))
  } catch (err) {
    console.log(err)
  }
}
startServer()