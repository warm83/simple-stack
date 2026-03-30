import MaintenancePage from '@/views/maintenance/maintenance'
import { isMaintenanceMode } from '@/lib/maintenance'
import DashboardPage from '@/views/dashboard/dashboard'

export default function LoginRoutePage() {
  if (isMaintenanceMode()) return <MaintenancePage />
  return <DashboardPage />
}
