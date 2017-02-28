var topolr=require("topolr-util");
var config=require("./../../config/config");
var storage=require("./../storage");

module.exports={
    command:"setrecent",
    trigger:function(path,done){
        storage.get("history").then(function(data){
            if(!data.data){
                data.data=[];
            }
            if(data.data.indexOf(path)===-1){
                data.data.unshift(path);
                if(data.data.length>8){
                    data.data.pop();
                }
            }
            return data;
        }).then(function(data){
            return storage.set("history",data);
        }).done(function(){
            done();
        });
    }
};