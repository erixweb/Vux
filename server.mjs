import { createServer } from "http"
import { readFile } from "fs"
import VuxCompile from "./compiler.mjs"


createServer(async (req, res) => {
    let URL = req.url === "/" ? "index" : req.url
    VuxCompile(URL, req, res)


    readFile(`./dist/${URL}.html`, {
        flag: "r",
        encoding: "utf-8"
    }, (err, data) => {
        if (err) {
            res.writeHead(500)
            res.end("Internal Server Error")
            return
        }

        res.writeHead(VuxCompile(URL, req, res).stateCode())
        res.setHeader("Content-Type", "text/html")
        res.end(data)
    })
}).listen(8080)