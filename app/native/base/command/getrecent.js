var topolr=require("topolr-util");
var config=require("./../../config/config");
var storage=require("./../storage");

module.exports={
    command:"getrecent",
    trigger:function(data,done){
        storage.get("history").then(function(data){
            done(data.data||[]);
        });
    }
};