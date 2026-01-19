import type { ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'
import type { Task, TaskInput } from '../types/task'
import { createTask, deleteTask, fetchTasks, updateTask as updateTaskApi } from '../api/tasks'
import { TasksContext, type TasksContextValue } from './TasksContext'

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
      addTask: async (data: TaskInput) => {
        const created = await createTask(data)
        setTasks((prev) => [created, ...prev])
      },
      updateTask: async (taskId: string, data: TaskInput) => {
        const updated = await updateTaskApi(taskId, data)
        setTasks((prev) => prev.map((task) => (task.id === taskId ? updated : task)))
      },
      removeTask: async (taskId: string) => {
        await deleteTask(taskId)
        setTasks((prev) => prev.filter((task) => task.id !== taskId))
      },
    }),
    [tasks, isLoading, error],
  )

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
}
