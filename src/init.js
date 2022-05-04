import { ProcessManager, Process, URLProcess } from './manager.js';

export const manager = new ProcessManager()

const desktop = new URLProcess('desktop')
manager.setFullscreen(desktop)


;(async () => {
    await desktop.windowLoaded()
})()

// const example = new URLProcess('https://example.com')
// manager.makeWindow(example)