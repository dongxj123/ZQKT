var area=0;
var areaSize=2;
var vodList=['1','2','3','4','5','6'];
var imgList=['1.png','2.png','3.png','4.png','5.png','6.png'];
var urlList=[
"../detail/detail.html?catecoryId=4028988b6f83432a016f83e03e820094",
"../detail/detail.html?catecoryId=4028988b6f83432a016f83e09a2f0096",
"../detail/detail.html?catecoryId=4028988b6f83432a016f83e0de7f0098",
"../detail/detail.html?catecoryId=4028988b6f83432a016f83e2847200a0",
"../detail/detail.html?catecoryId=4028988b6f83432a016f83e143a6009a",
"../detail/detail.html?catecoryId=4028988b6f83432a016f83e2bda300a2",
];
var line0Size=6;
var line0Pos=0;
var line1Size=1;
var line1Pos=0;
var pageNum=1;
var pageSize=6;
var pageTotal=Math.ceil(vodList.length/pageSize);
var myInterval;
var lunboIndex=0;
var lunboSize=8;
function init() {
    focMove(0);
    attachEvent()
    showCourse(pageNum);
    // myInterval=setInterval(function(){
    //     if(lunboIndex < (lunboSize-1)){
    //         lunboIndex++;
    //     }else if(lunboIndex>=(lunboSize-1)){
    //         lunboIndex=0;
    //     }
    //     $("carousel").className="carousel"+lunboIndex;
    // }, 1000);
}
//焦点移动
function focMove(_num) {
    if(area==0){
		if(line0Pos + _num < line0Size && line0Pos + _num >=0){
            line0Pos+=_num;
            $("lineFoc").className="lineFoc"+area+line0Pos;
		}else if(line0Pos + _num >= line0Size){
            if(pageNum<pageTotal){
                pageNum++;
                showCourse(pageNum);
                line0Pos=0;
                focMove(0);
            }
        }else if(line0Pos + _num <0){
            if(pageNum>1){
                pageNum--;
                line0Pos=5;
                showCourse(pageNum);
                focMove(0);
            }
        }
    }
	if(area==1){
		if(line1Pos + _num < line1Size && line1Pos + _num >=0){
            line1Pos+=_num;
            $("lineFoc").className="lineFoc"+area+line1Pos;
		}
    }
    
}
function doselect(){
    if (area == 0) {
        SetCookie("detailReturnUrl",location.href);
        window.location.href = urlList[(pageNum-1)*6+line0Pos];
        //window.location.href = "../vod/vodPlay.htm?rtspUrl=" + movies[countFlag];
    } else if (area == 1) {
        SetCookie("homePageReturnUrl", location.href);
        window.location.href = "../homePage/homePage.html?returnUrl="+location.href;
    }
}
function showCourse(_pageNum) {
    var start = (_pageNum - 1) * 6;
    var end = (_pageNum - 1) * 6 + 6;
    var data = vodList.slice(start, end);
    line0Size=data.length;
    // $("pageNum").innerHTML=pageNum+"<br>/<br>"+totalPage;
    clearCourse();
    for (var i = 0; i < data.length; i++) {
        $("line0"+i).style.display="block";
        $("line0"+i).style.background='url("image/'+imgList[(pageNum-1)*6+i]+'")';
    }
}
function clearCourse(){
    for (var i = 0; i < 6; i++) {
        $("line0"+i).style.display="none";
    }
}
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
        	if(area==1){
                area=0;
                focMove(0);
        	}
            return 0;
            break;
        case 2: //down
        case 40:
        	if(area==0){
                area=1;
                focMove(0);
        	}
            return 0;
            break;
        case 3: //left
        case 37:
            if(area==0){
                focMove(-1);
        	}
            return 0;
            break;
        case 4: //right
        case 39:
        	if(area==0){
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
            //alert(location.href.getQueryString("returnUrl"))
            window.location.href=location.href.getQueryString("returnUrl");
            return 0;
            break;
        
            
    }
}

