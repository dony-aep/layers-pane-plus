import { type ReactNode } from 'react'
import { Button } from 'react-aria-components'
import styles from './ActionTile.module.css'

const base = import.meta.env.BASE_URL

interface Props {
  icon: string
  label: string
  onPress: () => void
  expandable?: boolean
  expanded?: boolean
  onToggle?: () => void
  children?: ReactNode
}

export function ActionTile({ icon, label, onPress, expandable, expanded, onToggle, children }: Props) {
  return (
    <div className={styles.cell}>
      <Button className={styles.btn} onPress={onPress}>
        <img className={styles.icon} src={`${base}images/${icon}`} alt="" aria-hidden="true" />
        <span className={styles.label}>{label}</span>
      </Button>
      {expandable && (
        <Button
          className={`${styles.chev}${expanded ? ` ${styles.chevOpen}` : ''}`}
          onPress={onToggle}
          aria-label={`${label} options`}
        >
          <span className="material-symbols-outlined">expand_more</span>
        </Button>
      )}
      {expanded && children && <div className={styles.options}>{children}</div>}
    </div>
  )
}
