import mongoose from "mongoose"
import dotenv from "dotenv"
import Patient from "../models/patientModel.js"

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/"

const seedData = [
  { id: 1, name: "John Doe", age: 54, status: "Stable" },
  { id: 2, name: "Jane Smith", age: 47, status: "Critical" },
]

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log("Connected to MongoDB")

    await Patient.deleteMany({})
    console.log("Cleared existing patients")

    await Patient.insertMany(seedData)
    console.log("Seeded database with sample patients")

    await mongoose.connection.close()
    console.log("Database connection closed")
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

seedDatabase()
