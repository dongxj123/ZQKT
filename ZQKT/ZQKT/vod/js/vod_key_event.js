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
	if(keycode < 58 && keycode > 47){//���ּ�
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
			case 340://���ˣ�back��
				code = "BACK";
				break;
			case 372://page up
			case 1029:
				code = "BACKWARD";//����
				break;
			case 373://page down
			case 1028:
				code = "FORWARD";//���
				break;
			case 561:
			case 565:
				code="LANGUAGE";//��/Ӣ�����ԣ�
				break;
			case 1038://�л�
				code="TV_SYSTEM";
				iPanelReturnFlag = false;
				break;
			case 567://��Ϣ
				code = "INFO";
				break;
			case 515:
				code = "HELP";
				break;
			case 595://������
				code = "VOLUME_UP";
				break;
			case 596://������
				code = "VOLUME_DOWN";
				break;
			case 597://����
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
			case 8001:	//�����Ϣ����ȥ�����������IPQAM�㲥û�в�cable���ᵼ�²��ܲ���
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
			case 5972://�������״̬��Ϣ
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
				//iPanelReturnFlag = true;//һ���ô���Ϣ����eventFrame����
				break;
			case 5501:
				code="EIS_IP_NETWORK_DISCONNECT";
				iPanel.setGlobalVar("netlink_status","0");
				//iPanelReturnFlag = true;//һ���ô���Ϣ����eventFrame����
				break;
			case 5502:
				code="EIS_IP_NETWORK_READAY";
				//iPanelReturnFlag = true;//һ���ô���Ϣ����eventFrame����
				break;
			case 5222://�ײ㿪ʼ�������ݣ��ȴ�����
				code="EIS_VOD_START_BUFF";
				break;
			case 5223://�������ݽ������ѿ�ʼ����
				code="EIS_VOD_STOP_BUFF";
				break;
			case 5224://�����ʱ�䳬����Ч��Χ
				code="EIS_VOD_OUT_OF_RANGE";
				break;
			case 5225://�û��Զ������
				code = "EIS_VOD_USER_EXCEPTION";
				args.modifiers = event.modifiers;
				break;
			case 5207://��ȡservcieʱ�ƽ�Ŀ�б�ɹ�
				code = "EIS_VOD_PREPARE_PROGRAMS_SUCCESS";
				args.modifiers = event.modifiers;
				break;
			case 5221://VOD����ʧ��
				code="EIS_VOD_START_FAILED";
				args.modifiers = event.modifiers;
				break;
			case 5972://�������״̬��Ϣ
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
			case 4012: //EIS_STDMESSAGE_SOCKET_CONNECT_FAILED SOCKET����ʧ��
			case 4404: //EIS_STDMESSAGE_NOT_FOUND �޷��ҵ�ָ��λ�õ���Դ
			case 4405:
			case 4408: //EIS_STDMESSAGE_REQUEST_TIMEOUT �ڷ�������ɵĵȴ�ʱ���ڣ��ͻ�һֱû�з����κ����󡣿ͻ��������Ժ��ظ�ͬһ����
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
					iPanel.overlayFrame.location.href = "ui://page_not_found.htm?ip��ַ���ô���";
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
		return "�Ѿ�����";//�Ѿ�����
	     break;
	case 250:
		return "�洢�ռ䲻��";//�洢�ռ䲻��
	     break;
	case 300:
		return "����ѡ��";//����ѡ��
	     break;
	case 301:
		return "����ת��";//����ת��
	     break;
	case 302:
		return "��ʱת��";//��ʱת��
	     break;
	case 303:
		return "�鿴����λ��"; //�鿴����λ��
	     break;
	case 304:
		return "û�иı�"; //û�иı�
	     break;
	case 305:
		return "ʹ�ô���"; //ʹ�ô���
	     break;
	case 400:
		return "��������"; //��������
	     break;
	case 401:
		return "δ��Ȩ"; //δ��Ȩ
	     break;
	case 402:
		return "��Ҫ����"; //��Ҫ����
	     break;
	case 403:
		return "��ֹ����"; //��ֹ����
	     break;
	case 404:
		return "δ�ҵ�"; //����Դδ�ҵ�
	     break;
	case 405:
		return "������ķ���"; //������ķ���
	     break;
	case 406:
		return "�޷�����"; //�޷�����
	     break;
	case 407:
		return "������Ҫ��Ȩ"; //������Ҫ��Ȩ
	     break;
	case 408:
		return "����ʱ"; //����ʱ
	     break;
	case 410:
		return "���Ӷ�ʧ"; //���Ӷ�ʧ
	     break;
	case 411:
		return "��Ҫ����"; //��Ҫ����
	     break;
	case 412:
		return "ǰ������δ����"; //ǰ������δ����
	     break;
	case 413:
		return "����ʵ�����"; //����ʵ�����
	     break;
	case 414:
		return "�����URI̫��"; //�����URI̫��
	     break;
	case 415:
		return "��֧�ֵ�ý������";//��֧�ֵ�ý������
	     break;
	case 451:
		return "��Ч����"; //��Ч����
	     break;
	case 452:
		return "�Ҳ����Ự"; //�Ҳ����Ự������
	     break;
	case 453:
		return "������"; //������
	     break;
	case 454:
		return "�Ҳ����Ự"; //�Ҳ����Ự
	     break;
	case 455:
		return "Ŀǰ״̬�¸÷�����Ч"; //Ŀǰ״̬�¸÷�����Ч
	     break;
	case 456:
		return "��Դͷ��Ч"; //��Դͷ��Ч
	     break;
	case 457:
		return "������Χ"; //������Χ
	     break;
	case 458:
		return "����ֻ��"; //����ֻ��
	     break;
	case 459:
		return "������ۺ�"; //������ۺ�
	     break;
	case 460:
		return "������ۺ�"; //������ۺ�
	     break;
	case 461:
		return "��֧�ֵĴ���"; //��֧�ֵĴ���
	     break;
	case 462:
		return "Ŀ���޷�����"; //Ŀ���޷�����
	     break;
	case 500:
		return "�������ڲ�����"; //�������ڲ�����
	     break;
	case 501:
		return "δʵ��"; //δʵ��
	     break;
	case 502:
		return "���������"; //���������
	     break;
	case 503:
		return "���񲻿���"; //���񲻿���
	     break;
	case 504:
		return "���س�ʱ"; //���س�ʱ
	     break;
	case 505:
		return "�汾��֧��"; //�汾��֧��
	     break;
	case 551:
		return "ѡ�֧��"; //ѡ�֧��
	     break;
	case 2101:
		return "��ȡ�����к�ʧ��";
		break;
	case 2102:
		return "��Ч�Ĳ��Ų���";
		break;
	case 2103:
		return "�������ݳ�ʱ";
		break;
	case 2104:
		return "��ʱ����쳣���޷��޸�";
		break;
	case 2105:
		return "�������ӷ�����";
		break;
	case 2106:
		return "�����쳣���Ͽ��Ự";
		break;
	case 2201:
		return "����Ա�߳�";
		break;
	case 2202:
		return "����Դ����";
		break;
	case 2203:
		return "�Ự���Ӵ���";
		break;
	case 2204:
		return "��½����";
		break;
	case 2205:
		return "�������";
		break;
	case 2206:
		return "�ŵ�����";
		break;
	case 2207:
		return "�Ự�������";
		break;
	case 2208:
		return "������ʱ";
		break;
	case 2209:
		return "���������ش�����ͣ��ʱ";
		break;
	case 2210:
		return "�˳���ʱ";
		break;
	case 2211:
		return "���ʱ";
		break;
	case 2212:
		return "���Ž���";
		break;
	case 2401:
		return "���Ӵ���";
		break;
	case 4000:
		return "���������ش�����ͣ��ʱ";
	     break;
	case 4201:
		return "���������ش����Ѵ���";
	     break;
	case 4250:
		return "���������ش��󣺴洢�ռ��";
	     break;
	case 4300:
		return "���������ش��󣺶���ѡ��";
	     break;
	case 4301:
		return "���������ش������ö���";
	     break;
	case 4302:
		return "���������ش�����ʱ����";
	     break;
	case 4303:
		return "���������ش��󣺲μ�����";
	     break;
	case 4305:
		return "���������ش���ʹ�ô���";
	     break;
	case 4400:
		return "���������ش�����Ч����";
	     break;
	case 4401:
		return "���������ش���δ����Ȩ"; 
	     break;
	case 4402:
		return "���������ش���Ҫ�󸶷�";
	     break;
	case 4403:
		return "���������ش��󣺽�ֹ";
	     break;
	case 4404:
		return "���������ش���δ�ҵ�";
	     break;
	case 4405:
		return "���������ش��󣺷���������";
	     break;
	case 4406:
		return "���������ش��󣺲��ɽ��ܵ�";
	     break;
	case 4407:
		return "���������ش���Ҫ�������֤";
	     break;
	case 4408:
		return "���������ش�������ʱ";
	     break;
	case 4410:
		return "���������ش�����ʧ";
	     break;
	case 4411:
		return "���������ش������賤��";
	     break;
	case 4412:
		return "���������ش���ǰ������ʧ��";
	     break;
	case 4413:
		return "���������ش�������ʵ��̫��";
	     break;
	case 4414:
		return "���������ش�������URI̫��";
	     break;
	case 4415:
		return "���������ش��󣺲�֧�ֵ�ý������";
	     break;
	case 4451:
		return "���������ش��󣺲��������";
	     break;
	case 4452:
		return "���������ش��󣺻���δ����";
	     break;
	case 4453:
		return "���������ش���û���㹻�Ĵ���";
	     break;
	case 4454:
		return "���������ش���δ�ҵ��Ự";
	     break;
	case 4455:
		return "���������ش��󣺷����������ڸù�";
	     break;
	case 4456:
		return "���������ش���ͷ����Ч��Դ";
	     break;
	case 4457:
		return "���������ش�����Ч��Χ";
	     break;
	case 4458:
		return "���������ش��󣺲���ֻ��";
	     break;
	case 4459:
		return "���������ش��󣺲������ѡ��";
	     break;
	case 4460:
		return "���������ش���ֻ�����ܽ�ѡ��";
	     break;
	case 4461:
		return "���������ش��󣺲�֧�ֵĴ���";
	     break;
	case 4462:
		return "���������ش���Ŀ�겻�ɴ�";
	     break;
	case 4500:
		return "���������ش����ڲ�����������";
	     break;
	case 4501:
		return "���������ش���δʵ��";
	     break;
	case 4502:
		return "���������ش��󣺴�������";
	     break;
	case 4503:
		return "���������ش��󣺷��񲻿���";
	     break;
	case 4504:
		return "���������ش������س�ʱ";
	     break;
	case 4505:
		return "���������ش��󣺲�֧�ֵ�rtsp�汾";
	     break;
	case 4551:
		return "���������ش��󣺸�ѡ�֧��";
	     break;
	default:
		return "����ʧ��";  //δ֪����
	     break;
	}
}