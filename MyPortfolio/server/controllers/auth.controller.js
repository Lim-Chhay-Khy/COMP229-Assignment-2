import jwt from 'jsonwebtoken'
import { expressjwt } from 'express-jwt'
import User from '../models/user.model.js'
import config from '../../config/config.js'

const signin = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !(await user.authenticate(password || ''))) {
      return res.status(401).json({ error: 'Email and password do not match.' })
    }
    const token = jwt.sign({ _id: user._id }, config.jwtSecret, { expiresIn: '1d' })
    res.cookie('t', token, { httpOnly: true, sameSite: 'lax', secure: config.env === 'production', maxAge: 24 * 60 * 60 * 1000 })
    res.json({ token, user: { _id: user._id, name: user.name, email: user.email } })
  } catch (err) {
    res.status(401).json({ error: 'Could not sign in' })
  }
}

const signout = (req, res) => {
  res.clearCookie('t')
  res.json({ message: 'signed out' })
}

// Verifies the JWT (Authorization: Bearer <token>) and sets req.auth
const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ['HS256'],
  requestProperty: 'auth',
  getToken: (req) => {
    const h = req.headers.authorization
    if (h && h.startsWith('Bearer ')) return h.slice(7)
    return req.cookies?.t
  },
})

// Only the signed-in user may modify their own record
const hasAuthorization = (req, res, next) => {
  if (!(req.auth && req.auth._id === req.params.id)) {
    return res.status(403).json({ error: 'User is not authorized' })
  }
  next()
}

export default { signin, signout, requireSignin, hasAuthorization }
