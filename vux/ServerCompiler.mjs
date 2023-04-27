export class ServerCompile {
    serverMode = false
    redirected = false

    compile (content, req, res) {
        let line, serverArgs = ""
        content = content.split("\n")

        for (let i = 0; i < content.length; i++) {
            line = content[i]

            if (line.startsWith("<script only:server>") && !this.serverMode) {
                this.serverMode = true
                line = ""
            } else if (line.startsWith("</script>") && this.serverMode) {
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
            }
        }
        if (!this.redirected) {
            serverArgs = `${serverArgs};res.writeHead(200, {'Content-Type': 'text/html'});`
        }
        eval(serverArgs)

    }
}