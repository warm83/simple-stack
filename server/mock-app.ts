import cors from 'cors'
import express from 'express'
import { createMockStore } from './mock-store'
import { parseTasksCsv } from './tasksCsv'

const app = express()
const store = createMockStore()

const corsOriginEnv = process.env.CORS_ORIGIN || 'http://localhost:3000'
const allowedOrigins = corsOriginEnv
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)

      if (
        process.env.NODE_ENV !== 'production' &&
        (origin.startsWith('http://localhost:') ||
          origin.startsWith('http://127.0.0.1:'))
      ) {
        return callback(null, true)
      }

      if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`))
    },
  }),
)
app.use(express.json())

const router = express.Router()

router.get('/health', (_req, res) => res.json({ ok: true }))

router.get('/tasks', (_req, res) => {
  return res.json(store.list())
})

router.get('/tasks/:id', (req, res) => {
  const task = store.getById(req.params.id)

  if (!task) {
    return res.status(404).json({ error: 'Task not found' })
  }

  return res.json(task)
})

router.post('/tasks', (req, res) => {
  const { title, description, status, assignee, priority, due_date } = req.body
  const created = store.create({
    title,
    description,
    status,
    assignee,
    priority,
    due_date: due_date ?? null,
  })

  return res.status(201).json(created)
})

router.post('/tasks/import', (req, res) => {
  const csv = req.body?.csv

  if (typeof csv !== 'string' || csv.trim() === '') {
    return res.status(400).json({ error: 'csv is required' })
  }

  try {
    const tasksToInsert = parseTasksCsv(csv)
    const created = store.createMany(tasksToInsert)

    return res.status(201).json({
      importedCount: created.length,
      tasks: created,
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'CSVの解析に失敗しました。'
    return res.status(400).json({ error: message })
  }
})

router.put('/tasks/:id', (req, res) => {
  const updated = store.update(req.params.id, req.body)

  if (!updated) {
    return res.status(400).json({ error: 'Task not found' })
  }

  return res.json(updated)
})

router.delete('/tasks/:id', (req, res) => {
  store.delete(req.params.id)
  return res.status(204).end()
})

app.use('/api', router)
app.use(router)

export default app
