import { readFile } from "fs"
import express from "express"
import VuxCompile from "./vux/HTMLCompiler.mjs"

express()
  .get("*", async (req, res) => {
    let URL = req.url === "/" ? "index" : req.url
    new HTMLCompile().compile(URL, req, res)

    res.writeHead(200, {
      "Content-Type": "text/html",
    })

    if (URL.endsWith(".js")) {
      readFile(
        `./dist/${URL}`,
        {
          flag: "r",
          encoding: "utf-8",
        },
        (err, data) => {
          if (err) {
            res.writeHead(404)
            res.end("Not Found")
            return;
          }
  
          res.end(data)
        }
      )

      return
    }

    readFile(
      `./dist/${URL}.html`,
      {
        flag: "r",
        encoding: "utf-8",
      },
      (err, data) => {
        if (err) {
          res.writeHead(404)
          res.end("Not Found")
          return;
        }

        res.end(data)
      }
    )
  }).listen("8080")