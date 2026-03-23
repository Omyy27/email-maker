import { TONES } from '../constants'
import styles from './ToneSelector.module.css'

export default function ToneSelector({ selectedTone, onSelect }) {
  return (
    <div className={styles.card}>
      <label className={styles.label}>
        <span className={styles.labelIcon}>02</span>
        Elige el tono
      </label>
      <div className={styles.grid}>
        {TONES.map((tone) => (
          <button
            key={tone.id}
            className={`${styles.toneCard} ${selectedTone === tone.id ? styles.active : ''}`}
            onClick={() => onSelect(tone.id)}
          >
            <span className={styles.icon}>{tone.icon}</span>
            <span className={styles.name}>{tone.label}</span>
            <span className={styles.desc}>{tone.desc}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
