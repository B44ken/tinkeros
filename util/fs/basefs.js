export const storageFS = {
    "read": (path) => {
        return JSON.parse(localStorage.files)[path]
    },
    "write": (path, content) => {
        let localFiles = JSON.parse(localStorage.files)
        localFiles[path] = content
        localStorage.files = JSON.stringify(localFiles)
    },
    "append": (path, content) => {
        let localFiles = JSON.parse(localStorage.files)
        localFiles[path] += content
        localStorage.files = JSON.stringify(localFiles)
    }
}

export const rawFS = { "read": text => text }

export const urlFS = { 
    "read": async (url) => {
        var f = await fetch(url)
        return await f.text()
    }
}