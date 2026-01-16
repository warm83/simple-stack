import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

export default function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'radial-gradient(circle at top, rgba(15, 118, 110, 0.2), transparent 50%), radial-gradient(circle at bottom right, rgba(249, 115, 22, 0.2), transparent 45%)',
        p: 3,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 420,
          borderRadius: 4,
          border: '1px solid rgba(15, 118, 110, 0.2)',
          backgroundColor: 'rgba(255, 250, 242, 0.95)',
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h4">スタディログイン</Typography>
          <Typography variant="body2" color="text.secondary">
            チーム課題ボードを始めるにはニックネームを入力してください。
          </Typography>
          <TextField label="ニックネーム" placeholder="例: warm" fullWidth />
          <Button variant="contained" size="large">
            始める
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}
