import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoMark}>✉</div>
      <div>
        <h1 className={styles.logoText}>Lettercraft</h1>
        <p className={styles.tagline}>Correos que conectan.</p>
      </div>
    </header>
  )
}
