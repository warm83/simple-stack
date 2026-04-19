import { importTasks } from '@/api/tasks'

export async function importTasksCSV(file: File) {
  const csvText = await file.text()
  return importTasks(csvText)
}
