import Patient from "../models/patientModel.js"

// Simulate 500ms latency
const simulateLatency = () => new Promise((resolve) => setTimeout(resolve, 500))

export const getPatients = async (req, res) => {
  try {
    await simulateLatency()
    const patients = await Patient.find().select("-__v").lean()
    res.json(patients)
  } catch (error) {
    console.error("Error fetching patients:", error)
    res.status(500).json({ error: "Failed to fetch patients" })
  }
}

export const createPatient = async (req, res) => {
  try {
    const { id, name, age, status } = req.body

    let patientId = id
    if (!patientId) {
      const lastPatient = await Patient.findOne().sort({ id: -1 })
      patientId = lastPatient ? lastPatient.id + 1 : 1
    }

    if (!name || !age || !status) {
      return res.status(400).json({ error: "Missing required fields (name, age, status)" })
    }

    const patient = new Patient({ id: patientId, name, age, status })
    await patient.save()
    res.status(201).json(patient)
  } catch (error) {
    console.error("Error creating patient:", error)
    res.status(500).json({ error: "Failed to create patient" })
  }
}

export const deletePatient = async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ error: "Patient ID is required" })
    }

    const deletedPatient = await Patient.findOneAndDelete({ id: Number.parseInt(id) })

    if (!deletedPatient) {
      return res.status(404).json({ error: "Patient not found" })
    }

    const deletedId = Number.parseInt(id)
    await Patient.updateMany({ id: { $gt: deletedId } }, { $inc: { id: -1 } })

    res.json({ message: "Patient deleted successfully and IDs renumbered", patient: deletedPatient })
  } catch (error) {
    console.error("Error deleting patient:", error)
    res.status(500).json({ error: "Failed to delete patient" })
  }
}
