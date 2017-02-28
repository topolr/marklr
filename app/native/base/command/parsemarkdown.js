var marked = require('marked');
module.exports={
    command:"parsemarkdown",
    trigger:function(data,done){
        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false
        });
        marked(data, function (err, r) {
            if (err){
                done("");
            }else{
                done(r);
            }
        });
    }
};