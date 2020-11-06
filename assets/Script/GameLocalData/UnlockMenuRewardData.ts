import EventManager from "../EventManager/EventManager";
import { UnlockMenuRewardType } from "../GamePlay/GamePlayEnum/GamePlayEnum";
import LinkGameBase from "../GamePlay/LinkGameBase";
import BaseRecord from "./BaseRecord";


interface UnlockMenuRewardInterface {
    //奖励编号
    unlockMenuRewardId: number;
    //奖励现在状态
    unlockMenuRewardType: UnlockMenuRewardType;
}

// 解锁菜谱奖励数据
class UnlockMenuRewardData extends BaseRecord {
    static _name = "UnlockMenuRewardData";
    base_name = "UnlockMenuRewardData";

    private unlock_menu_reward_data: Array<UnlockMenuRewardInterface> = [];

    constructor() {
        super();
        this.apply_auto_update();
    }

    get_unlock_menu_reward_data(unlock_menu_reward_id: number) {
        for (let i = 0; i < this.unlock_menu_reward_data.length; i++) {
            if (this.unlock_menu_reward_data[i].unlockMenuRewardId == unlock_menu_reward_id) {
                return this.unlock_menu_reward_data[i];
            }
        }
        let init_unlock_menu_reward_data = { unlockMenuRewardId: unlock_menu_reward_id, unlockMenuRewardType: UnlockMenuRewardType.get };
        this.unlock_menu_reward_data.push(init_unlock_menu_reward_data);
        this.store_menu_data(this.unlock_menu_reward_data);
        return init_unlock_menu_reward_data;
    }

    store_menu_data(unlock_menu_reward_data: Array<UnlockMenuRewardInterface>) {
        this.unlock_menu_reward_data = unlock_menu_reward_data;
    }

    change_unlock_menu_reward_data(unlock_menu_reward_id: number, unlock_menu_reward_type: UnlockMenuRewardType) {
        for (let i = 0; i < this.unlock_menu_reward_data.length; i++) {
            if (this.unlock_menu_reward_data[i].unlockMenuRewardId == unlock_menu_reward_id) {
                this.unlock_menu_reward_data[i].unlockMenuRewardType = unlock_menu_reward_type;
                this.store_menu_data(this.unlock_menu_reward_data);
                EventManager.get_instance().emit(LinkGameBase.game_play_event_config.unlock_menu_reward);
            }
        }
    }
}

export default UnlockMenuRewardData;