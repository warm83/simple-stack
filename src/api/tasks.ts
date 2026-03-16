import type { ImportTasksResponse, ApiTask } from '../types/api'
import type { Task, TaskInput } from '../types/task'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '/api'

function buildUrl(path: string) {
  if (!API_BASE_URL) return path
  return `${API_BASE_URL.replace(/\/$/, '')}${path}`
}

function mapApiToTask(task: ApiTask): Task {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    assignee: task.assignee,
    dueDate: task.due_date ?? '',
  }
}

function mapTaskInputToApi(data: TaskInput) {
  return {
    title: data.title,
    description: data.description,
    status: data.status,
    priority: data.priority,
    assignee: data.assignee,
    due_date: data.dueDate ? data.dueDate : null,
  }
}

async function request<T>(path: string, init?: RequestInit) {
  const response = await fetch(buildUrl(path), {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `Request failed: ${response.status}`)
  }

  if (response.status === 204) {
    return null as T
  }

  return (await response.json()) as T
}

export async function fetchTasks() {
  const data = await request<ApiTask[]>('/tasks')
  return data.map(mapApiToTask)
}

export async function createTask(input: TaskInput) {
  const data = await request<ApiTask>('/tasks', {
    method: 'POST',
    body: JSON.stringify(mapTaskInputToApi(input)),
  })
  return mapApiToTask(data)
}

export async function updateTask(taskId: string, input: TaskInput) {
  const data = await request<ApiTask>(`/tasks/${taskId}`, {
    method: 'PUT',
    body: JSON.stringify(mapTaskInputToApi(input)),
  })
  return mapApiToTask(data)
}

export async function deleteTask(taskId: string) {
  await request<void>(`/tasks/${taskId}`, {
    method: 'DELETE',
  })
}

export async function importTasks(csv: string) {
  const data = await request<ImportTasksResponse>('/tasks/import', {
    method: 'POST',
    body: JSON.stringify({ csv }),
  })

  return {
    importedCount: data.importedCount,
    tasks: data.tasks.map(mapApiToTask),
  }
}
