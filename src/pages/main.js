import { createState, useEffect } from "/modules/zastate.js"

const clicks = createState(0)

useEffect(() => {
  console.log("Clicks have changed")  
}, clicks)

document.querySelector("button").addEventListener("click", () => {
    clicks.value += 1
})