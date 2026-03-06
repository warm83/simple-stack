import Chip from '@mui/material/Chip'
import type { TaskStatus } from '../types/task'

const statusMap: Record<
  TaskStatus,
  { label: string; color: 'default' | 'success' | 'warning' | 'info' }
> = {
  todo: { label: '未着手', color: 'warning' },
  in_progress: { label: '進行中', color: 'info' },
  done: { label: '完了', color: 'success' },
}

type StatusChipProps = {
  status: TaskStatus
}

export default function StatusChip({ status }: StatusChipProps) {
  const { label, color } = statusMap[status]
  return <Chip label={label} color={color} size="small" />
}
