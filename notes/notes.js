setTimeout(() => {
    handle.setTitle('notes')
}, 1)

const text = document.getElementById("text")
const file = document.getElementById("file")

const clickOnID = (id, func) => 
    document.getElementById(id).addEventListener("click", func)

clickOnID("read", async () => text.value = await handle.fs.read(file.value))
clickOnID("write", () => { handle.fs.write(file.value, null, text.value) })
clickOnID("run", () => handle.Process(file.value))