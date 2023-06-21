export class ServerCompile {
    serverMode = false
    redirected = false
    html = ``

    compile(content, req, res) {
        let line, serverArgs = ""
        content = content.split("\n")
        let HTML = content
        if (content[0].startsWith("'use server'")) {
            content[0] = ""
            for (let i = 0; i < content.length; i++) {
                line = content[i]

                if (line.trim().startsWith("<script>") && !this.serverMode) {
                    this.serverMode = true
                    line = ""
                } else if (line.trim().startsWith("</script>") && this.serverMode) {
                    this.serverMode = false
                    line = ""
                }

                if (this.serverMode) {
                    line = line.replaceAll("Vux.headers", "req")

                    if (line.includes("Vux.redirect")) {
                        const toRedirect = line.split('"')[1]

                        line = line.replaceAll("Vux.redirect", `res.writeHead(302, {'Location': '${toRedirect}'});`)

                        this.redirected = true
                    }

                    serverArgs = `${serverArgs}${line}`
                } else {
                    this.html = `${this.html}${line}`
                }
            }
            if (!this.redirected) {
                serverArgs = `${serverArgs};res.writeHead(200, {'Content-Type': 'text/html'});`
            }
            eval(serverArgs)
        } else {
            for (let i = 0; i < content.length; i++) {
                line = content[i]

                this.html = `${this.html}${line}`
            }
        }
    }
}