const http = require("http")
const fs = require("fs")

http.createServer((req, res) => {
    const mimeTypes = {
        "js": "text/javascript",
    }
    var url = req.url.replace('/', './')
    if(!req.url.includes('.')) url += "/index.html"
    const extension = req.url.split('.')[1]
    const thisMime = mimeTypes[extension]
    headers = {}
    if(thisMime) headers = { "Content-Type": thisMime }
    res.writeHead("200", headers)
    try {
        const file = fs.readFileSync(url)
        res.write(file)
    } catch(e) {
        res.write("404")
    }
    res.end()
}).listen(80)