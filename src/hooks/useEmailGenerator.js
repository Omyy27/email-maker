import { useState, useCallback } from 'react'
import { SYSTEM_PROMPT, buildUserPrompt, TONES } from '../constants'

const OLLAMA_MODEL = import.meta.env.VITE_OLLAMA_MODEL || 'gpt-oss:120b'

export function useEmailGenerator() {
  const [generatedEmail, setGeneratedEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generate = useCallback(async ({ thoughts, selectedTone, replyContext }) => {
    if (!thoughts.trim() || !selectedTone) return

    setLoading(true)
    setError('')
    setGeneratedEmail('')

    const tone = TONES.find((t) => t.id === selectedTone)

    try {
      // Llama a una Netlify Function que usa el SDK de Ollama Cloud
      const response = await fetch('/api/ollama', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: OLLAMA_MODEL,
          stream: false,
          messages: [
            {
              role: 'system',
              content: SYSTEM_PROMPT,
            },
            {
              role: 'user',
              content: buildUserPrompt(thoughts, tone.label, tone.desc, replyContext),
            },
          ],
        }),
      })

      if (!response.ok) {
        const rawError = await response.text().catch(() => '')
        const err = (() => {
          try {
            return rawError ? JSON.parse(rawError) : {}
          } catch {
            return {}
          }
        })()

        throw new Error(
          err?.error?.message || err?.message || rawError || `HTTP ${response.status}`
        )
      }

      const data = await response.json()
      const text = data?.message?.content || data?.response || ''
      setGeneratedEmail(text.trim())
    } catch (e) {
      setError(e.message || 'Ocurrió un error al generar el correo. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }, [])

  return { generatedEmail, loading, error, generate }
}
