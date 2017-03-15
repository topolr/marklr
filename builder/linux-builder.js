var packager = require('electron-packager');
var config=require("./config");
var topolr=require("topolr-util");
packager(topolr.extend(true, config,{
    asar: true,
    platform: 'linux'
}), function done_callback(err, appPaths) {
    if (err) {
        console.log(err);
    } else {
        console.log(appPaths);
    }
});