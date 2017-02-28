/*
 * @packet service.clickservice;
 */
 Module({
 	name:"clickservice",
 	extend:"publicservice",
 	init:function(){
 		var ths=this;
        $("body").bind("mouseup",function(e){
            ths.trigger("click",e.target);
        });
        this.start();
 	}
 });