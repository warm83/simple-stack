import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import AddIcon from '@mui/icons-material/Add'
import { useLocation } from 'react-router-dom'

type TopBarProps = {
  onAdd: () => void
}

export default function TopBar({ onAdd }: TopBarProps) {
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
        {!useLocation().pathname.startsWith("/tasks/") &&
          (<Box>
            <Button variant="contained" startIcon={<AddIcon />} onClick={onAdd}>
              新しい課題
            </Button>
          </Box>)
        }
      </Toolbar>
    </AppBar>
  )
}
