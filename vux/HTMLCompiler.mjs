import {
    readdirSync,
    existsSync,
    readFileSync,
    writeFileSync,
} from "fs"

export class HTMLCompiler {
    status = null
    serverArgs = ""
    content = ""

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
            content = content.replace("undefined", "")
        }


        writeFileSync(`dist/${file}`, this.content, (e) => {
            if (e) throw new e
        })

        return HTMLCompiler
    }
}

export default HTMLCompiler