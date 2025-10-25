"use client"

export default function PatientTable({ patients, onDelete, isDeleting }) {
  if (!patients || patients.length === 0) {
    return (
      <div className="empty-state">
        <p>No patients found</p>
      </div>
    )
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient) => (
          <tr key={patient.id}>
            <td>{patient.id}</td>
            <td>{patient.name}</td>
            <td>{patient.age}</td>
            <td className={`status-${patient.status.toLowerCase()}`}>{patient.status}</td>
            <td>
              <button onClick={() => onDelete(patient.id)} disabled={isDeleting} className="delete-btn">
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
