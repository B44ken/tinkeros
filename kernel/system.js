function readSystem(event) {
    const detail = event.detail
    if(detail.command == 'start') {
        const app = new App(detail.appDir, desktop.iframe.contentDocument.body)
        return app
    } else if(detail.command == "get") {
        return processes[detail.id] || null
    } else if(detail.command == "kill") {
        // kill a process given its id
    }
}
window.document.addEventListener('system', readSystem, false)