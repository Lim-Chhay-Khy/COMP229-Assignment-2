import mongoose from 'mongoose'
import app from './server/express.js'
import config from './config/config.js'

const server = app.listen(config.port, () => {
  console.info('Backend running at http://localhost:%s', config.port)
  console.info('Database status: http://localhost:%s/health', config.port)
  console.info('Connecting to MongoDB...')

  mongoose.connect(config.mongoUri, { serverSelectionTimeoutMS: 5000 })
    .then(() => console.log('Connected to the database!'))
    .catch((err) => {
      console.error(`Unable to connect to database: ${err.message}`)
      console.error('Check mongoUri in MyPortfolio/config/config.js and ensure MongoDB is running and reachable, then restart the backend.')
    })
})

server.on('error', async (err) => {
  console.error(`Unable to start server: ${err.message}`)
  await mongoose.disconnect()
  process.exitCode = 1
})
