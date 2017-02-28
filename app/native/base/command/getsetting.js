var topolr=require("topolr-util");
var storage=require("./../storage");
var config=require("./../../config/config");

module.exports={
    command:"getsetting",
    trigger:function(data,done){
        storage.get("setting").then(function(data){
        	var e=topolr.extend(true,{},config,data);
            done(e);
        });
    }
};