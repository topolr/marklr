/*
 * @packet keymap;
 */
 var keymap={
 	container:null,
 	init:function(container){
 		keymap.container=container;
 		keymap.container.dom.bind("keyup",function(e){
 			var t="";
 			if(e.ctrlKey){
 				t+="ctrl+";
 			}
 			if(e.shiftKey){
 				t+="shift+";
 			}
 			if(e.altKey){
 				t+="alt+";
 			}
			t+=e.key.toLowerCase();
			if(keymap.map[t]){
				keymap.map[t]();
			}
 		});
 	},
 	map:{
 		"ctrl+s":function(){
 			keymap.container.saveFile();
 		},
 		"ctrl+n":function(){
 			keymap.container.newFile();
 		},
 		"ctrl+shift+s":function(){
 			keymap.container.saveasFile();
 		},
 		"ctrl+w":function(){
 			keymap.container.closeFile();
 		},
 		"ctrl+shift+p":function(){
 			keymap.container.togglePreview();
 		}
 	}
 };

 module.exports=keymap;