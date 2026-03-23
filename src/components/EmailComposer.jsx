import { useState, useCallback } from 'react'
import Header from './Header'
import ToneSelector from './ToneSelector'
import EmailOutput from './EmailOutput'
import { useEmailGenerator } from '../hooks/useEmailGenerator'
import styles from './EmailComposer.module.css'

export default function EmailComposer() {
  const [thoughts, setThoughts] = useState('')
  const [selectedTone, setSelectedTone] = useState(null)
  const [replyContext, setReplyContext] = useState('')
  const [showReply, setShowReply] = useState(false)

  const { generatedEmail, loading, error, generate } = useEmailGenerator()

  const handleGenerate = useCallback(() => {
    generate({ thoughts, selectedTone, replyContext })
  }, [generate, thoughts, selectedTone, replyContext])

  const canGenerate = thoughts.trim().length > 0 && selectedTone

  return (
    <div className={styles.root}>
      {/* Decorative backgrounds */}
      <div className={styles.bgMesh} />
      <div className={styles.bgGrid} />

      <Header />

      <main className={styles.main}>
        {/* ── Left column ── */}
        <section className={styles.column}>

          {/* Thoughts */}
          <div className={styles.card}>
            <label className={styles.label}>
              <span className={styles.labelIcon}>01</span>
              ¿Qué quieres decir?
            </label>
            <p className={styles.hint}>Escribe en borrador — sin preocuparte por el estilo.</p>
            <textarea
              className={styles.textarea}
              placeholder="Ej: Necesito pedirle a mi jefe que me apruebe unos días de vacaciones para la próxima semana, pero no quiero que parezca que lo estoy poniendo en un aprieto..."
              value={thoughts}
              onChange={(e) => setThoughts(e.target.value)}
              rows={6}
            />
            <div className={styles.charCount}>{thoughts.length} caracteres</div>
          </div>

          {/* Reply context (optional) */}
          <div className={styles.card}>
            <button
              className={styles.toggleBtn}
              onClick={() => setShowReply(!showReply)}
            >
              <span className={styles.toggleIcon}>{showReply ? '▾' : '▸'}</span>
              ¿Estás respondiendo a un correo?
              <span className={styles.optionalBadge}>Opcional</span>
            </button>

            {showReply && (
              <div className={styles.replyBox}>
                <p className={styles.hint}>Pega aquí el correo al que vas a responder.</p>
                <textarea
                  className={`${styles.textarea} ${styles.textareaSmall}`}
                  placeholder="Pega el correo original aquí..."
                  value={replyContext}
                  onChange={(e) => setReplyContext(e.target.value)}
                  rows={4}
                />
              </div>
            )}
          </div>

          {/* Tone selector */}
          <ToneSelector selectedTone={selectedTone} onSelect={setSelectedTone} />

          {/* Generate button */}
          <button
            className={`${styles.generateBtn} ${canGenerate && !loading ? styles.generateBtnActive : ''} ${loading ? styles.generateBtnLoading : ''}`}
            onClick={handleGenerate}
            disabled={!canGenerate || loading}
          >
            {loading ? (
              <span className={styles.loadingRow}>
                <span className={styles.spinner} />
                Redactando tu correo...
              </span>
            ) : (
              'Generar correo →'
            )}
          </button>
        </section>

        {/* ── Right column ── */}
        <section className={styles.column}>
          <EmailOutput
            email={generatedEmail}
            loading={loading}
            error={error}
            selectedTone={selectedTone}
            onRegenerate={handleGenerate}
          />
        </section>
      </main>
    </div>
  )
}
