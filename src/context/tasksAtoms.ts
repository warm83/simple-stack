import { atom } from 'jotai'
import type { Task, TaskInput } from '../types/task'
import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTask as updateTaskApi,
} from '../api/tasks'

export const tasksAtom = atom<Task[]>([])
export const tasksLoadingAtom = atom(true)
export const tasksErrorAtom = atom<string | null>(null)
export const tasksInitializedAtom = atom(false)
export const currentPageAtom = atom(1)

export const loadTasksAtom = atom(null, async (get, set) => {
  if (get(tasksInitializedAtom)) return

  set(tasksInitializedAtom, true)
  set(tasksLoadingAtom, true)

  try {
    const data = await fetchTasks()
    set(tasksAtom, data)
    set(tasksErrorAtom, null)
  } catch (err) {
    set(tasksInitializedAtom, false)
    set(
      tasksErrorAtom,
      err instanceof Error ? err.message : 'Failed to load tasks',
    )
  } finally {
    set(tasksLoadingAtom, false)
  }
})

export const addTaskAtom = atom(null, async (_get, set, data: TaskInput) => {
  const created = await createTask(data)
  set(tasksAtom, (prev) => [created, ...prev])
})

export const updateTaskAtom = atom(
  null,
  async (_get, set, params: { taskId: string; data: TaskInput }) => {
    const updated = await updateTaskApi(params.taskId, params.data)
    set(tasksAtom, (prev) =>
      prev.map((task) => (task.id === params.taskId ? updated : task)),
    )
  },
)

export const removeTaskAtom = atom(null, async (_get, set, taskId: string) => {
  await deleteTask(taskId)
  set(tasksAtom, (prev) => prev.filter((task) => task.id !== taskId))
})
