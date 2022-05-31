import mongoose from 'mongoose'
import inventoryData from './data/inventory.js'
import { dbURI } from '../config/environment.js'
import Inventory from '../models/inventory.js'

const seedDatabase = async () => {
  try {
    // Connect to the database
    await mongoose.connect(dbURI)
    console.log('🚀 Database Connected')

    // Drop all data from the database
    await mongoose.connection.db.dropDatabase()
    console.log('👌 Database dropped')

    // Seed all the collections we have with our data
    const inventoryAdded = await Inventory.create(inventoryData)
    console.log(`🌱 Seeded database with ${inventoryAdded.length} items`)

    // Close database connection
    await mongoose.connection.close()
    console.log('👋 Bye!')
  } catch (err) {
    console.log(err)
    // Close database connection
    await mongoose.connection.close()
  }
}
seedDatabase()