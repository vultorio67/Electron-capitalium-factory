const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const ejse                              = require('ejs-electron')

app.whenReady().then(() => createWindow());

let mainwindow


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


app.on("activate", () =>{
    if(mainwindow == null)
    {
        createWindow();
    }
});

app.on('window-all-closed', () => {
    app.quit();
});
