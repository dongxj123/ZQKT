var area=1;
var areaSize=1;//0推荐，1导航栏，2订阅，3视频，45推荐位
// var line0Size=1;
// var line0Pos=0;
var line1Size=4;
var line1Pos=0;
var pageListData=[];
var videoId;
var videoList = [];
var videoPos = 0;
var videoSize = 0;
var page=1;
var pageSize=4;
var totalPage;
var id;
var pos;
var orderStatus=0;//0未订购，1已订购
function init(){
    
    // getList(homePageList,1,5);
    id=location.href.getQueryString("catecoryId");
	page = getCookie("detailPage") ? Number(getCookie("detailPage")) : 1;
    pos = getCookie("detailPos") ? Number(getCookie("detailPos")) : 0;
    delCookie("detailPage");
    delCookie("detailPos");
    eval("line"+area+"Pos="+pos);
	setPoint(id,stbId);
	//$("lineFoc").className="lineFoc13";
    //startVideo(0);
    //focMove(0);
    setTimeout(function(){
        attachEvent();
    },300);
    
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
                ajaxGetContentlist(id);
                ajaxGetCategoryDetail(id);
            },
        failed:
            function (resp) {

            }
    });
}
function showData(_data){
    for(var i=0;i<4;i++){
        $("line1"+i).className="";
        $("free"+i).innerHTML="";
        $("free"+i).style.display="none";
        $("title"+i).innerHTML="";
        $("time"+i).innerHTML="";
    }
    for(var i=0;i<_data.length;i++){
        $("line1"+i).className="line1";
        if(_data[i].contentCharge==0){
            $("free"+i).style.display="block";
        }
        
        $("title"+i).innerHTML=_data[i].contentTitle;
        $("time"+i).innerHTML=_data[i].publishDate.split(" ")[0];
    }
}
//滚动word 文字信息 size 文字信息超过长度将滚动
function roll(word, _size) {
    if (word && (word.length > _size)) {
        return '<marquee id="scroll" behavior="alternate" direction="left" scrollamonut="10" scrolldelay="100">' + word + '</marquee>';
    } else {
        return word;
    }
}
//焦点移动
function focMove(_num){
    // if(area==0){
	// 	if(line0Pos + _num < line0Size && line0Pos + _num >=0){
	// 		line0Pos+=_num;
    //         $("lineFoc").className="lineFoc"+area+line0Pos;
	// 	}
	// }
	if(area==1){
		if(line1Pos + _num < line1Size && line1Pos + _num >=0){
            line1Pos+=_num;
            for(var i=0;i<4;i++){
                $("line1"+i).className="";
            }
            for(var i=0;i<line1Size;i++){
                $("line1"+i).className="line1";
            }
            showData(pageListData);
            $("cover").innerHTML='<img src="'+pageListData[line1Pos].contentImage+'" width="287px" height="360px">';
            $("line1"+line1Pos).className="line1Foc";
            $("title" + line1Pos).innerHTML = roll(pageListData[line1Pos].contentTitle,22);
		}else if(line1Pos + _num >= line1Size){
            if(page<totalPage){
                page++;
                ajaxGetContentlist(id);
                line1Pos=0;
            }
        }else if(line1Pos + _num < 0){
            if(page>1){
                page--;
                ajaxGetContentlist(id);
                line1Pos=3;
            }
        }
    }
    
}

function setDetailCookie(_page,_pos){
    SetCookie("detailPage", _page);
    SetCookie("detailPos", _pos);
}

function doselect(){
    if (area == 0) {
        
    } else if (area == 1) {
        if(orderStatus==1 || pageListData[line1Pos].contentCharge==0){
            setDetailCookie(page,line1Pos);
            ajaxGetContentDetail(pageListData[line1Pos].id);
            //window.location.href = "../vod/vodPlay.htm?rtspUrl=" +pageListData[line1Pos];
        }else{
            //未订购，去订购页面
            SetCookie("orderReturnUrl", location.href);
            setDetailCookie(page,line1Pos);
            window.location.href = "../order/order.html";
        }
       
    } 
}
function ajaxGetContentDetail(_contentId) {
    $AJAX(
        {
            url: reqUrl + "api/stbapi/detail/"+_contentId,
            method: "get",
            async: true,
            success:
                function (resp) {
                    //点击后获取rtsp地址
                    eval("var menuJson = " + resp.responseText);
                    var json = menuJson.data;
                    window.location.href = "../vod/vodPlay.htm?rtspUrl=" +json.contentInfo;
                },
            failed:
                function (resp) {

                }
        });
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
function ajaxGetContentlist(_categoryId) {
    $AJAX(
        {
            url: reqUrl + "api/stbapi/list/"+_categoryId+"?page="+page+"&rows="+pageSize,
            method: "get",
            async: true,
            success:
                function (resp) {
                    eval("var menuJson = " + resp.responseText);
                    var json = menuJson.data;
                    pageListData=json.results;
                    line1Size=pageListData.length;
                    //var pageListData=zqxiangiqng.data.results;
                    totalPage=Math.ceil(json.total/4);
                    $("progressBar").style.height = (page / totalPage).toFixed(3) * 100 + "%";
                    showData(pageListData);
                    focMove(0);
                },
            failed:
                function (resp) {

                }
        });
    }
function ajaxGetCategoryDetail(_categoryId) {
    $AJAX(
        {
            url: reqUrl + "api/stbCategoryController/category_detail?categoryId="+_categoryId,
            method: "get",
            async: true,
            success:
                function (resp) {
                    eval("var menuJson = " + resp.responseText);
                    var json = menuJson.data[0];
                    $("headTitle").innerHTML=json.categoryName;
                    //$("cover").innerHTML='<img src="'+reqUrl+'img/server/'+json.categoryImg+'" width="287px" height="360px">';
                },
            failed:
                function (resp) {

                }
        });
}

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
                focMove(-1);
        	}
            return 0;
            break;
        case 2: //down
        case 40:
        	if(area==1){
                focMove(1);
        	}
            return 0;
            break;
        case 3: //left
        case 37:
            if(page>1){
                page--;
                ajaxGetContentlist(id);
            }
            return 0;
            break;
        case 4: //right
        case 39:
        	if(page<totalPage){
                page++;
                line1Pos=0;
                ajaxGetContentlist(id);
                
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
            if(getCookie("detailReturnUrl")){
                window.location.href = getCookie("detailReturnUrl");
            }
            else{
                window.location.href="../category/category.html";
            }
            return 0;
            break;
        // case 5210:
        //         media.AV.close();
        //       setTimeout("playVOD()",2000);
        //         //setTimeout("playVOD()",00);
        //       return 0;
        //       break;
        //   case 5202:
        //       iPanel.debug("5202");
        //       media.AV.play();  
        //       return 0;
        //       break;
        //    case 5205:
        //       var hVersion = hardware.STB.hVersion;
        //       if(hVersion=="0371666f"){
        //           media.AV.play();    //hm3000 ，后来发的5205 没有发play了
        //           return 0;
        //       }else{
        //           return 1;
        //       }
        //       break;
        //   case 339:
        //       iPanel.debug("returnVideo_flag=="+returnVideo_flag);
        //       if(returnVideo_flag){	
        //           returnVideo(lpos,tpos,wpos,hpos);
        //           return 0;
        //       }
        //       return 1;
        //       break;				
  
            
    }
}