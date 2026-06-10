import { useState, type ReactNode } from 'react'
import { Button } from 'react-aria-components'
import { ActionTile } from '../ui/ActionTile'
import { Checkbox } from '../ui/Checkbox'
import { Counter } from '../ui/Counter'
import { RadioRow } from '../ui/RadioRow'
import { MarkersTool } from '../ui/MarkersTool'
import { useHost, type MarkerTarget } from '../../hooks/useHost'
import { useSettings } from '../../hooks/useSettings'
import styles from './tabs.module.css'

export function EditTab() {
  const host = useHost()
  const [open, setOpen] = useState<string | null>(null)
  const [dup, setDup] = useState({ effects: true, expressions: true, copies: 1 })
  const [target, setTarget] = useState<MarkerTarget>('comp')

  const { values, set } = useSettings({
    showDeleteConfirmation: 'true',
    reverseSequence: 'false',
    deleteSplitPart: 'false',
    trimDirection: 'left',
    additionalFrames: '0',
  })

  const toggle = (id: string) => setOpen((o) => (o === id ? null : id))
  const bool = (k: keyof typeof values) => values[k] === 'true'

  const actions: { id: string; icon: string; label: string; onPress: () => void; options?: ReactNode }[] = [
    {
      id: 'delete', icon: 'path_to_delete_icon.png', label: 'Delete', onPress: () => host.deleteLayer(),
      options: (
        <Checkbox label="Show confirmation" isSelected={bool('showDeleteConfirmation')}
          onChange={(v) => set('showDeleteConfirmation', String(v))} />
      ),
    },
    {
      id: 'duplicate', icon: 'path_to_duplicate_icon.png', label: 'Duplicate',
      onPress: () => host.duplicateLayer(dup.effects, dup.expressions, dup.copies),
      options: (
        <>
          <Checkbox label="Include Effects" isSelected={dup.effects} onChange={(v) => setDup((d) => ({ ...d, effects: v }))} />
          <Checkbox label="Include Expressions" isSelected={dup.expressions} onChange={(v) => setDup((d) => ({ ...d, expressions: v }))} />
          <Counter label="Copies" value={dup.copies} min={1} max={100} onChange={(v) => setDup((d) => ({ ...d, copies: v }))} />
        </>
      ),
    },
    {
      id: 'sequence', icon: 'path_to_sequence_icon.png', label: 'Sequence', onPress: () => host.createLayerSequence(),
      options: (
        <Checkbox label="Reverse order" isSelected={bool('reverseSequence')} onChange={(v) => set('reverseSequence', String(v))} />
      ),
    },
    {
      id: 'split', icon: 'path_to_split_icon.png', label: 'Split', onPress: () => host.splitLayersAtCurrentTime(),
      options: (
        <>
          <Checkbox label="Auto delete split" isSelected={bool('deleteSplitPart')} onChange={(v) => set('deleteSplitPart', String(v))} />
          {bool('deleteSplitPart') && (
            <>
              <RadioRow label="Trim" value={values.trimDirection} onChange={(v) => set('trimDirection', v)}
                options={[{ value: 'left', label: 'Left' }, { value: 'right', label: 'Right' }]} />
              <Counter label="Frames" value={Number(values.additionalFrames) || 0} min={0} max={100}
                onChange={(v) => set('additionalFrames', String(v))} />
            </>
          )}
        </>
      ),
    },
    { id: 'precompose', icon: 'path_to_precompose_icon.png', label: 'Precompose', onPress: () => host.precomposeSelectedLayers() },
    {
      id: 'markers', icon: 'path_to_markers_icon.png', label: 'Markers', onPress: () => host.addMarker(target),
      options: (
        <>
          <RadioRow label="Target" value={target} onChange={(v) => setTarget(v as MarkerTarget)}
            options={[{ value: 'comp', label: 'Comp' }, { value: 'layer', label: 'Layer' }]} />
          <Button className={styles.drawerBtn} onPress={() => host.removeAllMarkers(target)}>
            <span className="material-symbols-outlined">delete</span>Remove all
          </Button>
          <MarkersTool target={target} />
        </>
      ),
    },
    { id: 'newcomp', icon: 'path_to_create_comp_icon.png', label: 'New Comp', onPress: () => host.createNewCompositionNative() },
    { id: 'compsettings', icon: 'path_to_comp_settings_icon.png', label: 'Comp Settings', onPress: () => host.openCompSettings() },
    { id: 'layersettings', icon: 'path_to_layer_settings_icon.png', label: 'Layer Settings', onPress: () => host.openLayerSettings() },
  ]

  return (
    <div className={styles.group}>
      {actions.map((a) => (
        <ActionTile
          key={a.id}
          icon={a.icon}
          label={a.label}
          onPress={a.onPress}
          expandable={!!a.options}
          expanded={open === a.id}
          onToggle={a.options ? () => toggle(a.id) : undefined}
        >
          {a.options}
        </ActionTile>
      ))}
    </div>
  )
}
