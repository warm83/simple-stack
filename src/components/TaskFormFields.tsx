import type { ChangeEvent } from 'react'
import { useMemo, useState } from 'react'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import PrioritySelect from './PrioritySelect'
import type { Task, TaskInput, TaskPriority, TaskStatus } from '../types/task'

type TaskFormFieldsProps = {
  task?: Task | null
  onClose: () => void
  onSubmit: (data: TaskInput, taskId?: string) => void
}

const defaultValues: TaskInput = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  assignee: '',
  dueDate: '',
}

function toTaskInput(task?: Task | null): TaskInput {
  if (!task) return defaultValues
  return {
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    assignee: task.assignee,
    dueDate: task.dueDate ?? '',
  }
}

export default function TaskFormFields({ task, onClose, onSubmit }: TaskFormFieldsProps) {
  const [values, setValues] = useState<TaskInput>(() => toTaskInput(task))

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
    <>
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
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 2,
            }}
          >
            <Box>
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
            </Box>
            <Box>
              <PrioritySelect value={values.priority} onChange={handlePriorityChange} />
            </Box>
            <Box>
              <TextField
                label="担当者"
                value={values.assignee}
                onChange={handleChange('assignee')}
                placeholder="例: 山田太郎"
                fullWidth
                size="small"
                required
              />
            </Box>
            <Box>
              <TextField
                label="期限"
                type="date"
                value={values.dueDate}
                onChange={handleChange('dueDate')}
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose}>キャンセル</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={!isValid}>
          {isEdit ? '変更を保存' : '追加'}
        </Button>
      </DialogActions>
    </>
  )
}
