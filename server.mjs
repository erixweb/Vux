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
            res.writeHead(200, {'Content-Type': 'application/javascript'})
            let compileJs = new JsCompile()
            compileJs.compile(URL)


            res.end(compileJs.content)

            return
        }

        let HTMLCompile = new HTMLCompiler(), ServerCompiler = new ServerCompile()

        HTMLCompile.compile(URL+".html")
        HTMLCompile.content = HTMLCompile.content.replace("<>", "")
        HTMLCompile.content = HTMLCompile.content.replace("</>", "")

        ServerCompiler.compile(HTMLCompile.content, req, res)
        res.end(ServerCompiler.html)

    }).listen(8080)
