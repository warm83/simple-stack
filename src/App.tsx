import { Route, Routes } from 'react-router-dom'
import TasksPage from './pages/TasksPage'
import TaskDetailPage from './pages/TaskDetailPage'
import LoginPage from './pages/LoginPage'
import { TasksProvider } from './context/TasksContext'

export default function App() {
  return (
    <TasksProvider>
      <Routes>
        <Route path="/" element={<TasksPage />} />
        <Route path="/tasks/:id" element={<TaskDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </TasksProvider>
  )
}
