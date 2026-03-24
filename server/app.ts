import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { parseTasksCsv } from './tasksCsv'

dotenv.config()

const app = express()

const corsOriginEnv = process.env.CORS_ORIGIN || 'http://localhost:3000'
const allowedOrigins = corsOriginEnv
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests (curl, server-to-server)
      if (!origin) return callback(null, true)

      // Dev ergonomics: Next dev may auto-shift ports (3000 -> 3002, etc.)
      // Allow any localhost/127.0.0.1 origin in non-production unless explicitly locked down.
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

const supabase = createClient(
  process.env.SUPABASE_URL ?? '',
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
)

const router = express.Router()

router.get('/health', (_req, res) => res.json({ ok: true }))

router.get('/tasks', async (_req, res) => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  return res.json(data)
})

router.get('/tasks/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', req.params.id)
    .single()

  if (error) {
    return res.status(404).json({ error: error.message })
  }

  return res.json(data)
})

router.post('/tasks', async (req, res) => {
  const { title, description, status, assignee, priority, due_date } = req.body
  const { data, error } = await supabase
    .from('tasks')
    .insert([{ title, description, status, assignee, priority, due_date }])
    .select('*')
    .single()

  if (error) {
    return res.status(400).json({ error: error.message })
  }

  return res.status(201).json(data)
})

router.post('/tasks/import', async (req, res) => {
  const csv = req.body?.csv

  if (typeof csv !== 'string' || csv.trim() === '') {
    return res.status(400).json({ error: 'csv is required' })
  }

  let tasksToInsert

  try {
    tasksToInsert = parseTasksCsv(csv)
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'CSVの解析に失敗しました。'
    return res.status(400).json({ error: message })
  }

  const { data, error } = await supabase
    .from('tasks')
    .insert(tasksToInsert)
    .select('*')

  if (error) {
    return res.status(400).json({ error: error.message })
  }

  return res.status(201).json({
    importedCount: data.length,
    tasks: data,
  })
})

router.put('/tasks/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('tasks')
    .update({ ...req.body, updated_at: new Date().toISOString() })
    .eq('id', req.params.id)
    .select('*')
    .single()

  if (error) {
    return res.status(400).json({ error: error.message })
  }

  return res.json(data)
})

router.delete('/tasks/:id', async (req, res) => {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', req.params.id)

  if (error) {
    return res.status(400).json({ error: error.message })
  }

  return res.status(204).end()
})

// Mount router (Vercel receives full path e.g. /api/tasks/:id; local may use /tasks)
app.use('/api', router)
app.use(router)

export default app
