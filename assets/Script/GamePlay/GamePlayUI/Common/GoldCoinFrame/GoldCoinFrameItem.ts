import BaseNode from "../../../../Common/BaseNode";
import EventConfig from "../../../../EventManager/EventConfig";
import EventManager from "../../../../EventManager/EventManager";
import GameLocalData from "../../../../GameLocalData/GameLocalData";
import GamePlayBaseData from "../../../../GameLocalData/GamePlayBaseData";
import GamePlayConfig from "../../../GamePlayConfig/GamePlayConfig";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GoldCoinFrameItem extends BaseNode {

    @property(cc.Label)
    gold_number_label: cc.Label = null;

    onLoad() {
        EventManager.get_instance().listen(EventConfig.change_gold_coin_number, this, this.refresh_gold_number_label);
    }

    start() {
        this.refresh_gold_number_label();
    }

    refresh_gold_number_label() {
        const game_play_base_data = GameLocalData.get_instance().get_data<GamePlayBaseData>(GamePlayBaseData);
        if (game_play_base_data.gold_coin_number < GamePlayConfig.gold_coin_show_chinese) {
            this.gold_number_label.string = game_play_base_data.gold_coin_number + "";
        } else {
            this.gold_number_label.string = (game_play_base_data.gold_coin_number / GamePlayConfig.gold_coin_show_chinese).toFixed(2) + "万";
        }
    }

    onDisable() {
        EventManager.get_instance().cancel_listen(EventConfig.change_gold_coin_number, this, this.refresh_gold_number_label);
    }

}
