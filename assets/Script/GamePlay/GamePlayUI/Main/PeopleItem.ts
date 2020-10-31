import BaseNode from "../../../Common/BaseNode";
import Time from "../../../Common/Time";
import { PeopleConfig } from "../../../GameDataConfig/ConfigInterface";
import GameDataConfig from "../../../GameDataConfig/GameDataConfig";
import GameLocalData from "../../../GameLocalData/GameLocalData";
import PeopleData from "../../../GameLocalData/PeopleData";
import GamePlayConfig from "../../GamePlayConfig/GamePlayConfig";
import { PeopleType } from "../../GamePlayEnum/GamePlayEnum";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PeopleItem extends BaseNode {

    // @property(cc.Label)
    // label: cc.Label = null;

    private people_data: PeopleData = null;
    private people_config: PeopleConfig = null;

    start() {
        this.people_data = GameLocalData.get_instance().get_data<PeopleData>(PeopleData);
        this.people_config = GameDataConfig.get_config_by_id("PeopleConfig", 1);
    }

    update(dt) {
        switch (this.people_config.type) {
            case PeopleType.kitchen_god:
                let time_difference = 0;
                let cur_time = Time.get_time();
                let time_difference_total = cur_time - this.people_data.get_people_data_by_people_config_id(this.people_config.id).peopleMoveStartTime;
                if (time_difference_total < GamePlayConfig.kitchen_god_wait_time + GamePlayConfig.kitchen_god_active_time) {
                    time_difference = time_difference_total;
                } else {
                    time_difference = time_difference_total % (GamePlayConfig.kitchen_god_wait_time + GamePlayConfig.kitchen_god_active_time);
                    this.people_data.set_people_move_start_time(this.people_config.id, cur_time - time_difference);
                }
                if (time_difference < GamePlayConfig.kitchen_god_active_time) {
                    if (time_difference < GamePlayConfig.kitchen_god_active_time / 2) {
                        this.node.y = -30 * (time_difference/1000) + 800;
                    } else {
                        this.node.y = 30 * (time_difference/1000) - 1000;
                    }
                } else {
                    this.node.y = 1000;
                }

                break;
        }
    }

}
