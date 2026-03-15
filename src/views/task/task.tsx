'use client'

import { useEffect, useMemo, useState } from 'react'
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
import { useRouter } from 'next/navigation'
import { useTasks } from '../../context/useTasks'
import { taskStyles } from './task.styles'
import DeleteDialog from '../../components/DeleteDialog'
import { currentPageAtom } from '@/context/tasksAtoms'
import { useAtom } from 'jotai'
import { Pagination } from '@mui/material'

const filterLabels: Record<TaskStatus | 'all', string> = {
  all: 'すべて',
  todo: '未着手',
  in_progress: '進行中',
  done: '完了',
}

const priorityLabels = {
  low: '低',
  medium: '中',
  high: '高',
}

const PAGE_SIZE = 20

export default function TasksPage() {
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const router = useRouter()
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom)
  const { tasks, isLoading, error, addTask, updateTask, removeTask } =
    useTasks()

  const filteredTasks = useMemo(() => {
    if (statusFilter === 'all') return tasks
    return tasks.filter((task) => task.status === statusFilter)
  }, [statusFilter, tasks])

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredTasks.length / PAGE_SIZE)),
    [filteredTasks.length],
  )
  const safeCurrentPage = Math.min(currentPage, totalPages)

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages, setCurrentPage])

  const tasksPage = useMemo(() => {
    const start = (safeCurrentPage - 1) * PAGE_SIZE
    const end = start + PAGE_SIZE
    return filteredTasks.slice(start, end)
  }, [filteredTasks, safeCurrentPage])

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
    router.push(`/tasks/${taskId}`)
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

  const handlePage = (e: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
  }

  const handleDownloadCSV = () => {
    const headers = [
      'ID',
      '課題',
      '説明',
      'ステータス',
      '優先度',
      '担当者',
      '期限',
    ]
    const escapeCSV = (value: unknown) => {
      const str = String(value ?? '')
      return `"${str.replace(/"/g, '""')}"`
    }
    const rows = filteredTasks.map((task) =>
      [
        task.id,
        task.title,
        task.description,
        filterLabels[task.status] ?? '',
        priorityLabels[task.priority] ?? '',
        task.assignee,
        task.dueDate,
      ]
        .map(escapeCSV)
        .join(','),
    )
    const csv = [headers.join(','), ...rows].join('\n')
    const bom = '\uFEFF'
    const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `tasks-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <AppLayout onAdd={handleOpenDialog} onDownloadCSV={handleDownloadCSV}>
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
          onChange={(_event, value) => {
            if (value) {
              setStatusFilter(value)
              setCurrentPage(1)
            }
          }}
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
            {tasksPage.map((task) => (
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
          <TaskTable
            tasks={tasksPage}
            onEdit={handleEdit}
            onDelete={handleOpenDeleteDialog}
            onOpen={handleOpenDetail}
          />
        )}
        <Stack direction="row" justifyContent="flex-end">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePage}
            color="primary"
          />
        </Stack>
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
