import { describe, it, expect } from 'vitest'
import { mergeSettings } from './settings'

const defaults = { reverseSequence: 'false', trimDirection: 'left', additionalFrames: '0' }

describe('mergeSettings', () => {
  it('uses the stored values the host returns', () => {
    const reply = '{"reverseSequence":"true","trimDirection":"right"}'
    expect(mergeSettings(defaults, reply)).toEqual({
      reverseSequence: 'true',
      trimDirection: 'right',
      additionalFrames: '0',
    })
  })

  it('keeps the default for an empty stored value', () => {
    expect(mergeSettings(defaults, '{"additionalFrames":""}').additionalFrames).toBe('0')
  })

  it('keeps every default when the reply is empty or not JSON', () => {
    expect(mergeSettings(defaults, '')).toEqual(defaults)
    expect(mergeSettings(defaults, 'EvalScript error.')).toEqual(defaults)
    expect(mergeSettings(defaults, 'null')).toEqual(defaults)
  })

  it('ignores keys it did not ask for and values that are not strings', () => {
    const merged = mergeSettings(defaults, '{"other":"x","reverseSequence":true}')
    expect(merged).toEqual(defaults)
  })

  it('reads escaped quotes and backslashes written by the host', () => {
    const merged = mergeSettings({ name: '' }, '{"name":"a\\"b\\\\c"}')
    expect(merged.name).toBe('a"b\\c')
  })
})
