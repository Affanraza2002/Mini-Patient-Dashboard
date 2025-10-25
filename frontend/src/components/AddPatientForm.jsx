"use client"

import { useState } from "react"

export default function AddPatientForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    age: "",
    status: "Stable",
  })

  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" || name === "id" ? Number.parseInt(value) || "" : value,
    }))
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.id || !formData.name || !formData.age || !formData.status) {
      setError("All fields are required")
      return
    }

    if (formData.age < 0 || formData.age > 150) {
      setError("Age must be between 0 and 150")
      return
    }

    try {
      await onSubmit(formData)
      setFormData({ id: "", name: "", age: "", status: "Stable" })
      setError("")
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="add-patient-form">
      <h2>Add New Patient</h2>

      {error && <div className="form-error">{error}</div>}

      <div className="form-group">
        <label htmlFor="id">Patient ID:</label>
        <input
          type="number"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="Enter patient ID"
          disabled={isLoading}
        />
      </div>

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

      <button type="submit" disabled={isLoading} className="submit-btn">
        {isLoading ? "Adding..." : "Add Patient"}
      </button>
    </form>
  )
}
