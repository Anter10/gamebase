import EventConfig from "../EventManager/EventConfig";
import EventManager from "../EventManager/EventManager";
import GamePlayConfig from "../GamePlay/GamePlayConfig/GamePlayConfig";
import LinkGameBase from "../GamePlay/LinkGameBase";
import BaseRecord from "./BaseRecord";

// 游戏的玩家的基础数据
class GamePlayBaseData extends BaseRecord {
    static _name = "GamePlayBaseData";
    base_name = "GamePlayBaseData";

    public gold_coin_number: number = 0;
    public red_heart_number: number = 0;
    public attract_customer_number: number = 0;

    change_gold_coin_number(change_gold_number: number): boolean {
        if (change_gold_number + this.gold_coin_number >= 0) {
            this.gold_coin_number = change_gold_number + this.gold_coin_number;
            this.store_gold_coin_number(this.gold_coin_number);
            EventManager.get_instance().emit(LinkGameBase.game_play_event_config.change_gold_coin_number);
            return true;
        } else {
            return false;
        }
    }

    store_gold_coin_number(gold_coin_number: number) {
        this.gold_coin_number = gold_coin_number;
    }

    store_red_heart_number(red_heart_number: number) {
        this.red_heart_number = red_heart_number;
    }

    change_red_heart_number(change_red_heart_number: number): boolean {
        if (change_red_heart_number + this.red_heart_number >= 0) {
            if (change_red_heart_number + this.red_heart_number >= GamePlayConfig.red_heart_max) {
                this.red_heart_number = GamePlayConfig.red_heart_max;
            } else {
                this.red_heart_number = change_red_heart_number + this.red_heart_number;
                this.store_gold_coin_number(this.red_heart_number);
                EventManager.get_instance().emit(LinkGameBase.game_play_event_config.change_red_heart_number);
            }
            return true;
        } else {
            return false;
        }
    }

    constructor() {
        super();
        this.apply_auto_update();
    }

}

export default GamePlayBaseData;