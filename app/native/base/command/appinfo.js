var topolr=require("topolr-util");
var config=require("./../../../../package");

module.exports={
    command:"appinfo",
    trigger:function(data,done){
        done(config);
    }
};