var area=1;
var areaSize=1;//0推荐，1导航栏，2订阅，3视频，45推荐位
// var line0Size=1;
// var line0Pos=0;
var line1Size=3;
var line1Pos=0;
var needmoney=0;
var custname="";
var custid="";
var list;
var orderNum="";
var QRCodeList=[];
var checkOrderInterval;
function init() {
    setPoint("ATUY9C5R",stbId);
    ajaxGetPriceList();
    
}


//var menuJson ={"code":200,"msg":"OK","data":{"custInfo":{"output":{"accountmoney":"10","address":"解放街 -- -- 其他 535","areaid":"6001","needmoney":"0","custid":"10070206414","custname":"大众市场测试机"},"status":"0"},"packages":[{"sort":"01","updateDate":"2020-03-06 16:14:07","createDate":"2020-02-11 15:22:49","createName":"管理员","createBy":"admin","title":"1个月","orderNo":"ZQKT20200324103946242","packageId":"800500597467","price":"0.05","updateName":"管理员","updateBy":"admin","imgUrl":"/20200324/1585017586265.png","origPrice":"30","unit":"元","remark":"","duration":"1","id":"957e5af4703316bd017033210d120015"},{"sort":"02","updateDate":"2020-02-28 09:46:58","createDate":"2020-02-11 15:25:02","createName":"管理员","createBy":"admin","title":"3个月","orderNo":"ZQKT20200324103946285","packageId":"800500597548","price":"0.02","updateName":"管理员","updateBy":"admin","imgUrl":"/20200324/1585017586306.png","origPrice":"90","unit":"元","remark":"","duration":"90","id":"957e5af4703316bd0170332313410017"},{"sort":"03","updateDate":"2020-02-28 09:47:03","createDate":"2020-02-11 15:25:59","createName":"管理员","createBy":"admin","title":"12个月","orderNo":"ZQKT20200324103946321","packageId":"800500597549","price":"0.03","updateName":"管理员","updateBy":"admin","imgUrl":"/20200324/1585017586344.png","origPrice":"400","unit":"元","remark":"","duration":"365","id":"957e5af4703316bd01703323f50f001b"}]}};

function ajaxGetQueryStatus() {
    $AJAX(
    {
        url: reqUrl + "api/netapi/query/status?orderNo=" + orderNum+"&time="+new Date().getTime(),
        method: "get",
        async: true,
        success:
            function (resp) {
                eval("var Json = " + resp.responseText);
                // if(Json.code==200){
                //     clearInterval(checkOrderInterval);
                // }
				//alert(Json.msg);
                if(Json.code==0){
                    clearInterval(checkOrderInterval);
                    //delCookie("needmoney");
                    //delCookie("custname");
                    //delCookie("custid");
                    $("successbg").style.display="block";
                    setTimeout(function(){
                        if(getCookie("orderReturnUrl")){
                            window.location.href = getCookie("orderReturnUrl");
                        }
                        else{
                            window.location.href="../homePage/homePage.html";
                        }
                    },3000);
                    
                }else if(Json.code==412){
					
                    //继续轮训
                }else{
                    //订购失败
                    clearInterval(checkOrderInterval);
                    $("errorbg").style.display="block";
                    area=2;
                }
                
            },
        failed:
            function (resp) {

            }
    });
}





function ajaxGetPriceList() {
	 $("loading").style.display="block";
    $AJAX(
        {
            url: reqUrl + "api/upgapi/orderinfo?stbId="+stbId+"&time="+new Date().getTime(),
            method: "get",
            async: true,
            success:
                function (resp) {
                     $("loading").style.display="none";
					eval("var menuJson = " + resp.responseText);
                    list = menuJson.data;
					orderNum=encodeURIComponent(list.packages[0].orderNo+"|"+list.packages[1].orderNo+"|"+list.packages[2].orderNo);
                        focMove(0);
                        setTimeout(function () {
                            attachEvent();
                        }, 300);
                        //第一个二维码加载出来之后开始轮询订购状态
                        checkOrderInterval = setInterval(function () {
                            ajaxGetQueryStatus();
                        }, 3000)
					
					
					
                    //if (getCookie("needmoney") && getCookie("custname") && getCookie("custid")) {
                        //needmoney = Math.abs(Number(getCookie("needmoney")));
                        //custname = decodeURIComponent(getCookie("custname"));
                        //custid = getCookie("custid");
                        //alert(1);
                        //getQRCodes();

                    //} 
					//else {
                        //alert(2);
                    //    ajaxGetCust(stbId);
                    //}
                },
            failed:
                function (resp) {
					console.log(resp);
                      //alert(resp);
                }
        });
    }
	







//焦点移动
function focMove(_num) {
	if(area==1){
		if(line1Pos + _num < line1Size && line1Pos + _num >=0){
            line1Pos+=_num;
            for(var i=0;i<3;i++){
                $("line1"+i).className="line"+area+i;
                var str="";
                str+='<div class="title">'+list.packages[i].title+'</div>'
                str+='<div class="price"><div class="sym">￥</div><div class="sum">'+list.packages[i].price+'<span class="unit">'+list.packages[i].unit+'</span></div></div>'
                str+='<div id="oldPrice" class="oldPrice">￥'+list.packages[i].origPrice+'元</div>'
                // str+='<img id="QRCode" src="data:image/png;base64,'+QRCodeList[i]+'"/>'
                // str+='<div class="tip">使用支付宝扫码支付</div>'
                // str+='<div class="Arrearage">账户余额：<span class="arrMoney0">-￥120</span><br/>资费已包含欠费</div>';
                $("line1"+i).innerHTML=str;
            }
            $("line1"+line1Pos).className="line"+area+line1Pos+"Foc";
            var focStr="";
            focStr+='<div class="title">'+list.packages[line1Pos].title+'</div>'
            focStr+='<div class="priceFoc"><div class="sym">￥</div><div class="sum">'+list.packages[line1Pos].price+'<span class="unit">'+list.packages[line1Pos].unit+'</span></div></div>'
            focStr+='<div id="oldPrice" class="oldPriceFoc">￥'+list.packages[line1Pos].origPrice+'元</div>'
            //focStr+='<img id="QRCode" src="data:image/png;base64,'+QRCodeList[line1Pos]+'"/>'
            focStr += '<img id="QRCode" src="' +reqUrl+ "img/server/qrcode"+list.packages[line1Pos].imgUrl + '"/>'
            focStr+='<div class="tip">使用支付宝扫码支付</div>'
			needmoney=list.custInfo.output.needmoney;
            if(needmoney>0){
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
    } else if (area == 2) {
        //订购失败时，按确定
        if(getCookie("orderReturnUrl")){
            window.location.href = getCookie("orderReturnUrl");
        }
        else{
            window.location.href="../homePage/homePage.html";
        }
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
    // try{
    //     iPanel.debug("keycode=="+keycode);
    // }catch(e){
    //     console.log(e);
    // }
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

