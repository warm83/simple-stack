'use client'

import { useRouter } from 'next/navigation'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AppLayout from '../../layouts/AppLayout'
import StatusChip from '../../components/StatusChip'
import { useTasks } from '../../context/useTasks'
import { detailStyles } from './detail.styles'

const priorityLabels = {
  low: '低',
  medium: '中',
  high: '高',
}

type TaskDetailPageProps = {
  taskId: string
}

export default function TaskDetailPage({ taskId }: TaskDetailPageProps) {
  const router = useRouter()
  const { tasks, isLoading, error } = useTasks()

  const task = tasks.find((item) => item.id === taskId)

  if (isLoading) {
    return (
      <AppLayout onAdd={() => router.push('/')}>
        <Typography variant="h5">読み込み中...</Typography>
      </AppLayout>
    )
  }

  if (error) {
    return (
      <AppLayout onAdd={() => router.push('/')}>
        <Typography variant="h5">読み込みに失敗しました。</Typography>
      </AppLayout>
    )
  }

  if (!task) {
    return (
      <AppLayout onAdd={() => router.push('/')}>
        <Stack spacing={2}>
          <Typography variant="h4">課題が見つかりません。</Typography>
          <Button
            variant="contained"
            onClick={() => router.push('/')}
            startIcon={<ArrowBackIcon />}
          >
            一覧に戻る
          </Button>
        </Stack>
      </AppLayout>
    )
  }

  return (
    <AppLayout onAdd={() => router.push('/')}>
      <Stack spacing={3}>
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push('/')}
          sx={detailStyles.backButton}
        >
          一覧に戻る
        </Button>
        <Paper elevation={0} sx={detailStyles.card}>
          <Stack spacing={2}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems={{ xs: 'flex-start', sm: 'center' }}
            >
              <Typography variant="h3">{task.title}</Typography>
              <StatusChip status={task.status} />
            </Stack>
            <Typography variant="body1" color="text.secondary">
              {task.description}
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              <Chip label={`担当: ${task.assignee}`} variant="outlined" />
              <Chip
                label={`優先度: ${priorityLabels[task.priority]}`}
                variant="outlined"
              />
              <Chip label={`期限: ${task.dueDate ?? ''}`} variant="outlined" />
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    </AppLayout>
  )
}
