import theme from '@/theme'
import { Task, TaskStatus } from '@/types/task'
import {
  alpha,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { Palette } from '@mui/material/styles'
import { useMemo } from 'react'

const statusLabels: Record<
  TaskStatus | 'all',
  {
    label: string
    color: keyof Palette | 'text.secondary' | 'default'
    borderColor: string
  }
> = {
  all: {
    label: '合計',
    color: 'default',
    borderColor: alpha(theme.palette.text.primary, 0.2),
  },
  todo: {
    label: '未着手',
    color: 'text.secondary',
    borderColor: alpha(theme.palette.text.secondary, 0.3),
  },
  in_progress: {
    label: '進行中',
    color: 'info',
    borderColor: alpha(theme.palette.info.main, 0.4),
  },
  done: {
    label: '完了',
    color: 'success',
    borderColor: alpha(theme.palette.success.main, 0.4),
  },
}

export default function StatusCountCard({ tasks }: { tasks: Task[] }) {
  const statusTaskCounts = useMemo(() => {
    const counts = tasks.reduce(
      (acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )
    counts['all'] = tasks.length
    return counts
  }, [tasks])

  return (
    <Grid container spacing={3} direction="row">
      {Object.entries(statusLabels).map(([key, value]) => (
        <Grid size={{ xs: 6, sm: 3 }} key={key}>
          <Card
            variant="outlined"
            sx={{
              borderColor: value.borderColor,
              backgroundColor: '#ffffff',
              flex: 1,
            }}
          >
            <CardContent>
              <Stack direction="column" alignItems="center" spacing={1.5}>
                <Typography
                  sx={{
                    fontSize: '2rem',
                    fontWeight: 900,
                    lineHeight: 1,
                  }}
                  color={value.color}
                >
                  {statusTaskCounts[key] ?? 0}
                </Typography>
                <Typography variant="body2" sx={{ color: value.color }}>
                  {value.label}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
