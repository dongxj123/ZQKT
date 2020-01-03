var area=0;
var areaSize=7;//0推荐，1导航栏，2订阅，3视频，456推荐位
var line0Size=1;
var line0Pos=0;
var line1Size=8;
var line1Pos=0;
var line2Size=1;
var line2Pos=0;

var line3Size=1;
var line3Pos=0;
var line4Size=2;
var line4Pos=0;
var line5Size=3;
var line5Pos=0;
var line6Size=1;
var line6Pos=0;

var videoId;
var videoList = [];
var videoPos = 0;
var videoSize = 0;
// var newsPage=1;
// var newsPageSize=0;
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
    //ajaxGetVideo();
}


		
function ajaxGetVideo() {
    $AJAX(
        {
            url: reqUrl + "api/stbapi/list/957e5c8f6dba171b016dc5107cec0009",
            method: "get",
            async: true,
            success:
                function (resp) {
                    eval("menuJson = " + resp.responseText);
                    var json = menuJson.data;
                    videoId = json.results[0].id;
                    ajaxGetVideoList(videoId);
                },
            failed:
                function (resp) {

                }
        });
}
function ajaxGetVideoList(videoId) {
    $AJAX(
        {
            url: reqUrl + "api/stbapi/detail/" + videoId,
            method: "get",
            async: true,
            success:
                function (resp) {
                    eval("menuJson = " + resp.responseText);
                    var json = menuJson.data;
                    movies = json.contentInfo.split(",");
                    indexmovies = movies[0];
                    initMedia(338, 137, 603, 340);
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
function initRecommend(_json){
    var posiList=_json.posiList;
    var hotlist=_json.hotlist;
    for(var i=0;i<posiList.length;i++){
        $("line50").innerHTML='<img id="pic0" src="'+reqUrl+'img/server/'+posiList[1].recommenPositionImg+'" width="292px" height="166px">';
        $("line51").innerHTML='<img id="pic0" src="'+reqUrl+'img/server/'+posiList[2].recommenPositionImg+'" width="292px" height="166px">';
    }
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
		if(line3Pos + _num < line3Size && line3Pos + _num >=0){
            line3Pos+=_num;
            $("lineFoc").className="lineFoc"+area+line3Pos;
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
function doselect(){
    if (area == 0) {
        if (line0Pos == 0) {
            //高速服务
            SetCookie("expresswayServiceReturnUrl", location.href);
            setHomeCookie(area,line0Pos);
            window.location.href = "../serviceZoneList/serviceZoneList.html";
        } else if (line0Pos == 1) {
            //高速收费站信息
            SetCookie("tollReturnUrl", location.href);
            setHomeCookie(area,line0Pos);
            window.location.href = "../toll/toll.html";
        } else if (line0Pos == 2) {
            //快讯列表页
            SetCookie("kuaixunListReturnUrl", location.href);
            setHomeCookie(area,line0Pos);
            window.location.href = "../kuaixunList/kuaixunList.html";
        } 
    } else if (area == 1) {
        window.location.href = "../vod/vodPlay.htm?rtspUrl=" + movies[countFlag];
    } else if (area == 2) {
        if (line2Pos == 0) {
            //高速路况
            SetCookie("hweventListReturnUrl", location.href);
            setHomeCookie(area,line2Pos);
            window.location.href = "../hweventList/hweventList.html";
        } else if (line2Pos == 1) {
           //宣传专栏
            SetCookie("publicityReturnUrl", location.href);
            setHomeCookie(area,line2Pos);
            window.location.href = "../publicity/publicity.html";
        }
    } else if (area == 3) {
        SetCookie("detailReturnUrl", location.href);
        setHomeCookie(area,line3Pos);
        window.location.href = "../detail/detail.html?apiUrl=api/trafficapi/queryTrafficInformation&dataIndex=" + line3Pos + "&contentField=informationContent&titleField=title";
    } else if (area == 4) {
        SetCookie("trafficReturnUrl", location.href);
        setHomeCookie(area,line4Pos);
        window.location.href = "../traffic/traffic.html";
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
                    area=2;
                    focMove(0);
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