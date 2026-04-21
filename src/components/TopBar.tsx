import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import AddIcon from '@mui/icons-material/Add'
import { usePathname } from 'next/navigation'
import { Stack } from '@mui/material'
import { Download, UploadFile } from '@mui/icons-material'
import { useRef } from 'react'

type TopBarProps = {
  onAdd?: () => void
  onDownloadCSV?: () => void
  onImportCSV?: (event: React.ChangeEvent<HTMLInputElement>) => void
  importDisabled?: boolean
}

export default function TopBar({
  onAdd,
  onDownloadCSV,
  onImportCSV,
  importDisabled = false,
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
                startIcon={<UploadFile />}
                disabled={importDisabled}
                onClick={() => fileInputRef.current?.click()}
              >
                CSVインポート
              </Button>
              <input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                onChange={onImportCSV}
                disabled={importDisabled}
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
