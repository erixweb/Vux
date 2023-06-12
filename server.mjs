import express from "express"
import { HTMLCompiler } from "./vux/HTMLCompiler.mjs";
import { ServerCompile } from "./vux/ServerCompiler.mjs";
import { JsCompile } from "./vux/JsCompiler.mjs";


express()
    .get("*", async (req, res) => {
        let URL
        URL = req.url === "/" ? URL = "index" : URL = req.url.replace("/", "")

        if (URL.endsWith(".js") || URL.endsWith(".css")) {
            let compileJs = new JsCompile()
            compileJs.compile(URL)


            res.end(compileJs.content)

            return
        }

        let HTMLCompile = new HTMLCompiler(), ServerCompiler = new ServerCompile()

        HTMLCompile.compile(URL+".jsx")
        HTMLCompile.content = HTMLCompile.content.replace("<>", "")
        HTMLCompile.content = HTMLCompile.content.replace("</>", "")

        ServerCompiler.compile(HTMLCompile.content, req, res)
        res.end(ServerCompiler.html)

    }).listen(8080)
