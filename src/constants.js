export const TONES = [
  { id: 'formal',      label: 'Formal',      icon: '◈', desc: 'Profesional y estructurado' },
  { id: 'concise',     label: 'Conciso',     icon: '◉', desc: 'Directo al punto'            },
  { id: 'warm',        label: 'Cálido',      icon: '◍', desc: 'Amigable y cercano'          },
  { id: 'persuasive',  label: 'Persuasivo',  icon: '◎', desc: 'Convincente y claro'         },
  { id: 'diplomatic',  label: 'Diplomático', icon: '◌', desc: 'Tactful y equilibrado'       },
  { id: 'assertive',   label: 'Asertivo',    icon: '●', desc: 'Directo y seguro'            },
]

export const SYSTEM_PROMPT = `You are an expert email writer. Transform the user's rough ideas into a polished, professional email.

Rules:
- Write ONLY the email body (no subject line needed unless the user mentions it)
- Match the requested tone precisely
- Keep it natural and human-sounding, never robotic
- If a "reply context" email is provided, make sure the new email is a proper response to it
- Format the email body using clean HTML. Use only these tags: <p>, <br>, <b>, <strong>, <i>, <em>, <ul>, <ol>, <li>, <a href="...">
- The user's rough thoughts may contain HTML formatting tags — pay attention to bold and italic to understand what they want to emphasize
- NEVER wrap the output in markdown code fences (\`\`\`html ... \`\`\`). NEVER include <!DOCTYPE>, <html>, <head>, or <body> tags
- Output ONLY the inner HTML email body (just the <p>, <br>, <b>, <i>, <ul>, <ol>, <li>, <a> tags), nothing else — no explanations, no preambles`

export function buildUserPrompt(thoughts, tone, toneDesc, replyContext) {
  let prompt = `Write a ${tone} (${toneDesc}) email based on these rough thoughts (may include HTML formatting for emphasis):\n\n${thoughts}`
  if (replyContext && replyContext.trim()) {
    prompt += `\n\nThis email is a REPLY to the following email:\n---\n${replyContext}\n---`
  }
  return prompt
}

export function stripHtml(html) {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '').trim()
}

export function cleanEmailResponse(raw) {
  if (!raw) return ''
  let cleaned = raw.replace(/```html\s*/gi, '').replace(/```\s*/g, '')
  const bodyMatch = cleaned.match(/<body[^>]*>([\s\S]*)<\/body>/i)
  if (bodyMatch) {
    cleaned = bodyMatch[1].trim()
  }
  cleaned = cleaned.replace(/<!DOCTYPE[^>]*>/gi, '').replace(/<html[^>]*>/gi, '').replace(/<\/html>/gi, '').replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '').replace(/<title[^>]*>[\s\S]*?<\/title>/gi, '')
  return cleaned.trim()
}
