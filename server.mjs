import { createServer } from "http"
import { readFile } from "fs"
import VuxCompile from "./compiler.mjs"


createServer(async (req, res) => {
    let URL = req.url === "/" ? "index" : req.url
    let compiledContent = new VuxCompile().compile(URL, req, res)
    
    res.writeHead(200, {
        "Content-Type": "text/html"
    })


    readFile(`./dist/${URL}.html`, {
        flag: "r",
        encoding: "utf-8"
    }, (err, data) => {
        if (err) {
            res.writeHead(500)
            res.end("Internal Server Error")
            return
        }

        res.end(data)
    })
}).listen(8080)