import theme from '@/theme'
import { alpha } from '@mui/material'

export const dashboardStyles = {
  card: {
    p: 2,
    borderRadius: 2,
    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
    backgroundColor: theme.palette.background.paper,
  },
  list: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}
