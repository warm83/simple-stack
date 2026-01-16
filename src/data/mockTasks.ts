import type { Task } from '../types/task'

export const mockTasks: Task[] = [
  {
    id: 't-101',
    title: '週次リーディングの章まとめ',
    description: '第1〜2章の要点を5行で要約',
    status: 'todo',
    priority: 'medium',
    assignee: 'ミナ',
    dueDate: '2025-01-05',
  },
  {
    id: 't-102',
    title: 'APIエンドポイントのスケッチ',
    description: 'CRUD用エンドポイント名の整理と例',
    status: 'in_progress',
    priority: 'high',
    assignee: 'ハル',
    dueDate: '2025-01-08',
  },
  {
    id: 't-103',
    title: 'MUIコンポーネント調査',
    description: 'Dialog, Table, Chipの使用例をキャプチャ',
    status: 'done',
    priority: 'low',
    assignee: 'ソラ',
    dueDate: '2024-12-28',
  },
]
