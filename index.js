const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const ejse                              = require('ejs-electron')
const keyevents = require('key-events') // Also at window.keyevents.

const { AZURE_CLIENT_ID, MSFT_OPCODE, MSFT_REPLY_TYPE, MSFT_ERROR, SHELL_OPCODE } = require('./src/js/ipcconstants')


app.whenReady().then(() => createWindow());

let mainwindow


CLIENT_ID = "f2107422-b90b-46cf-9d04-3dd3da989b44"
SECRET = "I1G7Q~5IgcJGmIvT-jCzseZTZ2u6d8rJOf0cw"
REDIRECT_URL = "https://github.com/vultorio67/alpha67-downloader"



//////// fenêtre principale
function createWindow() {
    mainwindow = new BrowserWindow({
        title: "Capitalium Factory launcher",
        width: 980,
        height: 552,
        minWidth: 500,
        minHeight: 260,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'app', 'assets', 'js', 'preloader.js'),
            nodeIntegration: true,
            contextIsolation: false,
        },
        backgroundColor: '#171614'

    });

    //mainwindow.webContents.openDevTools()

    ipcMain.on("close-app", () => {
        mainwindow.close();
    })

    ipcMain.on("minimize-app", () => {
        mainwindow.minimize();
    })

    ipcMain.on("restore-app", () => {
        console.log("oui")
        if(mainwindow.isMaximized()){
            mainwindow.restore();
        } else {
            console.log("non")
            mainwindow.maximize();
        }
    })

    //ejse.data('bkid', Math.floor((Math.random() * fs.readdirSync(path.join(__dirname, 'app', 'assets', 'images', 'backgrounds')).length)))

    //win.loadURL(pathToFileURL(path.join(__dirname, 'app', 'app.ejs')).toString())


    //mainWindow.loadURL('file://' + __dirname + 'app.ejs')
    /*win.once('ready-to-show', () => {
        win.show()
    })*/

    ejse.data('username', 'Some Guy')


    mainwindow.loadURL(path.join(__dirname,"src/app.ejs")) 
    
}



////////// connexion microsoft

let msftAuthWindow
let msftAuthSuccess
let msftAuthViewSuccess
let msftAuthViewOnClose
ipcMain.on("open", (ipcEvent, ...arguments_) => {
    if (msftAuthWindow) {
        ipcEvent.reply(MSFT_OPCODE.REPLY_LOGIN, MSFT_REPLY_TYPE.ERROR, MSFT_ERROR.ALREADY_OPEN, msftAuthViewOnClose)
        return
    }
    msftAuthSuccess = false
    msftAuthViewSuccess = arguments_[0]
    msftAuthViewOnClose = arguments_[1]
    msftAuthWindow = new BrowserWindow({
        title: 'Microsoft Login',
        backgroundColor: '#222222',
        width: 520,
        height: 600,
        frame: true,
    })

    msftAuthWindow.on('closed', () => {
        msftAuthWindow = undefined
    })

    msftAuthWindow.on('close', () => {
        if(!msftAuthSuccess) {
            ipcEvent.reply(MSFT_OPCODE.REPLY_LOGIN, MSFT_REPLY_TYPE.ERROR, MSFT_ERROR.NOT_FINISHED, msftAuthViewOnClose)
            console.log(MSFT_OPCODE.REPLY_LOGIN, MSFT_REPLY_TYPE.SUCCESS, queryMap, msftAuthViewSuccess)

        }
    })

    msftAuthWindow.webContents.on('did-navigate', (_, uri) => {
        if (uri.startsWith(REDIRECT_URL)) {
            let queries = uri.substring(REDIRECT_URL.length).split('#', 1).toString().split('&')
            let queryMap = {}

            queries.forEach(query => {
                const [name, value] = query.split('=')
                queryMap[name] = decodeURI(value)
            })

            ipcEvent.reply(MSFT_OPCODE.REPLY_LOGIN, MSFT_REPLY_TYPE.SUCCESS, queryMap, msftAuthViewSuccess)
            console.log(MSFT_OPCODE.REPLY_LOGIN, MSFT_REPLY_TYPE.SUCCESS, queryMap, msftAuthViewSuccess)

            msftAuthSuccess = true
            msftAuthWindow.close()
            msftAuthWindow = null
        }
    })

    msftAuthWindow.removeMenu()
    msftAuthWindow.loadURL(`https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize?prompt=select_account&client_id=${CLIENT_ID}&response_type=code&scope=XboxLive.signin%20offline_access&redirect_uri=https://github.com/vultorio67/alpha67-downloader`)
})


app.on("activate", () =>{
    if(mainwindow == null)
    {
        createWindow();
    }
});

app.on('window-all-closed', () => {
    app.quit();
});


var keys = keyevents() 

keys.on("keydown", function(key, event) {
    console.log(key)   // A vkey value based on the key pressed.
    console.log(event) // The original event received.
})  