import { Task, TaskStatus } from '@/types/task'

const headers = ['ID', '課題', '説明', 'ステータス', '優先度', '担当者', '期限']
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
export const downloadTasksCSV = (filteredTasks: Task[]) => {
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
