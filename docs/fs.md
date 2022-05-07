# filesystem

the FileSystem allows for arbitary mounting of drives, similar to linux devices. it is accessible through `handle.fs`. just mount a drive with a read and write method. i.e. to interface with `localStorage`:

```js
const storageFS = {
    "read": async (path) =>
        JSON.parse(localStorage.files)[path],
    "write": async (path, content) => {
        let localFiles = JSON.parse(localStorage.files)
        localFiles[path] = content
        localStorage.files = JSON.stringify(localFiles)
    },
    "append": async (path, content) =>
        storageFS.write(path, await storageFS.read(path) + content)
}

manager.fs.mount("storage", storageFS)
```
now you can use the drive
```js
fs.write("storage::example", "hello, world!")
// close the tab, reload, etc...
await fs.read("storage::example")
// hello, world!
```