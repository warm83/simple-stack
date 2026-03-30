import theme from '@/theme'
import { Task, TaskPriority } from '@/types/task'
import { dashboardStyles } from '@/views/dashboard/dashboard.styles'
import { alpha, LinearProgress, Stack, Typography } from '@mui/material'
import { useMemo } from 'react'

const priorityLabels: Record<
  TaskPriority,
  { label: string; color: 'error' | 'warning' | 'success' }
> = {
  high: { label: '高', color: 'error' },
  medium: { label: '中', color: 'warning' },
  low: { label: '低', color: 'success' },
}

export default function PriorityTaskBar({ tasks }: { tasks: Task[] }) {
  const priorityTaskCounts = useMemo(() => {
    const counts = tasks.reduce(
      (acc, task) => {
        acc[task.priority] = (acc[task.priority] || 0) + 1
        return acc
      },
      {} as Record<TaskPriority, number>,
    )
    return counts
  }, [tasks])
  const calcProgress = (key: TaskPriority) =>
    tasks.length ? (priorityTaskCounts[key] / tasks.length) * 100 : 0

  return (
    <Stack spacing={1} sx={{ ...dashboardStyles.card, height: '100%' }}>
      <Typography variant="body2" fontWeight="bold">
        優先度別
      </Typography>
      <Stack spacing={2} sx={{ height: '100%' }}>
        {(Object.keys(priorityLabels) as TaskPriority[]).map((key) => (
          <Stack key={key} spacing={1}>
            <Stack direction="row" justifyContent="space-between" width="100%">
              <Typography variant="body2" color="text.secondary">
                {priorityLabels[key].label}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {priorityTaskCounts[key] ?? 0}件
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={calcProgress(key)}
              color={priorityLabels[key].color}
              sx={{
                height: 10,
                borderRadius: 2,
                backgroundColor: alpha(
                  theme.palette[priorityLabels[key].color].main,
                  0.2,
                ),
              }}
            />
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}
