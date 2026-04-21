import app from './mock-app'

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`Mock API server running on http://localhost:${port}`)
})
