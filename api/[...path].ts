import app from '../server/app.js'

export default function handler(req, res) {
  if (typeof req.url === 'string' && req.url.startsWith('/api/')) {
    req.url = req.url.slice('/api'.length)
  }
  return app(req, res)
}
