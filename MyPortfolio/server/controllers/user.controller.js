import User from '../models/user.model.js'

const list = async (req, res) => {
  try {
    res.json(await User.find())
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
const read = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json(user)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
const create = async (req, res) => {
  try {
    const user = await new User(req.body).save()
    res.status(201).json(user)
  } catch (err) {
    const msg = err.code === 11000 ? 'Email already exists' : err.message
    res.status(400).json({ error: msg })
  }
}
const update = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ error: 'User not found' })
    for (const field of ['name', 'email', 'password']) {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) user[field] = req.body[field]
    }
    user.updated = Date.now()
    await user.save() // pre-save hook re-hashes the password if changed
    res.json(user)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
const remove = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json(user)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
const removeAll = async (req, res) => {
  try {
    const r = await User.deleteMany({})
    res.json({ message: `${r.deletedCount} users were deleted successfully!` })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
export default { list, read, create, update, remove, removeAll }
