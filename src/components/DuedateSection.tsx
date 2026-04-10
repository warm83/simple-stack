import { Task } from '@/types/task'
import { dashboardStyles } from '@/views/dashboard/dashboard.styles'
import {
  Avatar,
  Box,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { useMemo } from 'react'

const UPCOMING_DAYS = 7
const formatDiffDays = (days: number) => {
  if (days === 0) return '今日'
  if (days === 1) return '明日'
  return days + '日後'
}

export default function DuedateSection({ tasks }: { tasks: Task[] }) {
  const { expiredTasks, upcomingTasks } = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const sortedTasks = [...tasks].sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    )
    const expiredTasks: { task: Task; diffDays: number }[] = []
    const upcomingTasks: { task: Task; diffDays: number }[] = []
    sortedTasks.forEach((task) => {
      const dueDate = new Date(task.dueDate)
      dueDate.setHours(0, 0, 0, 0)

      const diffDays = Math.ceil(
        (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
      )

      if (task.status !== 'done' && diffDays < 0) {
        expiredTasks.push({ task, diffDays })
      }

      if (task.status !== 'done' && diffDays >= 0 && diffDays <= UPCOMING_DAYS)
        upcomingTasks.push({ task, diffDays })
    })
    return { expiredTasks, upcomingTasks }
  }, [tasks])

  return (
    <Stack spacing={3}>
      <Box sx={dashboardStyles.card}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="body2" fontWeight="bold">
            期間切れ
          </Typography>
          <Avatar
            sx={{
              width: 22,
              height: 22,
              fontSize: 12,
              bgcolor: 'error.main',
            }}
          >
            {expiredTasks.length}
          </Avatar>
        </Stack>
        {expiredTasks.map(({ task, diffDays }, index) => (
          <ListItem
            key={task.id}
            sx={dashboardStyles.list}
            disablePadding
            divider={index !== expiredTasks.length - 1}
          >
            <ListItemText sx={{ flex: 1 }} primary={task.title} />
            <ListItemText
              primary={`${Math.abs(diffDays)}日超過`}
              slotProps={{
                primary: {
                  textAlign: 'right',
                  color: 'warning.main',
                },
              }}
              sx={{ flex: 1 }}
            />
          </ListItem>
        ))}
      </Box>
      <Box sx={dashboardStyles.card}>
        <Typography variant="body2" fontWeight="bold">
          期限間近
        </Typography>
        {upcomingTasks.map(({ task, diffDays }, index) => (
          <ListItem
            key={task.id}
            sx={dashboardStyles.list}
            disablePadding
            divider={index !== upcomingTasks.length - 1}
          >
            <ListItemText sx={{ flex: 1 }} primary={task.title} />
            <ListItemText
              primary={formatDiffDays(diffDays)}
              slotProps={{
                primary: {
                  textAlign: 'right',
                  color: 'warning.main',
                },
              }}
              sx={{ flex: 1 }}
            />
          </ListItem>
        ))}
      </Box>
    </Stack>
  )
}
