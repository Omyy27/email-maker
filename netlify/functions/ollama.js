import { Ollama } from 'ollama'

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    }
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const apiKey = process.env.OLLAMA_API_KEY
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        error: 'OLLAMA_API_KEY no esta configurada en el servidor.',
      }),
    }
  }

  try {
    const body = JSON.parse(event.body || '{}')
    const model = body.model || process.env.OLLAMA_MODEL || 'gpt-oss:120b'
    const messages = Array.isArray(body.messages) ? body.messages : []

    const ollama = new Ollama({
      host: 'https://ollama.com',
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })

    const response = await ollama.chat({
      model,
      messages,
      stream: false,
    })

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(response),
    }
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: err?.message || 'Error interno al llamar a Ollama Cloud.',
      }),
    }
  }
}
