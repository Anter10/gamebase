import BaseNode from "../../../Common/BaseNode";
import { UIParamInterface } from "../../../Common/CommonInterface";
import Loader from "../../../Common/Loader";
import TouchButton from "../../../Common/TouchButton";
import EventManager from "../../../EventManager/EventManager";
import { PeopleConfig } from "../../../GameDataConfig/ConfigInterface";
import GameLocalData from "../../../GameLocalData/GameLocalData";
import GamePlayBaseData from "../../../GameLocalData/GamePlayBaseData";
import PeopleData from "../../../GameLocalData/PeopleData";
import StoreUpgradeData from "../../../GameLocalData/StoreUpgradeData";
import UIConfig from "../../../UI/UIManager/UIConfig";
import UIManager from "../../../UI/UIManager/UIManager";
import GamePlayConfig from "../../GamePlayConfig/GamePlayConfig";
import LinkGameBase from "../../LinkGameBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CookWomanItem extends BaseNode {

    @property(cc.Label)
    cook_woman_description_label: cc.Label = null;

    @property(cc.Sprite)
    cook_woman_sprite: cc.Sprite = null;

    @property(cc.Node)
    price: cc.Node = null;

    @property(cc.Node)
    get_mark: cc.Node = null;

    @property(cc.Label)
    price_label: cc.Label = null;

    @property(cc.Node)
    upgrade_frame: cc.Node = null;

    @property(cc.Node)
    upgrade_button: cc.Node = null;

    @property(cc.Label)
    upgrade_button_label: cc.Label = null;

    @property(cc.Label)
    cost_coin_label: cc.Label = null;

    @property(cc.Label)
    upgrade_profit_label: cc.Label = null;

    private cook_woman_config: PeopleConfig = null;
    private people_data: PeopleData = null;

    onEnable() {
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.upgrade_cook_woman_level, this, this.fresh_node_label);
    }

    onDisable() {
        EventManager.get_instance().cancel_listen(LinkGameBase.game_play_event_config.upgrade_cook_woman_level, this, this.fresh_node_label);
    }

    onLoad() {
        //查看人物详情
        const shoe_woman_description: TouchButton = this.cook_woman_sprite.node.addComponent(TouchButton);
        shoe_woman_description.register_touch(this.show_woman_description.bind(this));
    }

    show_woman_description() {
        const ui_cook_woman_param_interface: UIParamInterface = {
            ui_config_path: UIConfig.CookWomanDescriptionView,
            ui_config_name: "CookWomanDescriptionView",
            param: this.cook_woman_config,
        }
        UIManager.show_ui(ui_cook_woman_param_interface);
    }

    start() {
        this.people_data = GameLocalData.get_instance().get_data<PeopleData>(PeopleData);
        this.fresh_node_label();
        this.set_cook_woman_sprite();
    }

    set_cook_woman_config(cook_woman_config: PeopleConfig) {
        this.cook_woman_config = cook_woman_config;
    }

    fresh_node_label() {
        const cur_cook_woman_level = this.people_data.get_people_data_by_people_config_id(this.cook_woman_config.id).peopleLevel;
        if (cur_cook_woman_level > 0) {
            this.cook_woman_description_label.string = this.cook_woman_config.chinese_name + `\nLV.${cur_cook_woman_level}`;
            this.cook_woman_sprite.node.color = cc.color(255, 255, 255, 255);
            this.price.active = false;
            if (cur_cook_woman_level == GamePlayConfig.cook_woman_max_level) {
                this.get_mark.active = true;
                this.upgrade_frame.active = false;
                this.upgrade_profit_label.string = `当前速度和红心加成${this.cook_woman_config.cook_gold_accelerate[cur_cook_woman_level - 1]}%`;
            } else {
                this.get_mark.active = false;
                this.upgrade_frame.active = true;
                this.refresh_upgrade_description();
                this.upgrade_profit_label.string = `升级后速度和红心加成${this.cook_woman_config.cook_gold_accelerate[cur_cook_woman_level]}%`;
                //升级厨娘
                if (!this.upgrade_button.getComponent(TouchButton)) {
                    const upgrade_button: TouchButton = this.upgrade_button.addComponent(TouchButton);
                    upgrade_button.register_touch(this.click_upgrade_button.bind(this));
                }
            }
        } else {
            this.cook_woman_description_label.string = this.cook_woman_config.chinese_name;
            this.cook_woman_sprite.node.color = cc.color(100, 100, 100, 255);
            this.price.active = true;
            this.get_mark.active = false;
            this.upgrade_frame.active = false;
            this.price_label.string = this.cook_woman_config.upgrade_need_coin[0] + "金币";
            this.upgrade_profit_label.string = `解锁后速度和红心加成${this.cook_woman_config.cook_gold_accelerate[0]}%`;

            if (!this.price.getComponent(TouchButton)) {
                const buy_new_table_button: TouchButton = this.price.addComponent(TouchButton);
                buy_new_table_button.register_touch(this.click_buy_new_table_button.bind(this));
            }
        }
    }

    refresh_upgrade_description() {
        const cur_cook_woman_level = this.people_data.get_people_data_by_people_config_id(this.cook_woman_config.id).peopleLevel;
        if (cur_cook_woman_level == 0) {
            this.upgrade_button_label.string = "解锁";
            this.cost_coin_label.string = this.cook_woman_config.upgrade_need_coin[cur_cook_woman_level] + "";
        } else {
            if (cur_cook_woman_level == GamePlayConfig.cook_woman_max_level) {
                this.cost_coin_label.string = "";
                this.upgrade_button_label.string = "满级";
            } else {
                this.cost_coin_label.string = this.cook_woman_config.upgrade_need_coin[cur_cook_woman_level] + "";
                this.upgrade_button_label.string = "升级";
            }
        }
    }

    click_upgrade_button() {
        const cur_cook_woman_level = this.people_data.get_people_data_by_people_config_id(this.cook_woman_config.id).peopleLevel;
        if (GamePlayConfig.cook_woman_max_level == cur_cook_woman_level) {
            const ui_max_param_interface: UIParamInterface = {
                ui_config_path: UIConfig.Toast,
                ui_config_name: "Toast",
                param: {
                    text: "您已经达到最大等级"
                }
            }
            UIManager.show_ui(ui_max_param_interface);
        } else {
            const game_play_base_data = GameLocalData.get_instance().get_data<GamePlayBaseData>(GamePlayBaseData);
            const store_level = GameLocalData.get_instance().get_data<StoreUpgradeData>(StoreUpgradeData);
            if (cur_cook_woman_level == 0 || this.cook_woman_config.upgrade_need_store_level[cur_cook_woman_level - 1] <= store_level.get_store_level_data()) {
                if (game_play_base_data.change_gold_coin_number(-this.cook_woman_config.upgrade_need_coin[cur_cook_woman_level])) {
                    this.people_data.change_cook_woman_level(this.cook_woman_config.id, cur_cook_woman_level + 1);
                    this.refresh_upgrade_description();
                    EventManager.get_instance().emit(LinkGameBase.game_play_event_config.upgrade_cook_woman_level);
                    const ui_success_param_interface: UIParamInterface = {
                        ui_config_path: UIConfig.Toast,
                        ui_config_name: "Toast",
                        param: {
                            text: "解锁成功"
                        }
                    }
                    UIManager.show_ui(ui_success_param_interface);
                    // console.log("解锁成功");
                } else {
                    const ui_param_interface: UIParamInterface = {
                        ui_config_path: UIConfig.Toast,
                        ui_config_name: "Toast",
                        param: {
                            text: "金币不足，快去营业赚金币吧"
                        }
                    }
                    UIManager.show_ui(ui_param_interface);
                    // console.log("金币不足，快去营业赚金币吧");
                }
            } else {
                const ui_param_interface: UIParamInterface = {
                    ui_config_path: UIConfig.Toast,
                    ui_config_name: "Toast",
                    param: {
                        text: `${this.cook_woman_config.upgrade_need_store_level[cur_cook_woman_level - 1]}级店铺可解锁`
                    }
                }
                UIManager.show_ui(ui_param_interface);
            }
        }
    }

    set_cook_woman_sprite() {
        Loader.load_texture(`GamePlay/GamePlayUI/CookWoman/texture/${this.cook_woman_config.picture_name}`, (texture2d: cc.Texture2D) => {
            this.cook_woman_sprite.spriteFrame = new cc.SpriteFrame(texture2d);
        })
    }

    click_buy_new_table_button() {
        const game_play_base_data = GameLocalData.get_instance().get_data<GamePlayBaseData>(GamePlayBaseData);
        if (game_play_base_data.change_gold_coin_number(-this.cook_woman_config.upgrade_need_coin[0])) {
            this.people_data.change_cook_woman_level(this.cook_woman_config.id, 1);
            this.fresh_node_label();
            EventManager.get_instance().emit(LinkGameBase.game_play_event_config.upgrade_cook_woman_level);
            const ui_success_param_interface: UIParamInterface = {
                ui_config_path: UIConfig.Toast,
                ui_config_name: "Toast",
                param: {
                    text: "解锁成功"
                }
            }
            UIManager.show_ui(ui_success_param_interface);
            // console.log("解锁成功");
        } else {
            const ui_param_interface: UIParamInterface = {
                ui_config_path: UIConfig.Toast,
                ui_config_name: "Toast",
                param: {
                    text: "金币不足，快去营业赚金币吧"
                }
            }
            UIManager.show_ui(ui_param_interface);
        }
    }

}
