import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }))
app.use(express.json())

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

app.get('/health', (_req, res) => res.json({ ok: true }))

app.get('/tasks', async (_req, res) => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  return res.json(data)
})

app.get('/tasks/:id', async (req, res) => {
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

app.post('/tasks', async (req, res) => {
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

app.put('/tasks/:id', async (req, res) => {
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

app.delete('/tasks/:id', async (req, res) => {
  const { error } = await supabase.from('tasks').delete().eq('id', req.params.id)

  if (error) {
    return res.status(400).json({ error: error.message })
  }

  return res.status(204).end()
})

app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`)
})
