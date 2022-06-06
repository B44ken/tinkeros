import { ProcessManager } from './util/manager.js'

const manager = new ProcessManager(document.body)
const env = localStorage.desktopEnvironment || 'desktop'
const desktop = manager.Process('url::' + env)
desktop.setRibbon(false)
manager.setFullscreen(desktop, true)