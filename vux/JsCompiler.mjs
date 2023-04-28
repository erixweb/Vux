import {
    readFileSync,
    existsSync
} from "fs"

export class JsCompile {
    content = ""

    compile (file) {
        if (!existsSync(`./src/pages/${file}`)) return null
        let line
        let read = readFileSync(`./src/pages/${file}`, {
            flag: "r",
            encoding: "utf-8",
        })

        for (let i = 0; i < read.length; i++) {
            line = read[i]

            this.content += line
        }

        return JsCompile
    }
}