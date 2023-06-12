import {
    existsSync,
    readFileSync,
    writeFileSync,
    readdirSync
} from "node:fs"
import { readFile } from "node:fs/promises"

export class HTMLCompiler {
    status = null
    serverArgs = ""
    content = ""
    components = []

    compile(file) {
        if (!existsSync(`./src/pages/${file}`)) return null
        let read, compContent, line = ""

        // Write to dist
        read = readFileSync(`./src/pages/${file}`, {
            flag: "r",
            encoding: "utf-8",
        })

        for (let i = 0; i < read.length; i++) {
            line = read[i]

            this.content += line
        }

        if (this.content.startsWith("undefined")) {
            this.content = content.replace("undefined", "")
        }

        for (let i = 0; i < readdirSync("src/components").length; i++) {
            compContent = ""

            const item = readdirSync("src/components")[i]

            let inner = readFileSync(`./src/components/${item}`, {
                flag: "r",
                encoding: "utf-8",
            })

            for (let k = 0; k < inner.length; k++) {
                compContent = `${compContent}${inner[k]}`
            }
            this.components.push({
                name: item,
                content: compContent
            })
        }


        for (let i = 0; i < this.components.length; i++) {
            const name = this.components[i]["name"]
            const content = this.components[i]["content"]

            
            this.content = this.content.replaceAll(`<${name.replace(".jsx", "")}>`, `${content}`)
            this.content = this.content.replaceAll(`<${name.replace(".jsx", "")} />`, `${content}`)
        }

        writeFileSync(`dist/${file}`, this.content, (e) => {
            if (e) console.log(e)
        })

        return HTMLCompiler
    }
}

export default HTMLCompiler