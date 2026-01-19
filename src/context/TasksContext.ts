import { createContext } from 'react'
import type { Task, TaskInput } from '../types/task'

export type TasksContextValue = {
  tasks: Task[]
  isLoading: boolean
  error: string | null
  addTask: (data: TaskInput) => Promise<void>
  updateTask: (taskId: string, data: TaskInput) => Promise<void>
  removeTask: (taskId: string) => Promise<void>
}

export const TasksContext = createContext<TasksContextValue | null>(null)
