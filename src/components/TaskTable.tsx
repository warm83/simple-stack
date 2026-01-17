import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import StatusChip from './StatusChip'
import type { Task } from '../types/task'

type TaskTableProps = {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
  onOpen: (taskId: string) => void
}

export default function TaskTable({ tasks, onEdit, onDelete, onOpen }: TaskTableProps) {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 2,
        border: '1px solid rgba(15, 118, 110, 0.2)',
        backgroundColor: '#ffffff',
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>課題</TableCell>
            <TableCell>ステータス</TableCell>
            <TableCell>担当者</TableCell>
            <TableCell>期限</TableCell>
            <TableCell align="right">操作</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id} hover>
              <TableCell>
                <Stack spacing={0.5}>
                  <Typography variant="subtitle1">{task.title}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {task.description}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell>
                <StatusChip status={task.status} />
              </TableCell>
              <TableCell>{task.assignee}</TableCell>
              <TableCell>{task.dueDate}</TableCell>
              <TableCell align="right">
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <IconButton
                    aria-label="open"
                    size="small"
                    onClick={() => onOpen(task.id)}
                  >
                    <ArrowForwardIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    aria-label="edit"
                    size="small"
                    onClick={() => onEdit(task)}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => onDelete(task.id)}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
