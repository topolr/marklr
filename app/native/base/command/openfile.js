var electron = require("electron");
var dialog = electron.dialog;
var topolr=require("topolr-util");

module.exports={
    command:"openfile",
    trigger:function(data,done){
    	topolr.file(data).read().then(function(data){
    		done(data);
    	});
    }
};