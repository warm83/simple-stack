import type { Task } from './task'

export type ApiTask = {
  id: string
  title: string
  description: string
  status: Task['status']
  priority: Task['priority']
  assignee: string
  due_date: string | null
}

export type ImportTasksResponse = {
  importedCount: number
  tasks: ApiTask[]
}
