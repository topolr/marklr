var electron = require("electron");
var dialog = electron.dialog;
var topolr=require("topolr-util");

module.exports={
    command:"savefile",
    trigger:function(data,done){
    	var ops=topolr.extend(true,{
    		title:"open file",
    		defaultPath:"",
    		buttonLabel:"",
    		filters:[
    			{name:"markdown",extensions:["md"]}
    		]
    	},data);
    	dialog.showSaveDialog(ops,function(path){
	    	if(path){
		        done(path);
		    }else{
		    	done("");
		    }
	    })
    }
};