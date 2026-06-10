import { NumberField, Group, Input, Button } from 'react-aria-components'
import styles from './controls.module.css'

interface Props {
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

export function Counter({ label, value, onChange, min = 0, max = 100 }: Props) {
  return (
    <NumberField
      className={styles.counter}
      aria-label={label}
      value={value}
      minValue={min}
      maxValue={max}
      onChange={onChange}
    >
      <span className={styles.counterLabel}>{label}</span>
      <Group className={styles.stepper}>
        <Button slot="decrement" className={styles.stepBtn}>
          <span className="material-symbols-outlined">remove</span>
        </Button>
        <Input className={styles.stepInput} />
        <Button slot="increment" className={styles.stepBtn}>
          <span className="material-symbols-outlined">add</span>
        </Button>
      </Group>
    </NumberField>
  )
}
