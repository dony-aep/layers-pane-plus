import { useEffect, useState, useCallback } from 'react'
import { useHost } from './useHost'
import { mergeSettings } from '../lib/settings'

/**
 * Loads a set of AE settings (key -> default) on mount, in a single host call, and persists
 * changes immediately to the ExtendScript host. Values are kept as strings.
 */
export function useSettings<T extends Record<string, string>>(defaults: T) {
  const host = useHost()
  const [values, setValues] = useState<T>(defaults)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    host.getSettings(Object.keys(defaults)).then((reply) => {
      if (cancelled) return
      setValues(mergeSettings(defaults, reply))
      setReady(true)
    })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [host])

  const set = useCallback(
    (key: keyof T, value: string) => {
      setValues((v) => ({ ...v, [key]: value }))
      host.saveSetting(key as string, value)
    },
    [host],
  )

  return { values, set, ready }
}
