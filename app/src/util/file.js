/*
 * @packet util.file;
 */
var is = $.is;
var md5 = '(function(a){if(typeof exports==="object"){module.exports=a()}else{if(typeof define==="function"&&define.amd){define(a)}else{var c;try{c=window}catch(b){c=self}c.SparkMD5=a()}}}(function(c){var f=function(w,v){return(w+v)&4294967295},a=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];function j(B,y,w,v,A,z){y=f(f(y,B),f(v,z));return f((y<<A)|(y>>>(32-A)),w)}function k(y,w,C,B,v,A,z){return j((w&C)|((~w)&B),y,w,v,A,z)}function r(y,w,C,B,v,A,z){return j((w&B)|(C&(~B)),y,w,v,A,z)}function b(y,w,C,B,v,A,z){return j(w^C^B,y,w,v,A,z)}function i(y,w,C,B,v,A,z){return j(C^(w|(~B)),y,w,v,A,z)}function n(w,z){var y=w[0],v=w[1],B=w[2],A=w[3];y=k(y,v,B,A,z[0],7,-680876936);A=k(A,y,v,B,z[1],12,-389564586);B=k(B,A,y,v,z[2],17,606105819);v=k(v,B,A,y,z[3],22,-1044525330);y=k(y,v,B,A,z[4],7,-176418897);A=k(A,y,v,B,z[5],12,1200080426);B=k(B,A,y,v,z[6],17,-1473231341);v=k(v,B,A,y,z[7],22,-45705983);y=k(y,v,B,A,z[8],7,1770035416);A=k(A,y,v,B,z[9],12,-1958414417);B=k(B,A,y,v,z[10],17,-42063);v=k(v,B,A,y,z[11],22,-1990404162);y=k(y,v,B,A,z[12],7,1804603682);A=k(A,y,v,B,z[13],12,-40341101);B=k(B,A,y,v,z[14],17,-1502002290);v=k(v,B,A,y,z[15],22,1236535329);y=r(y,v,B,A,z[1],5,-165796510);A=r(A,y,v,B,z[6],9,-1069501632);B=r(B,A,y,v,z[11],14,643717713);v=r(v,B,A,y,z[0],20,-373897302);y=r(y,v,B,A,z[5],5,-701558691);A=r(A,y,v,B,z[10],9,38016083);B=r(B,A,y,v,z[15],14,-660478335);v=r(v,B,A,y,z[4],20,-405537848);y=r(y,v,B,A,z[9],5,568446438);A=r(A,y,v,B,z[14],9,-1019803690);B=r(B,A,y,v,z[3],14,-187363961);v=r(v,B,A,y,z[8],20,1163531501);y=r(y,v,B,A,z[13],5,-1444681467);A=r(A,y,v,B,z[2],9,-51403784);B=r(B,A,y,v,z[7],14,1735328473);v=r(v,B,A,y,z[12],20,-1926607734);y=b(y,v,B,A,z[5],4,-378558);A=b(A,y,v,B,z[8],11,-2022574463);B=b(B,A,y,v,z[11],16,1839030562);v=b(v,B,A,y,z[14],23,-35309556);y=b(y,v,B,A,z[1],4,-1530992060);A=b(A,y,v,B,z[4],11,1272893353);B=b(B,A,y,v,z[7],16,-155497632);v=b(v,B,A,y,z[10],23,-1094730640);y=b(y,v,B,A,z[13],4,681279174);A=b(A,y,v,B,z[0],11,-358537222);B=b(B,A,y,v,z[3],16,-722521979);v=b(v,B,A,y,z[6],23,76029189);y=b(y,v,B,A,z[9],4,-640364487);A=b(A,y,v,B,z[12],11,-421815835);B=b(B,A,y,v,z[15],16,530742520);v=b(v,B,A,y,z[2],23,-995338651);y=i(y,v,B,A,z[0],6,-198630844);A=i(A,y,v,B,z[7],10,1126891415);B=i(B,A,y,v,z[14],15,-1416354905);v=i(v,B,A,y,z[5],21,-57434055);y=i(y,v,B,A,z[12],6,1700485571);A=i(A,y,v,B,z[3],10,-1894986606);B=i(B,A,y,v,z[10],15,-1051523);v=i(v,B,A,y,z[1],21,-2054922799);y=i(y,v,B,A,z[8],6,1873313359);A=i(A,y,v,B,z[15],10,-30611744);B=i(B,A,y,v,z[6],15,-1560198380);v=i(v,B,A,y,z[13],21,1309151649);y=i(y,v,B,A,z[4],6,-145523070);A=i(A,y,v,B,z[11],10,-1120210379);B=i(B,A,y,v,z[2],15,718787259);v=i(v,B,A,y,z[9],21,-343485551);w[0]=f(y,w[0]);w[1]=f(v,w[1]);w[2]=f(B,w[2]);w[3]=f(A,w[3])}function s(w){var x=[],v;for(v=0;v<64;v+=4){x[v>>2]=w.charCodeAt(v)+(w.charCodeAt(v+1)<<8)+(w.charCodeAt(v+2)<<16)+(w.charCodeAt(v+3)<<24)}return x}function o(v){var x=[],w;for(w=0;w<64;w+=4){x[w>>2]=v[w]+(v[w+1]<<8)+(v[w+2]<<16)+(v[w+3]<<24)}return x}function l(D){var w=D.length,v=[1732584193,-271733879,-1732584194,271733878],z,A,B,y,C,x;for(z=64;z<=w;z+=64){n(v,s(D.substring(z-64,z)))}D=D.substring(z-64);A=D.length;B=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(z=0;z<A;z+=1){B[z>>2]|=D.charCodeAt(z)<<((z%4)<<3)}B[z>>2]|=128<<((z%4)<<3);if(z>55){n(v,B);for(z=0;z<16;z+=1){B[z]=0}}y=w*8;y=y.toString(16).match(/(.*?)(.{0,8})$/);C=parseInt(y[2],16);x=parseInt(y[1],16)||0;B[14]=C;B[15]=x;n(v,B);return v}function t(D){var w=D.length,v=[1732584193,-271733879,-1732584194,271733878],z,A,B,y,C,x;for(z=64;z<=w;z+=64){n(v,o(D.subarray(z-64,z)))}D=(z-64)<w?D.subarray(z-64):new Uint8Array(0);A=D.length;B=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(z=0;z<A;z+=1){B[z>>2]|=D[z]<<((z%4)<<3)}B[z>>2]|=128<<((z%4)<<3);if(z>55){n(v,B);for(z=0;z<16;z+=1){B[z]=0}}y=w*8;y=y.toString(16).match(/(.*?)(.{0,8})$/);C=parseInt(y[2],16);x=parseInt(y[1],16)||0;B[14]=C;B[15]=x;n(v,B);return v}function d(x){var w="",v;for(v=0;v<4;v+=1){w+=a[(x>>(v*8+4))&15]+a[(x>>(v*8))&15]}return w}function e(v){var w;for(w=0;w<v.length;w+=1){v[w]=d(v[w])}return v.join("")}if(e(l("hello"))!=="5d41402abc4b2a76b9719d911017c592"){f=function(v,A){var z=(v&65535)+(A&65535),w=(v>>16)+(A>>16)+(z>>16);return(w<<16)|(z&65535)}}if(typeof ArrayBuffer!=="undefined"&&!ArrayBuffer.prototype.slice){(function(){function v(x,w){x=(x|0)||0;if(x<0){return Math.max(x+w,0)}return Math.min(x,w)}ArrayBuffer.prototype.slice=function(E,D){var C=this.byteLength,y=v(E,C),z=C,A,x,B,w;if(D!==c){z=v(D,C)}if(y>z){return new ArrayBuffer(0)}A=z-y;x=new ArrayBuffer(A);B=new Uint8Array(x);w=new Uint8Array(this,y,A);B.set(w);return x}})()}function g(v){if(/[\u0080-\uFFFF]/.test(v)){v=unescape(encodeURIComponent(v))}return v}function h(z,y){var w=z.length,A=new ArrayBuffer(w),v=new Uint8Array(A),x;for(x=0;x<w;x+=1){v[x]=z.charCodeAt(x)}return y?v:A}function m(v){return String.fromCharCode.apply(null,new Uint8Array(v))}function p(y,v,w){var x=new Uint8Array(y.byteLength+v.byteLength);x.set(new Uint8Array(y));x.set(new Uint8Array(v),y.byteLength);return w?x:x.buffer}function q(z){var y=[],w=z.length,v;for(v=0;v<w-1;v+=2){y.push(parseInt(z.substr(v,2),16))}return String.fromCharCode.apply(String,y)}function u(){this.reset()}u.prototype.append=function(v){this.appendBinary(g(v));return this};u.prototype.appendBinary=function(w){this._buff+=w;this._length+=w.length;var v=this._buff.length,x;for(x=64;x<=v;x+=64){n(this._hash,s(this._buff.substring(x-64,x)))}this._buff=this._buff.substring(x-64);return this};u.prototype.end=function(y){var A=this._buff,v=A.length,z,x=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],w;for(z=0;z<v;z+=1){x[z>>2]|=A.charCodeAt(z)<<((z%4)<<3)}this._finish(x,v);w=e(this._hash);if(y){w=q(w)}this.reset();return w};u.prototype.reset=function(){this._buff="";this._length=0;this._hash=[1732584193,-271733879,-1732584194,271733878];return this};u.prototype.getState=function(){return{buff:this._buff,length:this._length,hash:this._hash}};u.prototype.setState=function(v){this._buff=v.buff;this._length=v.length;this._hash=v.hash;return this};u.prototype.destroy=function(){delete this._hash;delete this._buff;delete this._length};u.prototype._finish=function(x,v){var z=v,y,A,w;x[z>>2]|=128<<((z%4)<<3);if(z>55){n(this._hash,x);for(z=0;z<16;z+=1){x[z]=0}}y=this._length*8;y=y.toString(16).match(/(.*?)(.{0,8})$/);A=parseInt(y[2],16);w=parseInt(y[1],16)||0;x[14]=A;x[15]=w;n(this._hash,x)};u.hash=function(w,v){return u.hashBinary(g(w),v)};u.hashBinary=function(x,w){var y=l(x),v=e(y);return w?q(v):v};u.ArrayBuffer=function(){this.reset()};u.ArrayBuffer.prototype.append=function(v){var y=p(this._buff.buffer,v,true),w=y.length,x;this._length+=v.byteLength;for(x=64;x<=w;x+=64){n(this._hash,o(y.subarray(x-64,x)))}this._buff=(x-64)<w?new Uint8Array(y.buffer.slice(x-64)):new Uint8Array(0);return this};u.ArrayBuffer.prototype.end=function(y){var A=this._buff,v=A.length,x=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],z,w;for(z=0;z<v;z+=1){x[z>>2]|=A[z]<<((z%4)<<3)}this._finish(x,v);w=e(this._hash);if(y){w=q(w)}this.reset();return w};u.ArrayBuffer.prototype.reset=function(){this._buff=new Uint8Array(0);this._length=0;this._hash=[1732584193,-271733879,-1732584194,271733878];return this};u.ArrayBuffer.prototype.getState=function(){var v=u.prototype.getState.call(this);v.buff=m(v.buff);return v};u.ArrayBuffer.prototype.setState=function(v){v.buff=h(v.buff,true);return u.prototype.setState.call(this,v)};u.ArrayBuffer.prototype.destroy=u.prototype.destroy;u.ArrayBuffer.prototype._finish=u.prototype._finish;u.ArrayBuffer.hash=function(v,x){var y=t(new Uint8Array(v)),w=e(y);return x?q(w):w};return u}));addEventListener("message",function(h){var b=h.data;var j=File.prototype.slice||File.prototype.mozSlice||File.prototype.webkitSlice,c=2097152,a=Math.ceil(b.size/c),i=0,f=new SparkMD5.ArrayBuffer(),d=new FileReader();d.onload=function(k){f.append(k.target.result);i++;if(i<a){g()}else{postMessage(f.end())}};d.onerror=function(){postMessage(null)};function g(){var k=i*c,e=((k+c)>=b.size)?b.size:k+c;d.readAsArrayBuffer(j.call(b,k,e))}g()},false);';
var uriworker = 'addEventListener("message",function(c){var a=c.data;var b=new FileReader();b.onload=function(d){postMessage(d.target.result)};b.readAsDataURL(a)},false);';

var promise = function () {
    return $.promise();
};

var file = function (filex, type) {
    var _file = filex;
    this._uri="";
    if (is.isString(filex)) {
        if (type) {
            _file = new Blob([filex], {type: type});
        } else {
            this._url=filex;
            _file = file.getBlobFromURI(filex);
        }
    } else if (is.isArray(filex)) {
        _file = new Blob(filex, {type: (type || "text/plain")});
    }
    this.file = _file;
};
file.getBlobFromURI = function (dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) === -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = parts[1];
        return new Blob([raw], {type: contentType});
    }
    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var byteString = atob(parts[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: contentType});
};
file.saveAs = function (blob, filename) {
    var type = blob.type;
    var force_saveable_type = 'application/octet-stream';
    if (type && type !== force_saveable_type) {
        var slice = blob.slice || blob.webkitSlice || blob.mozSlice;
        blob = slice.call(blob, 0, blob.size, force_saveable_type);
    }
    var url = URL.createObjectURL(blob);
    var event = document.createEvent("MouseEvent");
    event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    var t = document.createElement("a");
    t.href = url;
    t.download = filename;
    t.dispatchEvent(event);
};
file.upload = function (option) {
    return request({
        url: option.url || null,
        data: option.file,
        method: "post",
        dataType: "json",
        timeout: option.timeout,
        headers: option.headers || {},
        events: {
            load: function (e) {
                var status = e.target.status;
                if ((status >= 200 && status < 300) || status === 304 || status === 0) {
                    if (option.success) {
                        var a = this.response.responseText;
                        if (option.dataType === "json") {
                            try {
                                a = window.JSON.parse(a);
                            } catch (e) {
                                a = {};
                            }
                        }
                        option.success(a);
                    }
                } else {
                    if (option.error)
                        option.error(e);
                }
            },
            progress: function (e) {
                if (option.progress) {
                    option.progress({
                        total: e.total,
                        loaded: e.loaded,
                        percent: Math.round(e.loaded * 100 / e.total)
                    });
                }
            },
            error: function (e) {
                if (option.error)
                    option.error(e);
            }
        }
    }).fire();
};
file.uploadAsForm = function (option) {
    var formdata = new FormData();
    formdata.append((option.name || "file"), option.file);
    for (var _p in option.data) {
        formdata.append(_p, option.data[_p]);
    }
    return request({
        url: option.url || null,
        data: formdata,
        method: "post",
        dataType: "json",
        timeout: option.timeout,
        headers: option.headers || {},
        events: {
            load: function (e) {
                var status = e.target.status;
                if ((status >= 200 && status < 300) || status === 304 || status === 0) {
                    if (option.success) {
                        var a = this.response.responseText;
                        if (option.dataType === "json") {
                            try {
                                a = window.JSON.parse(a);
                            } catch (e) {
                                a = {};
                            }
                        }
                        option.success(a);
                    }
                } else {
                    if (option.error)
                        option.error(e);
                }
            },
            progress: function (e) {
                if (option.progress) {
                    option.progress({
                        total: e.total,
                        loaded: e.loaded,
                        percent: Math.round(e.loaded * 100 / e.total)
                    });
                }
            },
            error: function (e) {
                if (option.error)
                    option.error(e);
            }
        }
    }).fire();
};

file.prototype.isSame = function (file) {
    var t = file;
    if (file.file) {
        t = file.getFile();
    }
    return this.file.lastModified === t.lastModified && this.file.size === t.size && this.file.type === t.type;
};
file.prototype.getFile = function () {
    return this.file;
};
file.prototype.getFileName = function () {
    return this.file ? this.file.name : "";
};
file.prototype.getFileSize = function (type, size) {
    var a = this.file.size;
    if (type === "MB") {
        a = this.file.size / (1024 * 1024);
    } else if (type === "KB") {
        a = this.file.size / 1024;
    } else if (type === "GB") {
        a = this.file.size / (1024 * 1024 * 1024);
    }
    if (arguments.length === 2) {
        a = a.toFixed(size) / 1;
    }
    return a;
};
file.prototype.getFileSizeAuto = function (radmon) {
    var v = 0, unit = "BYTE", byteSize = this.file.size;
    radmon = radmon || 0;
    if (byteSize >= 1073741824) {
        v = (byteSize / 1073741824).toFixed(radmon);
        unit = "GB";
    } else if (byteSize >= 1048576) {
        v = (byteSize / 1048576).toFixed(radmon);
        unit = "MB";
    } else if (byteSize >= 1024) {
        v = (byteSize / 1024).toFixed(radmon);
        unit = "KB";
    } else {
        v = byteSize;
        unit = "B";
    }
    return v + unit;
};
file.prototype.getFileType = function () {
    return this.file ? this.file.type : "";
};
file.prototype.getFileURI = function () {
    var ps = promise();
    if(this._uri){
        ps.resolve(this._uri);
    }else{
        var reader = new FileReader();
        reader.onload = function (e) {
            ps.resolve(e.target.result);
        };
        reader.readAsDataURL(this.file);
    }
    return ps;
};
file.prototype.getFileURL = function () {
    return window.URL.createObjectURL(this.file);
};
file.prototype.getFileURIByWorker = function () {
    var ps = promise();
    var worker = new Worker(window.URL.createObjectURL(new Blob([uriworker], {type: "text/javascript"})));
    worker.addEventListener("message", function (e) {
        ps.resolve(e.data);
    });
    worker.postMessage(this.file);
    return ps;
};
file.prototype.getFileHash = function () {
    var ps = promise();
    var worker = new Worker(window.URL.createObjectURL(new Blob([md5], {type: "text/javascript"})));
    worker.addEventListener("message", function (e) {
        ps.resolve(e.data);
    });
    worker.postMessage(this.file);
    return ps;
};
file.prototype.getSuffix = function () {
    if (this.getFileName()) {
        var name = this.getFileName().split(".");
        if (name.length > 1) {
            return name[name.length - 1];
        } else {
            return "";
        }
    } else {
        return "";
    }
};
file.prototype.isSuffixWith = function (suffix) {
    return suffix === this.getSuffix();
};
file.prototype.isTypeOf = function (type) {
    var typet = this.getFileType();
    return typet === type;
};
file.prototype.createImageElement = function () {
    var ps = promise();
    if (this.file.type.indexOf("image") !== -1) {
        this.getFileURI().done(function (a) {
            var image = document.createElement("img");
            image.src = a;
            ps.resolve({
                uri: a,
                element: image
            });
        });
    } else {
        ps.reject();
    }
    return ps;
};
file.prototype.compressImage = function (quality) {
    var ps = promise(), ths = this;
    this.createImageElement().done(function (a) {
        var cvs = document.createElement('canvas');
        cvs.width = a.width;
        cvs.height = a.height;
        cvs.getContext("2d").drawImage(a, 0, 0);
        ps.resolve(new file(cvs.toDataURL(ths.file.type, quality / 100)));
    }).fail(function () {
        ps.reject();
    });
    return ps;
};
file.prototype.createImageCanvas = function (width, height) {
    var ps = promise();
    if (this.file.type.indexOf("image") !== -1) {
        this.getFileURI().done(function (a) {
            var image = document.createElement("img");
            image.src = a;
            var _width = image.width, _height = image.height;
            var _w = 0, _h = 0;
            if (_width > width) {
                _w = width;
                _h = _height / _width * width;
                if (_h > height) {
                    _h = height;
                    _w = _width / _height * height;
                }
            } else if (_height > height) {
                _h = height;
                _w = _width / _height * height;
                if (_w > width) {
                    _w = width;
                    _h = _height / _width * width;
                }
            }
            var _x = (width - _w) / 2, _y = (height - _h) / 2;
            var cvs = document.createElement('canvas');
            cvs.width = width;
            cvs.height = height;
            cvs.getContext("2d").drawImage(image, 0, 0, image.width, image.height, _x, _y, _w, _h);
            ps.resolve({
                uri: a,
                element: cvs
            });
        });
    } else {
        ps.reject();
    }
    return ps;
};
file.prototype.saveAs = function (filename) {
    file.saveAs(this.file, filename);
};
file.prototype.upload = function (option) {
    option.file = this.file;
    return file.upload(option);
};
file.prototype.uploadAsForm = function (option) {
    option.file = this.file;
    return file.uploadAsForm(option);
};
file.prototype.getChunk = function (from, size, mime) {
    var blob = this.file;
    var slice = blob.slice || blob.webkitSlice || blob.mozSlice;
    var args = [from];
    if (arguments.length === 2) {
        if (is.isString(mime)) {
            args.push(size);
        } else {
            args.push(from + size);
        }
    } else if (arguments.length === 3) {
        args.push(from + size);
        args.push(mime);
    }
    return slice.apply(blob, args);
};
file.prototype.uploadChunk = function (option) {
    var from = option.from, size = option.size, mime = option.mime;
    var args = [];
    if (from !== undefined && from !== null) {
        args.push(from);
    }
    if (size !== undefined && size !== null) {
        args.push(size);
    }
    if (mime !== undefined && mime !== null) {
        args.push(mime);
    }
    option.file = this.getChunk.apply(this, args);
    return file.upload(option);
};
file.prototype.getChunks = function (from, size, mime) {
    var ths = this;
    var blob = this.file;
    var slice = blob.slice || blob.webkitSlice || blob.mozSlice;
    var sizet = ths.getFileSize();
    var q = parseInt((sizet - from) / size);
    var r = [];
    for (var i = 0; i < q; i++) {
        var args = [from + i * size, from + (i + 1) * size, mime];
        r.push(slice.apply(blob, args));
    }
    r.push(slice.apply(blob, [from + q * size, sizet, mime]));
    return r;
};
module.exports = function (filex, type) {
    return new file(filex, type);
};
