import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import AddIcon from '@mui/icons-material/Add'
import { usePathname } from 'next/navigation'
import { Stack } from '@mui/material'
import { Download } from '@mui/icons-material'

type TopBarProps = {
  onAdd: () => void
  onDownloadCSV: () => void
}

export default function TopBar({ onAdd, onDownloadCSV }: TopBarProps) {
  const pathname = usePathname()
  const isDetailPage = pathname.startsWith('/tasks/')
  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        background: 'transparent',
        borderBottom: '1px solid rgba(15, 118, 110, 0.15)',
        backdropFilter: 'blur(10px)',
        color: 'text.primary',
      }}
    >
      <Toolbar sx={{ py: 1 }}>
        <Box sx={{ flexGrow: 1 }} />
        {!isDetailPage ? (
          <Stack direction="row" spacing={2}>
            <Box>
              <Button
                variant="outlined"
                startIcon={<Download />}
                onClick={onDownloadCSV}
              >
                CSVダウンロード
              </Button>
            </Box>
            <Box>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={onAdd}
              >
                新しい課題
              </Button>
            </Box>
          </Stack>
        ) : null}
      </Toolbar>
    </AppBar>
  )
}
