import {
  readdirSync,
  mkdirSync,
  existsSync,
  readFileSync,
  writeFileSync,
} from "fs"

export const VuxCompile = (file, req) => {
    if (file.endsWith(".ico")) return

    const item = file

    if (!existsSync(`./src/pages/${item}.html`)) return null

    const content = readFileSync(`./src/pages/${item}.html`, {
        flag: "r",
        encoding: "utf-8",
    })

    let lineNumber = 0

    let compiled = ""
    let serverArgs = ""
    let serverMode = false

    content.split("\n").forEach((line) => {
        if (line.trim().startsWith("<script is:server>"))
        return (serverMode = true)
        if (line.trim().startsWith("</script>") && serverMode)
        return (serverMode = false)

        if (serverMode) {
        line = line.replaceAll("Vux.headers", "req")
        serverArgs = `${serverArgs}${line}`
        }

        if (serverMode) return
        compiled = `${compiled}${line}`

        lineNumber++
    })

    writeFileSync(`dist/${item}.html`, compiled, (err) => {
        if (err) throw err

        console.log("Saved")
    })

    eval(serverArgs)
}

export default VuxCompile
