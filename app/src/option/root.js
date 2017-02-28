/*
 * @packet option.root;
 * @require main;
 * @require pipe;
 * @map (css)style.scrollbar;
 */
 Option({
 	name:"app",
 	option:{
 		override:{
 			onendinit:function(){
 				var ths=this;
 				if(topolr.browser.os.name!=="osx"){
 					module.getMapSource("@scrollbar");
 				}
 				this.addChild({
 					type:"@main.welcome"
 				});
 				require("@pipe").command("getsetting",null,function(a){
 					ths.addChild({
	 					type:"@main.container",
	 					option:{
	 						config:a
	 					}
	 				});
 				});
 			},
 			event_switcheditor:function(){
 				if(this.children.length>1){
 					this.getChildAt(0).close();
 				}
 			}
 		}
 	}
 });