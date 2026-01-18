import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { loginStyles } from './login.styles'

export default function LoginPage() {
  return (
    <Box sx={loginStyles.page}>
      <Paper
        elevation={0}
        sx={loginStyles.card}
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
