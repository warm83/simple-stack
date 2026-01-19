import { Route, Routes } from 'react-router-dom'
import TasksPage from './pages/task/task'
import TaskDetailPage from './pages/task/detail'
import LoginPage from './pages/login/login'
import { TasksProvider } from './context/TasksProvider'

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
