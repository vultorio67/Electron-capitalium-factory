const keyevents = require('key-events') // Also at window.keyevents.
const { ipcRenderer } = require('electron')

const authmanager = require("./js/util/authManager")

const { AZURE_CLIENT_ID, MSFT_OPCODE, MSFT_REPLY_TYPE, MSFT_ERROR, SHELL_OPCODE } = require('./js/ipcconstants')

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



// Bind reply for Microsoft Login.
ipcRenderer.on(MSFT_OPCODE.REPLY_LOGIN, (_, ...arguments_) => {

    alert("salut")

    const authmanager = require("./js/util/authManager")

    
    const queryMap = arguments_[1]
    const viewOnClose = arguments_[2]


    const authCode = queryMap.code
    AuthManager.addMicrosoftAccount(authCode).then(value => {
        updateSelectedAccount(value)
        switchView(getCurrentView(), viewOnClose, 500, 500, () => {
            prepareSettings()
        })
    })
        .catch((displayableError) => {

            let actualDisplayableError
            if(isDisplayableError(displayableError)) {
                msftLoginLogger.error('Error while logging in.', displayableError)
                actualDisplayableError = displayableError
            } else {
                // Uh oh.
                msftLoginLogger.error('Unhandled error during login.', displayableError)
                actualDisplayableError = {
                    title: 'Unknown Error During Login',
                    desc: 'An unknown error has occurred. Please see the console for details.'
                }
            }
            /*

            switchView(getCurrentView(), viewOnClose, 500, 500, () => {
                setOverlayContent(actualDisplayableError.title, actualDisplayableError.desc, Lang.queryJS('login.tryAgain'))
                setOverlayHandler(() => {
                    toggleOverlay(false)
                })
                toggleOverlay(true)
            })*/
        })
    
    }
)





  