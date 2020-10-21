import EventManager from "../EventManager/EventManager";
import LinkGameBase from "../GamePlay/LinkGameBase";
import BaseRecord from "./BaseRecord";


// 店铺等级数据
class StoreUpgradeData extends BaseRecord {
    static _name = "StoreUpgradeData";
    base_name = "StoreUpgradeData";

    private store_level_data: number = 1;

    get_store_level_data() {
        return this.store_level_data;
    }

    change_store_level_data(store_level_data: number) {
        this.store_level_data = store_level_data;
        this.store_store_level_data(this.store_level_data);
        EventManager.get_instance().emit(LinkGameBase.game_play_event_config.upgrade_store_level);
    }

    store_store_level_data(store_level_data: number) {
        this.store_level_data = store_level_data;
    }
}

export default StoreUpgradeData;