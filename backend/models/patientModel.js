import mongoose from "mongoose"

const patientSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  status: { type: String, enum: ["Stable", "Critical", "Recovering"], required: true },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Patient", patientSchema)
