# tinkerOS handle tour

`<script>`
```js
// handle is a reference to an iframe's own Process 
// it's attached after page load, you might have to wait 1ms, e.g.
setTimeout(async () => {
    // sets the window title
    handle.setTitle("handle tour")

    // write to the filesystem
    // specifically, we want to write to the "hello" file of the "storage" drive
    // the storage drive is a proxy for the localStorage object
    await handle.fs.write("storage::hello", null, "hello, ")

    // or, identically, explicitly define a drive
    await handle.fs.append("hello", "storage", "world!")

    // hello, world!
    await handle.fs.read("storage::hello")

    // implement your own drive, like a random number generator
    // this could be a class too, as long as it implements read write and append
    handle.fs.mount("urandom", {
        "read": (path) => Math.random(),
        "write": (path, content) => null,
        "append": (path, content) => null
    })

    // create a new process - should display 0.234432411 or similar
    const fork = handle.Process("urandom::null")
    setTimeout(() => {
        // then close it
        fork.exit()
    }, 5000)

    // make a blob url if you want to
    const link = await handle.fs.makeBlob("urandom::null")
    document.write(`<a href=${link}>blob</a>`)

    // other drives:
    handle.fs.read("raw::<h1>raw echoes back its path</h1>")
    handle.fs.read("url::https://example.com")
}, 1)
```
`</script>`