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
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'app', 'assets', 'js', 'preloader.js'),
            nodeIntegration: true,
            contextIsolation: false,
        },
        backgroundColor: '#171614'

    });

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