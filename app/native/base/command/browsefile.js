var electron = require("electron");
var dialog = electron.dialog;
var topolr=require("topolr-util");

module.exports={
    command:"browsefile",
    trigger:function(data,done){
    	var ops=topolr.extend(true,{
    		title:"open file",
    		defaultPath:"",
    		buttonLabel:"",
    		properties:[
	            'openFile',
	        ],
    		filters:[
    			{name:"markdown",extensions:["md"]}
    		]
    	},data);
    	dialog.showOpenDialog(ops,function(res){
	    	if(res){
		        done(res);
		    }else{
		    	done([]);
		    }
	    })
    }
};