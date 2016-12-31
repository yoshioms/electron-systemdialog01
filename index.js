const { app, BrowserWindow } = require('electron');
const ipc = require('electron').ipcMain
const dialog = require('electron').dialog

ipc.on('open-file-dialog', function(event) {
    dialog.showOpenDialog({
        properties: ['openFile', 'openDirectory']
    }, function(files) {
        if (files) event.sender.send('selected-directory', files)
    })
})

var mainWindows = null;

app.on('ready', function() {
    mainWindow = new BrowserWindow({ width: 400, height: 100 });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});