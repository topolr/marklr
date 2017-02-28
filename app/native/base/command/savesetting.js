var storage=require("./../storage");

module.exports={
    command:"savesetting",
    trigger:function(data,done){
        storage.set("setting",data).then(function(){
            done();
        });
    }
};