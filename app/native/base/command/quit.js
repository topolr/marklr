var electron = require("electron");
var app = electron.app;

module.exports={
    command:"quit",
    trigger:function(data,done){
    	electron.canquit=true;
        app.quit();
    }
};