import TasksPage from '@/views/task/task'
import MaintenancePage from '@/views/maintenance/maintenance'
import { isMaintenanceMode } from '@/lib/maintenance'

export default function HomePage() {
  if (isMaintenanceMode()) return <MaintenancePage />
  return <TasksPage />
}
