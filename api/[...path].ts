import app from '../server/app.js'
import type { Request, Response } from 'express'

export default function handler(req: Request, res: Response) {
  if (typeof req.url === 'string' && req.url.startsWith('/api/')) {
    req.url = req.url.slice('/api'.length)
  }
  return app(req, res)
}
