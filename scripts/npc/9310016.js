﻿/* 青瑕 ID:9310016
	豫園大道NPC 剪髮+染髮
*/
var status = 0;
var beauty = 0;
var mhair = Array(30031, 30041, 30001, 30062, 30111, 30121, 30161, 30261, 30271, 30421, 30551, 30341, 30301);
var fhair = Array(31001, 31421, 31291, 31491, 30261, 30421, 31481, 31811, 31081, 31881, 31031, 31851, 31701, 34001);
var hairnew = Array();

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
    } else {
        status++;
        if (status == 0) 
            cm.sendSimple("您好，我是#p9310016#. 如果你有 #b#t5150015##k 或者有 #b#t5151011##k 請允許我把你的頭髮護理。請選擇一個你想要的.\r\n#L1#使用 #i5150015##t5150015##l\r\n#L2#使用 #i5151011##t5151011##l");
        else if (status == 1) {
            if (selection == 0) {
                beauty = 0;
                cm.sendSimple("");
            } else if (selection == 1) {
                beauty = 1;
                hairnew = Array();
                if (cm.getPlayer().getGender() == 0)
                    for(var i = 0; i < mhair.length; i++)
                        hairnew.push(mhair[i] + parseInt(cm.getPlayer().getHair()% 10));
                if (cm.getPlayer().getGender() == 1)
                    for(var i = 0; i < fhair.length; i++)
                        hairnew.push(fhair[i] + parseInt(cm.getPlayer().getHair() % 10));
                cm.sendStyle("選擇一個想要的.", hairnew);
            } else if (selection == 2) {
                beauty = 2;
                haircolor = Array();
                var current = parseInt(cm.getPlayer().getHair()/10)*10;
                for(var i = 0; i < 8; i++)
                    haircolor.push(current + i);
                cm.sendStyle("選擇一個想要的", haircolor);
            }
        } else if (status == 2){
            cm.dispose();
            if (beauty == 1){
                if (cm.haveItem(5150015)){
                    cm.gainItem(5150015, -1);
                    cm.setHair(hairnew[selection]);
                    cm.sendOk("享受!");
                } else
                    cm.sendOk("您貌似沒有#b#t5150015##k..");
            }
            if (beauty == 2){
                if (cm.haveItem(5151011)){
                    cm.gainItem(5151011, -1);
                    cm.setHair(haircolor[selection]);
                    cm.sendOk("享受!");
                } else
                    cm.sendOk("您貌似沒有#b#t5151011##k..");
            }
        }
    }
}
