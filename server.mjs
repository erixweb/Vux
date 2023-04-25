import { readFile } from "fs"
import express from "express"
import VuxCompile from "./compiler.mjs"

express()
  .get("*", async (req, res) => {
    let URL = req.url === "/" ? "index" : req.url
    new VuxCompile().compile(URL, req, res)

    res.writeHead(200, {
      "Content-Type": "text/html",
    });

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