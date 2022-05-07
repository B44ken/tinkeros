import { FileSystem } from "/util/fs/system.js"
import { MovementManager } from "/util/moveable.js"

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
        desktop.style = 'position: absolute; top: 0px; left: 0px'
        if(value) desktop.window.classList.add('fullscreen')
        else desktop.window.classList.remove('fullscreen')
    }

    URLProcess(url) {
        const proc = new URLProcess(url)
        return proc
    }

    Process(file) {
        const proc = new Process()
        proc.window = document.createElement('div')
        this.root.appendChild(proc.window)
        proc.window.classList.add('process')
        proc.passUp({
            "fs": this.fs,
            "root": this.root,
            "Process": this.Process
        })
        proc.loadFrame().then(async () => {
            proc.frame.onload = () =>
                proc.frame.contentWindow.handle = proc
                proc.frame.srcdoc = await this.fs.read(file)
            })
        if(this.movement)
            this.movement.bindMoveable(proc.window)
        return proc
    }
}

export class Process {
    async loadFrame() {
        var windowBase = await fetch('/util/windowbase.html')
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
    passUp(object) {
        for(var key of Object.keys(object))
        this[key] = object[key]
    }
    setRibbon(visible) {
        if(visible) this.window.id = ''
        else this.window.id = 'no-ribbon'
    }
    setTitle(title) {
        this.window.querySelector('span').innerText = title
    }
    destroyWindow(target) {
        // only works for this specific parent depth
        target.parentElement.parentElement.remove()
    }
}

export class URLProcess extends Process {
    constructor(url) {
        super()
        this.windowLoaded().then(() => this.frame.src = url )
    }
}

export class StringProcess extends Process {
    constructor(string) {
        super()
        this.windowLoaded().then(() => this.frame.contentDocument.write(string) )
    }
}
