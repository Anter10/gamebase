import BaseNode from "../../../../Common/BaseNode";
import EventConfig from "../../../../EventManager/EventConfig";
import EventManager from "../../../../EventManager/EventManager";
import GameLocalData from "../../../../GameLocalData/GameLocalData";
import GamePlayBaseData from "../../../../GameLocalData/GamePlayBaseData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RedHeartFrameItem extends BaseNode {

    @property(cc.Label)
    red_heart_number_label: cc.Label = null;

    onLoad() {
        EventManager.get_instance().listen(EventConfig.change_red_heart_number, this, this.refresh_red_heart_number_label);
    }

    start() {
        this.refresh_red_heart_number_label();
    }

    refresh_red_heart_number_label() {
        const game_play_base_data = GameLocalData.get_instance().get_data<GamePlayBaseData>(GamePlayBaseData);
        this.red_heart_number_label.string = game_play_base_data.red_heart_number + "";
    }

    onDisable() {
        EventManager.get_instance().cancel_listen(EventConfig.change_red_heart_number, this, this.refresh_red_heart_number_label);
    }

}
