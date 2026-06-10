import { useEffect } from 'react'
import { Tabs, TabList, Tab, TabPanel, Button } from 'react-aria-components'
import { useApp } from './context/AppContext'
import { LayersTab } from './components/tabs/LayersTab'
import { EditTab } from './components/tabs/EditTab'
import { SettingsModal } from './components/ui/SettingsModal'
import styles from './App.module.css'

const TABS = [
  { id: 'layers', label: 'Layers', icon: 'layers', Panel: LayersTab },
  { id: 'edit', label: 'Edit', icon: 'edit', Panel: EditTab },
]

export function App() {
  const { setFlyoutMenu, addEventListener, removeEventListener, openURL } = useApp()

  useEffect(() => {
    const version = `v${__APP_VERSION__}`
    setFlyoutMenu(
      `<Menu>` +
        `<MenuItem Id="refreshPanel" Label="Refresh Layers Pane Plus ${version}" Enabled="true"/>` +
        `<MenuItem Id="separator" Label="---" Enabled="false"/>` +
        `<MenuItem Id="documentationLink" Label="Open Documentation" Enabled="true"/>` +
        `</Menu>`,
    )
    const handler = (event: CSEvent) => {
      const id = (event.data as unknown as { menuId: string }).menuId
      if (id === 'refreshPanel') location.reload()
      else if (id === 'documentationLink')
        openURL('https://toolsbydonyaep.vercel.app/extension/layers-pane-plus')
    }
    addEventListener('com.adobe.csxs.events.flyoutMenuClicked', handler)
    return () => removeEventListener('com.adobe.csxs.events.flyoutMenuClicked', handler)
  }, [setFlyoutMenu, addEventListener, removeEventListener, openURL])

  return (
    <div className={styles.app}>
      <Tabs className={styles.tabs} defaultSelectedKey="layers">
        <TabList className={styles.tabList} aria-label="Sections">
          {TABS.map((t) => (
            <Tab key={t.id} id={t.id} className={styles.tab}>
              <span className="material-symbols-outlined">{t.icon}</span>
              <span>{t.label}</span>
            </Tab>
          ))}
        </TabList>
        {TABS.map((t) => (
          <TabPanel key={t.id} id={t.id} className={styles.panel}>
            <t.Panel />
          </TabPanel>
        ))}
      </Tabs>

      <footer className={styles.footer}>
        <span className={styles.madeBy}>
          Made by{' '}
          <Button className={styles.link} onPress={() => openURL('https://donyaep.vercel.app/')}>
            dony.
          </Button>
        </span>
        <SettingsModal />
      </footer>
    </div>
  )
}
