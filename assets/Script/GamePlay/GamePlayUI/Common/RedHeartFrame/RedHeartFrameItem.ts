import BaseNode from "../../../../Common/BaseNode";
import EventConfig from "../../../../EventManager/EventConfig";
import EventManager from "../../../../EventManager/EventManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RedHeartFrameItem extends BaseNode {

    @property(cc.Label)
    red_heart_number_label: cc.Label = null;

    onLoad() {
        EventManager.get_instance().listen(EventConfig.change_red_heart_number, this, this.refresh_red_heart_number_label);
    }

    start() {

    }

    refresh_red_heart_number_label() {

    }

    onDisable() {
        EventManager.get_instance().cancel_listen(EventConfig.change_red_heart_number, this, this.refresh_red_heart_number_label);
    }

}
