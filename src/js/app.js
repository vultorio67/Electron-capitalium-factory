const keyevents = require('key-events') // Also at window.keyevents.


var key = window.keyevents(document) // Default target is `document.body`
key.on("keydown", function (e) {
    // Event contents are vkey values: https://www.npmjs.com/package/vkey
    if (getCurrentView() == VIEWS.welcome)
    {
        switchView(getCurrentView(), VIEWS.login_ask)
        console.log("chage")
    }
    
})

switchView("", VIEWS.welcome);

console.log(getCurrentView())