var electron = require("electron");
var topolr=require("topolr-util");
var config=require("./../../../package");
var app=electron.app;
var basepath=app.getPath("userData")+"/"+config.name;

var storage={
	set:function(name,val){
		return topolr.file(basepath+"/"+name+".storage").write(JSON.stringify(val));
	},
	get:function(name){
		var ps=topolr.promise();
		topolr.file(basepath+"/"+name+".storage").read().then(function(content){
			try{
				ps.resolve(JSON.parse(content)||{});
			}catch(e){
				ps.resolve({});
			}
		}).fail(function(e){
			ps.resolve({});
		});
		return ps;
	}
};

module.exports=storage;