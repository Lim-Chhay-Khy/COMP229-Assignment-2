import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: 'Name is required' },
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required',
  },
  password: { type: String, required: 'Password is required' },
  created: { type: Date, default: Date.now },
  updated: { type: Date },
})

// Hash the password whenever it is set/changed
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    if (this.password.length < 6) {
      return next(new Error('Password must be at least 6 characters.'))
    }
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

UserSchema.methods.authenticate = function (plainText) {
  return bcrypt.compare(plainText, this.password)
}

UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password
    return ret
  },
})

export default mongoose.model('User', UserSchema, 'users')
