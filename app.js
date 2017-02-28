var electron = require("electron");
var app = electron.app;
var browserWindow = electron.BrowserWindow;
var ipc = require('electron').ipcMain;
var config=require("./package");
electron.canquit=false;
require("./app/native/base/commander");

var win = null;
var createWindow = function () {
    win = new browserWindow({
        width: 1000,
        height: 600,
        title:config.name,
        autoHideMenuBar:true,
        webPreferences:{
            webSecurity:false
        }
    });
    win.loadURL("file://" + __dirname + "/app.html");
    win.on('close', function(e){
        if(!electron.canquit){
            win.webContents.send("quit");
            e.preventDefault();
        }
    });
    win.on('closed', function(){
        win = null;
    });
};
app.on("ready", createWindow);
app.on("active", function () {
    if (win === null) {
        createWindow();
    }
});
app.on('window-all-closed', function (e) {
    app.quit();
});