/*
 * @packet ui;
 * @require util.file;
 * @template template.ui;
 * @require form;
 * @css style.uistyle;
 */
 Module({
 	name:"toast",
 	extend:"view",
 	template:module.getTemplate("@ui","toast"),
 	className:"toast",
 	autodom:true,
 	option:{
 		desc:"toast",
 		wait:2000
 	},
 	init:function(){
 		var ths=this;
 		this.render(this.option);
		ths.dom.transition().all().done(function(){
			if(ths.option.wait!==-1){
				setTimeout(function(){
					ths.close();
				},ths.option.wait);
			}
		}).scope().addClass("toast-in");
 	},
 	close:function(){
 		var ths=this;
 		ths.dom.transition().all().done(function(){
			ths.remove();
		}).scope().removeClass("toast-in");
 	},
 	resetToast:function(desc,wait){
 		var ths=this;
 		this.update({
 			desc:desc
 		});
 		setTimeout(function(){
			ths.close();
		},wait);
 	}
 });
 Module({
 	name:"alert",
 	extend:"view",
 	template:module.getTemplate("@ui","alert"),
 	className:"alert",
 	option:{
 		title:"",
 		content:"",
 		width:"350px",
 		btns:[
 			{name:"close",action:"close"}
 		]
 	},
 	init:function(){
 		this.render(this.option);
 	},
 	find_btn:function(dom){
 		var ths=this;
 		dom.click(function(){
 			var a=$(this).cache();
 			ths.dispatchEvent(a.action,a);
 		});
 	},
 	event_close:function(){
 		this.remove();
 	}
 });
 Module({
 	name:"chouti",
 	extend:"viewgroup",
 	className:"chouti",
 	layout:module.getTemplate("@ui","chouti"),
 	option:{
 		title:"",
 		content:"",
 		width:"350px",
 		btns:[
 			{name:"close",action:"close"}
 		]
 	},
 	init:function(){
 		setTimeout(function(){
 			this.finders("box").transition().all().scope().transform().x(0);
 		}.bind(this));
 	},
 	close:function(){
 		var ths=this;
 		this.finders("box").transition().all().done(function(){
 			ths.remove();
 		}).scope().transform().x("-100%");
 	},
 	find_btn:function(dom){
 		var ths=this;
 		dom.click(function(){
 			var a=$(this).cache();
 			ths.dispatchEvent(a.action,a);
 		});
 	},
 	find_mask:function(dom){
 		var ths=this;
 		dom.click(function(){
 			ths.close();
 		});
 	},
 	event_close:function(){
 		this.close();
 	}
 });
 Module({
 	name:"getlink",
 	extend:"@.chouti",
 	layout:module.getTemplate("@ui","getlink"),
 	option:{
 		title:"insert link",
 		btns:[
 			{name:"close",action:"close"},
 			{name:"ok",action:"ok"}
 		],fn:null
 	},
 	init:function(){
 		this.superClass("init");
 		this.addChild({
 			type:"@form.form",
 			option:{
 				fields:[
 					{type:"@form.input",option:{
 						key:"title",
 						label:"title",
 						placeholder:"link title",
 						require:true
 					}},
 					{type:"@form.input",option:{
 						key:"link",
 						label:"link",
 						placeholder:"link url",
 						require:true
 					}}
 				]
 			},
 			container:this.finders("body")
 		});
 	},
 	event_ok:function(){
 		var form=this.getChildAt(0);
 		if(form.check()){
 			var val=form.getValue();
 			this.option.fn&&this.option.fn(val);
 			this.close();
 		}
 	}
 });
 Module({
 	name:"insertimg",
 	extend:"@.chouti",
 	layout:module.getTemplate("@ui","insertimg"),
 	option:{
 		title:"insert image",
 		btns:[
 			{name:"close",action:"close"},
 			{name:"ok",action:"ok"}
 		],fn:null
 	},
 	init:function(){
 		var ths=this;
 		this.superClass("init");
 		this.addChild({
 			type:"@form.form",
 			option:{
 				fields:[
 					{type:"@form.input",option:{
 						key:"title",
 						label:"title",
 						placeholder:"image title",
 						require:true
 					}},
 					{type:"@form.input",option:{
 						key:"text",
 						label:"desc",
 						placeholder:"image description"
 					}}
 				]
 			},
 			container:this.finders("formone")
 		});
 		this.addChild({
 			type:"@form.form",
 			option:{
 				fields:[
 					{type:"@form.image",option:{
 						key:"url",
 						label:"url",
 						require:true
 					}}
 				]
 			},
 			container:this.finders("tabcontent").eq(0)
 		});
 		this.addChild({
 			type:"@form.form",
 			option:{
 				fields:[
 					{type:"@form.input",option:{
 						key:"url",
 						label:"url",
 						placeholder:"title url",
 						require:true
 					}}
 				]
 			},
 			container:this.finders("tabcontent").eq(1)
 		});
 		this._current=0;
 	},
 	find_tabtitle:function(dom){
 		var ths=this;
 		dom.click(function(){
 			var num=0,t=$(this);
 			ths.finders("tabtitle").each(function(a,b){
 				if(a!==t.get(0)){
	 				$(this).removeClass("active");
	 			}else{
	 				num=b;
	 			}
 			});
 			$(this).addClass("active");
 			ths.finders("tabcontent").each(function(a,b){
 				if(b===num){
 					$(this).addClass("active");
 				}else{
 					$(this).removeClass("active");
 				}
 			});
 			ths._current=num;
 		});
 	},
 	event_ok:function(){
 		var formone=this.getChildAt(0);
 		var formtwo=this.getChildAt(1);
 		var formthree=this.getChildAt(2);
 		if(formone.check()){
 			var val=formone.getValue(),done=false;
 			if(this._current===0){
	 			if(formtwo.check()){
	 				$.extend(val,formtwo.getValue());
	 				done=true;
	 			}
	 		}else{
	 			if(formthree.check()){
	 				$.extend(val,formthree.getValue());
	 				done=true;
	 			}
	 		}
	 		if(done){
		 		this.option.fn&&this.option.fn(val);
	 			this.close();
	 		}
 		}
 	}
 });






