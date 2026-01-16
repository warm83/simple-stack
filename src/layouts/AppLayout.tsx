import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import TopBar from '../components/TopBar'

type AppLayoutProps = {
  children: ReactNode
  onAdd: () => void
}

export default function AppLayout({ children, onAdd }: AppLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top left, rgba(16, 185, 129, 0.18), transparent 45%), radial-gradient(circle at bottom right, rgba(249, 115, 22, 0.2), transparent 40%)',
      }}
    >
      <TopBar onAdd={onAdd} />
      <Container sx={{ py: { xs: 3, md: 5 } }}>{children}</Container>
    </Box>
  )
}
