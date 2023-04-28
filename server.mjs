import express from "express"
import { HTMLCompiler } from "./vux/HTMLCompiler.mjs";
import { ServerCompile } from "./vux/ServerCompiler.mjs";


express()
    .get("*", async (req, res) => {
        let URL
        URL = req.url === "/" ? URL = "index" : URL = req.url.replace("/", "")

        let HTMLCompile = new HTMLCompiler(), ServerCompiler = new ServerCompile()

        HTMLCompile.compile(URL+".html")

        ServerCompiler.compile(HTMLCompile.content, req, res)

        res.end(HTMLCompile.content)

    }).listen(8080)
