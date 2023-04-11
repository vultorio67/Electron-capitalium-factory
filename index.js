const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const ejse                              = require('ejs-electron')
const keyevents = require('key-events') // Also at window.keyevents.

const { MSFT_OPCODE, MSFT_REPLY_TYPE, MSFT_ERROR, SHELL_OPCODE } = require('./src/js/ipcconstants')

var minecraftAuth = require("minecraft-auth")
let account = new minecraftAuth.CrackedAccount("vultorio");




const AZURE_CLIENT_ID = '1ce6e35a-126f-48fd-97fb-54d143ac6d45'
const REDIRECT_URI_PREFIX = 'https://login.microsoftonline.com/common/oauth2/nativeclient?'


app.disableHardwareAcceleration()


//////// fenêtre principale
function createWindow() {
    mainwindow = new BrowserWindow({
        title: "Capitalium Factory launcher",
        width: 980,
        height: 552,
        minWidth: 500,
        minHeight: 260,
        frame: false,
        icon: path.join(__dirname, 'images/capitalium-logo.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preloader.js'),
            nodeIntegration: true,
            contextIsolation: false,
        },
        backgroundColor: '#171614'

    });

    
    mainwindow.webContents.openDevTools()

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


// Microsoft Auth Login
let msftAuthWindow
let msftAuthSuccess
let msftAuthViewSuccess
let msftAuthViewOnClose
ipcMain.on(MSFT_OPCODE.OPEN_LOGIN, (ipcEvent, ...arguments_) => {
    msftAuthWindow = new BrowserWindow({
        title: 'Microsoft Login',
        backgroundColor: '#222222',
        width: 520,
        height: 600,
        frame: true,
        icon: getIcon('capitalium-logo'),
    })

    msftAuthWindow.on('closed', () => {
        msftAuthWindow = undefined
    })

    msftAuthWindow.on('close', () => {
        if(!msftAuthSuccess) {
            ipcEvent.reply(MSFT_OPCODE.REPLY_LOGIN, MSFT_REPLY_TYPE.ERROR, MSFT_ERROR.NOT_FINISHED, msftAuthViewOnClose)
        }
    })

    msftAuthWindow.webContents.on('did-navigate', (_, uri) => {
        if (uri.startsWith(REDIRECT_URI_PREFIX)) {
            let queries = uri.substring(REDIRECT_URI_PREFIX.length).split('#', 1).toString().split('&')
            let queryMap = {}

            queries.forEach(query => {
                const [name, value] = query.split('=')
                queryMap[name] = decodeURI(value)
            })

            console.log("::::::::::::::::::::::::::::")

            ipcEvent.reply(MSFT_OPCODE.REPLY_LOGIN, MSFT_REPLY_TYPE.SUCCESS, queryMap, msftAuthViewSuccess)


            msftAuthSuccess = true
            msftAuthWindow.close();
            msftAuthWindow = null
        }
    })

    msftAuthWindow.removeMenu()
    msftAuthWindow.loadURL(`https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize?prompt=select_account&client_id=${AZURE_CLIENT_ID}&response_type=code&scope=XboxLive.signin%20offline_access&redirect_uri=https://login.microsoftonline.com/common/oauth2/nativeclient?`)
})


app.whenReady().then(() => {
    createWindow()
  })

app.on('window-all-closed', () => {
    app.quit();
});


function getIcon(filename){
    let ext
    switch(process.platform) {
        case 'win32':
            ext = 'ico'
            break
        case 'darwin':
        case 'linux':
        default:
            ext = 'png'
            break
    }
    console.log(__dirname, 'images', `${filename}.${ext}`)

    return path.join(__dirname, 'images', `${filename}.${ext}`)
}


