/*
 * @packet pipe;
 */
var pipe={
	tasks:{},
	handler:{},
	command:function(type,parameters,target){
		if(!pipe.tasks[type]){
			pipe.tasks[type]=[];
			App.ipc.on(type,function(e,data){
				var type=data.type,data=data.data;
				var a=pipe.tasks[type].shift();
				a.target&&a.target(data);
				pipe.handler[type]&&pipe.handler[type](data);
			});
		}
		pipe.tasks[type].push({
			target:target
		});
		App.ipc.send(type,{
			type:type,
			parameters:parameters
		});
	},
	bind:function(type,fn){
		if(!pipe.handler[type]){
			App.ipc.on(type,function(e,data){
				pipe.handler[type]&&pipe.handler[type](data);
			});
		}
		pipe.handler[type]=fn;
	}
};

module.exports=pipe;