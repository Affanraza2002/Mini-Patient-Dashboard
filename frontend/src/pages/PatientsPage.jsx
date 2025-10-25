"use client"
import { useQuery, useMutation, useQueryClient } from "react-query"
import PatientTable from "../components/PatientTable"
import AddPatientModal from "../components/AddPatientModal"
import { fetchPatients, addPatient, deletePatient } from "../api/api"
import { useState } from "react"

export default function PatientsPage() {
  const queryClient = useQueryClient()
  const [successMessage, setSuccessMessage] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data, isLoading, error, refetch } = useQuery("patients", fetchPatients, {
    refetchOnWindowFocus: false,
    retry: 1,
  })

  const addMutation = useMutation(addPatient, {
    onSuccess: () => {
      queryClient.invalidateQueries("patients")
      setSuccessMessage("Patient added successfully!")
      setTimeout(() => setSuccessMessage(""), 3000)
    },
    onError: (error) => {
      console.error("Error adding patient:", error)
    },
  })

  const deleteMutation = useMutation(deletePatient, {
    onSuccess: () => {
      queryClient.invalidateQueries("patients")
      setSuccessMessage("Patient deleted successfully!")
      setTimeout(() => setSuccessMessage(""), 3000)
    },
    onError: (error) => {
      console.error("Error deleting patient:", error)
    },
  })

  const handleAddPatient = async (patientData) => {
    await addMutation.mutateAsync(patientData)
  }

  const handleDeletePatient = async (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      await deleteMutation.mutateAsync(id)
    }
  }

  return (
    <div>
      <header>
        <div className="container">
          <h1>Patient Dashbaord</h1>
        </div>
      </header>

      <div className="container">
        {successMessage && <div className="success-message">{successMessage}</div>}

        <div className="controls">
          <button className="add-patient-btn" onClick={() => setIsModalOpen(true)}>
            Add Patient +
          </button>
          <button onClick={() => refetch()} disabled={isLoading}>
            {isLoading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        <AddPatientModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddPatient}
          isLoading={addMutation.isLoading}
          patientCount={data?.length || 0}
        />

        {isLoading && (
          <div className="loading">
            <span className="spinner"></span>
            Loading patients...
          </div>
        )}

        {error && <div className="error">Error loading patients: {error.message || "Unknown error"}</div>}

        {data && !isLoading && (
          <PatientTable patients={data} onDelete={handleDeletePatient} isDeleting={deleteMutation.isLoading} />
        )}
      </div>
    </div>
  )
}
