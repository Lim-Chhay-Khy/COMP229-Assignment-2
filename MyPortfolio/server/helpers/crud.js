// Builds the six CRUD handlers for a Mongoose model.
export default function crud(Model, label) {
  const plural = label + 's'
  return {
    list: async (req, res) => {
      try {
        res.json(await Model.find())
      } catch (err) {
        res.status(400).json({ error: err.message })
      }
    },
    read: async (req, res) => {
      try {
        const doc = await Model.findById(req.params.id)
        if (!doc) return res.status(404).json({ error: `${label} not found` })
        res.json(doc)
      } catch (err) {
        res.status(400).json({ error: err.message })
      }
    },
    create: async (req, res) => {
      try {
        res.status(201).json(await Model.create(req.body))
      } catch (err) {
        res.status(400).json({ error: err.message })
      }
    },
    update: async (req, res) => {
      try {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!doc) return res.status(404).json({ error: `${label} not found` })
        res.json(doc)
      } catch (err) {
        res.status(400).json({ error: err.message })
      }
    },
    remove: async (req, res) => {
      try {
        const doc = await Model.findByIdAndDelete(req.params.id)
        if (!doc) return res.status(404).json({ error: `${label} not found` })
        res.json(doc)
      } catch (err) {
        res.status(400).json({ error: err.message })
      }
    },
    removeAll: async (req, res) => {
      try {
        const r = await Model.deleteMany({})
        res.json({ message: `${r.deletedCount} ${plural} were deleted successfully!` })
      } catch (err) {
        res.status(400).json({ error: err.message })
      }
    },
  }
}
