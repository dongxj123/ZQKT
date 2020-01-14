var area=1;
var areaSize=6;//0推荐，1导航栏，2订阅，3视频，45推荐位
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
var line5Size=6;
var line5Pos=0;

var line6Size=0;
var line6Pos=0;//动态列表

var pageListData=[];
var list=[];//第一页9条数据
var videoId;
var videoList = [];
var videoPos = 0;
var videoSize = 0;
// var newsPage=1;
// var newsPageSize=0;
var initInner;
var leftArr=["48px","344px","641px","938px"];
var pos;
var parentId;
function init(){
    initInner=$("inner").innerHTML;
    parentId=decodeURIComponent(window.location.href.getQueryString("parentId"));
    line1Pos=location.href.getQueryString("line1Pos")?Number(location.href.getQueryString("line1Pos")):0;
    area = location.href.getQueryString("area") ? Number(location.href.getQueryString("area")) : 1;
    pos = location.href.getQueryString("pos") ? Number(location.href.getQueryString("pos")) : 0;
    if(line1Pos && area==1){
        pos=line1Pos;
    }
    eval("line"+area+"Pos="+pos);
    
    setTimeout(function(){
        attachEvent();
    },300);
    ajaxGetlistByRegionCode(parentId);
}
    function ajaxGetlistByRegionCode(_parentId) {
        $AJAX(
            {
                url: reqUrl + "api/stbCategoryController/listByRegionCode?parentId="+_parentId+"&regionCode=zqkt",
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
    $("inner").innerHTML=initInner;
    list=_json;
    pageListData=list.slice(9);
    line6Size=pageListData.length;
    for(var i=0;i<list.length;i++){
        $("line30").innerHTML='<img src="'+reqUrl+'img/server/'+list[0].categoryImg+'" width="589px" height="337px">';
        $("line50").innerHTML='<img src="'+reqUrl+'img/server/'+list[1].categoryImg+'" width="292px" height="166px">';
        $("line51").innerHTML='<img src="'+reqUrl+'img/server/'+list[2].categoryImg+'" width="292px" height="166px">';
        $("line52").innerHTML='<img src="'+reqUrl+'img/server/'+list[3].categoryImg+'" width="292px" height="166px">';
        $("line40").innerHTML='<img src="'+reqUrl+'img/server/'+list[5].categoryImg+'" width="292px" height="166px">';
        $("line41").innerHTML='<img src="'+reqUrl+'img/server/'+list[6].categoryImg+'" width="292px" height="166px">';
        $("line53").innerHTML='<img src="'+reqUrl+'img/server/'+list[4].categoryImg+'" width="292px" height="166px">';
        $("line54").innerHTML='<img src="'+reqUrl+'img/server/'+list[7].categoryImg+'" width="292px" height="166px">';
        $("line55").innerHTML='<img src="'+reqUrl+'img/server/'+list[8].categoryImg+'" width="292px" height="166px">';
    }
    for(var i=0;i<line6Size;i++){
        var rowIndex=parseInt(i/4);
        var topVal=700+rowIndex*182+24*parseInt(rowIndex/2);
        $("inner").innerHTML+='<div id="line6'+i+'" class="line6" style="left:'+leftArr[i%4]+';top:'+topVal+'px;"><img src="'+reqUrl+'img/server/'+pageListData[i].categoryImg+'" width="292px" height="166px"></div>';
    }
    focMove(0);
}
function getStyle(element, property){
    var proValue = null;
    if (!document.defaultView) {
        proValue = element.currentStyle[property];
    } else {
        proValue = document.defaultView.getComputedStyle(element)[property];
    }
    if(proValue.split("px")==undefined){
        return parseInt(proValue,10);
        }
    else{
        return parseInt(proValue.split("px")[0],10);
    }	
    //return proValue;  //输出为带px的数值
}
//焦点移动
function focMove(_num){
    if(area==0 || area==1 || area==2){
        $("lineFoc1").style.display="none";
        $("lineFoc").style.display="block";
    }else{
        $("lineFoc1").style.display="block";
        $("lineFoc").style.display="none";
    }
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
            showFocus("line3"+line3Pos);
		}
	}
	if(area==4){
        if(line4Pos + _num < line4Size && line4Pos + _num >=0){
            line4Pos+=_num;
            showFocus("line4"+line4Pos);
		}
    }
    if(area==5){
        if(line5Pos + _num < line5Size && line5Pos + _num >=0){
            line5Pos+=_num;
            showFocus("line5"+line5Pos);
		}
    }
    if(area==6){
        if(line6Pos + _num < line6Size && line6Pos + _num >=0){
            line6Pos+=_num;
            showFocus("line6"+line6Pos);
            $("inner").style.top=(-639-388*parseInt(line6Pos/8))+"px";
		}
    }else{
        $("inner").style.top="-151px";
    }
}
function showFocus(_id) {
    if(area==3){
        $("lineFoc1").className="lineFoc3";
    }else{
        $("lineFoc1").className="lineFocOther";
    }
    $("lineFoc1").style.left = getStyle($(_id), 'left')  + "px";
    $("lineFoc1").style.top = getStyle($(_id), 'top')  + "px";
    $("lineFoc1").style.zIndex =  "6";

}

function setHomeCookie(_area,_pos){
    SetCookie("homeArea", _area);
    SetCookie("homePos", _pos);
}
var navList=["402809246e7d1ec6016e7d2785c0000f","4028988b6f78fb86016f831ece010011","402809246e7d1ec6016e7d29155e001d","402809246e7d1ec6016e7d28e8de001b","4028988b6f83432a016f8348c9ce0008","4028988b6f83432a016f83495044000a","402809246e7d1ec6016e7d28c28a0019","402809246e7d1ec6016e7d2894e30017"];
function doselect(){
    if (area == 0) {
        setHomeCookie(0,0);
        window.location.href = "../homePage/homePage.html";
    } else if (area == 1) {
        parentId=navList[line1Pos]
        ajaxGetlistByRegionCode(parentId);
        //window.location.href = "../vod/vodPlay.htm?rtspUrl=" + movies[countFlag];
        //window.location.href = "../category/category.html?parentId=" + encodeURIComponent(navList[line1Pos]);
    } else if (area == 2) {
        
    } else if (area == 3) {
        SetCookie("detailReturnUrl", "../category/category.html?parentId="+parentId+"&area=3&pos="+line3Pos);
        window.location.href = "../detail/detail.html?catecoryId="+list[0].id;
    } else if (area == 4) {
        SetCookie("detailReturnUrl", "../category/category.html?parentId="+parentId+"&area=4&pos="+line4Pos);
        window.location.href = "../detail/detail.html?catecoryId="+list[(5+line4Pos)].id;
    } else if (area == 5) {
        SetCookie("detailReturnUrl", "../category/category.html?parentId="+parentId+"&area=5&pos="+line5Pos);
        if(line5Pos<=3){
            window.location.href = "../detail/detail.html?catecoryId="+list[1+line5Pos].id;
        }else{
            window.location.href = "../detail/detail.html?catecoryId="+list[3+line5Pos].id;
        }
        
    } else if (area == 6) {
        SetCookie("detailReturnUrl", "../category/category.html?parentId="+parentId+"&area=6&pos="+line6Pos);
        window.location.href = "../detail/detail.html?catecoryId="+pageListData[line6Pos].id;
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
                }else if(line5Pos==1){
                    area=1;
                    line1Pos=7;
                    focMove(0);
                }else{
                    focMove(-2);
                }
        	}else if(area==6){
                if(line6Pos==0){
                    area=4;
                    line4Pos=0;
                    focMove(0);
                }else if(line6Pos==1){
                    area=4;
                    line4Pos=1;
                    focMove(0);
                }else if(line6Pos==2){
                    area=5;
                    line5Pos=4;
                    focMove(0);
                }else if(line6Pos==3){
                    area=5;
                    line5Pos=5;
                    focMove(0);
                }else{
                    focMove(-4);
                }
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
                    area=5;
                    line5Pos=1;
                    focMove(0);
                }
        	}else if(area==2){
                area=5;
                line5Pos=1;
        		focMove(0);
        	}else if(area==3){
                area=4;
                focMove(0);
        	}else if(area==4){
                if(line4Pos==0){
                    if(line6Size>0){
                        area=6;
                        line6Pos=0;
                        focMove(0);
                    }
                }else if(line4Pos==1){
                    if(line6Size>0){
                        area=6;
                        line6Pos=1;
                        focMove(0);
                    }
                }
        	}else if(area==5){
                if(line5Pos==4){
                    if(line6Size>0){
                        area=6;
                        line6Pos=2;
                        focMove(0);
                    }
                }else if(line5Pos==5){
                    if(line6Size>0){
                        area=6;
                        line6Pos=3;
                        focMove(0);
                    }
                }else{
                    focMove(2);
                }
        	}else if(area==6){
                focMove(4);
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
                if(line5Pos==0 || line5Pos==2){
                    area=3;
                    focMove(0);
                }else if(line5Pos==4){
                    area=4;
                    line4Pos=1;
                    focMove(0);
                }else{
                    focMove(-1);
                }
            }else if (area == 6) {
                focMove(-1);
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
                    line5Pos=4;
                    focMove(0);
                }
        	}else if(area==5){
                if(line5Pos==0 || line5Pos==2 ||line5Pos==4){
                    focMove(1);
                }
        	}else if(area==6){
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
            if(getCookie("categoryReturnUrl")){
                window.location.href = getCookie("categoryReturnUrl");
            }
            else{
                window.location.href="../homePage/homePage.html";
            }
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