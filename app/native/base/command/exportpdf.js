var topolr=require("topolr-util");
var config=require("./../../config/config");
var pdf = require('html-pdf');
module.exports={
    command:"exportpdf",
    trigger:function(data,done){
    	var tpath=topolr.cpath.getRelativePath(__dirname+"/","./../../"+config.template.github);
    	topolr.file(tpath).read().then(function(datas){
    		return src=topolr.template(datas).render({content:data.content});
    	}).then(function(content){
            var ps=topolr.promise();
    		pdf.create(content,{
                "format": "Letter",
                "orientation": "portrait",
                "border": {
                    "top": "0.6in",
                    "bottom": "0.6in",
                    "left":"1in",
                    "right":"1in"
                }
            }).toFile(data.path,function(err, res){
                if(err){
                    ps.reject();
                }else{
                    ps.resolve();
                }
            });
            return ps;
    	}).done(function(){
            done(true);
        }).fail(function(){
            done(false);
        });
    }
};