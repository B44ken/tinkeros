import { ProcessManager } from './util/manager.js'

const manager = new ProcessManager(document.body)
const env = localStorage.desktopEnvironment || 'apps/desktop'
const desktop = manager.Process('url::' + env)
desktop.setRibbon(false)
manager.setFullscreen(desktop, true)