import BaseNode from "../../../../Common/BaseNode";
import EventConfig from "../../../../EventManager/EventConfig";
import EventManager from "../../../../EventManager/EventManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GoldCoinFrameItem extends BaseNode {

    @property(cc.Label)
    gold_number_label: cc.Label = null;

    onLoad() {
        EventManager.get_instance().listen(EventConfig.change_gold_coin_number, this, this.refresh_gold_number_label);
    }

    start() {

    }

    refresh_gold_number_label() {

    }

    onDisable() {
        EventManager.get_instance().cancel_listen(EventConfig.change_gold_coin_number, this, this.refresh_gold_number_label);
    }

}
