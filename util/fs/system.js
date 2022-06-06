import { storageFS, rawFS, urlFS } from './basefs.js'

class IOError extends Error {
    constructor(message) {
        super(message)
        this.name = "IOError"
    }
}

export class FileSystem {
    constructor() {
        this.drives = {}
        this.mount("raw", rawFS)
        this.mount("storage", storageFS)
        this.mount("url", urlFS)
    }
    mount(name, drive) {
        if(this.drives[drive]) return new IOError("drive already mounted")
        this.drives[name] = drive
    }
    async io(path, driveName, content, method) {
        if(!driveName) [driveName, path] = path.split("::")
        var drive = this.drives[driveName]
        if(!drive) throw new IOError("drive not found")

        return new Promise(async (resolve, reject) => {
            if(drive[method]) await resolve(drive[method](path, content))
            else reject(new IOError("drive cannot perform metod"))
        })
    }
    async read(path, drive) {
        return this.io(path, drive, null, "read")
    }
    async write(path, drive, content) {
        return this.io(path, drive, content, "write")
    }
    async append(path, drive, content) {
        return this.io(path, drive, content, "append")
    }
    async list(path, drive) {
        return this.io(path, drive, null, "list")
    }
    async makeBlob(path, drive) {
        const content = await this.read(path, drive)
        const blob = new Blob([content])
        return URL.createObjectURL(blob)
    }
}