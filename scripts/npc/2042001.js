var status = 0;
var request;

function start() {
    status = -1;
    action(1, 0, 0);
}


function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else
        status = 0;
    if (status == 0) {
        request = cm.getNextCarnivalRequest();
        if (request != null) {
            cm.sendYesNo(request.getChallengeInfo() + "\r\n是否想跟他們挑戰??");
        } else {
            cm.dispose();
        }
    } else if (status == 1) {
		var pt = cm.getPlayer().getParty();
		if (pt.getMembers().size() < 2) {
			cm.sendOk("需要 2 人以上才可以擂台！！");
			cm.dispose();
		} else {
        try {
            cm.getChar().getEventInstance().registerCarnivalParty(request.getChallenger(), request.getChallenger().getMap(), 1);
            cm.dispose();
        } catch (e) {
            cm.sendOk("目前挑戰不再是有效的。");
        }
        status = -1;
    }
}
}