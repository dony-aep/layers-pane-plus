import { Checkbox as AriaCheckbox } from 'react-aria-components'
import styles from './controls.module.css'

interface Props {
  label: string
  isSelected: boolean
  onChange: (selected: boolean) => void
}

export function Checkbox({ label, isSelected, onChange }: Props) {
  return (
    <AriaCheckbox className={styles.checkbox} isSelected={isSelected} onChange={onChange}>
      <span className={styles.box} aria-hidden="true">
        <svg viewBox="0 0 12 12">
          <path d="M2 6.2l2.6 2.6L10 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span>{label}</span>
    </AriaCheckbox>
  )
}
