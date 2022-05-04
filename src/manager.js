export class ProcessManager {
    makeWindow(process) {
        document.body.appendChild(process.window)
    }
    setFullscreen(desktop, origin = document.body) {
        this.makeWindow(desktop)
        desktop.window.classList.add('fullscreen')
    }
}

export class Process {
    constructor() {
        this.initWindow()
        this.window.classList.add('process')
    }
    initWindow() {
        this.window = document.createElement('iframe')
        const windowBase = fetch('util/windowbase.html')
            .then(r => r.text())
            .then(r => this.window.srcdoc = r)
    }
    async windowLoaded(resolve) {
        return new Promise((resolve) => {
            setInterval(() => {
                this.frame = this.window.contentWindow.document.querySelector('iframe')
                if(this.frame != null) resolve(this.frame)
                else console.log(this.frame)
            }, 2)
        })
    }

    setRibbon(visible) {
        if(visible) this.frame.id = ''
        else this.frame.id = 'no-ribbon'
    }
    create() {}
    killSelf() {
        this.window.remove()
    }
    makeWindow() {
        this.manager.makeWindow(this)
    }
}

export class URLProcess extends Process {
    constructor(url) {
        super()
        this.windowLoaded().then(() => {
            console.log(this.frame)
            this.frame.src = url
        })
    }
}