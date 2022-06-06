import { ProcessManager } from '../util/manager.js'

const manager = new ProcessManager(document.body)

const apps = ["notes", "selfdestruct"]

for(var app of apps) {
    let link = document.createElement("button")
    link.textContent = app
    link.style = "display: block"
    link.addEventListener("click", el => {
        var text = el.composedPath()[0].textContent
        manager.Process("url::" + text)
    })
    document.body.appendChild(link)
}