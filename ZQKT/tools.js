//获得链接参数
String.prototype.getQueryString = function (name) {
    var reg = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)"), r;
    if (r = this.match(reg))
        return r[2];
        //return unescape(r[2]);
    return null;
};
function $(id) {
    return document.getElementById(id);
}
//获得全局变量
function GetGlobalVar(key) {
    try{
    var _value=iPanel.getGlobalVar(key);
    return _value;
    }
    catch(e){return null;}
}

//保存全局变量,断电后消失
function SetGlobalVar(key, value) {
    try{
    iPanel.setGlobalVar(key, value);
    }
    catch(e){}
}
//滚动word 文字信息 size 文字信息超过长度将滚动
function ifRoll(word, _size) {
    if (word && (word.length > _size)) {
        return '<marquee id="scroll" direction="left" scrollamonut="10" scrolldelay="100">' + word + '</marquee>';
    } else {
        return word;
    }
}
/*//读取永久存储
function getCookie(key) {
    try {
        var _value = iPanel.misc.getGlobal(key);
        return _value;
    }
    catch (e) { }
}

//写入永久存储
function SetCookie(key,value) {
    try {
        iPanel.misc.setGlobal(key, value);
        iPanel.misc.save();
    }
    catch (e) {}
}*/
//数据埋点
function setPoint(_id,_stbid) {
    $AJAX(
        {
            url: "http://21.254.218.116:8080/zqkt/api/stbapi/buriedPointPvUv?stbid="+_stbid+"&code="+_id,
            method: "get",             
            async: true,               
            success:                   
                function (resp) {
                    eval("pointJson = " + resp.responseText);
                    
                },
            failed:                    
                function (resp) {
                    
                }
        });
}
//读取机顶盒号
function ReadStbidNo() {
    try {
        //var stbid="01001700522020A8BD3A22F792";
        //11040010100052544c1a0099
        //010002136327B0CCE8AC10831B
        var stbid = hardware.STB.serial;
        //var stbid= wasuWeb.getStbId();//TVOS
        return stbid;
    }
    catch (e) { return "010002136327B0CCE8AC10831B"; }
}

//读取智能卡号
function ReadCardNo() {
    try {
        var cardno = CA.card.serialNumber
        return cardno;
    }
    catch (e) { return null; }
}




//ajax封装
function $AJAX(request) {
    var req;
    var url = request.url;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        req = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        req = new ActiveXObject("Microsoft.XMLHTTP");
    }
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200)
                request.success(req);
            else
                request.failed(req);
        }
    }
    var data;
    var method = "GET";
    if (request.method != undefined)
        method = request.method;
    var async = true;
    if (request.async != undefined)
        async = request.async;
    req.open(method, url, async);
    if(method == "POST"){
        data = request.data;
        data = (function(obj){
            var str = "";

            for(var prop in obj){
                str += prop + "=" + obj[prop] + "&"
            }
            return str;
        })(data);
        req.send(data); //
    }else{
        req.send(); //
    }
}

////ajax封装
//function $AJAX(request) {
//    var req;
//    var url = request.url;
//    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
//        req = new XMLHttpRequest();
//    }
//    else {// code for IE6, IE5
//        req = new ActiveXObject("Microsoft.XMLHTTP");
//    }
//    req.onreadystatechange = function () {
//        if (req.readyState == 4) {  //0: 请求未初始化1: 服务器连接已建立2: 请求已接收3: 请求处理中4: 请求已完成，且响应已就绪
//            if (req.status == 200)
//                request.success(req);
//            else
//                request.failed(req);
//        }
//    }
//    var method = "GET";
//    if (request.method != undefined)
//        method = request.method;
//    var async = true;
//    if (request.async != undefined)
//        async = request.async;
//    
//    req.open(method, url, async); //与服务端建立连接(请求方式post或get，地址,true表示异步)
//    if(request.method=="POST"){
//        req.setRequestHeader("Content-Type", "application/json;charset=utf-8");
//        req.send(request.param); //发送请求
//    }else{
//        req.send();
//    }
//    
//}


//存储cookies
function SetCookie(name,value)
{
	var exp = new Date(); 
	exp.setTime(exp.getTime() + (30*24*60*60*1000));
	window.document.cookie = name + "=" + escape (value) + "; expires=" + exp.toGMTString()+";path=/";
}
//读取cookies
function getCookie(sName){
    var aCookie = document.cookie.split("; ");
    for (var i=0; i < aCookie.length; i++)
    {
        var aCrumb = aCookie[i].split("=");
        if (sName == aCrumb[0]){
            return unescape(aCrumb[1]);
        }
    }
    return null;
}
//删除cookies
function delCookie(name){ 
	var exp = new Date(); 
	exp.setTime(exp.getTime() -1000);
	window.document.cookie = name + "= null; expires=" + exp.toGMTString()+";path=/";
}
//文本字数
function getWordSize(__num) {
    if (__num.length > wordSize) {
        return __num.slice(0, wordSize - 1) + "...";
    }
    else {
        return __num;
    }
}

(function (NS) {
    var simpleTypes = ["number", "boolean", "undefined", "string", "function"]
    function stringify(object) {
        var type = typeof object
        if (indexOf(simpleTypes, type) > -1) {
            return parseSimpleObject(object);
        }
        if (object instanceof Array) {
            var len = object.length;
            var resArr = [];
            for (var i = 0; i < len; i++) {
                var itemType = typeof object[i];
                if (indexOf(simpleTypes, itemType) > -1) {
                    if (itemType != "undefined") {
                        resArr.push(parseSimpleObject(object[i]));
                    }
                    else {
                        resArr.push('null')
                    }
                }
                else {
                    resArr.push(stringify(object[i]))
                }
            }
            return "[" + resArr.join(",") + "]"
        }
        if (object instanceof Object) {
            if (object == null) {
                return "null"
            }
            var resArr = []
            for (var name in object) {
                var itemType = typeof object[name];
                if (indexOf(simpleTypes, itemType) > -1) {
                    if (itemType != 'undefined') {
                        resArr.push("\"" + name + "\":" + parseSimpleObject(object[name]))
                    }
                }
                else {
                    resArr.push("\"" + name + "\":" + stringify(object[name]))
                }
            }
            return "{" + resArr.join(",") + "}"
        }
    }
    function parseSimpleObject(object) {
        var type = typeof object;
        if (type == "string" || type == "function") {
            return "\"" + object.toString().replace(/"/g, "\\\"") + "\""
        }
        if (type == "number" || type == "boolean") {
            return object.toString()
        }
        if (type == "undefined") {
            return "undefined"
        }
        return "\"" + object.toString().replace("\"", "\\\"") + "\""
    }
    function indexOf(arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === val) {
                return i;
            }
        }
        return -1
    }
    NS.stringify = function (object, isEncodeZh) {
        var res = stringify(object)
        if (isEncodeZh) {
            var encodeRes = "";
            for (var i = 0; i < res.length; i++) {
                if (res.charCodeAt(i) < Oxff) {
                    encodeRes += res[i]
                }
                else {
                    encodeRes += "\\u" + res.charCodeAt(i).toString(16);
                }
            }
            res = encodeRes
        }
        return res;
    }
})(window);