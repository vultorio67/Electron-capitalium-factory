const keyevents = require('key-events') // Also at window.keyevents.
const { ipcRenderer } = require('electron')

const authmanager = require("./js/util/authManager")
const datastorage = require('./js/util/dataStorage')

const { AZURE_CLIENT_ID, MSFT_OPCODE, MSFT_REPLY_TYPE, MSFT_ERROR, SHELL_OPCODE } = require('./js/ipcconstants')

const ipc = ipcRenderer;

var minecraftAuth = require("minecraft-auth")
let account = new minecraftAuth.CrackedAccount("vultorio");


var key = window.keyevents(document) // Default target is `document.body`
key.on("keydown", function (e) {

    // Event contents are vkey values: https://www.npmjs.com/package/vkey
    if (getCurrentView() == VIEWS.welcome)
    {
        if(datastorage.getSelectedAccount() != null)
            {
                switchView(getCurrentView(), VIEWS.login_ask)
            }

        else {
            switchView(getCurrentView(), VIEWS.base)
        }
    }
    
})


switchView("", VIEWS.welcome);


// Bind reply for Microsoft Login.
ipcRenderer.on(MSFT_OPCODE.REPLY_LOGIN, (_, ...arguments_) => {


    
    const queryMap = arguments_[1]
    const viewOnClose = arguments_[2]


    const authCode = queryMap.code
    authmanager.addMicrosoftAccount(authCode).then(value => {
        switchView(getCurrentView(), VIEWS.base)
    })
    
    }
)





  