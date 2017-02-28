/*
 * @packet form;
 * @template template.form;
 * @require service.clickservice;
 * @require util.file;
 * @css style.form:e;
 */
 Module({
 	name:'form',
 	extend:"viewgroup",
 	option:{
 		fields:[{type:"",option:""}]
 	},
 	layout:module.getTemplate("@form","form"),
 	oninitchild:function(a,b){
 		var id=a.getId()/1;
 		$.extend(true,a.option,this.option.fields[id].option);
 	},
 	getValue:function(){
 		var r={};
 		this.childEach(function(){
 			r[this.getKey()]=this.getValue();
 		});
 		return r;
 	},
 	check:function(){
 		var r=true;
 		this.childEach(function(){
 			var a=this.check();
 			if(!a){
 				r=false;
 				return false;
 			}
 		});
 		return r;
 	},
 	setValue:function(r){
 		this.childEach(function(){
 			var a=this.getKey();
 			this.setValue(r[a],true);
 		});
 		return this;
 	}
 });
 Module({
 	name:'field',
 	extend:"view",
 	className:"field",
 	template:"",
 	option:{
 		label:"field",
 		value:"",
 		key:"",
 		require:false
 	},
 	getValue:function(){
 		return this.value;
 	},
 	setValue:function(){},
 	check:function(){
 		return true;
 	},
 	isRequire:function(){
 		return this.option.require;
 	},
 	showTip:function(desc){
 		this.finders("tip").show().html(desc);
 	},
 	hideTip:function(){
 		this.finders("tip").hide();
 	},
 	getKey:function(){
 		return this.option.key;
 	}
 });
 Module({
 	name:"input",
 	extend:"@.field",
 	template:module.getTemplate("@form","input"),
 	option:{
 		placeholder:""
 	},
 	init:function(){
 		this.render(this.option);
 	},
 	getValue:function(){
 		return this.finders("input").val();
 	},
 	setValue:function(val){
 		this.finders("input").val(val);
 	},
 	check:function(){
 		var val=this.getValue();
 		if(!val){
 			if(this.isRequire()){
 				this.showTip("can not empty");
 				return false;
 			}
 		}
 		this.hideTip();
 		return true;
 	}
 });
 Module({
 	name:'select',
 	extend:"@.field",
 	template:module.getTemplate("@form","select"),
 	services:{"click":"@clickservice.clickservice"},
 	option:{
 		options:[]
 	},
 	init:function(){
 		this.render(this.option);
 		if(this.option.value){
 			this.setValue(this.option.value,true);
 		}else{
 			this.setValue(this.option.options[0].value,true);
 		}
 	},
 	find_input:function(dom){
 		var ths=this;
 		dom.click(function(){
 			ths.dom.addClass("active");
 		});
 	},
 	find_item:function(dom){
 		var ths=this;
 		dom.click(function(){
 			ths.setValue(ths.option.options[$(this).attr("num")/1].value);
 			ths.dom.removeClass("active");
 		});
 	},
 	setValue:function(val,isno){
 		var name="";
 		for(var i=0;i<this.option.options.length;i++){
 			if(this.option.options[i].value===val){
 				name=this.option.options[i].name;
 				this.finders("item").eq(i).addClass("active");
 			}else{
 				this.finders("item").eq(i).removeClass("active");
 			}
 		}
 		if(name&&this.value!==val){
 			this.value=val;
 			this.finders("input").val(name);
 			if(!isno){
		 		this.dispatchEvent("change",val);
		 	}
	 	}
 	},
 	service_click:function(target){
 		var c = this.dom.get(0).compareDocumentPosition(target);
        if (c !== 35 && c !== 37&& c !== 33) {
            var a = this.dom.get(0).contains(target);
            if (a === false) {
            	this.dom.removeClass("active");
            }
        }
 	}
 });
 Module({
 	name:"radio",
 	extend:"@.field",
 	template:module.getTemplate("@form","radio"),
 	option:{
 		radios:[]
 	},
 	init:function(){
 		this.render(this.option);
 		if(this.option.value){
 			this.setValue(this.option.value,true);
 		}else{
 			this.setValue(this.option.radios[0].value,true);
 		}
 	},
 	find_item:function(dom){
 		var ths=this;
 		dom.click(function(){
 			ths.setValue(ths.option.radios[$(this).attr("num")/1].value);
 		});
 	},
 	setValue:function(val,isno){
 		var name="",index=0;
 		for(var i=0;i<this.option.radios.length;i++){
 			if(this.option.radios[i].value===val){
 				name=this.option.radios[i].name;
 				index=i;
 				break;
 			}
 		}
 		if(name&&this.value!==val){
 			this.value=val;
	 		this.finders("item").each(function(a,b){
 				if(b===index){
 					$(this).addClass("active");
 				}else{
 					$(this).removeClass("active");
 				}
 			});
 			if(!isno){
		 		this.dispatchEvent("change",val);
		 	}
	 	}
 	}
 });
Module({
	name:"image",
	extend:"@.field",
	option:{
		accept:"image/gif,image/jpeg,image/jpg,image/png,image/bmp",
		maxsize:1024*1024*1,
		placeholder:"select image"
	},
	template:module.getTemplate("@form","image"),
	init:function(){
		var ths=this;
		this.render(this.option);
		this.finders("input").bind("change",function(e){
 			var file=e.target.files[0];
 			if(file){
 				if(file.size<=ths.option.maxsize){
 					ths.hideTip();
		 			require("@file")(file).createImageCanvas(310,280).done(function(a){
		 				ths.value=a.uri;
		 				ths.finders("con").empty().append(a.element);
		 			});
		 		}else{
		 			ths.showTip("image can not bigger then 1M");
		 		}
	 		}
 		});
	},
	setValue:function(uri){
		this.value=uri;
		var ths=this;
		require("@file")(uri,"image/png").createImageCanvas(310,280).done(function(a){
			ths.value=a.uri;
			ths.finders("con").empty().append(a.element);
		});
	},
	check:function(){
		var val=this.getValue();
 		if(!val){
 			if(this.isRequire()){
 				this.showTip("can not empty");
 				return false;
 			}
 		}
 		this.hideTip();
 		return true;
	}
});