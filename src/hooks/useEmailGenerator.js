import { useState, useCallback } from 'react'
import { SYSTEM_PROMPT, buildUserPrompt, TONES } from '../constants'

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY

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
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: [
            {
              role: 'user',
              content: buildUserPrompt(thoughts, tone.label, tone.desc, replyContext),
            },
          ],
        }),
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        throw new Error(err?.error?.message || `HTTP ${response.status}`)
      }

      const data = await response.json()
      const text = data.content?.map((b) => b.text || '').join('') || ''
      setGeneratedEmail(text.trim())
    } catch (e) {
      setError(e.message || 'Ocurrió un error al generar el correo. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }, [])

  return { generatedEmail, loading, error, generate }
}
