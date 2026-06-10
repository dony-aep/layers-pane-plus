import { useMemo } from 'react'
import { useApp } from '../context/AppContext'

/** Serialize an argument into a safe ExtendScript literal (prevents injection). */
const arg = (v: unknown): string => JSON.stringify(v)

export type MarkerTarget = 'layer' | 'comp'

/**
 * Typed wrapper around the ExtendScript host namespace.
 * UI components call these methods instead of building eval strings by hand.
 */
export function useHost() {
  const { evalScript } = useApp()

  return useMemo(() => {
    const call = (name: string, ...args: unknown[]) =>
      evalScript(`${name}(${args.map(arg).join(', ')})`)

    return {
      // Layer creation
      createTextLayer: (text = '') => call('createTextLayer', text),
      createSolidLayer: () => call('createSolidLayer'),
      createLight: () => call('createLight'),
      createCamera: () => call('createCamera'),
      createNullObject: () => call('createNullObject'),
      createShapeLayer: () => call('createShapeLayer'),
      createAdjustmentLayer: () => call('createAdjustmentLayer'),

      // Editing
      deleteLayer: () => call('deleteLayer'),
      duplicateLayer: (effects: boolean, expressions: boolean, copies: number) =>
        call('duplicateLayer', effects, expressions, copies),
      createLayerSequence: () => call('createLayerSequence'),
      splitLayersAtCurrentTime: () => call('splitLayersAtCurrentTime'),
      precomposeSelectedLayers: () => call('precomposeSelectedLayers'),
      addMarker: (target: MarkerTarget) => call('addMarker', target),
      removeAllMarkers: (target: MarkerTarget) => call('removeAllMarkers', target),
      getMarkers: (target: MarkerTarget) => call('getMarkers', target),
      moveMarker: (target: MarkerTarget, index: number, time: number, layerId: number | null = null) =>
        call('moveMarker', target, index, time, layerId),
      moveAllMarkers: (target: MarkerTarget, time: number, layerId: number | null = null) =>
        call('moveAllMarkers', target, time, layerId),
      createNewCompositionNative: () => call('createNewCompositionNative'),
      openCompSettings: () => call('openCompSettings'),
      openLayerSettings: () => call('openLayerSettings'),

      // Misc / settings
      getSetting: (key: string, fallback = '') => call('getSetting', key, fallback),
      saveSetting: (key: string, value: string | boolean | number) =>
        call('saveSetting', key, value),
    }
  }, [evalScript])
}
