'use client'

import { useEffect, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { alpha, useTheme } from '@mui/material/styles'
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
import { currentPageAtom, tasksAtom } from '@/context/tasksAtoms'
import { useAtom, useSetAtom } from 'jotai'
import { Pagination } from '@mui/material'
import { downloadTasksCSV } from '@/utils/downloadTasksCSV'
import { importTasksCSV } from '@/utils/importTasksCSV'
import { fetchTasks } from '@/api/tasks'
import {
  AutorenewOutlined,
  CheckCircleOutline,
  ErrorOutlineOutlined,
} from '@mui/icons-material'
import theme from '@/theme'

const filterLabels: Record<TaskStatus | 'all', string> = {
  all: 'すべて',
  todo: '未着手',
  in_progress: '進行中',
  done: '完了',
}

const importStatus = {
  loading: {
    bgColor: alpha(theme.palette.text.secondary, 0.1),
    textColor: 'text.secondary',
    icon: (
      <AutorenewOutlined fontSize="small" sx={{ color: 'text.secondary' }} />
    ),
  },
  success: {
    bgColor: alpha(theme.palette.success.main, 0.1),
    textColor: 'success.dark',
    icon: <CheckCircleOutline fontSize="small" color="success" />,
  },
  error: {
    bgColor: alpha(theme.palette.error.main, 0.1),
    textColor: 'error.dark',
    icon: <ErrorOutlineOutlined fontSize="small" color="error" />,
  },
}
const PAGE_SIZE = 20

export default function TasksPage() {
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [importState, setImportState] = useState<
    'loading' | 'success' | 'error' | null
  >(null)
  const [importMessage, setImportMessage] = useState<string | null>(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const router = useRouter()
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom)
  const setTasks = useSetAtom(tasksAtom)
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
  const handleDownloadCSV = () => downloadTasksCSV(filteredTasks)
  const isImporting = importState === 'loading'

  const handleImportCSV = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (isImporting) return

    const file = event.target.files?.[0]
    if (!file) return
    event.target.value = ''

    setImportState('loading')
    setImportMessage('import 実行中です。')
    try {
      const result = await importTasksCSV(file)
      setImportState('success')
      setImportMessage(`${result.importedCount}件のタスクを取り込みました。`)

      try {
        const data = await fetchTasks()
        setTasks(data)
      } catch {
        setTasks((prev) => [...result.tasks, ...prev])
        setImportMessage(
          `${result.importedCount}件のタスクを取り込みました。一覧の再取得に失敗したため、表示は一時的な反映です。`,
        )
      }
    } catch (err) {
      setImportState('error')
      setImportMessage(
        err instanceof Error ? err.message : 'CSVのインポートに失敗しました',
      )
    }
  }

  return (
    <AppLayout
      onAdd={handleOpenDialog}
      onDownloadCSV={handleDownloadCSV}
      onImportCSV={handleImportCSV}
      importDisabled={isImporting}
    >
      <Stack spacing={3}>
        <Box>
          <Typography variant="h3">タスク</Typography>
          <Typography variant="body2" color="text.secondary">
            チーム課題の進捗をひと目で確認しましょう。
          </Typography>
        </Box>
        {importState ? (
          <Box
            sx={{
              backgroundColor: importStatus[importState].bgColor,
              borderRadius: 2,
            }}
            p={1}
          >
            <Stack direction="row" alignItems="center" spacing={0.5}>
              {importStatus[importState].icon}
              <Typography
                variant="body2"
                color={importStatus[importState].textColor}
              >
                {importMessage}
              </Typography>
            </Stack>
          </Box>
        ) : null}

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
