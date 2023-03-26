const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

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
            contextIsolation: false
        },
        backgroundColor: '#171614'

    });

    mainwindow.loadURL(path.join(__dirname,"src/index.html")) 
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