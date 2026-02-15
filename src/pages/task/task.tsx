import { useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import AppLayout from '../../layouts/AppLayout'
import EmptyState from '../../components/EmptyState'
import TaskFormDialog from '../../components/TaskFormDialog'
import TaskTable from '../../components/TaskTable'
import TaskCard from '../../components/TaskCard'
import type { Task, TaskInput, TaskStatus } from '../../types/task'
import { useNavigate } from 'react-router-dom'
import { useTasks } from '../../context/useTasks'
import { taskStyles } from './task.styles'
import DeleteDialog from '../../components/DeleteDialog'

const filterLabels: Record<TaskStatus | 'all', string> = {
  all: 'すべて',
  todo: '未着手',
  in_progress: '進行中',
  done: '完了',
}

export default function TasksPage() {
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate()
  const { tasks, isLoading, error, addTask, updateTask, removeTask } = useTasks()

  const filteredTasks = useMemo(() => {
    if (statusFilter === 'all') return tasks
    return tasks.filter((task) => task.status === statusFilter)
  }, [statusFilter, tasks])

  const handleOpenDialog = () => {
    setEditingTask(null)
    setDialogOpen(true)
  }

  const handleEdit = (task: Task) => {
    setEditingTask(task)
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setEditingTask(null)
  }

  const handleSubmit = (data: TaskInput, taskId?: string) => {
    if (taskId) {
      updateTask(taskId, data)
    } else {
      addTask(data)
    }
    handleCloseDialog()
  }

  const handleDelete = (taskId: string) => {
    removeTask(taskId)
    handleCloseDeleteDialog()
  }

  const handleOpenDetail = (taskId: string) => {
    navigate(`/tasks/${taskId}`)
  }

  const handleOpenDeleteDialog = (taskId: string) => {
    const task = tasks.find((item) => item.id === taskId)
    if (!task) return
    setSelectedTask(task)
    setDeleteDialogOpen(true)
  }

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false)
    setSelectedTask(null)
  }

  return (
    <AppLayout onAdd={handleOpenDialog}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h3">タスク</Typography>
          <Typography variant="body2" color="text.secondary">
            チーム課題の進捗をひと目で確認しましょう。
          </Typography>
        </Box>
        <ToggleButtonGroup
          exclusive
          value={statusFilter}
          onChange={(_event, value) => value && setStatusFilter(value)}
          sx={taskStyles.filterGroup}
        >
          {Object.entries(filterLabels).map(([value, label]) => (
            <ToggleButton
              key={value}
              value={value}
              sx={taskStyles.filterButton}
            >
              {label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        {isLoading ? (
          <Typography variant="body1">読み込み中...</Typography>
        ) : error ? (
          <Typography variant="body1">読み込みに失敗しました。</Typography>
        ) : filteredTasks.length === 0 ? (
          <EmptyState onAdd={handleOpenDialog} />
        ) : isMobile ? (
          <Stack spacing={2}>
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleOpenDeleteDialog}
                onOpen={handleOpenDetail}
              />
            ))}
          </Stack>
        ) : (
          <TaskTable tasks={filteredTasks} onEdit={handleEdit} onDelete={handleOpenDeleteDialog} onOpen={handleOpenDetail} />
        )}
      </Stack>
      <TaskFormDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        task={editingTask}
      />
      <DeleteDialog
        open={deleteDialogOpen}
        task={selectedTask}
        onClose={handleCloseDeleteDialog}
        onDelete={handleDelete}
      />
      
    </AppLayout>
  )
}
