var area=1;
var areaSize=1;//0推荐，1导航栏，2订阅，3视频，45推荐位
// var line0Size=1;
// var line0Pos=0;
var line1Size=3;
var line1Pos=0;
var needmoney=0;
var custname="";
var custname="";
var list;
var QRCodeList=[];
var checkOrderInterval;
var a=3;
function init(){
    ajaxGetPriceList();
    checkOrderInterval = setInterval(function() {
        ajaxGetOrderStatus(stbId);
    },3000)
}
function ajaxGetOrderStatus(_stdId) {
    $AJAX(
    {
        url: reqUrl + "api/netapi/query?stbId=" + _stdId,
        method: "get",
        async: true,
        success:
            function (resp) {
                eval("var Json = " + resp.responseText);
                //Json.code=200;
                // if(Json.code==200){
                //     clearInterval(checkOrderInterval);
                // }
                if(Json.code==200){
                    clearInterval(checkOrderInterval);
                    if(getCookie("orderReturnUrl")){
                        window.location.href = getCookie("orderReturnUrl");
                    }
                    else{
                        window.location.href="../homePage/homePage.html";
                    }
                }else{
                    
                }
                
            },
        failed:
            function (resp) {

            }
    });
}
function ajaxGetPriceList() {
    $AJAX(
        {
            url: reqUrl + "api/upgapi/package/list",
            method: "get",
            async: true,
            success:
                function (resp) {
                    eval("var menuJson = " + resp.responseText);
                    list = menuJson.data;
                    if(getCookie("needmoney") && getCookie("custname") && getCookie("custid")){
                        needmoney=getCookie("needmoney");
                        custname=getCookie("custname");
                        custid=getCookie("custid");
                        getQRCodes();
                    }else{
                        ajaxGetCust(stbId);
                    }
                },
            failed:
                function (resp) {

                }
        });
    }
function ajaxGetQRCode(_param,_callBack,index) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', reqUrl + "api/upgapi/pay", true);
    xhr.responseType = 'arraybuffer'; // 重点
    var that = this; // 这个不是必须，只是用来保存this的指向
    xhr.onload = function(e) {
        if (this.status == 200) {
            var result = this.response;
            console.log(result)
            // $("QRCode").src="data:image/png;base64,"+transformArrayBufferToBase64(result);
            QRCodeList[index]=transformArrayBufferToBase64 (result);
            if(index==0){
                focMove(0);
                setTimeout(function(){
                    attachEvent();
                },300);

            }
       }
    };
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xhr.send(stringify(_param));
}
function transformArrayBufferToBase64 (buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    for (var len = bytes.byteLength, i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}
function ajaxGetCust(_stbId) {
    $AJAX(
        {
            url: reqUrl + "api/upgapi/cust/info?stbId="+_stbId,
            method: "get",
            async: true,
            success:
                function (resp) {
                    eval("var menuJson = " + resp.responseText);
                    var json = eval("("+menuJson.data+")");
                    needmoney=json.output.needmoney;
                    custname=json.output.custname;
                    custid=json.output.custid;
                    SetCookie("needmoney",needmoney);
                    SetCookie("custname",custname);
                    SetCookie("custid",custid);
                    getQRCodes();
                    
                },
            failed:
                function (resp) {

                }
        }
    );
}

function getQRCodes(){
    for(var i=0;i<3;i++){
        var param={
            "custId": custid,
            "custName": custname,
            "orderType": "01",
            "packageId": list[i].packageId,
            "productList": [{
                "productName":list[i].title,
                "fee":list[i].price
                }
            ],
            "stbId": stbId,
            "totalFee": list[i].price
        };
        ajaxGetQRCode(param,"callBack"+i,i);
    }
}
//焦点移动
function focMove(_num){
	if(area==1){
		if(line1Pos + _num < line1Size && line1Pos + _num >=0){
            line1Pos+=_num;
            for(var i=0;i<3;i++){
                $("line1"+i).className="line"+area+i;
                var str="";
                str+='<div class="title">'+list[i].title+'</div>'
                str+='<div class="price"><div class="sym">￥</div><div class="sum">'+list[i].price+'<span class="unit">'+list[i].unit+'</span></div></div>'
                str+='<div id="oldPrice" class="oldPrice">￥'+list[i].origPrice+'元</div>'
                // str+='<img id="QRCode" src="data:image/png;base64,'+QRCodeList[i]+'"/>'
                // str+='<div class="tip">使用支付宝扫码支付</div>'
                // str+='<div class="Arrearage">账户余额：<span class="arrMoney0">-￥120</span><br/>资费已包含欠费</div>';
                $("line1"+i).innerHTML=str;
            }
            $("line1"+line1Pos).className="line"+area+line1Pos+"Foc";
            var focStr="";
            focStr+='<div class="title">'+list[line1Pos].title+'</div>'
            focStr+='<div class="priceFoc"><div class="sym">￥</div><div class="sum">'+list[line1Pos].price+'<span class="unit">'+list[i].unit+'</span></div></div>'
            focStr+='<div id="oldPrice" class="oldPriceFoc">￥'+list[line1Pos].origPrice+'元</div>'
            focStr+='<img id="QRCode" src="data:image/png;base64,'+QRCodeList[line1Pos]+'"/>'
            focStr+='<div class="tip">使用支付宝扫码支付</div>'
            if(needmoney<0){
                focStr+='<div class="Arrearage">账户余额：<span class="arrMoney'+line1Pos+'">-￥'+needmoney+'</span><br/>资费已包含欠费</div>';
            }
            $("line1"+line1Pos).innerHTML=focStr;

		}
    }
    
}

function setHomeCookie(_area,_pos){
    SetCookie("homeArea", _area);
    SetCookie("homePos", _pos);
}

function doselect(){
    if (area == 0) {
        
    } else if (area == 1) {
        //window.location.href = "../vod/vodPlay.htm?rtspUrl=" + movies[countFlag];
    } 
}

// //vod视频播放
// function startVideo(__num) {
//     try {
//         DVB.stopAV();
//         media.video.setPosition(50, 138, 602, 342);
//         VOD.changeServer("isma_v2", "ip_ts");
//         media.AV.open(videoList[__num], "VOD");
//     }
//     catch (e) { }
// }



// //vod视频退出
// function stopVideo() {
//     try {
//         media.AV.stop();
//         media.AV.close();
//         DVB.stopAV();
//     }
//     catch (e) { }
// }

function attachEvent() {
    document.onkeydown = grabEvent;
    document.onsystemevent = grabEvent;
    document.onirkeypres = grabEvent;
}

function grabEvent() {
    var key_code = event.which != undefined ? event.which : event.keyCode;
    try{
        iPanel.debug("keycode=="+keycode);
    }catch(e){
        console.log(e);
    }
    switch (key_code) {
        case 1: //up
        case 38:
        	
            return 0;
            break;
        case 2: //down
        case 40:
        	
            return 0;
            break;
        case 3: //left
        case 37:
            if(area==1){
                focMove(-1);
        	}
            return 0;
            break;
        case 4: //right
        case 39:
        	if(area==1){
                focMove(1);
        	}
            return 0;
            break;
        case 13: //enter
        	doselect();
            return 0;
            break;
        case 340: //back
        case 65:
        case 45:
        case 81:
            if(getCookie("orderReturnUrl")){
                window.location.href = getCookie("orderReturnUrl");
            }
            else{
                // window.location.href="../category/category.html";
                window.location.href="../homePage/homePage.html";
            }
            return 0;
            break;
        
            
    }
}

