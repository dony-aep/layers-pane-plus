import { useEffect, useState, useCallback } from 'react'
import { useHost } from './useHost'

/**
 * Loads a set of AE settings (key -> default) on mount and persists changes
 * immediately to the ExtendScript host. Values are kept as strings.
 */
export function useSettings<T extends Record<string, string>>(defaults: T) {
  const host = useHost()
  const [values, setValues] = useState<T>(defaults)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    const keys = Object.keys(defaults) as (keyof T)[]
    Promise.all(keys.map((k) => host.getSetting(k as string, defaults[k]))).then((results) => {
      if (cancelled) return
      const loaded = { ...defaults }
      keys.forEach((k, i) => {
        loaded[k] = (results[i] || defaults[k]) as T[keyof T]
      })
      setValues(loaded)
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
