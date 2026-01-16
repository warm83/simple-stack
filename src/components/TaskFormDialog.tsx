import type { ChangeEvent } from 'react'
import { useEffect, useMemo, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import PrioritySelect from './PrioritySelect'
import type { Task, TaskInput, TaskPriority, TaskStatus } from '../types/task'

type TaskFormDialogProps = {
  open: boolean
  onClose: () => void
  onSubmit: (data: TaskInput, taskId?: string) => void
  task?: Task | null
}

const defaultValues: TaskInput = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  assignee: '',
  dueDate: '',
}

export default function TaskFormDialog({ open, onClose, onSubmit, task }: TaskFormDialogProps) {
  const [values, setValues] = useState<TaskInput>(defaultValues)

  useEffect(() => {
    if (task) {
      const { id: _id, ...rest } = task
      setValues(rest)
      return
    }
    setValues(defaultValues)
  }, [task, open])

  const isEdit = Boolean(task)

  const isValid = useMemo(() => {
    return values.title.trim().length > 0 && values.assignee.trim().length > 0
  }, [values])

  const handleChange = (field: keyof TaskInput) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, status: event.target.value as TaskStatus }))
  }

  const handlePriorityChange = (value: TaskPriority) => {
    setValues((prev) => ({ ...prev, priority: value }))
  }

  const handleSubmit = () => {
    if (!isValid) return
    onSubmit(values, task?.id)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? '課題を編集' : '新しい課題を追加'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="課題タイトル"
            value={values.title}
            onChange={handleChange('title')}
            placeholder="例: API仕様の整理"
            fullWidth
            required
          />
          <TextField
            label="説明"
            value={values.description}
            onChange={handleChange('description')}
            placeholder="1〜2文でまとめる"
            fullWidth
            multiline
            minRows={3}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="ステータス"
                select
                value={values.status}
                onChange={handleStatusChange}
                fullWidth
                size="small"
              >
                <MenuItem value="todo">未着手</MenuItem>
                <MenuItem value="in_progress">進行中</MenuItem>
                <MenuItem value="done">完了</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <PrioritySelect value={values.priority} onChange={handlePriorityChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="担当者"
                value={values.assignee}
                onChange={handleChange('assignee')}
                placeholder="例: 山田太郎"
                fullWidth
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="期限"
                type="date"
                value={values.dueDate}
                onChange={handleChange('dueDate')}
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose}>キャンセル</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={!isValid}>
          {isEdit ? '変更を保存' : '追加'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
