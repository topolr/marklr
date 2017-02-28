/*
 * @packet main;
 * @css style.font;
 * @css style.app;
 * @css style.style;
 * @css style.github-markdown;
 * @require pipe;
 * @require tools;
 * @require keymap;
 * @require ui;
 * @require form;
 * @template template.temp;
 * @require service.base;
 * @map (js)lib.ace.ace;
 */
Module({
    name: "container",
    extend: "viewgroup",
    className: "container",
    layout: module.getTemplate("@temp", "container"),
    autodom:true,
    services:{"data":"@base.dataservice"},
    option:{
        tabs:[],
        config:{
            "fontsize":10,
            "theme":"github",
            "linenum":true
        }
    },
    init: function () {
        var ths = this;
        this.addChild({
            type:"@.menulist",
            container:this.finders("menulist")
        });
        this.openEditor({
            path:"",
            content:""
        });
        this.dom.find(".container-head-tabs").click(function(){
            ths.closeMenuList();
        });
        require("@keymap").init(this);
        this.addChild({
            type:"@.toolbar",
            container:this.dom
        });
        require("@tools").setContainer(this);
        require("@pipe").bind("quit",function(){
            ths.quit();
        });
    },
    group_tabitem:function(dom){
        var ths=this;
        dom.items("tabitemdesc").click(function(){
            var data=$(this).group().cache();
            ths.activeEditor(data.name);
            ths.closeMenuList();
        });
        dom.items("tabitemremove").click(function(){
            var data=$(this).group().cache();
            ths.closeEditor(data.name);
        });
    },
    openEditor:function(option){
        var ths=this;
        var path=option.path,content=option.content,info=this.getService("data").action("gettab",path);
        if(info===null){
            var q=this.getService("data").action("add",path);
            return this.addChild({
                type:"@.editorpannel",
                option:{
                    name:q.name,
                    path:q.path,
                    content:content,
                    pathinfo:q.info,
                    config:this.option.config
                },
                container:this.finders("body")
            }).then(function(module){
                if(module.isDone()){
                    ths.activeEditor(q.name);
                }else{
                    module.done(function(){
                        ths.activeEditor(q.name);
                    });
                }
            });
        }else{
            this.activeEditor(info.name);
        }
    },
    getCurrentEditor:function(){
        return this.getEditor(this.getService("data").action("getcurrentname"));
    },
    closeEditor:function(name){
        var b=this.getEditor(name);
        if(!b.isEdit()){
            b.remove();
            this.getService("data").action("remove",name);
            if(this.getService("data").action("length")!==0){
                this.activeEditor(this.getService("data").action("first"));
            }else{
                require("@pipe").command("quit",null,null);
            }
        }else{
            var ths=this;
            this.addChild({
                type:"@ui.alert",
                option:{
                    title:"Quit readme",
                    content:"file has edited,sure to close?",
                    btns:[{name:"close",action:"close"},{name:"ok",action:"ok"}],
                    override:{
                        event_ok:function(){
                            b.remove();
                            ths.getService("data").action("remove",name);
                            if(ths.getService("data").action("length")!==0){
                                ths.activeEditor(ths.getService("data").action("first"));
                                this.remove();
                            }else{
                                require("@pipe").command("quit",null,null);
                            }
                        },
                        event_close:function(){
                            this.remove();
                            ths.getCurrentEditor().getEditor().focus();
                        }
                    }
                }
            });
        }
    },
    activeEditor:function(name){
        var editor=null;
        this.getService("data").action("active",name);
        this.children.forEach(function(a,i){
            if(a.typeOf("@.editorpannel")){
                if(a.getPannelId()===name){
                    editor=a;
                    a.show();
                }else{
                    a.hide();
                }
            }
        });
        this.resetPosition(name);
        require("@tools").setEditor(editor.getEditor());
        this.showPreview();
        this.dispatchEvent("switcheditor");
    },
    getEditor:function(name){
        var r=null;
        this.children.forEach(function(a,i){
            if(a.typeOf("@.editorpannel")){
                if(a.getPannelId()===name){
                    r=a;
                    return false;
                }
            }
        });
        return r;
    },
    showPreview:function(){
        var a=this.getCurrentEditor();
        if(a){
            var id=a.getServiceId();
            var b=this.getChildByType("@.preview");
            if(!b){
                this.addChild({
                    type:"@.preview",
                    localService:[id],
                    container:this.finders("preview")
                });
            }else{
                this.setLocalService(b,id);
            }
        }
    },
    resetPosition:function(name){
        var _a=this.finders("tabs");
        var _ai=this.finders("tabsinner");
        var num=this.getService("data").action("index",name);
        var _c=_ai.children().eq(num);
        if(_ai.width()>_a.width()){
            var offsetleft=_c.get(0).offsetLeft;
            var scroll=_a.scrollLeft(),scrollplus=scroll+_ai.width()-_a.width();
            _a.scrollingLeft(offsetleft);
        }
    },
    newFile:function(){
        this.openEditor({
            path:"",
            content:""
        });
    },
    openFile:function(){
        var ths=this;
        require("@pipe").command("browsefile",{},function(a){
            var path=a[0];
            if(path){
                require("@pipe").command("openfile",path,function(a){
                    ths.openEditor({
                        path:path,
                        content:a
                    });
                    ths.getChildByType("@.menulist").addRecent(path);
                });
            }
        });
    },
    closeFile:function(){
        this.closeEditor(this.getService("data").action("getcurrentname"));
    },
    togglePreview:function(){
        this.dom.toggleClass("showpreview");
    },
    exportHTML:function(){
        var ths=this;
        var da=ths.getCurrentEditor().getEditorData();
        require("@pipe").command("savefile",{
            title:"create html file",
            defaultPath:"~/"+(da.name||"Untitled")+".html",
            filters:[
                {name:"html",extensions:["html"]}
            ]
        },function(path){
            if(path){
                ths.toast("<span><i class='fa fa-spin fa-rotate_right'></i> now export html file</span>",-1).then(function(toast){
                    require("@pipe").command("exporthtml",{
                        path:path,
                        content:da.parse,
                        name:da.name
                    },function(){
                        toast.resetToast("export html file done",2000);
                    });
                });
            }
        });
    },
    exportPDF:function(){
        var ths=this;
        var da=ths.getCurrentEditor().getEditorData();
        require("@pipe").command("savefile",{
            title:"create pdf file",
            defaultPath:"~/"+(da.name||"Untitled")+".pdf",
            filters:[
                {name:"pdf",extensions:["pdf"]}
            ]
        },function(path){
            if(path){
                ths.toast("<span><i class='fa fa-spin fa-rotate_right'></i> now export pdf file</span>",-1).then(function(toast){
                    require("@pipe").command("exportpdf",{
                        path:path,
                        content:da.parse,
                        name:da.name
                    },function(){
                        toast.resetToast("export pdf file done",2000);
                    });
                });
            }
        });
    },
    saveFile:function(){
        var ths=this;
        var editor=this.getCurrentEditor();
        var data=editor.getEditorData();
        var path=data.path;
        if(!path){
            require("@pipe").command("savefile",{
                title:"create markdown file",
                defaultPath:"~/Untitled.md",
                filters:[
                    {name:"markdone",extensions:["md"]}
                ]
            },function(a){
                var path=a;
                if(path){
                    require("@pipe").command("savecontent",{
                        path:path,
                        content:data.code
                    },function(){
                        var em=ths.getService("data").action("edit",ths.getService("data").action("getcurrentname"),path);
                        ths.getCurrentEditor().setInfo(em);
                        ths.getCurrentEditor().resetUndo();
                        ths.toast("file saved done");
                    });
                }
            });
        }else{
            data.content=data.code;
            require("@pipe").command("savecontent",data,function(){
                ths.getCurrentEditor().resetUndo();
                ths.toast("file saved done");
            });
        }
    },
    saveasFile:function(){
        var ths=this;
        var editor=this.getCurrentEditor();
        var data=editor.getEditorData();
        require("@pipe").command("savefile",{
            title:"create markdown file",
            defaultPath:"~/"+(data.name||"Untitled")+".md",
            filters:[
                {name:"markdone",extensions:["md"]}
            ]
        },function(a){
            var path=a;
            if(path){
                require("@pipe").command("savecontent",{
                    path:path,
                    content:data.code
                },function(){
                    var em=ths.getService("data").action("edit",ths.getService("data").action("getcurrentname"),path);
                    ths.getCurrentEditor().setInfo(em);
                    ths.getCurrentEditor().resetUndo();
                    ths.toast("file saved done");
                });
            }
        });
    },
    saveAllFile:function(){
        var ths=this;
        this.getChildrenByType("@.editorpannel").forEach(function(a,i){
            if(!a.isUntitled()&&a.isEdit()){
                var data=a.getEditorData();
                var path=data.path;
                require("@pipe").command("savecontent",{
                    path:path,
                    content:data.code
                },function(){
                    a.resetUndo();
                    ths.toast("file saved done");
                });
            }
        });
    },
    quit:function(){
        var r=true,ths=this;
        this.getChildrenByType("@.editorpannel").forEach(function(a,i){
            if(a.isEdit()){
                r=false;
            }
        });
        if(r){
            require("@pipe").command("quit",null,null);
        }else{
            this.addChild({
                type:"@ui.alert",
                option:{
                    title:"Quit readme",
                    content:"file has edited,sure to close?",
                    btns:[{name:"close",action:"close"},{name:"ok",action:"ok"}],
                    override:{
                        event_ok:function(){
                            require("@pipe").command("quit",null,null);
                        },
                        event_close:function(){
                            this.remove();
                            ths.getCurrentEditor().getEditor().focus();
                        }
                    }
                }
            });
        }
    },
    toast:function(desc,wait){
        return this.addChild({
            type:"@ui.toast",
            option:{
                desc:desc,
                wait:wait||2000
            }
        });
    },
    showAbout:function(){
        this.addChild({
            type:"@.about"
        });
    },
    showSetting:function(){
        this.addChild({
            type:"@.setting",
            option:{
                config:this.option.config
            }
        });
    },
    changeEditor:function(config){
        var ths=this;
        this.getChildrenByType("@.editorpannel").forEach(function(a,i){
            $.extend(true,ths.option.config,config);
            require("@pipe").command("savesetting",ths.option.config,function(){
                ths.toast("save setting ok");
            });
            a.changeEditor(config);
        });
    },
    event_menuclick_new:function(){
        this.newFile();
    },
    event_menuclick_open:function(){
        this.openFile();
    },
    event_menuclick_preview:function(){
        this.togglePreview();
    },
    event_menuclick_ehtml:function(){
        this.exportHTML();
    },
    event_menuclick_epdf:function(){
        this.exportPDF();
    },
    event_menuclick_save:function(){
        this.saveFile();
    },
    event_menuclick_saveas:function(){
        this.saveasFile();
    },
    event_menuclick_quit:function(){
        this.quit();
    },
    event_menuclick_about:function(){
        this.showAbout();
    },
    event_menuclick_setting:function(){
        this.showSetting();
    },
    event_menuclick_recent:function(e){
        var ths=this;
        require("@pipe").command("openfile",e.data.name,function(a){
            ths.openEditor({
                path:e.data.name,
                content:a
            });
        });
    },
    event_changeeditor:function(e){
        this.changeEditor(e.data);
    },
    event_cleanhistory:function(){
        this.getChildByType("@.menulist").cleanRecent();
        this.toast("clean done");
    },
    event_focus:function(){
        this.closeMenuList();
    },
    openMenuList:function(){
        this.getChildByType("@.menulist",0).openMenuList();
    },
    closeMenuList:function(){
        this.getChildByType("@.menulist",0).closeMenuList();
    }
});

Module({
    name:"menulist",
    extend:"view",
    autodom:true,
    className:"menulist",
    template:module.getTemplate("@temp","menulist"),
    services:{"list":"@base.menulistservice"},
    init:function(){
        this.render(this.getService("list").action("get"));
    },
    find_menubtn:function(dom){
        var ths=this;
        dom.click(function(){
            ths.dom.toggleClass("openmenu");
        });
    },
    find_menuitem:function(dom){
        var ths=this;
        dom.click(function(){
            var action=$(this).dataset("action"),da=null;
            var da=$(this).cache();
            ths.closeMenuList();
            ths.dispatchEvent("menuclick_"+action,da);
        });
    },
    openMenuList:function(){
        this.dom.addClass("openmenu");
    },
    closeMenuList:function(){
        this.dom.removeClass("openmenu");
    },
    addRecent:function(path){
        this.getService("list").trigger("addrecent",path);
    },
    cleanRecent:function(){
        this.getService("list").trigger("clean");
    }
});

Module({
    name:"toolbar",
    extend:"view",
    className:"toolbar",
    template:module.getTemplate("@temp","toolbar"),
    init:function(){
        this.render({tools:require("@tools").btns});
        var x=0,y=0;
        var ths=this;
        this._toolbarmove=false;
        this.dom.bind("mousedown",function(e){
            ths._toolbarmove=false;
            var _a=$(this).offset();
            x=e.pageX-_a.left;
            y=e.pageY-_a.top;
            $("body").bind("mousemove",function(e){
                ths._toolbarmove=true;
                ths.dom.css({
                    left:((e.pageX-x)+"px"),
                    top:((e.pageY-y)+"px"),
                    bottom:"auto"
                });
                e.stopPropagation();
                e.preventDefault();
            }).bind("mouseup",function(e){
                $("body").unbind("mousemove").unbind("mouseup");
            });
            e.stopPropagation();
            e.preventDefault();
        });
    },
    find_opentool:function(dom){
        var ths=this;
        dom.bind("click",function(){
            if(!ths._toolbarmove){
                ths.dom.addClass("open");
            }
        });
    },
    find_closetool:function(dom){
        var ths=this;
        dom.click(function(){
            if(!ths._toolbarmove){
                ths.dom.removeClass("open");
            }
        });
    },
    find_itembtn:function(dom){
        var ths=this;
        dom.click(function(){
            if(!ths._toolbarmove){
                var a=$(this).cache();
                a.action();
            }
        });
    }
});

Module({
    name:"editorpannel",
    extend:"viewgroup",
    className:"editorpannel",
    layout:module.getTemplate("@temp","editorpannel"),
    option:{
        name:"",
        path:"",
        content:"",
        pathinfo:{},
        config:{}
    },
    init:function(){
        var id=this.createLocalService("@base.editorservice");
        this.addChild({
            type:"@.editor",
            localService:[id],
            option:{
                content:this.option.content,
                config:this.option.config
            },
            container:this.finders("left")
        });
        this._serviceid=id;
        this._isdone=false;
    },
    show:function(){
        this.dom.show();
    },
    hide:function(){
        this.dom.hide();
    },
    getServiceId:function(){
        return this._serviceid;
    },
    getPannelId:function(){
        return this.option.name;
    },
    getEditorData:function(){
        var t=$.extend(true,{
            name:this.option.pathinfo.shortname||"",
            path:this.option.path
        },this.getChildAt(0).getData());
        return t;
    },
    getEditor:function(){
        return this.getChildAt(0).getEditor();
    },
    isDone:function(){
        return this._isdone;
    },
    isEdit:function(){
        return this.getChildAt(0).isEdit();
    },
    isUntitled:function(){
        return this.option.path==="";
    },
    resetUndo:function(){
        this.getChildAt(0).resetUndo();
    },
    done:function(fn){
        this._done=fn;
    },
    event_editordone:function(e){
        this._isdone=true;
        if(this._done){
            this._done();
        }
        e.stopPropagation();
    },
    setInfo:function(info){
        this.option.path=info.path;
        this.option.pathinfo=info.info;
    },
    changeEditor:function(config){
        var editor=this.getChildAt(0).editor;
        if(config.theme){
            editor.setTheme(config.theme);
        }
        if(config.fontsize){
            editor.setFontSize(config.fontsize/1);
        }
        if(config.linenum!==null&&config.linenum!==undefined){
            editor.renderer.setShowGutter(config.linenum);
        }
    }
});
Module({
    name:"editor",
    extend:"view",
    className:"editor",
    template:module.getTemplate("@temp","editor"),
    services:{"editor":"@base.editorservice"},
    option:{
        content:"",
        config:{}
    },
    init:function(){
        var ths=this;
        this.render();
        $().create("script").attr("src",sitePath+"app/dist/lib/ace/ace.js").attr("type","text/noload").appendTo("head");
        module.getMapSource("@ace").done(function () {
            var id=topolr.util.randomid();
            ths.finders("editorcon").attr("id",id);
            var editor = window.ace.edit(id);
            editor.setTheme(ths.option.config.theme||"ace/theme/idle_fingers");
            editor.getSession().setMode("ace/mode/markdown");
            editor.setValue(ths.option.content,-1);
            editor.on("change",function () {
                ths.getService("editor").action("set",editor.getValue());
            });
            editor.on("focus",function(){
                ths.dispatchEvent("focus");
            });
            ths.getService("editor").action("set",ths.option.content);
            editor.renderer.setShowGutter(ths.option.config.linenum);
            editor.setFontSize(ths.option.config.fontsize/1);
            editor.session.getUndoManager().reset();
            editor.focus();
            ths.editor = editor;
            setTimeout(function(){
                editor.session.getUndoManager().reset();
                ths.dispatchEvent("editordone");
            });
        });
    },
    getData:function(){
        return this.getService("editor").action("get");
    },
    getEditor:function(){
        return this.editor;
    },
    isEdit:function(){
        return this.editor.session.getUndoManager().hasUndo();
    },
    resetUndo:function(){
        this.editor.session.getUndoManager().reset();
    }
});
Module({
    name:"preview",
    extend:"view",
    className:"preview",
    template:module.getTemplate("@temp","preview"),
    services:{editor:"@base.editorservice"},
    init:function(){
        this.render({});
    },
    service_parsedone:function (a) {
        this.finders("inner").html(a.parse);
    },
    onservicechange:function(){
        this.getService("editor").action("reset");
    }
});
Module({
    name:"welcome",
    extend:"view",
    className:"welcome",
    template:module.getTemplate("@temp","welcome"),
    init:function(){
        this.render();
        var ths=this;
        ths.dom.transition().all().scope().addClass("show");
    },
    close:function(){
        var ths=this;
        setTimeout(function(){
            ths.dom.transition().all({
                time:500
            }).done(function(){
                ths.remove();
            }).scope().addClass("hide");
        },1000);
    }
});
Module({
    name:"about",
    extend:"view",
    className:"about",
    template:module.getTemplate("@temp","about"),
    option:{
        name:"",
        version:""
    },
    init:function(){
        var ths=this;
        require("@pipe").command("appinfo",null,function(info){
            ths.render(info);
            setTimeout(function(){
                ths.finders("win").addClass("in");
            },50);
        });
        this.dom.click(function(){
            ths.remove();
        });
    }
});
Module({
    name:"tab",
    find_titleitem:function(dom){
        var ths=this;
        dom.click(function(){
            var item=$(this),num=0;
            ths.finders("titleitem").each(function(a,b){
                if($(this).get(0)===item.get(0)){
                    num=b;
                    return false;
                }
            });
            ths.activeItem(num);
        });
    },
    getCurrentIndex:function(){
        return this._tabcurrent();
    },
    activeItem:function(num){
        var ths=this;
        ths.finders("titleitem").each(function(a,b){
            if(b===num){
                $(this).addClass("active");
            }else{
                $(this).removeClass("active");
            }
        });
        ths.finders("tabcontent").each(function(a,b){
            if(b===num){
                $(this).addClass("active");
            }else{
                $(this).removeClass("active");
            }
        });
        ths._tabcurrent=num;
    }
});
Module({
    name:"setting",
    extend:["viewgroup","@.tab"],
    className:"setting",
    option:{
        config:{}
    },
    layout:module.getTemplate("@temp","setting"),
    init:function(){
        var ths=this;
        this.activeItem(0);
        this.addChild({
            type:"@form.form",
            option:{
                fields:[
                    {type:"@form.select",option:{
                        label:"font size",
                        key:'fontsize',
                        options:[
                            {name:"10",value:10},
                            {name:"12",value:12},
                            {name:"15",value:15},
                            {name:"20",value:20},
                            {name:"30",value:30}
                        ],
                        override:{
                            event_change:function(e){
                                this.dispatchEvent("changeeditor",{
                                    fontsize:e.data
                                });
                            }
                        }
                    }},
                    {type:"@form.select",option:{
                        label:"theme",
                        key:'theme',
                        options:[
                            {name:"ambiance",value:"ace/theme/ambiance"},
                            {name:"chaos",value:"ace/theme/chaos"},
                            {name:"chrome",value:"ace/theme/chrome"},
                            {name:"clouds",value:"ace/theme/clouds"},
                            {name:"clouds-midnight",value:"ace/theme/clouds_midnight"},
                            {name:"cobalt",value:"ace/theme/cobalt"},
                            {name:"crimson",value:"ace/theme/crimson"},
                            {name:"drawn",value:"ace/theme/drawn"},
                            {name:"dreamweaver",value:"ace/theme/dreamweaver"},
                            {name:"eclips",value:"ace/theme/eclips"},
                            {name:"github",value:"ace/theme/github"},
                            {name:"idle-fingers",value:"ace/theme/idle_fingers"},
                            {name:"iplastic",value:"ace/theme/iplastic"},
                            {name:"kstzenmilch",value:"ace/theme/kstzenmilch"},
                            {name:"kr-theme",value:"ace/theme/kr_theme"},
                            {name:"kuroir",value:"ace/theme/kuroir"},
                            {name:"merbivore",value:"ace/theme/merbivore"},
                            {name:"merbivore-soft",value:"ace/theme/merbivore_soft"},
                            {name:"mono-industrial",value:"ace/theme/mono_industrial"},
                            {name:"monokai",value:"ace/theme/monokai"},
                            {name:"pastel-on",value:"ace/theme/pastel_on"},
                            {name:"solarized-dark",value:"ace/theme/solarized_dark"},
                            {name:"solarized-light",value:"ace/theme/solarized_light"},
                            {name:"sqlserver",value:"ace/theme/sqlserver"},
                            {name:"terminal",value:"ace/theme/terminal"},
                            {name:"textmate",value:"ace/theme/textmate"},
                            {name:"tomorrow",value:"ace/theme/tomorrow"},
                            {name:"tomorrow-night",value:"ace/theme/tomorrow_night"},
                            {name:"tomorrow-night-blue",value:"ace/theme/tomorrow_night_blue"},
                            {name:"tomorrow-night-bright",value:"ace/theme/tomorrow_night_bright"},
                            {name:"tomorrow-night-eighties",value:"ace/theme/tomorrow_night_eighties"},
                            {name:"twilight",value:"ace/theme/twilight"},
                            {name:"vibrant-ink",value:"ace/theme/vibrant_ink"},
                            {name:"xcode",value:"ace/theme/xcode"}
                        ],
                        override:{
                            event_change:function(e){
                                this.dispatchEvent("changeeditor",{
                                    theme:e.data
                                });
                            }
                        }
                    }},
                    {type:"@form.radio",option:{
                        label:"show line num",
                        key:"linenum",
                        radios:[
                            {name:"Yes",value:true},
                            {name:"No",value:false}
                        ],
                        override:{
                            event_change:function(e){
                                this.dispatchEvent("changeeditor",{
                                    linenum:e.data
                                });
                            }
                        }
                    }},
                ],
                override:{
                    onendinit:function(){
                        console.log(ths.option.config);
                        this.setValue(ths.option.config);
                    }
                }
            },
            container:this.finders("tabcontent").eq(0)
        });
    },
    bind_default:function(){
        var ths=this;
        require("@pipe").command("defaultsetting",{},function(a){
            ths.getChildByType("@form.form").setValue(a);
            ths.dispatchEvent("changeeditor",a);
        });
    },
    bind_close:function(){
        this.remove();
    },
    bind_cleanhistory:function(){
        this.dispatchEvent("cleanhistory");
    }
});