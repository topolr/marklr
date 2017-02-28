var packager = require('electron-packager');
var config=require("./config");
var topolr=require("topolr-util");
packager(topolr.extend({
    'platform': 'win32',//linux, win32, darwin, mas, all
},config), function done_callback (err, appPaths) {
	if(err){
		console.log(err);
	}else{
		console.log(appPaths);
	}
});
