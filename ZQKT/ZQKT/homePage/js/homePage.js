var area=0;
var areaSize=7;//0推荐，1导航栏，2订阅，3视频，456推荐位
var line0Size=1;
var line0Pos=0;
var line1Size=8;
var line1Pos=0;
var line2Size=1;
var line2Pos=0;

var line3Size=1;
var line2Pos=0;
var line4Size=2;
var line4Pos=0;
var line5Size=3;
var line5Pos=0;
var line6Size=1;
var line6Pos=0;
var posiList=[];
var hotlist=[];
var videoId;
var videoList = [];
var videoPos = 0;
var videoSize = 0;
var orderStatus=0;//0未订购，1已订购
// var newsPage=1;
// var newsPageSize=0;
var navList=["402809246e7d1ec6016e7d2785c0000f","4028988b6f78fb86016f831ece010011","402809246e7d1ec6016e7d29155e001d","402809246e7d1ec6016e7d28e8de001b","4028988b6f83432a016f8348c9ce0008","4028988b6f83432a016f83495044000a","402809246e7d1ec6016e7d28c28a0019","402809246e7d1ec6016e7d2894e30017"];
var pos;
var recommendData={};

function init(){
	// getList(homePageList,1,5);
	area = getCookie("homeArea") ? Number(getCookie("homeArea")) : 0;
    pos = getCookie("homePos") ? Number(getCookie("homePos")) : 0;
    delCookie("homeArea");
    delCookie("homePos");
    eval("line"+area+"Pos="+pos);
	
	//$("lineFoc").className="lineFoc13";
    //startVideo(0);
    focMove(0);
    setTimeout(function(){
        attachEvent();
    },300);
    ajaxGetRecommend(stbId,regionId);
    ajaxGetOrderStatus(stbId);
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
                orderStatus=Json.code==200?1:0;
                if(orderStatus==1){
                    $("line20").style.display="block";
                }else{
                    line2Size=0;
                }
            },
        failed:
            function (resp) {

            }
    });
}


function ajaxGetRecommend(_stdId,_regionId) {
    $AJAX(
    {
        url: reqUrl + "api/stbContentController/posList?stbId=" + _stdId+"&regionId="+_regionId,
        method: "get",
        async: true,
        success:
            function (resp) {
                eval("var menuJson = " + resp.responseText);
                var json = menuJson.data;
                initRecommend(json);
            },
        failed:
            function (resp) {

            }
    });
}

//焦点移动
function focMove(_num){
    if(area==0){
		if(line0Pos + _num < line0Size && line0Pos + _num >=0){
			line0Pos+=_num;
			$("lineFoc").className="lineFoc"+area+line0Pos;
		}
	}
	if(area==1){
		if(line1Pos + _num < line1Size && line1Pos + _num >=0){
			line1Pos+=_num;
            $("lineFoc").className="lineFoc"+area+line1Pos;
		}
    }
    if(area==2){
		if(line2Pos + _num < line2Size && line2Pos + _num >=0){
			line2Pos+=_num;
            $("lineFoc").className="lineFoc"+area+line2Pos;
		}
	}
	if(area==3){
		if(line2Pos + _num < line3Size && line2Pos + _num >=0){
            line2Pos+=_num;
            $("lineFoc").className="lineFoc"+area+line2Pos;
		}
	}
	if(area==4){
        if(line4Pos + _num < line4Size && line4Pos + _num >=0){
            line4Pos+=_num;
            $("lineFoc").className="lineFoc"+area+line4Pos;
		}
    }
    if(area==5){
        if(line5Pos + _num < line5Size && line5Pos + _num >=0){
            line5Pos+=_num;
            $("lineFoc").className="lineFoc"+area+line5Pos;
		}
    }
    if(area==6){
        if(line6Pos + _num < line6Size && line6Pos + _num >=0){
            line6Pos+=_num;
            $("lineFoc").className="lineFoc"+area+line6Pos;
		}
	}
}
function setHomeCookie(_area,_pos){
    SetCookie("homeArea", _area);
    SetCookie("homePos", _pos);
}
// function callBack(){
// 	window.location.href = "../vod/vodPlay.htm?rtspUrl=" + detailJson.data.contentInfo;
// }
function initRecommend(_json){
    posiList=_json.posiList;
    hotlist=_json.hotlist;
    if(posiList[0].categoryType==0){
        //推荐页1
        $("line30").innerHTML='<img id="pic0" src="'+reqUrl+'img/server/'+posiList[0].recommenPositionImg+'" width="589px" height="337px">';
    }else{
        //小窗口视频播放
        movies = [posiList[0].description];
        indexmovies = movies[0];
        initMedia(338, 137, 603, 340);
    }
    $("line50").innerHTML='<img id="pic0" src="'+reqUrl+'img/server/'+posiList[1].recommenPositionImg+'" width="292px" height="166px">';
    $("line51").innerHTML='<img id="pic0" src="'+reqUrl+'img/server/'+posiList[2].recommenPositionImg+'" width="292px" height="166px">';
    $("line52").innerHTML='<img id="pic0" src="'+reqUrl+'img/server/'+posiList[3].recommenPositionImg+'" width="292px" height="166px">';
    $("line40").innerHTML='<img id="pic0" src="'+reqUrl+'img/server/'+hotlist[0].recommenPositionImg+'" width="292px" height="166px">';
    $("line41").innerHTML='<img id="pic0" src="'+reqUrl+'img/server/'+hotlist[1].recommenPositionImg+'" width="292px" height="166px">';
    $("line60").innerHTML='<img id="pic0" src="'+reqUrl+'img/server/'+posiList[4].recommenPositionImg+'" width="293px" height="509px">';
}
function doselect(){
    if (area == 0) {
        window.location.href = "../homePage/homePage.html";
    } else if (area == 1) {
        SetCookie("categoryReturnUrl", location.href);
        window.location.href = "../category/category.html?parentId=" + encodeURIComponent(navList[line1Pos])+"&line1Pos="+line1Pos;
    } else if (area == 2) {
        //订阅
        SetCookie("orderReturnUrl", location.href);
        setHomeCookie(area,line2Pos);
        window.location.href = "../order/order.html";
    } else if (area == 3) {
        SetCookie("detailReturnUrl", location.href);
        setHomeCookie(area,line2Pos);
        if(posiList[0].categoryType==0){
            //推荐页1
            window.location.href = "../detail/detail.html?catecoryId="+posiList[0].id;
        }else{
            //视频全屏播放
            window.location.href = "../vod/vodPlay.htm?rtspUrl=" + posiList[0].description;
        }
        
    } else if (area == 4) {
        SetCookie("detailReturnUrl", location.href);
        setHomeCookie(area,line4Pos);
        window.location.href = "../detail/detail.html?catecoryId="+posiList[line4Pos].id;
    } else if (area == 5) {
        SetCookie("detailReturnUrl", location.href);
        setHomeCookie(area,line5Pos);
        window.location.href = "../detail/detail.html?catecoryId="+posiList[line5Pos+1].id;
    } else if (area == 6) {
        SetCookie("detailReturnUrl", location.href);
        setHomeCookie(area,line6Pos);
        window.location.href = "../detail/detail.html?catecoryId="+posiList[4].id;
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
        	if(area==1){
        		if(line1Pos>=4 && line1Pos <= 7){
                    focMove(-4);
                }
        	}else if(area==3){
                area=1;
                line1Pos=4;
                focMove(0);
        	}else if(area==4){
                area=3;
                focMove(0);
        	}else if(area==5){
                if(line5Pos==0){
                    area=1;
                    line1Pos=6;
                    focMove(0);
                }else{
                    focMove(-1);
                }
        	}else if(area==6){
                area=1;
                line1Pos=7;
                focMove(0);
        	}
            return 0;
            break;
        case 2: //down
        case 40:
        	if(area==0){
                area=3;
                focMove(0);
        	}else if(area==1){
        		if(line1Pos>=0 && line1Pos <= 3){
                    focMove(4);
                }else if(line1Pos==4 || line1Pos==5){
                    area=3;
                    focMove(0);
                }else if(line1Pos==6){
                    area=5;
                    line5Pos=0;
                    focMove(0);
                }else if(line1Pos==7){
                    area=6;
                    focMove(0);
                }
        	}else if(area==2){
                area=6;
        		focMove(0);
        	}else if(area==3){
                area=4;
                focMove(0);
        	}else if(area==5){
                focMove(1);
        	}
            return 0;
            break;
        case 3: //left
        case 37:
            if (area == 1) {
                if(line1Pos==0 || line1Pos==4){
                    area=0;
                    focMove(0);
                }else{
                    focMove(-1);
                }
                
            } else if (area == 2) {
                area=1;
                line1Pos=3;
                focMove(0);
            } else if (area == 4) {
                focMove(-1);
            }else if (area == 5) {
                if(line5Pos==0 || line5Pos==1){
                    area=3;
                    focMove(0);
                }else{
                    area=4;
                    line4Pos=1;
                    focMove(0);
                }
            }else if (area == 6) {
                area=5;
                focMove(0);
            }
            return 0;
            break;
        case 4: //right
        case 39:
        	if(area==0){
                area=1;
                line1Pos=0;
                focMove(0);
        	}else if(area==1){
                if(line1Pos==3 || line1Pos==7){
                    if(line2Size>0){
                        area=2;
                        focMove(0);
                    }
                }else{
                    focMove(1);
                }
        	}else if(area==3){
                area=5;
                line5Pos=0;
                focMove(0);
        	}else if(area==4){
                if(line4Pos==0){
                    focMove(1);
                }else{
                    area=5;
                    line5Pos=2;
                    focMove(0);
                }
        	}else if(area==5){
                area=6;
                focMove(0);
        	}
            return 0;
            break;
        case 13: //enter
        	doselect();
            return 0;
            break;
        case 340: //back
        case 65:
            window.location.href=location.href.getQueryString("returnUrl");
            return 0;
            break;
        case 5210:
                media.AV.close();
              setTimeout("playVOD()",2000);
                //setTimeout("playVOD()",00);
              return 0;
              break;
          case 5202:
              iPanel.debug("5202");
              media.AV.play();  
              return 0;
              break;
           case 5205:
              var hVersion = hardware.STB.hVersion;
              if(hVersion=="0371666f"){
                  media.AV.play();    //hm3000 ，后来发的5205 没有发play了
                  return 0;
              }else{
                  return 1;
              }
              break;
          case 339:
              iPanel.debug("returnVideo_flag=="+returnVideo_flag);
              if(returnVideo_flag){	
                  returnVideo(lpos,tpos,wpos,hpos);
                  return 0;
              }
              return 1;
              break;				
  
            
    }
}