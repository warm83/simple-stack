import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

type EmptyStateProps = {
  onAdd: () => void
}

export default function EmptyState({ onAdd }: EmptyStateProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 2,
        border: '1px dashed rgba(15, 118, 110, 0.25)',
        background: 'rgba(255, 250, 242, 0.8)',
      }}
    >
      <Box display="flex" flexDirection="column" gap={1.5} alignItems="flex-start">
        <Typography variant="h5">最初の課題を作りませんか？</Typography>
        <Typography variant="body2" color="text.secondary">
          小さな目標から追加してボードを埋めましょう。
        </Typography>
        <Button variant="contained" onClick={onAdd}>新しい課題を追加</Button>
      </Box>
    </Paper>
  )
}
