"use client"

import { useState } from "react"

export default function AddPatientModal({ isOpen, onClose, onSubmit, isLoading, patientCount = 0 }) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    status: "Stable",
  })

  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? Number.parseInt(value) || "" : value,
    }))
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.age || !formData.status) {
      setError("All fields are required")
      return
    }

    if (formData.age < 0 || formData.age > 150) {
      setError("Age must be between 0 and 150")
      return
    }

    try {
      const patientDataWithId = {
        id: patientCount + 1,
        ...formData,
      }
      await onSubmit(patientDataWithId)
      setFormData({ name: "", age: "", status: "Stable" })
      setError("")
      onClose()
    } catch (err) {
      setError(err.message)
    }
  }

  if (!isOpen) return null

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>

      <div className="modal-container">
        <div className="modal-header">
          <h2>Add New Patient</h2>
          <button className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {error && <div className="form-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter patient name"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter patient age"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select id="status" name="status" value={formData.status} onChange={handleChange} disabled={isLoading}>
              <option value="Stable">Stable</option>
              <option value="Critical">Critical</option>
              <option value="Recovering">Recovering</option>
            </select>
          </div>

          <div className="modal-buttons">
            <button type="button" className="cancel-btn" onClick={onClose} disabled={isLoading}>
              Cancel
            </button>
            <button type="submit" disabled={isLoading} className="submit-btn">
              {isLoading ? "Adding..." : "Add Patient"}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
