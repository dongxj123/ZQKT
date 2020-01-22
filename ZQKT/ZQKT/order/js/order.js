var area=1;
var areaSize=1;//0推荐，1导航栏，2订阅，3视频，45推荐位
// var line0Size=1;
// var line0Pos=0;
var line1Size=3;
var line1Pos=0;

function init(){
    // getList(homePageList,1,5);
    // id=location.href.getQueryString("catecoryId");
	// area = getCookie("homeArea") ? Number(getCookie("homeArea")) : 1;
    // pos = getCookie("homePos") ? Number(getCookie("homePos")) : 0;
    // delCookie("homeArea");
    // delCookie("homePos");
    // eval("line"+area+"Pos="+pos);
	
	//$("lineFoc").className="lineFoc13";
    //startVideo(0);
    //focMove(0);
    focMove(0);
    setTimeout(function(){
        attachEvent();
    },300);
    // ajaxGetContentlist(id);
}
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
        $("free"+i).style.display="block";
        $("title"+i).innerHTML=_data[i].contentTitle;
        $("time"+i).innerHTML="";
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
            for(var i=0;i<3;i++){
                $("line1"+i).className="line"+area+i;
            }
            $("line1"+line1Pos).className="line"+area+line1Pos+"Foc";
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
                window.location.href="../category/category.html";
            }
            return 0;
            break;
        
            
    }
}