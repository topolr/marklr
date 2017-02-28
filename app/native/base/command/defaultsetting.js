var topolr=require("topolr-util");
var config=require("./../../config/config");

module.exports={
    command:"defaultsetting",
    trigger:function(data,done){
    	var e=topolr.extend(true,{},config);
        done(e);
    }
};