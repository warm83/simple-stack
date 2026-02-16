import { useCallback, useEffect } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import type { TaskInput } from '../types/task'
import {
  addTaskAtom,
  loadTasksAtom,
  removeTaskAtom,
  tasksAtom,
  tasksErrorAtom,
  tasksLoadingAtom,
  updateTaskAtom,
} from './tasksAtoms'

export function useTasks() {
  const tasks = useAtomValue(tasksAtom)
  const isLoading = useAtomValue(tasksLoadingAtom)
  const error = useAtomValue(tasksErrorAtom)
  const loadTasks = useSetAtom(loadTasksAtom)
  const addTaskAction = useSetAtom(addTaskAtom)
  const updateTaskAction = useSetAtom(updateTaskAtom)
  const removeTaskAction = useSetAtom(removeTaskAtom)

  useEffect(() => {
    void loadTasks()
  }, [loadTasks])

  const addTask = useCallback(
    async (data: TaskInput) => {
      await addTaskAction(data)
    },
    [addTaskAction],
  )

  const updateTask = useCallback(
    async (taskId: string, data: TaskInput) => {
      await updateTaskAction({ taskId, data })
    },
    [updateTaskAction],
  )

  const removeTask = useCallback(
    async (taskId: string) => {
      await removeTaskAction(taskId)
    },
    [removeTaskAction],
  )

  return { tasks, isLoading, error, addTask, updateTask, removeTask }
}
