import express from "express"
import { HTMLCompiler } from "./vux/HTMLCompiler.mjs";
import { ServerCompile } from "./vux/ServerCompiler.mjs";
import { JsCompile } from "./vux/JsCompiler.mjs";
import { readFileSync } from "node:fs"


const app = express()
    .get("*", async (req, res) => {
        let URL
        URL = req.url === "/" ? URL = "index" : URL = req.url.replace("/", "")

        if (URL.endsWith(".js") || URL.endsWith(".css")) {
            let compileJs = new JsCompile()
            compileJs.compile(URL)


            res.end(compileJs.content)

            return
        } else if (URL.endsWith(".mjs")) {
            res.writeHead(200, {'Content-Type': 'aplication/javascript'})
            const file = `src/pages/${URL}`
            let content, line = ""
            let read = readFileSync(`${file}`, {
                flag: "r",
                encoding: "utf-8",
            })
    
            for (let i = 0; i < read.length; i++) {
                line = read[i]
    
                content += line
            }
            content = content.replace("undefined", "")
            res.end(content)

            return
        }

        let HTMLCompile = new HTMLCompiler(), ServerCompiler = new ServerCompile()

        HTMLCompile.compile(URL+".jsx")
        HTMLCompile.content = HTMLCompile.content.replace("<>", "")
        HTMLCompile.content = HTMLCompile.content.replace("</>", "")

        ServerCompiler.compile(HTMLCompile.content, req, res)
        res.end(ServerCompiler.html)

    }).listen(8080)
