import HTMLCompiler from "./vux/HTMLCompiler.mjs";
import { ServerCompile } from "./vux/ServerCompilers.mjs";

let HTMLCompile = new HTMLCompiler()

HTMLCompile.compile("index.html", "E", "E")
new ServerCompile().compile(HTMLCompile.content, "e", "E")