/*
 * @packet service.base;
 * @require pipe;
 */
 Module({
 	name:"dataservice",
 	extend:"localservice",
 	init:function(){
 		this.data={
 			tabs:[],
 			current:""
 		}
 		this.start();
 	},
 	action_has:function(path){
 		var has=false;
 		this.data.tabs.forEach(function(a){
 			if(a.path===path){
 				has=true;
 				return false;
 			}
 		});
 		return has;
 	},
 	action_gettab:function(path){
 		var r=null;
        if(path){
     		this.data.tabs.forEach(function(a){
     			if(a.path===path){
     				r=a;
     				return false;
     			}
     		});
        }
 		return r;
 	},
 	action_gettabbyname:function(name){
 		var r=ull;
 		this.data.tabs.forEach(function(a){
 			if(a.name===name){
 				r=a;
 				return false;
 			}
 		});
 		return r;
 	},
 	action_add:function(path){
 		this.data.tabs.forEach(function(a){
 			a.active=false;
 		});
 		var id=$.util.randomid();
 		var info=this.getPathInfo(path);
 		var q={
            title:info?info.shortname:"Untitled",
            path:path||"",
            info:info||{},
            name:id,
            active:true
        };
 		this.data.tabs.push(q);
        this.data.current=id;
        this.trigger();
        return q;
 	},
 	action_getcurrentname:function(){
 		return this.data.current;
 	},
 	action_remove:function(name){
 		var t=[];
 		this.data.tabs.forEach(function(a){
 			if(a.name!==name){
 				t.push(a);
 			}
 		});
 		this.data.tabs=t;
 		this.trigger();
 	},
 	action_length:function(){
 		return this.data.tabs.length;
 	},
 	action_first:function(){
 		return this.data.tabs[0].name;
 	},
    action_index:function(name){
        var num=0;
        this.data.tabs.forEach(function(a,i){
            if(a.name===name){
                num=i;
            }
        });
        return num;
    },
    action_edit:function(name,path){
        var ab=null;
        this.data.tabs.forEach(function(a,i){
            if(a.name===name){
                ab=a;
                return false;
            }
        });
        var info=this.getPathInfo(path);
        $.extend(ab,{
            path:path,
            info:info,
            title:info.shortname
        });
        this.trigger();
        return ab;
    },
 	action_active:function(name){
 		this.data.tabs.forEach(function(a,i){
            if(a.name===name){
                a.active=true;
            }else{
                a.active=false;
            }
        });
        this.data.current=name;
        this.trigger();
 	},
    getPathInfo:function(path){
        if(path){
            var t={
                path:"",
                name:"",
                suffix:"",
                shortname:""
            };
            path=path.replace(/\\/g,"/");
            var a=path.split(/\//);
            t.name=a.pop();
            t.path=path;
            t.suffx=t.name.split(".")[1]||"";
            t.shortname=t.name.split(".")[0];
            return t;
        }else{
            return null;
        }
    }
 });
 Module({
 	name:"editorservice",
 	extend:"localservice",
 	init:function(){
 		var ths=this;
 		this.data={
 			code:"",
 			parse:""
 		};
 		this.start();
 	},
 	action_set:function(a){
 		var ths=this;
 		this.data.code=a;
 		require("@pipe").command("parsemarkdown",a,function(data){
 			ths.data.parse=data;
 			ths.trigger("parsedone",ths.data);
 		});
 	},
 	action_reset:function(){
 		this.trigger("parsedone",this.data);
 	}
 });

 Module({
 	name:"menulistservice",
 	extend:"localservice",
 	init:function(){
 		var ths=this;
 		this.data={
 			menu:[
	            {name:"open",icon:"fa-folder_open",action:"open"},
	            {name:"new",icon:"fa-control_point",action:"new"},
                {name:"recent <i class='fa fa-keyboard_arrow_right'></i>",icon:"fa-event_note",list:[]},
	            {name:"save",icon:"fa-save",action:"save"},
	            {name:"save as",icon:"fa-queue",action:"saveas"},
	            {name:"preview",icon:"fa-chrome_reader_mode",action:"preview"},
	            {name:"export  <i class='fa fa-keyboard_arrow_right'></i>",icon:"fa-swap_horiz",list:[
	                {name:"pdf",icon:"fa-picture_as_pdf",action:"epdf"},
	                {name:"html",icon:"fa-assignment",action:"ehtml"}
	            ]},
                {name:"setting",icon:"fa-settings",action:"setting"},
                {name:"about",icon:"fa-info",action:"about"},
	            {name:"quit",icon:"fa-power_settings_new",action:"quit"}
	        ]
 		};
        var t=this.getrecent();
        if(t){
	        require("@pipe").command("getrecent",{},function(a){
	        	if(a&&a.length>0){
		        	for(var i=0;i<a.length;i++){
		        		t.list.push({
		        			name:a[i],
		        			action:"recent"
		        		});
		        	}
		        }else{
		        	t.list.push({name:"no item"});
		        }
		        ths.start();
		        ths.trigger();
	        });
	    }else{
	    	this.start();
	    }
 	},
 	service_addrecent:function(path){
 		var t=this.getrecent();
        if(t){
        	if(t.list.length===1){
        		if(t.list[0].name==="no item"){
        			t.list=[];
        		}
        	}
            var has=false;
            for(var i=0;i<t.list.length;i++){
                if(t.list[i].name===path){
                    has=true;
                    break;
                }
            }
            if(!has){
            	t.list.push({
            		name:path,
            		action:"recent"
            	});
            	var ths=this;
            	require("@pipe").command("setrecent",path,function(){
            		ths.trigger();
            	});
            }
        }
 	},
    service_clean:function(){
        var t=this.getrecent();
        if(t){
            t.list=[{name:"no item"}];
            var ths=this;
            require("@pipe").command("cleanrecent",null,function(){
                ths.trigger();
            });
        }  
    },
 	getrecent:function(){
 		var t=null;
        for(var i=0;i<this.data.menu.length;i++){
        	if(this.data.menu[i].name.indexOf("recent")!==-1){
        		t=this.data.menu[i];
        		break;
        	}
        }
        return t;
 	}
});





