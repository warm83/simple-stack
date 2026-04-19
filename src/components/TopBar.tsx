import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Toolbar from '@mui/material/Toolbar'
import AddIcon from '@mui/icons-material/Add'
import { usePathname } from 'next/navigation'
import { Stack } from '@mui/material'
import { Download, UploadFile } from '@mui/icons-material'
import { useRef, type ChangeEvent } from 'react'

type TopBarProps = {
  onAdd?: () => void
  onDownloadCSV?: () => void
  onImportCSV?: (event: ChangeEvent<HTMLInputElement>) => void
  importLoading?: boolean
}

export default function TopBar({
  onAdd,
  onDownloadCSV,
  onImportCSV,
  importLoading = false,
}: TopBarProps) {
  const pathname = usePathname()
  const isTaskPage = pathname === '/'
  const fileInputRef = useRef<HTMLInputElement>(null)

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
        {isTaskPage ? (
          <Stack direction="row" spacing={2}>
            <Box>
              <Button
                variant="outlined"
                startIcon={
                  importLoading ? (
                    <CircularProgress size={18} color="inherit" />
                  ) : (
                    <UploadFile />
                  )
                }
                onClick={() => fileInputRef.current?.click()}
                disabled={importLoading}
              >
                CSVインポート
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,text/csv"
                onChange={onImportCSV}
                disabled={importLoading}
                style={{ display: 'none' }}
              />
            </Box>
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
