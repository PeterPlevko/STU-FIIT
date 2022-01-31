const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');
const path = require('path');

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    mainWindow.loadFile('index.html');
    //mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });
});

ipcMain.on('read',(event,arg)=>{
    console.log('got read');
    fs.readFile('slovakia.txt',(err,data)=>{
        console.log('fs');
        if(err){    
            console.log(err);
        }
        else{
            console.log('sending data ' + data);
            event.sender.send('datar', data);
        }
        });

});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});
