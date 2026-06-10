import { useEffect, useState } from 'react'
import {
  Button, DialogTrigger, Modal, ModalOverlay, Dialog, Heading, TooltipTrigger, Tooltip,
} from 'react-aria-components'
import { useHost, type MarkerTarget } from '../../hooks/useHost'
import styles from './MarkersTool.module.css'

interface Marker { index: number; time: number; comment: string; commentError?: boolean }

const pad = (n: number, l = 2) => String(n).padStart(l, '0')

function MarkersModal({ target, close }: { target: MarkerTarget; close: () => void }) {
  const host = useHost()
  const [markers, setMarkers] = useState<Marker[]>([])
  const [error, setError] = useState<string | null>(null)
  const [fps, setFps] = useState(30)
  const [duration, setDuration] = useState(0)
  const [groupFrame, setGroupFrame] = useState('0')
  const [layerId, setLayerId] = useState<number | null>(null)
  const [layerName, setLayerName] = useState('')

  const fpsR = Math.max(1, Math.round(fps))
  const frameOf = (t: number) => Math.round(t * fps)
  const timeOf = (f: string | number) => (Number(f) || 0) / fps
  const clampTime = (t: number) => Math.max(0, Math.min(t, duration))
  const tc = (t: number) => {
    const total = Math.round(t * fps)
    return `${pad(Math.floor(total / (fpsR * 3600)))}:${pad(Math.floor(total / (fpsR * 60)) % 60)}:${pad(Math.floor(total / fpsR) % 60)}:${pad(total % fpsR)}`
  }

  const detect = async () => {
    const json = await host.getMarkers(target)
    try {
      const d = JSON.parse(json)
      setError(d.error || null)
      setFps(d.frameRate || 30)
      setDuration(d.duration || 0)
      setMarkers(d.markers || [])
      setLayerId(typeof d.layerId === 'number' ? d.layerId : null)
      setLayerName(d.layerName || '')
    } catch {
      setError('parse')
      setMarkers([])
    }
  }

  useEffect(() => { detect() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const setFrame = (i: number, v: string) =>
    setMarkers((m) => m.map((x, idx) => (idx === i ? { ...x, time: timeOf(v) } : x)))
  const moveOne = async (m: Marker) => { await host.moveMarker(target, m.index, clampTime(m.time), layerId); detect() }
  const moveAll = async () => { await host.moveAllMarkers(target, clampTime(timeOf(groupFrame)), layerId); detect() }

  const targetLabel =
    target === 'comp' ? 'Composition' : layerName ? `Layer · ${layerName}` : 'Selected layer'
  const errorMsg =
    error === 'no-comp'
      ? 'No active composition. Open or create one to read its markers.'
      : error === 'no-layer'
        ? 'No layer selected. Select a layer to read its markers.'
        : error === 'multi-layer'
          ? 'Multiple layers selected. Select only one layer to manage its markers.'
          : error
            ? 'Could not read markers.'
            : ''

  return (
    <>
      <div className={styles.header}>
        <Heading slot="title" className={styles.title}>Markers · {targetLabel}</Heading>
        <TooltipTrigger delay={400}>
          <Button className={styles.iconBtn} onPress={close} aria-label="Close markers manager">
            <span className="material-symbols-outlined">close</span>
          </Button>
          <Tooltip className={styles.tooltip}>Close</Tooltip>
        </TooltipTrigger>
      </div>
      {!error && <p className={styles.info}>{fps} fps · {tc(duration)} · {markers.length} marker(s)</p>}

      {error ? (
        <p className={styles.empty}>{errorMsg}</p>
      ) : markers.length === 0 ? (
        <p className={styles.empty}>No markers found in the {target === 'comp' ? 'composition' : 'layer'}.</p>
      ) : (
        <>
          <div className={styles.groupRow}>
            <span className={styles.groupLabel}>Move all markers</span>
            <input className={styles.frameInput} type="number" step="1" value={groupFrame}
              onChange={(e) => setGroupFrame(e.target.value)} aria-label="Target frame for all markers" />
            <TooltipTrigger delay={400}>
              <Button className={styles.iconBtn} onPress={moveAll} aria-label="Move all markers">
                <span className="material-symbols-outlined">moving</span>
              </Button>
              <Tooltip className={styles.tooltip}>Shift all markers together to start at this frame, keeping their spacing</Tooltip>
            </TooltipTrigger>
          </div>

          <div className={styles.colhead}>
            <span className={styles.colTime}>Timecode (h:m:s:frame)</span>
            <span className={styles.colFrame}>Frame</span>
          </div>

          <div className={styles.list}>
            {markers.map((m, i) => (
              <div key={m.index} className={styles.row}>
                <span className={styles.tc}>{tc(m.time)}</span>
                {m.commentError && (
                  <span className={styles.warn} title="This marker's comment couldn't be read." aria-label="Comment read error">!</span>
                )}
                <input className={styles.frameInput} type="number" step="1" value={frameOf(m.time)}
                  onChange={(e) => setFrame(i, e.target.value)} aria-label={`Frame for marker ${m.index}`} />
                <TooltipTrigger delay={400}>
                  <Button className={styles.iconBtn} onPress={() => moveOne(m)} aria-label={`Move marker ${m.index}`}>
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </Button>
                  <Tooltip className={styles.tooltip}>Move this marker to the entered frame</Tooltip>
                </TooltipTrigger>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  )
}

export function MarkersTool({ target }: { target: MarkerTarget }) {
  return (
    <DialogTrigger>
      <Button className={styles.detectBtn}>
        <span className="material-symbols-outlined">search</span>Detect markers
      </Button>
      <ModalOverlay className={styles.overlay} isDismissable>
        <Modal className={styles.modal}>
          <Dialog className={styles.dialog}>{({ close }) => <MarkersModal target={target} close={close} />}</Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  )
}
