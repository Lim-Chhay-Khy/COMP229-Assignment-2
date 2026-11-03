import express from 'express'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import mongoose from 'mongoose'
import contactRoutes from './routes/contact.routes.js'
import projectRoutes from './routes/project.routes.js'
import qualificationRoutes from './routes/qualification.routes.js'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to My Portfolio application.' })
})

app.get('/health', (req, res) => {
  const database = ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState] || 'unknown'
  res.status(database === 'connected' ? 200 : 503).json({ backend: 'running', database })
})

// Respond promptly while MongoDB is unavailable instead of buffering requests.
app.use(['/api', '/auth/signin'], (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: 'Database is unavailable. Please try again once the MongoDB connection is restored.' })
  }
  next()
})

app.use('/', authRoutes)
app.use('/', contactRoutes)
app.use('/', projectRoutes)
app.use('/', qualificationRoutes)
app.use('/', userRoutes)

// Auth errors (express-jwt) and generic errors
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: err.message })
  }
  if (err) {
    console.error(err)
    return res.status(400).json({ error: err.message })
  }
  next()
})

export default app
