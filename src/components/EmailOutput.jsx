import { useState } from 'react'
import { TONES } from '../constants'
import styles from './EmailOutput.module.css'

export default function EmailOutput({ email, loading, error, selectedTone, onRegenerate }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const tone = TONES.find((t) => t.id === selectedTone)

  return (
    <div className={`${styles.card} ${email ? styles.cardFilled : ''}`}>
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

          <pre className={styles.emailText}>{email}</pre>

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
