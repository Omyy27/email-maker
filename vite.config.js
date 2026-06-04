import { readFileSync } from 'fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { Ollama } from 'ollama'

try {
  const content = readFileSync('.env', 'utf-8')
  for (const line of content.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    const value = trimmed.slice(eq + 1).trim()
    if (!process.env[key]) {
      process.env[key] = value
    }
  }
} catch {}

function ollamaMiddleware() {
  return {
    name: 'ollama-middleware',
    configureServer(server) {
      server.middlewares.use('/api/ollama', async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')

        if (req.method === 'OPTIONS') {
          res.statusCode = 204
          res.end()
          return
        }

        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end('Method Not Allowed')
          return
        }

        const apiKey = process.env.OLLAMA_API_KEY
        if (!apiKey) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'OLLAMA_API_KEY no esta configurada en el servidor.' }))
          return
        }

        try {
          const rawBody = await new Promise((resolve, reject) => {
            let data = ''
            req.on('data', (chunk) => { data += chunk })
            req.on('end', () => resolve(data))
            req.on('error', reject)
          })

          const body = JSON.parse(rawBody || '{}')
          const model = body.model || process.env.OLLAMA_MODEL || 'gpt-oss:120b'
          const messages = Array.isArray(body.messages) ? body.messages : []

          const ollama = new Ollama({
            host: process.env.OLLAMA_HOST || 'https://ollama.com',
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          })

          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('La solicitud a Ollama Cloud tardó demasiado. Intenta de nuevo.')), 25000)
          )

          const response = await Promise.race([
            ollama.chat({ model, messages, stream: false }),
            timeoutPromise,
          ])

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(response))
        } catch (err) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({
            error: err?.message || 'Error interno al llamar a Ollama Cloud.',
          }))
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), ollamaMiddleware()],
  server: {
    port: 5173,
  },
})
