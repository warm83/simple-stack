import { Route, Routes } from 'react-router-dom'
import TasksPage from './pages/task/task'
import TaskDetailPage from './pages/task/detail'
import LoginPage from './pages/login/login'
import { TasksProvider } from './context/TasksProvider'
import NotFoundPage from './pages/not-found/not-found'
import MaintenancePage from './pages/maintenance/maintenance'

export default function App() {
  const isMaintenance = import.meta.env.VITE_MAINTENANCE_MODE
  if (isMaintenance === "true") return <MaintenancePage/>

  return (
    <TasksProvider>
      <Routes>
        <Route path="/" element={<TasksPage />} />
        <Route path="/tasks/:id" element={<TaskDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </TasksProvider>
  )
}
