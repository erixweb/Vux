import {
  readdirSync,
  mkdirSync,
  existsSync,
  readFileSync,
  writeFileSync,
} from "fs"

export class VuxCompile {
    status = null

    compile (file, req, res) {
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
                if (line.includes("Vux.redirect")) {
                    const toRedirect = line.split('"')[1]
                    line = line.replaceAll("Vux.redirect", `res.writeHead(302, {'Location': '${toRedirect}'}); res.end`)
    
                    this.status = `res.writeHead(302, {'Location': '${toRedirect}'}); res.end`
                }
    
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
        
        this.status = `res.writeHead(200, {'Content-Type': 'text/html'});`
    
        eval(serverArgs)
        
        return VuxCompile
    }
}

export default VuxCompile
