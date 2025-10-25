import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import patientRoutes from "./routes/patientRoutes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/"

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Routes
app.use("/patients", patientRoutes)

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK" })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unexpected error:", err)
  res.status(500).json({ error: "Internal server error" })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
