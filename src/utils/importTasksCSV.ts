import { importTasks } from '@/api/tasks'
import { Task } from '@/types/task'

type ImportResult = {
  importedCount: number
  tasks: Task[]
}
export const importTasksCSV = async (file: File): Promise<ImportResult> => {
  const csvText = await file.text()
  return importTasks(csvText)
}
