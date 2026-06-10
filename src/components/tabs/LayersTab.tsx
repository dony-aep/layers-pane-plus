import { useRef, useState } from 'react'
import { ActionTile } from '../ui/ActionTile'
import { useHost } from '../../hooks/useHost'
import styles from './tabs.module.css'
import controls from '../ui/controls.module.css'

export function LayersTab() {
  const host = useHost()
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className={styles.group}>
      <ActionTile
        icon="path_to_text_icon.png"
        label="Text"
        onPress={() => {
          host.createTextLayer(text)
          setText('')
        }}
        expandable
        expanded={open}
        onToggle={() => setOpen((o) => !o)}
      >
        <div className={controls.inputWrap}>
          <input
            ref={inputRef}
            className={controls.input}
            type="text"
            value={text}
            placeholder="Custom text…"
            aria-label="Custom text for new text layer"
            onChange={(e) => setText(e.target.value)}
          />
          {text.length > 0 && (
            <button
              type="button"
              className={controls.inputClear}
              aria-label="Clear text"
              onClick={() => {
                setText('')
                inputRef.current?.focus()
              }}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          )}
        </div>
      </ActionTile>
      <ActionTile icon="path_to_solid_icon.png" label="Solid" onPress={host.createSolidLayer} />
      <ActionTile icon="path_to_light_icon.png" label="Light" onPress={host.createLight} />
      <ActionTile icon="path_to_camera_icon.png" label="Camera" onPress={host.createCamera} />
      <ActionTile icon="path_to_null_icon.png" label="Null" onPress={host.createNullObject} />
      <ActionTile icon="path_to_shape_icon.png" label="Shape" onPress={host.createShapeLayer} />
      <ActionTile icon="path_to_adjustment_icon.png" label="Adjustment" onPress={host.createAdjustmentLayer} />
    </div>
  )
}
