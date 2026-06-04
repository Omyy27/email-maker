import { useState } from 'react'
import DOMPurify from 'dompurify'
import { TONES, stripHtml } from '../constants'
import styles from './EmailOutput.module.css'

export default function EmailOutput({ email, loading, error, selectedTone, onRegenerate }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    const plainText = stripHtml(email)
    const blob = new Blob([email], { type: 'text/html' })
    const plainBlob = new Blob([plainText], { type: 'text/plain' })
    const item = new ClipboardItem({
      'text/html': blob,
      'text/plain': plainBlob,
    })
    navigator.clipboard.write([item]).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }).catch(() => {})
  }

  const tone = TONES.find((t) => t.id === selectedTone)

  return (
    <div className={`card-base ${styles.card} ${email ? styles.cardFilled : ''}`}>
      {!email && !loading && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>✉</div>
          <p className={styles.emptyTitle}>Tu correo aparecerá aquí</p>
          <p className={styles.emptySubtitle}>
            Escribe tus ideas, elige un tono y presiona generar.
          </p>
        </div>
      )}

      {loading && !email && (
        <div className={styles.emptyState}>
          <div className={styles.pulsingDot} />
          <p className={styles.emptyTitle}>Escribiendo...</p>
          <p className={styles.emptySubtitle}>
            Transformando tus ideas en un correo impecable.
          </p>
        </div>
      )}

      {email && (
        <>
          <div className={styles.outputHeader}>
            <div className={styles.outputMeta}>
              <span className={styles.outputLabel}>CORREO GENERADO</span>
              {tone && (
                <span className={styles.toneBadge}>
                  {tone.icon} {tone.label}
                </span>
              )}
            </div>
            <button
              className={`${styles.copyBtn} ${copied ? styles.copyBtnDone : ''}`}
              onClick={copyToClipboard}
            >
              {copied ? '✓ Copiado' : 'Copiar'}
            </button>
          </div>

          <div className={styles.divider} />

          <div
            className={styles.emailText}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(email) }}
          />

          <div className={styles.outputFooter}>
            <button className={styles.regenerateBtn} onClick={onRegenerate}>
              ↻ Regenerar
            </button>
          </div>
        </>
      )}

      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}
    </div>
  )
}
