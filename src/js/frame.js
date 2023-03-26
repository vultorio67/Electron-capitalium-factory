const { ipcRenderer } = require('electron')

const close    = document.getElementById('frameButton_close')
const restore    = document.getElementById('frameButton_restoredown')
const minimize    = document.getElementById('frameButton_minimize')

close.onclick = (e) => {
    ipcRenderer.send("close-app")
}

minimize.onclick = (e) => {
    ipcRenderer.send("minimize-app")
}

restore.onclick = (e) => {
    ipcRenderer.send("restore-app")
}