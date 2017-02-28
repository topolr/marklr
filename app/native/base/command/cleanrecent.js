var topolr=require("topolr-util");
var storage=require("./../storage");

module.exports={
    command:"cleanrecent",
    trigger:function(path,done){
        storage.set("history",{data:[]}).then(function(){
            done();
        });
    }
};