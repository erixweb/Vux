import { createState, useEffect } from "/modules/zastate.js"

const clicks = createState(0)

useEffect(() => {
  document.querySelector("#total").innerHTML = clicks.value
}, clicks)

document.querySelector("button").addEventListener("click", () => {
    clicks.value += 1
})