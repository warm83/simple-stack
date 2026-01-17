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
        background: '#ffffff',
      }}
    >
      <TopBar onAdd={onAdd} />
      <Container sx={{ py: { xs: 3, md: 5 } }}>{children}</Container>
    </Box>
  )
}
