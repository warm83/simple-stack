import TaskDetailPage from '@/views/task/detail'
import MaintenancePage from '@/views/maintenance/maintenance'
import { isMaintenanceMode } from '@/lib/maintenance'

type TaskDetailRoutePageProps = {
  params: Promise<{ id: string }>
}

export default async function TaskDetailRoutePage({
  params,
}: TaskDetailRoutePageProps) {
  if (isMaintenanceMode()) return <MaintenancePage />

  const { id } = await params
  return <TaskDetailPage taskId={id} />
}
