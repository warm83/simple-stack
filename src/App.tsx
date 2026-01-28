import { Route, Routes } from 'react-router-dom'
import TasksPage from './pages/task/task'
import TaskDetailPage from './pages/task/detail'
import LoginPage from './pages/login/login'
import { TasksProvider } from './context/TasksProvider'
import NotFoundPage from './pages/not-found/not-found'

export default function App() {
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
