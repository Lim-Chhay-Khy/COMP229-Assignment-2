// Optional demo data: run from project root with `node sample-data/seed.mjs`
import mongoose from 'mongoose'
import Contact from '../server/models/contact.model.js'
import Project from '../server/models/project.model.js'
import Qualification from '../server/models/qualification.model.js'
import config from '../config/config.js'
await mongoose.connect(config.mongoUri)
await Contact.create({firstname:'Demo',lastname:'Student',email:'demo-contact@example.com'})
const shared = {title:'Portfolio Demo',firstname:'Demo',lastname:'Student',email:'demo-owner@example.com',completion:new Date('2026-10-14'),description:'Sample assignment data'}
await Project.create(shared)
await Qualification.create({...shared,title:'Web Application Development'})
console.log('Created sample contacts, projects, qualifications. Register a user using POST /api/users to create the users collection.')
await mongoose.disconnect()
