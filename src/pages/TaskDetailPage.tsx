import { useNavigate, useParams } from 'react-router-dom'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AppLayout from '../layouts/AppLayout'
import StatusChip from '../components/StatusChip'
import { useTasks } from '../context/TasksContext'

const priorityLabels = {
  low: '低',
  medium: '中',
  high: '高',
}

export default function TaskDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { tasks } = useTasks()

  const task = tasks.find((item) => item.id === id)

  if (!task) {
    return (
      <AppLayout onAdd={() => navigate('/')}>
        <Stack spacing={2}>
          <Typography variant="h4">課題が見つかりません。</Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/')}
            startIcon={<ArrowBackIcon />}
          >
            一覧に戻る
          </Button>
        </Stack>
      </AppLayout>
    )
  }

  return (
    <AppLayout onAdd={() => navigate('/')}>
      <Stack spacing={3}>
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ alignSelf: 'flex-start' }}
        >
          一覧に戻る
        </Button>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 2,
            border: '1px solid rgba(15, 118, 110, 0.2)',
            backgroundColor: '#ffffff',
          }}
        >
          <Stack spacing={2}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', sm: 'center' }}>
              <Typography variant="h3">{task.title}</Typography>
              <StatusChip status={task.status} />
            </Stack>
            <Typography variant="body1" color="text.secondary">
              {task.description}
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              <Chip label={`担当: ${task.assignee}`} variant="outlined" />
              <Chip label={`優先度: ${priorityLabels[task.priority]}`} variant="outlined" />
              <Chip label={`期限: ${task.dueDate}`} variant="outlined" />
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    </AppLayout>
  )
}
