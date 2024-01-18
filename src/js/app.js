const keyevents = require('key-events') // Also at window.keyevents.
const { ipcRenderer } = require('electron')

const authmanager = require("./js/util/authManager")
const datastorage = require('./js/util/dataStorage')
const command = require('./js/util/command')

const { AZURE_CLIENT_ID, MSFT_OPCODE, MSFT_REPLY_TYPE, MSFT_ERROR, SHELL_OPCODE } = require('./js/ipcconstants')

const ipc = ipcRenderer;

var minecraftAuth = require("minecraft-auth")
let account = new minecraftAuth.CrackedAccount("vultorio");


var key = window.keyevents(document) // Default target is `document.body`
key.on("keydown", function (e) {

    // Event contents are vkey values: https://www.npmjs.com/package/vkey
    if (getCurrentView() == VIEWS.welcome)
    {
        if(datastorage.getSelectedAccount() == null)
            {
                switchView(getCurrentView(), VIEWS.login_ask)
            }

        else {
            console.log(datastorage.getSelectedAccount())
            switchView(getCurrentView(), VIEWS.base)
        }
    }
    
})


switchView("", VIEWS.welcome);


// Bind reply for Microsoft Login.
ipcRenderer.on(MSFT_OPCODE.REPLY_LOGIN, (_, ...arguments_) => {

    console.log(arguments_[0])

    if (arguments_[0] == MSFT_REPLY_TYPE.ERROR)
    {
        alertOverlay("Error during the microsoft login please try again")
        switchView(getCurrentView(), VIEWS.welcome)
    }

    else if(arguments_[0] == MSFT_REPLY_TYPE.SUCCESS)
    {

        const queryMap = arguments_[1]
        const viewOnClose = arguments_[2]

        const authCode = queryMap['code']
        authmanager.addMicrosoftAccount(authCode).then(value => {
            switchView(getCurrentView(), VIEWS.base)
        })
    }
    
    }
)





  