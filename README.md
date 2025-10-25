# Mini Patient Dashboard (Pharmoris)
(for data fetching and caching )
A complete full-stack application for managing patient records with a Node.js/Express backend and React frontend.

## Tech Stack 🚀

- **Backend**: Node.js + Express.js + MongoDB (Mongoose ORM)
- **Frontend**: React + Vite + React Query(for data fetching and caching )
- **Testing**: Jest (backend unit tests) + Playwright (frontend e2e tests)
- **Package Manager**: npm
- **Database**: MongoDB (local or MongoDB Atlas)

## Project Structure

\`\`\`
root/
├── backend/
│   ├── server.js
│   ├── routes/patientRoutes.js
│   ├── models/patientModel.js
│   ├── controllers/patientController.js
│   ├── scripts/seedDatabase.js
│   ├── tests/patient.test.js
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   ├── components/
│   │   │   ├── AddPatientForm.jsx
│   │   │   ├── AddPatientModal.jsx
│   │   │   └── PatientTable.jsx
│   │   ├── pages/PatientsPage.jsx
│   │   ├── styles/index.css
|   |   └── api/api.js
│   ├── tests/patientPage.spec.js
│   ├── index.html
│   ├── vite.config.js
|   ├── .env.examples
│   └── package.json
│
└── README.md
\`\`\`

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm
- MongoDB (local installation or MongoDB Atlas account)

### Backend Setup

1. Navigate to the backend directory:
   \`\`\`bash
   cd backend
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create a `.env` file based on `.env.example`:
   \`\`\`bash
   cp .env.example .env
   \`\`\`

4. Update `.env` with your MongoDB connection string:
   \`\`\`
   MONGODB_URI=mongodb://localhost:27017/
   PORT=5000
   \`\`\`

5. Seed the database with sample data:
   \`\`\`bash
   npm run seed
   \`\`\`

6. Start the backend server:
   \`\`\`bash
   npm run dev
   \`\`\`

   The backend will run on `http://localhost:5000`

### Frontend Setup

1. In a new terminal, navigate to the frontend directory:
   \`\`\`bash
   cd frontend
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

   The frontend will run on `http://localhost:5173`

4. Open your browser and navigate to `http://localhost:5173`

## Running Tests

### Backend Unit Tests (Jest)

\`\`\`bash
cd backend
npm test
\`\`\`

This runs Jest tests that verify:
- GET /patients returns an array with at least 2 patients
- Patient data contains correct fields (name, age, status)
- API returns proper status codes

### Frontend E2E Tests (Playwright)

First, ensure both backend and frontend are running:

\`\`\`bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev

# Terminal 3: Run tests
cd frontend
npm test
\`\`\`

Playwright tests verify:
- Loading state displays correctly
- Patient table renders with at least 2 rows
- Patient data displays correctly
- Critical status is highlighted in red
- Refresh button works properly

### Quick tests

# Measure latency + show body
curl -i http://localhost:5000/patients

# Measure time precisely
curl -s -o /dev/null -w "HTTP %{http_code} — %{time_total}s\n" http://localhost:5000/patients

## Features

### Backend API

- **GET /patients**: Returns all patients from MongoDB with 500ms simulated latency
- **POST /patients**: Create a new patient record
- **Error Handling**: Comprehensive try/catch blocks with console logging
- **CORS**: Enabled for frontend communication

### Frontend

- **Patient Table**: Displays ID, Name, Age, and Status columns
- **Status Highlighting**: Critical status shown in red
- **Loading State**: Spinner animation while fetching data
- **Error State**: Red error message on fetch failure
- **Refresh Button**: Manual data refetch capability
- **React Query**: Automatic caching and state management

## Scalability Notes for 1,000+ Patients

### Database Optimization

1. **Indexing**: Add indexes on frequently queried fields:
   \`\`\`javascript
   patientSchema.index({ status: 1 });
   patientSchema.index({ name: 1 });
   \`\`\`

2. **Pagination**: Implement cursor-based or offset pagination:
   \`\`\`javascript
   GET /patients?page=1&limit=50
   \`\`\`

3. **Database Sharding**: For very large datasets, consider MongoDB sharding by patient ID or status.

### Frontend Optimization

1. **Pagination**: Load patients in chunks (50   per page)
2. **Virtual Scrolling**: Use libraries like `react-window` for rendering large lists
3. **Lazy Loading**: Load patient details on demand
4. **Caching**: React Query handles caching automatically

### Infrastructure

1. **Load Balancing**: Use multiple backend instances behind a load balancer
2. **Caching Layer**: Add Redis for frequently accessed data
3. **CDN**: Cache static frontend assets
4. **Database Replication**: Set up MongoDB replica sets for high availability

## Development Notes

- Backend uses ES6 modules (type: "module" in package.json)
- Frontend uses Vite for fast development and building
- React Query handles all data fetching and caching
- Playwright tests run against the live frontend application
- All API errors are logged to console for debugging

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or update MONGODB_URI in .env
- Check MongoDB Atlas connection string if using cloud database

### Frontend Can't Connect to Backend
- Verify backend is running on port 5000
- Check CORS is enabled in backend
- Ensure frontend proxy is configured correctly in vite.config.js

### Tests Failing
- Ensure both backend and frontend are running for e2e tests
- Check that MongoDB is accessible for unit tests
- Review console logs for detailed error messages

### Add-On Features 
- Add Patient :- Click Add Patient Button to open a form . Enter patient details.
                 Submittiong add the patient to the database.
- Delete Patient :- Each patient row have a delete button. Deleting a patient remove
                    from database and regenerates subsequents IDs to maintain 
                    sequentail order(e.g., deleting ID 2 shifts ID 3 → 2, ID 4 → 3).
- Automatic Refresh:- Table updates instantly after adding or deleting, with React Query
                      handling caching and state.

### 🧑‍💻 Author

Developed by Affanraza Shaikh

📧 razaaffan08@gmail.com

📞 +91 9359968907
🔗 

