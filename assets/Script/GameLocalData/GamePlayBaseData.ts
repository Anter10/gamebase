import EventConfig from "../EventManager/EventConfig";
import EventManager from "../EventManager/EventManager";
import BaseRecord from "./BaseRecord";

// 游戏的玩家的基础数据
class GamePlayBaseData extends BaseRecord {
    static _name = "GamePlayBaseData";
    base_name = "GamePlayBaseData";

    public gold_coin_number: number = 0;
    public red_heart_number: number = 0;

    change_gold_coin_number(change_gold_number: number): boolean {
        if (change_gold_number + this.gold_coin_number >= 0) {
            EventManager.get_instance().emit(EventConfig.change_gold_coin_number);
            this.gold_coin_number = change_gold_number + this.gold_coin_number;
            return true;
        } else {
            return false;
        }
    }

    change_red_heart_number(change_red_heart_number: number): boolean {
        if (change_red_heart_number + this.red_heart_number >= 0) {
            EventManager.get_instance().emit(EventConfig.change_red_heart_number);
            this.red_heart_number = change_red_heart_number + this.red_heart_number;
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