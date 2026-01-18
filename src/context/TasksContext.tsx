import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { Task, TaskInput } from '../types/task'
import { createTask, deleteTask, fetchTasks, updateTask as updateTaskApi } from '../api/tasks'

type TasksContextValue = {
  tasks: Task[]
  isLoading: boolean
  error: string | null
  addTask: (data: TaskInput) => Promise<void>
  updateTask: (taskId: string, data: TaskInput) => Promise<void>
  removeTask: (taskId: string) => Promise<void>
}

const TasksContext = createContext<TasksContextValue | null>(null)

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    const loadTasks = async () => {
      try {
        const data = await fetchTasks()
        if (isMounted) {
          setTasks(data)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load tasks')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadTasks()

    return () => {
      isMounted = false
    }
  }, [])

  const value = useMemo<TasksContextValue>(
    () => ({
      tasks,
      isLoading,
      error,
      addTask: async (data) => {
        const created = await createTask(data)
        setTasks((prev) => [created, ...prev])
      },
      updateTask: async (taskId, data) => {
        const updated = await updateTaskApi(taskId, data)
        setTasks((prev) => prev.map((task) => (task.id === taskId ? updated : task)))
      },
      removeTask: async (taskId) => {
        await deleteTask(taskId)
        setTasks((prev) => prev.filter((task) => task.id !== taskId))
      },
    }),
    [tasks, isLoading, error],
  )

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
}
export function useTasks() {
  const context = useContext(TasksContext)
  if (!context) {
    throw new Error('useTasks must be used within TasksProvider')
  }
  return context
}
