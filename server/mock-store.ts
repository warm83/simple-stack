import { randomUUID } from 'node:crypto'
import type { TaskPriority, TaskStatus } from '../src/types/task'

type MockTaskInsert = {
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  assignee: string
  due_date: string | null
}

export type MockTaskRecord = MockTaskInsert & {
  id: string
  created_at: string
  updated_at: string
}

const seedTasks: MockTaskInsert[] = [
  {
    title: 'オンボーディング資料の更新',
    description: '新メンバー向けの初日セットアップ手順を見直す',
    status: 'todo',
    priority: 'medium',
    assignee: 'ミナ',
    due_date: '2026-04-24',
  },
  {
    title: 'ダッシュボードの表示確認',
    description: 'モバイル幅でカード崩れがないかを検証する',
    status: 'in_progress',
    priority: 'high',
    assignee: 'ハル',
    due_date: '2026-04-22',
  },
  {
    title: 'CSVインポート文言の校正',
    description: '成功時とエラー時のメッセージを最終確認する',
    status: 'done',
    priority: 'low',
    assignee: 'ソラ',
    due_date: '2026-04-20',
  },
  {
    title: '優先度フィルタの確認',
    description: '高優先度の件数表示が仕様通りかチェックする',
    status: 'todo',
    priority: 'high',
    assignee: 'ユイ',
    due_date: null,
  },
  {
    title: '期限切れタスクの洗い出し',
    description: '今週中に対応が必要な項目を一覧化する',
    status: 'in_progress',
    priority: 'medium',
    assignee: 'レン',
    due_date: '2026-04-23',
  },
]

function cloneTask(task: MockTaskRecord): MockTaskRecord {
  return { ...task }
}

function sortTasks(tasks: MockTaskRecord[]) {
  return [...tasks].sort((a, b) => {
    if (a.created_at === b.created_at) {
      return b.id.localeCompare(a.id)
    }
    return b.created_at.localeCompare(a.created_at)
  })
}

function createRecord(input: MockTaskInsert, timestamp: string): MockTaskRecord {
  return {
    id: randomUUID(),
    title: input.title,
    description: input.description,
    status: input.status,
    priority: input.priority,
    assignee: input.assignee,
    due_date: input.due_date,
    created_at: timestamp,
    updated_at: timestamp,
  }
}

export function createMockStore(initialTasks: MockTaskInsert[] = seedTasks) {
  let sequence = initialTasks.length
  let tasks = sortTasks(
    initialTasks.map((task, index) => {
      const createdAt = new Date(Date.now() - (initialTasks.length - index) * 60000)
        .toISOString()
      return createRecord(task, createdAt)
    }),
  )

  return {
    list() {
      return sortTasks(tasks).map(cloneTask)
    },
    getById(id: string) {
      const task = tasks.find((item) => item.id === id)
      return task ? cloneTask(task) : null
    },
    create(input: MockTaskInsert) {
      sequence += 1
      const timestamp = new Date(Date.now() + sequence).toISOString()
      const created = createRecord(input, timestamp)
      tasks = sortTasks([created, ...tasks])
      return cloneTask(created)
    },
    createMany(inputs: MockTaskInsert[]) {
      const created = inputs.map((input, index) => {
        sequence += 1
        const timestamp = new Date(Date.now() + sequence + index).toISOString()
        return createRecord(input, timestamp)
      })
      tasks = sortTasks([...created, ...tasks])
      return created.map(cloneTask)
    },
    update(id: string, patch: Partial<MockTaskInsert>) {
      const index = tasks.findIndex((item) => item.id === id)
      if (index === -1) return null

      const nextTask: MockTaskRecord = {
        ...tasks[index],
        ...patch,
        due_date:
          patch.due_date === undefined ? tasks[index].due_date : patch.due_date,
        updated_at: new Date().toISOString(),
      }

      tasks = tasks.map((item, itemIndex) => (itemIndex === index ? nextTask : item))
      return cloneTask(nextTask)
    },
    delete(id: string) {
      tasks = tasks.filter((item) => item.id !== id)
    },
  }
}
