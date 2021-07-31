import '/kernel/system.js'

const DOMMain = document.body.getElementsByTagName("main")[0]

class App {
    constructor(path) {
        this.path = path
        this.id = App.makeHash()
        this.iframe = document.createElement("iframe")
        this.iframe.id = this.id
        this.iframe.width = innerWidth
        this.iframe.height = innerHeight
        console.debug(`launched app from ${this.path} with id ${this.id}`)

        if(this.path.endsWith('.js')) {
            // js bootstrap app
        } else if(!this.path.endsWith('/')) {
            this.path += '/'
        }

        this.iframe.srcdoc = ""
        fetch('/kernel/system.html')
            .then(resp => resp.text())
            .then(text => {
                this.iframe.contentDocument.write(text)
                this.sendMessage({"appIndex": this.id})
                fetch(path + 'index.html')
                    .then(resp => resp.text())
                    .then(text => {
                        this.iframe.contentDocument.write(text)
                })
        })
        DOMMain.appendChild(this.iframe)
    }
    showWindow() {
        this.iframe.style = "width: 400px; height: 300px; display: block;"
    }
    sendMessage(msg) {
            this.iframe.contentWindow.postMessage({
                ...msg,
                from: "*ROOT"
            })
    }
    static makeHash() {
        const chars = '1234567890abcdefghijklmnopqrstuv'
        var arr = Array(16).fill(0)
            .map(() => chars[Math.floor(Math.random() * chars.length)])
            .join('')
        return arr
    }
}

var desktop = new App('/slash/desktop/', {"rights": ["$ALL$"]})
desktop.iframe.classList.add('desktop')
desktop.sendMessage({text: 'this is desktop'})
eval("window.desktop = desktop")