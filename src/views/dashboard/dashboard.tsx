'use client'

import { useTasks } from '@/context/useTasks'
import AppLayout from '@/layouts/AppLayout'
import { Grid, Stack } from '@mui/material'
import Typography from '@mui/material/Typography'
import StatusCountCard from '@/components/StatusCountCard'
import PriorityTaskBar from '@/components/PriorityTaskBar'
import DuedateSection from '@/components/DuedateSection'

export default function DashboardPage() {
  const { tasks } = useTasks()

  return (
    <AppLayout>
      <Stack spacing={3}>
        <Stack>
          <Typography variant="h3">ダッシュボード</Typography>
          <Typography variant="body2" color="text.secondary">
            チームのタスク状況をひと目で確認できます。
          </Typography>
        </Stack>
        <StatusCountCard tasks={tasks} />
        <Grid container spacing={3} direction="row">
          <Grid size={{ xs: 12, sm: 6 }}>
            <PriorityTaskBar tasks={tasks} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <DuedateSection tasks={tasks} />
          </Grid>
        </Grid>
      </Stack>
    </AppLayout>
  )
}
