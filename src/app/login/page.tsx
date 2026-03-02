import LoginPage from '@/views/login/login'
import MaintenancePage from '@/views/maintenance/maintenance'
import { isMaintenanceMode } from '@/lib/maintenance'

export default function LoginRoutePage() {
  if (isMaintenanceMode()) return <MaintenancePage />
  return <LoginPage />
}
