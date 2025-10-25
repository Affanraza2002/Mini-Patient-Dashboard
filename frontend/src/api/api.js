import axios from "axios"

const API_BASE_URL = "http://localhost:5000"

export const fetchPatients = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/patients`)
    return response.data
  } catch (error) {
    console.error("Error fetching patients:", error)
    throw new Error(error.response?.data?.error || "Failed to fetch patients")
  }
}

export const addPatient = async (patientData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/patients`, patientData)
    return response.data
  } catch (error) {
    console.error("Error adding patient:", error)
    throw new Error(error.response?.data?.error || "Failed to add patient")
  }
}

export const deletePatient = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/patients/${id}`)
    return response.data
  } catch (error) {
    console.error("Error deleting patient:", error)
    throw new Error(error.response?.data?.error || "Failed to delete patient")
  }
}
