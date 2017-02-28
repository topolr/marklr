var topolr=require("topolr-util");
var config=require("./../../config/config");
module.exports={
    command:"exporthtml",
    trigger:function(data,done){
    	var tpath=topolr.cpath.getRelativePath(__dirname+"/","./../../"+config.template.github);
    	topolr.file(tpath).read().then(function(datas){
    		return src=topolr.template(datas).render({content:data.content,name:data.name});
    	}).then(function(content){
    		return topolr.file(data.path).write(content);
    	}).done(function(){
    		done(true);
    	}).fail(function(){
    		done(false);
    	});
    }
};