/***********************iPanel.enterMode(mode,mask)ARGUMENTS***********/
var EPG_MASK_ACTUAL_PF			= 0x01;
var EPG_MASK_ACTUAL_SCHEDULE 	= 0x02;
var EPG_MASK_OTHER_PF			= 0x04;
var EPG_MASK_OTHER_SCHEDULE		= 0x08;
var EPG_MASK_CURRENT_TS			= 0x00;
var EPG_MASK_ALL_TS				= 0x10;

var EPG_MODE_WATCHTV 			= "watchTV";
var EPG_MODE_EPG				= "EPG";
var EPG_MODE_NVOD				= "NVOD";
var EPG_MODE_SEARCHPROGRAM		= "searchProgram";

function Event(code, args){
	this.code = code;
	this.args = args;
}

var iPanelReturnFlag = false;
var exitFlag = false;


document.onsystemevent = grabEvent;
document.onkeypress = grabEvent;
document.onirkeypress = grabEvent;
function grabEvent(event){
	iPanelReturnFlag = false;
	var keycode = event.which;
	iPanel.debug("[vod_key_event]---keycode = " + keycode);
	if(keycode < 58 && keycode > 47){//数字键
		var args = new Object();
		args.value = keycode - 48;
		event_handler(new Event("NUMERIC", args));
		if(iPanelReturnFlag) return 1;
		else return 0;
	}
	else{
		var code = null;
		var args = new Object();
		args.modifiers = 0;
		args.value = keycode;
		switch(keycode){
			case 1://up
				code = "UP";
				break;
			case 2://down
				code = "DOWN";
				break;
			case 3://left
				code = "LEFT";
				break;
			case 4://right
				code = "RIGHT";
				break;
			case 13://enter
				code = "SELECT";
				break;
			case 339:
				code = "EXIT";
				break;
			case 340://后退（back）
				code = "BACK";
				break;
			case 372://page up
			case 1029:
				code = "BACKWARD";//快退
				break;
			case 373://page down
			case 1028:
				code = "FORWARD";//快进
				break;
			case 561:
			case 565:
				code="LANGUAGE";//中/英（语言）
				break;
			case 1038://切换
				code="TV_SYSTEM";
				iPanelReturnFlag = false;
				break;
			case 567://信息
				code = "INFO";
				break;
			case 515:
				code = "HELP";
				break;
			case 595://音量加
				code = "VOLUME_UP";
				break;
			case 596://音量减
				code = "VOLUME_DOWN";
				break;
			case 597://静音
				code = "VOLUME_MUTE";
				break;
			case 832://red
				code = "RED";
				break;
			case 833://green
				code = "GREEN";
				break;
			case 834://yellow
				code = "YELLOW";
				break;
			case 835://blue
				code = "BLUE";
				break;
			case 8330:
				code = "DVB_PROGRAM_READY_OPEN";
				iPanelReturnFlag = false;
				break;
			case 8335:
				code = "EIS_DVB_ALARM_READY";
				iPanel.debug("EIS_DVB_ALARM_READY");
				return 1;
				break;
			case 9003:
				code = "SHOW_APP_NOTE_MESSAGE";
				iPanel.debug("SHOW_APP_NOTE_MESSAGE");
				return 1;
				break;
			case 9004:
				code = "HIDE_APP_NOTE_MESSAGE";
				iPanel.debug("SHOW_APP_NOTE_MESSAGE");
				return 1;
				break;
			case 8001:	//这个消息不能去掉，如果进入IPQAM点播没有插cable，会导致不能播放
			case 5550:
				code = "DVB_CABLE_CONNECT_SUCCESS";
				iPanel.setGlobalVar("cable_connect_success", "1");
				iPanel.setGlobalVar("init_cable","1");
				break;
			case 8002:		
			case 5551:
				code = "DVB_CABLE_CONNECT_FAILED";
				iPanel.setGlobalVar("cable_connect_success", "0");
				break;
			case 5350://Ca_message_open
				code = "CA_MESSAGE_OPEN";
				 args.modifiers = event.modifiers;
				break;
			case 5351://Ca_message_close
				code = "CA_MESSAGE_CLOSE";
				iPanel.delGlobalVar("ca_message_type");
				break;
			case 5972://进入待机状态消息
				code = "EIS_MISC_ENTER_STANDBY";
				//iPanel.enterStandby();
				iPanel.mainFrame.location.href = "ui://standby.htm";
				break;
			case 5202:
				code = "EIS_VOD_PREPAREPLAY_SUCCESS";
				break;
			case 5203:
				code = "EIS_VOD_CONNECT_FAILED";
				break;
			case 5204:
				code = "EIS_VOD_DVB_SERACH_FAILED";
				break;
			case 5205:
				code = "EIS_VOD_PLAY_SUCCESS";
				break;
			case 5206:
				code = "EIS_VOD_PLAY_FAILED";
				break;
			case 5209:
				code = "EIS_VOD_PROGRAM_BEGIN";
				break;
			case 5210:
				code = "EIS_VOD_PROGRAM_END";
				break;
			case 5211:
				code="EIS_VOD_CLOSE_SUCCESS";
				break;
			case 5212:
				code="EIS_VOD_CLOSE_FAILED";
				break;
			case 5213:
				code = "EIS_VOD_TSTVREQUEST_FAILED";
				break;
			case 5500:
				code="EIS_IP_NETWORK_CONNECT";
				iPanel.setGlobalVar("netlink_status","1");
				//iPanelReturnFlag = true;//一般让此消息流到eventFrame处理
				break;
			case 5501:
				code="EIS_IP_NETWORK_DISCONNECT";
				iPanel.setGlobalVar("netlink_status","0");
				//iPanelReturnFlag = true;//一般让此消息流到eventFrame处理
				break;
			case 5502:
				code="EIS_IP_NETWORK_READAY";
				//iPanelReturnFlag = true;//一般让此消息流到eventFrame处理
				break;
			case 5222://底层开始缓冲数据，等待播放
				code="EIS_VOD_START_BUFF";
				break;
			case 5223://缓冲数据结束，已开始播放
				code="EIS_VOD_STOP_BUFF";
				break;
			case 5224://传入的时间超出有效范围
				code="EIS_VOD_OUT_OF_RANGE";
				break;
			case 5225://用户自定义错误
				code = "EIS_VOD_USER_EXCEPTION";
				args.modifiers = event.modifiers;
				break;
			case 5207://收取servcie时移节目列表成功
				code = "EIS_VOD_PREPARE_PROGRAMS_SUCCESS";
				args.modifiers = event.modifiers;
				break;
			case 5221://VOD启动失败
				code="EIS_VOD_START_FAILED";
				args.modifiers = event.modifiers;
				break;
			case 5972://进入待机状态消息
				code = "EIS_MISC_ENTER_STANDBY";
				media.AV.close();
				//iPanel.enterStandby();
				iPanel.mainFrame.location.href = "ui://standby.htm";
				break;
			case 258://standay
				media.AV.close();
				//iPanel.enterStandby();
				iPanel.mainFrame.location.href = "ui://standby.htm";
				return 0;
				break;
			case 4012: //EIS_STDMESSAGE_SOCKET_CONNECT_FAILED SOCKET连接失败
			case 4404: //EIS_STDMESSAGE_NOT_FOUND 无法找到指定位置的资源
			case 4405:
			case 4408: //EIS_STDMESSAGE_REQUEST_TIMEOUT 在服务器许可的等待时间内，客户一直没有发出任何请求。客户可以在以后重复同一请求。
				iPanel.debug("4404 p2="+p2);
				var p2 = event.modifiers;
				if (p2 == 1400)
				{
					return;
				}

				/*sunny change*/
				if (ip_flag == 1)
				{
					clearTimeout(ip_timeout);
					iPanel.eventFrame.flag = 1;
					window.location.href = "ui://index.htm";
				}
				else
				{
					iPanel.setGlobalVar("page_not_found_status",1);
					iPanel.overlayFrame.location.href = "ui://page_not_found.htm";
				}
				return 0;
				break;
			case 4021:
				/*sunny change*/
				if (ip_flag == 1)
				{
					clearTimeout(ip_timeout);
					iPanel.eventFrame.flag = 1;
					window.location.href = "ui://index.htm";
				}
				else
				{
					iPanel.setGlobalVar("page_not_found_status",1);
					iPanel.overlayFrame.location.href = "ui://page_not_found.htm?ip地址设置错误";
				}
				return 0;
				break;
		}
		if(code){
			event_handler(new Event(code, args));
		}
		if(iPanelReturnFlag) return 1;
		else return 0;
	}
}


function check_error_code(error_code)
{
	switch (error_code)
	{
	case 201:
		return "已经创建";//已经创建
	     break;
	case 250:
		return "存储空间不足";//存储空间不足
	     break;
	case 300:
		return "多种选择";//多种选择
	     break;
	case 301:
		return "永久转向";//永久转向
	     break;
	case 302:
		return "临时转向";//临时转向
	     break;
	case 303:
		return "查看其它位置"; //查看其它位置
	     break;
	case 304:
		return "没有改变"; //没有改变
	     break;
	case 305:
		return "使用代理"; //使用代理
	     break;
	case 400:
		return "错误请求"; //错误请求
	     break;
	case 401:
		return "未授权"; //未授权
	     break;
	case 402:
		return "需要付费"; //需要付费
	     break;
	case 403:
		return "禁止访问"; //禁止访问
	     break;
	case 404:
		return "未找到"; //播放源未找到
	     break;
	case 405:
		return "不允许的方法"; //不允许的方法
	     break;
	case 406:
		return "无法接受"; //无法接受
	     break;
	case 407:
		return "代理需要授权"; //代理需要授权
	     break;
	case 408:
		return "请求超时"; //请求超时
	     break;
	case 410:
		return "连接丢失"; //连接丢失
	     break;
	case 411:
		return "需要长度"; //需要长度
	     break;
	case 412:
		return "前提条件未满足"; //前提条件未满足
	     break;
	case 413:
		return "请求实体过大"; //请求实体过大
	     break;
	case 414:
		return "请求的URI太长"; //请求的URI太长
	     break;
	case 415:
		return "不支持的媒体类型";//不支持的媒体类型
	     break;
	case 451:
		return "无效参数"; //无效参数
	     break;
	case 452:
		return "找不到会话"; //找不到会话？？？
	     break;
	case 453:
		return "带宽不足"; //带宽不足
	     break;
	case 454:
		return "找不到会话"; //找不到会话
	     break;
	case 455:
		return "目前状态下该方法无效"; //目前状态下该方法无效
	     break;
	case 456:
		return "资源头无效"; //资源头无效
	     break;
	case 457:
		return "超出范围"; //超出范围
	     break;
	case 458:
		return "参数只读"; //参数只读
	     break;
	case 459:
		return "不允许聚合"; //不允许聚合
	     break;
	case 460:
		return "仅允许聚合"; //仅允许聚合
	     break;
	case 461:
		return "不支持的传输"; //不支持的传输
	     break;
	case 462:
		return "目标无法到达"; //目标无法到达
	     break;
	case 500:
		return "服务器内部错误"; //服务器内部错误
	     break;
	case 501:
		return "未实现"; //未实现
	     break;
	case 502:
		return "错误的网关"; //错误的网关
	     break;
	case 503:
		return "服务不可用"; //服务不可用
	     break;
	case 504:
		return "网关超时"; //网关超时
	     break;
	case 505:
		return "版本不支持"; //版本不支持
	     break;
	case 551:
		return "选项不支持"; //选项不支持
	     break;
	case 2101:
		return "读取机顶盒号失败";
		break;
	case 2102:
		return "无效的播放参数";
		break;
	case 2103:
		return "缓冲数据超时";
		break;
	case 2104:
		return "流时间戳异常，无法修复";
		break;
	case 2105:
		return "不能连接服务器";
		break;
	case 2106:
		return "连接异常，断开会话";
		break;
	case 2201:
		return "管理员踢除";
		break;
	case 2202:
		return "播放源错误";
		break;
	case 2203:
		return "会话连接错误";
		break;
	case 2204:
		return "登陆错误";
		break;
	case 2205:
		return "传输错误";
		break;
	case 2206:
		return "信道不足";
		break;
	case 2207:
		return "会话代理错误";
		break;
	case 2208:
		return "启动超时";
		break;
	case 2209:
		return "服务器返回错误：暂停超时";
		break;
	case 2210:
		return "退出超时";
		break;
	case 2211:
		return "保活超时";
		break;
	case 2212:
		return "播放结束";
		break;
	case 2401:
		return "连接错误";
		break;
	case 4000:
		return "服务器返回错误：暂停超时";
	     break;
	case 4201:
		return "服务器返回错误：已创建";
	     break;
	case 4250:
		return "服务器返回错误：存储空间低";
	     break;
	case 4300:
		return "服务器返回错误：多种选择";
	     break;
	case 4301:
		return "服务器返回错误：永久定向";
	     break;
	case 4302:
		return "服务器返回错误：临时定向";
	     break;
	case 4303:
		return "服务器返回错误：参见其他";
	     break;
	case 4305:
		return "服务器返回错误：使用代理";
	     break;
	case 4400:
		return "服务器返回错误：无效请求";
	     break;
	case 4401:
		return "服务器返回错误：未经授权"; 
	     break;
	case 4402:
		return "服务器返回错误：要求付费";
	     break;
	case 4403:
		return "服务器返回错误：禁止";
	     break;
	case 4404:
		return "服务器返回错误：未找到";
	     break;
	case 4405:
		return "服务器返回错误：方法不允许";
	     break;
	case 4406:
		return "服务器返回错误：不可接受的";
	     break;
	case 4407:
		return "服务器返回错误：要求代理认证";
	     break;
	case 4408:
		return "服务器返回错误：请求超时";
	     break;
	case 4410:
		return "服务器返回错误：消失";
	     break;
	case 4411:
		return "服务器返回错误：所需长度";
	     break;
	case 4412:
		return "服务器返回错误：前提条件失败";
	     break;
	case 4413:
		return "服务器返回错误：请求实体太大";
	     break;
	case 4414:
		return "服务器返回错误：请求URI太长";
	     break;
	case 4415:
		return "服务器返回错误：不支持的媒体类型";
	     break;
	case 4451:
		return "服务器返回错误：参数不理解";
	     break;
	case 4452:
		return "服务器返回错误：会议未发现";
	     break;
	case 4453:
		return "服务器返回错误：没有足够的带宽";
	     break;
	case 4454:
		return "服务器返回错误：未找到会话";
	     break;
	case 4455:
		return "服务器返回错误：方法不适用于该国";
	     break;
	case 4456:
		return "服务器返回错误：头场无效资源";
	     break;
	case 4457:
		return "服务器返回错误：无效范围";
	     break;
	case 4458:
		return "服务器返回错误：参数只读";
	     break;
	case 4459:
		return "服务器返回错误：不允许的选项";
	     break;
	case 4460:
		return "服务器返回错误：只允许总结选项";
	     break;
	case 4461:
		return "服务器返回错误：不支持的传输";
	     break;
	case 4462:
		return "服务器返回错误：目标不可达";
	     break;
	case 4500:
		return "服务器返回错误：内部服务器错误";
	     break;
	case 4501:
		return "服务器返回错误：未实现";
	     break;
	case 4502:
		return "服务器返回错误：错误网关";
	     break;
	case 4503:
		return "服务器返回错误：服务不可用";
	     break;
	case 4504:
		return "服务器返回错误：网关超时";
	     break;
	case 4505:
		return "服务器返回错误：不支持的rtsp版本";
	     break;
	case 4551:
		return "服务器返回错误：该选项不支持";
	     break;
	default:
		return "连接失败";  //未知错误
	     break;
	}
}