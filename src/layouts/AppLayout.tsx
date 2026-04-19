import type { ChangeEvent, ReactNode } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import TopBar from '../components/TopBar'
import SideBar from '../components/SideBar'
import Stack from '@mui/material/Stack'

type AppLayoutProps = {
  children: ReactNode
  onAdd?: () => void
  onDownloadCSV?: () => void
  onImportCSV?: (event: ChangeEvent<HTMLInputElement>) => void
  importLoading?: boolean
}

export default function AppLayout({
  children,
  onAdd,
  onDownloadCSV,
  onImportCSV,
  importLoading,
}: AppLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#ffffff',
      }}
    >
      <Stack direction="row">
        <SideBar />
        <Box sx={{ flexGrow: 1 }}>
          <TopBar
            onAdd={onAdd}
            onDownloadCSV={onDownloadCSV}
            onImportCSV={onImportCSV}
            importLoading={importLoading}
          />
          <Container sx={{ py: { xs: 3, md: 5 } }}>{children}</Container>
        </Box>
      </Stack>
    </Box>
  )
}
