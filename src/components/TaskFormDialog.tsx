import Dialog from '@mui/material/Dialog'
import TaskFormFields from './TaskFormFields'
import type { Task, TaskInput } from '../types/task'

type TaskFormDialogProps = {
  open: boolean
  onClose: () => void
  onSubmit: (data: TaskInput, taskId?: string) => void
  task?: Task | null
}

export default function TaskFormDialog({
  open,
  onClose,
  onSubmit,
  task,
}: TaskFormDialogProps) {
  const formKey = `${task?.id ?? 'new'}-${open ? 'open' : 'closed'}`

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <TaskFormFields
        key={formKey}
        task={task}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </Dialog>
  )
}
