var ipc = require('electron').ipcMain;
var pipe={
	types:[],
	listen:function(type,fn){
		if(pipe.types.indexOf(type)===-1){
			pipe.types.push(type);
			ipc.on(type, function (event, args) {
				fn&&fn((args?args.parameters:{}),function(data){
					event.sender.send(type, {
						type:type,
						data:data
					});
				});
		    });
		}
	}
};
module.exports=pipe;