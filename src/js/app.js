const keyevents = require('key-events') // Also at window.keyevents.
const { ipcRenderer } = require('electron')

const ipc = ipcRenderer;

var key = window.keyevents(document) // Default target is `document.body`
key.on("keydown", function (e) {
    // Event contents are vkey values: https://www.npmjs.com/package/vkey
    if (getCurrentView() == VIEWS.welcome)
    {

        //console.log(ipc.sendSync("open"))

        switchView(getCurrentView(), VIEWS.login_ask)
        console.log("chage")
    }
    
})

$("welcome").hide()


switchView("", VIEWS.welcome);

console.log(getCurrentView())


  