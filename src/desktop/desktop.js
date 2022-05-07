import { ProcessManager, URLProcess, StringProcess } from '/util/manager.js'

const manager = new ProcessManager(document.body)

const apps = ["notes", "selfdestruct"]

for(var app of apps) {
    let anchor = document.createElement("a")
    anchor.textContent = app
    anchor.style = "display: block"
    anchor.addEventListener("click", el => {
        var text = el.composedPath()[0].textContent
        manager.Process("url::/" + text)
    })
    document.body.appendChild(anchor)
}