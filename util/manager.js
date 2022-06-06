import { FileSystem } from "./fs/system.js"
import { MovementManager } from "./moveable.js"

export class ProcessManager {
    constructor(el) {
        this.root = el
        this.fs = new FileSystem()
        this.movement = new MovementManager(this.root)
    }

    makeWindow(process) {
        process.makeWindow()
        this.root.appendChild(process.window)
        process.fs = this.fs
    }
    setFullscreen(desktop, value) {
        if(value) desktop.window.classList.add('fullscreen')
        else desktop.window.classList.remove('fullscreen')
    }

    Process(file) {
        const proc = new Process()
        proc.window = document.createElement('div')
        this.root.appendChild(proc.window)
        this.movement.bindMoveable(proc.window) 
        proc.window.classList.add('process')
        proc.fs = this.fs
        proc.Process = this.Process
        proc.root = this.root
        proc.movement = this.movement
        proc.loadFrame().then(async () => {
            proc.frame.onload = () =>
                proc.frame.contentWindow.handle = proc
            proc.frame.srcdoc = await this.fs.read(file)
        })
        return proc
    }
}

export class Process {
    async loadFrame(container="./util/windowbase.html") {
        var windowBase = await fetch(container)
        windowBase = await windowBase.text()
        this.window.innerHTML = windowBase

        return new Promise((resolve, reject) => {
            var interval = setInterval(() => {
                this.frame = this.window.querySelector("iframe")
                if(this.frame != null) {
                    clearInterval(interval)
                    resolve()
                }
            }, 1)
        })
    }
    setRibbon(visible) {
        if(visible) this.window.id = ''
        else this.window.id = 'no-ribbon'
    }
    setTitle(title) {
        this.window.querySelector('.title').innerText = title
    }
    exit() {
        this.window.remove()
    }
}