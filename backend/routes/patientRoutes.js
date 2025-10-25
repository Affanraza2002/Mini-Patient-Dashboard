import express from "express"
import { getPatients, createPatient, deletePatient } from "../controllers/patientController.js"

const router = express.Router()

router.get("/", getPatients)
router.post("/", createPatient)
router.delete("/:id", deletePatient)

export default router

