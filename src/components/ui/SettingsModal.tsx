import { useEffect, useState } from 'react'
import {
  Button, Dialog, DialogTrigger, Modal, ModalOverlay, Heading,
  Tabs, TabList, Tab, TabPanel,
} from 'react-aria-components'
import { Checkbox } from './Checkbox'
import { useApp } from '../../context/AppContext'
import { useSettings } from '../../hooks/useSettings'
import styles from './SettingsModal.module.css'
import controls from './controls.module.css'

const LINK = 'donyaep.vercel.app/'

function Content({ close }: { close: () => void }) {
  const { openURL } = useApp()
  const { values, set, ready } = useSettings({ autoParentLayers: 'false', matchNewLayerDuration: 'false' })
  const [autoParent, setAutoParent] = useState(false)
  const [matchDuration, setMatchDuration] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!ready) return
    setAutoParent(values.autoParentLayers === 'true')
    setMatchDuration(values.matchNewLayerDuration === 'true')
  }, [ready, values.autoParentLayers, values.matchNewLayerDuration])

  const save = () => {
    set('autoParentLayers', String(autoParent))
    set('matchNewLayerDuration', String(matchDuration))
    close()
  }

  const copy = () => {
    navigator.clipboard?.writeText(LINK)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Tabs>
      <div className={styles.header}>
        <Heading slot="title" className={styles.title}>General</Heading>
        <Button className={styles.close} onPress={close} aria-label="Close">
          <span className="material-symbols-outlined">close</span>
        </Button>
      </div>

      <TabList className={styles.modalTabs} aria-label="Settings sections">
        <Tab id="settings" className={styles.modalTab}>
          <span className="material-symbols-outlined">settings</span>Settings
        </Tab>
        <Tab id="help" className={styles.modalTab}>
          <span className="material-symbols-outlined">help</span>Help
        </Tab>
      </TabList>

      <TabPanel id="settings" className={styles.body}>
        <h3 className={styles.sectionTitle}>Layer Creation Options</h3>
        <Checkbox label="Auto Parent Layers" isSelected={autoParent} onChange={setAutoParent} />
        <Checkbox label="Match Layer Duration" isSelected={matchDuration} onChange={setMatchDuration} />
        <p className={styles.note}>
          Works with all layer types (Text, Shape, Null, Adjustment, Solid, Light, Camera).
        </p>
        <div className={styles.footer}>
          <span className={styles.version}>v{__APP_VERSION__}</span>
          <div className={styles.footerBtns}>
            <Button className={styles.saveBtn} onPress={save}>Save</Button>
            <Button className={styles.cancelBtn} onPress={close}>Cancel</Button>
          </div>
        </div>
      </TabPanel>

      <TabPanel id="help" className={styles.body}>
        <h3 className={styles.sectionTitle}>Layers Pane Plus</h3>
        <p className={styles.helpText}>
          A toolkit to streamline your layer management workflow in After Effects.
        </p>
        <p className={styles.helpText}>For support and updates, visit:</p>
        <div className={styles.linkRow}>
          <input className={controls.input} value={LINK} readOnly aria-label="Website" />
          <Button className={styles.miniBtn} onPress={copy}>{copied ? 'Copied' : 'Copy'}</Button>
          <Button className={styles.miniBtn} onPress={() => openURL(`https://${LINK}`)}>Open</Button>
        </div>
      </TabPanel>
    </Tabs>
  )
}

export function SettingsModal() {
  return (
    <DialogTrigger>
      <Button className={styles.gear} aria-label="Open settings">
        <span className="material-symbols-outlined">settings</span>
        <span>Settings</span>
      </Button>
      <ModalOverlay className={styles.overlay} isDismissable>
        <Modal className={styles.modal}>
          <Dialog className={styles.dialog}>{({ close }) => <Content close={close} />}</Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  )
}
