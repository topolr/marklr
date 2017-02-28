/*
 * @packet tools;
 * @require ui;
 */
 var action={
 	head:function(editor,num){
 		var text=editor.session.getTextRange(editor.getSelectionRange());
		text=text.replace(/\r/g,"").replace(/\n/g,"");
		if(text){
			editor.session.replace(editor.selection.getRange(), "\n"+num+" "+text+"\n");
			var et=editor.selection.getCursor();
			et.row=et.row-1;
			et.column=text.length+num.length+2;
			editor.selection.moveTo(et.row,et.column);
		}else{
			editor.session.replace(editor.selection.getRange(), num+" "+text);
		}
 	}
 };
 var tools={
 	editor:null,
 	container:null,
 	btns:[
 		{name:"i",icon:"fa-format_list_numbered",action:function(){
 			var text=tools.editor.session.getTextRange(tools.editor.getSelectionRange());
 			text=text.replace(/-/g,"");
 			var a=text.split(/\r|\n/),b="";
 			for(var i=0;i<a.length;i++){
 				b+=" - "+a[i].trim()+"\n";
 			}
 			if(text){
 				if(a.length<=1){
 					b="\n - "+text+"\n - ";
 					tools.editor.session.replace(tools.editor.selection.getRange(), b);
	 				var et=tools.editor.selection.getCursor();
					et.column=b.length+4;
					tools.editor.selection.moveTo(et.row,et.column);
 				}else{
	 				tools.editor.session.replace(tools.editor.selection.getRange(), b);
	 				var et=tools.editor.selection.getCursor();
					et.row=et.row-1;
					et.column=b.length+4;
					tools.editor.selection.moveTo(et.row,et.column);
				}
 			}else{
	 			if(a.length<=1){
	 				b="\n - ";
	 			}
	 			tools.editor.session.replace(tools.editor.selection.getRange(), b);
	 		}
 			tools.editor.focus();
 		}},
 		{name:"i",icon:"fa-font_download",list:[
 			{name:"6",icon:"fa-looks_6",action:function(){
 				action.head(tools.editor,"######");
 			}},
 			{name:"5",icon:"fa-looks_5",action:function(){
 				action.head(tools.editor,"#####");
 			}},
 			{name:"4",icon:"fa-looks_4",action:function(){
 				action.head(tools.editor,"####");
 			}},
 			{name:"3",icon:"fa-looks_3",action:function(){
 				action.head(tools.editor,"###");
 			}},
 			{name:"2",icon:"fa-looks_two",action:function(){
 				action.head(tools.editor,"##");
 			}},
 			{name:"1",icon:"fa-looks_one",action:function(){
 				action.head(tools.editor,"#");
 			}}
 		]},
 		{name:"i",icon:"fa-format_bold",action:function(){
 			var text=tools.editor.session.getTextRange(tools.editor.getSelectionRange());
 			if(text){
	 			text=text.replace(/\*/g,"");
	 			tools.editor.session.replace(tools.editor.selection.getRange(), "**"+text+"**");
	 		}else{
	 			tools.editor.session.replace(tools.editor.selection.getRange(), "****");
	 			var et=tools.editor.selection.getCursor();
	 			et.column=et.column-2;
	 			tools.editor.selection.moveCursorToPosition(et);
	 		}
 		}},
 		{name:"i",icon:"fa-format_italic",action:function(){
 			var text=tools.editor.session.getTextRange(tools.editor.getSelectionRange());
 			if(text){
	 			text=text.replace(/\*/g,"");
	 			tools.editor.session.replace(tools.editor.selection.getRange(), "*"+text+"*");
	 		}else{
	 			tools.editor.session.replace(tools.editor.selection.getRange(), "**");
	 			var et=tools.editor.selection.getCursor();
	 			et.column=et.column-1;
	 			tools.editor.selection.moveCursorToPosition(et);
	 		}
 		}},
 		{name:"i",icon:"fa-code",action:function(){
 			var text=tools.editor.session.getTextRange(tools.editor.getSelectionRange());
 			if(text){
	 			text=text.replace(/\`/g,"");
	 			tools.editor.session.replace(tools.editor.selection.getRange(), "`"+text+"`");
	 		}else{
	 			tools.editor.session.replace(tools.editor.selection.getRange(), "```\n\n```");
	 			var et=tools.editor.selection.getCursor();
				et.row=et.row-1;
				et.column=4;
				tools.editor.selection.moveTo(et.row,et.column);
	 		}
 		}},
 		{name:"i",icon:"fa-format_quote",action:function(){
 			var text=tools.editor.session.getTextRange(tools.editor.getSelectionRange());
 			text=text.replace(/\>/g,"");
 			tools.editor.session.replace(tools.editor.selection.getRange(), "\n> "+text);
 			tools.editor.focus();
 		}},
 		{name:"i",icon:"fa-drag_handle",action:function(){
 			var text=tools.editor.session.getTextRange(tools.editor.getSelectionRange());
 			tools.editor.session.replace(tools.editor.selection.getRange(), "\n***\n"+text);
 			tools.editor.focus();
 		}},
 		{name:"",icon:"fa-link",action:function(){
 			tools.container.addChild({
 				type:"@ui.getlink",
 				option:{
	 				fn:function(a){
	 					var editor=tools.editor;
	 					var text=editor.session.getTextRange(editor.getSelectionRange());
	 					text=text+"["+a.title+"]("+a.link+")";
	 					editor.session.replace(editor.selection.getRange(), text);
	 					editor.focus();
	 				}
	 			}
 			});
 		}},
 		{name:"i",icon:"fa-photo",action:function(){
 			tools.container.addChild({
 				type:"@ui.insertimg",
 				option:{
	 				fn:function(a){
	 					var editor=tools.editor;
	 					var text=editor.session.getTextRange(editor.getSelectionRange());
	 					if(a.title){
		 					text=text+"!["+a.text+"]("+a.url+" \""+a.title+"\")";
		 				}else{
		 					text=text+"!["+a.text+"]("+a.url+")";
		 				}
	 					editor.session.replace(editor.selection.getRange(), text);
	 					editor.focus();
	 				}
	 			}
 			});
 		}}
 	],
 	setEditor:function(editor){
 		this.editor=editor;
 	},
 	setContainer:function(container){
 		this.container=container;
 	}
 };

 module.exports=tools;