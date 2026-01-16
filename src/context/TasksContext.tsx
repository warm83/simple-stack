import type { ReactNode } from 'react'
import { createContext, useContext, useMemo, useState } from 'react'
import { mockTasks } from '../data/mockTasks'
import type { Task, TaskInput } from '../types/task'

type TasksContextValue = {
  tasks: Task[]
  addTask: (data: TaskInput) => void
  updateTask: (taskId: string, data: TaskInput) => void
  removeTask: (taskId: string) => void
}

const TasksContext = createContext<TasksContextValue | null>(null)

function createId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `t-${Date.now()}`
}

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)

  const value = useMemo<TasksContextValue>(
    () => ({
      tasks,
      addTask: (data) => setTasks((prev) => [{ id: createId(), ...data }, ...prev]),
      updateTask: (taskId, data) =>
        setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, ...data } : task))),
      removeTask: (taskId) => setTasks((prev) => prev.filter((task) => task.id !== taskId)),
    }),
    [tasks],
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
