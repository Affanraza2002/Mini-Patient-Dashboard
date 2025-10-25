import { QueryClient, QueryClientProvider } from "react-query"
import PatientsPage from "./pages/PatientsPage"
import "./App.css"

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PatientsPage />
    </QueryClientProvider>
  )
}
