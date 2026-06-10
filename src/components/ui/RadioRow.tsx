import { RadioGroup, Radio } from 'react-aria-components'
import styles from './controls.module.css'

interface Props {
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
}

export function RadioRow({ label, value, onChange, options }: Props) {
  return (
    <RadioGroup
      className={styles.radioRow}
      aria-label={label}
      value={value}
      onChange={onChange}
      orientation="horizontal"
    >
      <span className={styles.radioLabel}>{label}</span>
      <div className={styles.radios}>
        {options.map((o) => (
          <Radio key={o.value} value={o.value} className={styles.radio}>
            {o.label}
          </Radio>
        ))}
      </div>
    </RadioGroup>
  )
}
