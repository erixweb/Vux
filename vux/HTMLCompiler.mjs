import {
    existsSync,
    readFileSync,
    writeFileSync,
    readdirSync
} from "fs"

export class HTMLCompiler {
    status = null
    serverArgs = ""
    content = ""
    components = []

    compile(file) {
        if (!existsSync(`./src/pages/${file}`)) return null
        let read, line = ""

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
            const item = readdirSync("src/components")[i]

            let inner = readFileSync(`./src/components/${item}`, {
                flag: "r",
                encoding: "utf-8",
            })

            this.components.push(`${item}: ${inner}`)
        }

        for (let i = 0; i < this.components.length; i++) {
            let splitted = this.components[i].split(":")

            this.content = this.content.replaceAll(`<${splitted[0].replace(".html", "")}>`, `${splitted[1]}`)
            this.content = this.content.replaceAll(`<${splitted[0].replace(".html", "")} />`, `${splitted[1]}`)
        }

        writeFileSync(`dist/${file}`, this.content, (e) => {
            if (e) console.log(e)
        })

        return HTMLCompiler
    }
}

export default HTMLCompiler