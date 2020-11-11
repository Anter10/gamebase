import BaseNode from "../../../Common/BaseNode";
import { UIParamInterface } from "../../../Common/CommonInterface";
import Time from "../../../Common/Time";
import TouchButton from "../../../Common/TouchButton";
import { MenuConfig, PeopleConfig } from "../../../GameDataConfig/ConfigInterface";
import GameDataConfig from "../../../GameDataConfig/GameDataConfig";
import GameLocalData from "../../../GameLocalData/GameLocalData";
import MenuData from "../../../GameLocalData/MenuData";
import PeopleData from "../../../GameLocalData/PeopleData";
import UIConfig from "../../../UI/UIManager/UIConfig";
import UIManager from "../../../UI/UIManager/UIManager";
import GamePlayConfig from "../../GamePlayConfig/GamePlayConfig";
import { PeopleType } from "../../GamePlayEnum/GamePlayEnum";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PeopleItem extends BaseNode {

    @property(cc.Node)
    chicken_god: cc.Node = null;

    private people_data: PeopleData = null;
    private people_config: PeopleConfig = null;

    onLoad() {
        //点击灶王爷
        const chicken_god_button: TouchButton = this.chicken_god.addComponent(TouchButton);
        chicken_god_button.register_touch(this.click_chicken_god_button.bind(this));
    }

    click_chicken_god_button() {
        const menu_data: MenuData = GameLocalData.get_instance().get_data(MenuData);
        const menu_config: MenuConfig = GameDataConfig.get_config_by_id("MenuConfig", menu_data.get_unlock_number() + 1);
        if (menu_config) {
            const ui_chicken_god_interface: UIParamInterface = {
                ui_config_path: UIConfig.UnlockMenuView,
                ui_config_name: "UnlockMenuView",
                param: { title_label: "财神送福利", menu_config: menu_config }
            }
            UIManager.show_ui(ui_chicken_god_interface);
        }
    }

    start() {
        this.people_data = GameLocalData.get_instance().get_data<PeopleData>(PeopleData);
        this.people_config = GameDataConfig.get_config_by_id("PeopleConfig", 1);
        this.set_god();
    }

    set_god() {
        const menu_data: MenuData = GameLocalData.get_instance().get_data(MenuData);
        const menu_config: MenuConfig = GameDataConfig.get_config_by_id("MenuConfig", menu_data.get_unlock_number() + 1);
        if (menu_config && menu_data.get_menu_unlock_number() < GamePlayConfig.daily_unlock_menu_limit) {
            this.node.active = true;
        } else {
            this.node.active = false;
        }
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
                    this.set_god();
                    if (time_difference < GamePlayConfig.kitchen_god_active_time / 2) {
                        this.node.y = -30 * (time_difference / 1000) + 800;
                    } else {
                        this.node.y = 30 * (time_difference / 1000) - 1000;
                    }
                } else {
                    this.node.y = 1000;
                }
                break;
        }
    }

}
