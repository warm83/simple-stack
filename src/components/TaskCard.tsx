import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import StatusChip from './StatusChip'
import type { Task } from '../types/task'

type TaskCardProps = {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
  onOpen: (taskId: string) => void
}

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onOpen,
}: TaskCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        borderColor: 'rgba(15, 118, 110, 0.2)',
        backgroundColor: '#ffffff',
      }}
      onClick={() => onOpen(task.id)}
    >
      <CardContent>
        <Stack spacing={1.5}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">{task.title}</Typography>
            <StatusChip status={task.status} />
          </Stack>
          <Typography variant="body2" color="text.secondary">
            {task.description}
          </Typography>
          <Divider />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="caption" color="text.secondary">
              担当: {task.assignee} · 期限: {task.dueDate}
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton
                aria-label="edit"
                size="small"
                onClick={(event) => {
                  event.stopPropagation()
                  onEdit(task)
                }}
              >
                <EditOutlinedIcon fontSize="small" />
              </IconButton>
              <IconButton
                aria-label="delete"
                size="small"
                onClick={(event) => {
                  event.stopPropagation()
                  onDelete(task.id)
                }}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
