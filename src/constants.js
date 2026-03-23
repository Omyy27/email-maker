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
- Output ONLY the email text, nothing else — no explanations, no preambles`

export function buildUserPrompt(thoughts, tone, toneDesc, replyContext) {
  let prompt = `Write a ${tone} (${toneDesc}) email based on these rough thoughts:\n\n"${thoughts}"`
  if (replyContext && replyContext.trim()) {
    prompt += `\n\nThis email is a REPLY to the following email:\n---\n${replyContext}\n---`
  }
  return prompt
}
