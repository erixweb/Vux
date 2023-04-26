import {
  readdirSync,
  existsSync,
  readFileSync,
  writeFileSync,
} from "fs"

export class VuxCompile {
    status = null

    compile (file, req, res) {
        if (file.endsWith(".ico")) return
        const item = file
        let lineNumber = 0, compiled = "", serverArgs = "", serverMode = false, components = []
    
        if (!existsSync(`./src/pages/${item}.html`)) return null

        const getComponents = () => {
            let files = readdirSync("src/components/")


            files.forEach(item => {
                let inner = readFileSync(`./src/components/${item}`, {
                    flag: "r",
                    encoding: "utf-8",
                })

                components.push(`${item}: ${inner}`)
            })
        }

        getComponents()

        const content = readFileSync(`./src/pages/${item}.html`, {
            flag: "r",
            encoding: "utf-8",
        })
    
        for (let i = 0; i < content.split("\n").length; i++) {
            let line = content.split("\n")[i]

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
        }


        for (let i = 0; i < components.length; i++) {
            let splitted = components[i].split(":")

            compiled = compiled.replaceAll(`<${splitted[0].replace(".html", "")}>`, `${splitted[1]}`)
            compiled = compiled.replaceAll(`<${splitted[0].replace(".html", "")} />`, `${splitted[1]}`)
        }

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
