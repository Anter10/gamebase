import BaseUI from "../../../Common/BaseUI";
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
export default class UnlockCookWomanView extends BaseUI {
    @property(cc.Label)
    title_label: cc.Label = null;

    @property(cc.Node)
    close_button: cc.Node = null;

    @property(cc.Sprite)
    cook_woman_sprite: cc.Sprite = null;

    @property(cc.Label)
    level_label: cc.Label = null;

    @property(cc.Node)
    upgrade_button: cc.Node = null;

    @property(cc.RichText)
    level_rich_text: cc.RichText = null;

    @property(cc.RichText)
    coin_upgrade_rich_text: cc.RichText = null;

    @property(cc.RichText)
    heart_upgrade_rich_text: cc.RichText = null;

    @property(cc.Label)
    cost_coin_label: cc.Label = null;

    @property(cc.Label)
    upgrade_button_label: cc.Label = null;

    @property(cc.Node)
    green_sprite: cc.Node = null;

    private cook_woman_config: PeopleConfig = null;
    private people_data: PeopleData = null;
    private cook_woman_level: number = 0;

    onLoad() {
        this.flush_view();
    }

    flush_view() {
        //关闭
        const cash_out_button: TouchButton = this.close_button.addComponent(TouchButton);
        cash_out_button.register_touch(this.on_close_call.bind(this));

        //升级厨娘
        const upgrade_button: TouchButton = this.upgrade_button.addComponent(TouchButton);
        upgrade_button.register_touch(this.click_upgrade_woman.bind(this));
    }

    click_upgrade_woman() {
        if (GamePlayConfig.cook_woman_max_level == this.cook_woman_level) {
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
            if (this.cook_woman_level == 0 || this.cook_woman_config.upgrade_need_store_level[this.cook_woman_level] <= store_level.get_store_level_data()) {
                if (game_play_base_data.change_gold_coin_number(-this.cook_woman_config.upgrade_need_coin[this.cook_woman_level])) {
                    this.people_data.change_cook_woman_level(this.cook_woman_config.id, this.cook_woman_level + 1);
                    game_play_base_data.change_red_heart_number(5);
                    this.refresh_cook_woman_description();
                    EventManager.get_instance().emit(LinkGameBase.game_play_event_config.upgrade_cook_woman_level);
                    const ui_success_param_interface: UIParamInterface = {
                        ui_config_path: UIConfig.Toast,
                        ui_config_name: "Toast",
                        param: {
                            text: "解锁成功"
                        }
                    }
                    UIManager.show_ui(ui_success_param_interface);
                    this.on_close_call();
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
                        text: `${this.cook_woman_config.upgrade_need_store_level[this.cook_woman_level]}级店铺可解锁`
                    }
                }
                UIManager.show_ui(ui_param_interface);
            }
        }
    }

    show(ui_param_interface: UIParamInterface) {
        super.show(ui_param_interface)
        this.set_cook_woman_config(ui_param_interface.param);
    }

    set_cook_woman_config(cook_woman_config_param: PeopleConfig) {
        this.cook_woman_config = cook_woman_config_param;
        this.set_cook_woman_description();
    }

    set_cook_woman_description() {
        this.refresh_cook_woman_description();
        this.not_refresh_cook_woman_description();
    }

    refresh_cook_woman_description() {
        this.people_data = GameLocalData.get_instance().get_data<PeopleData>(PeopleData);
        this.cook_woman_level = this.people_data.get_people_data_by_people_config_id(this.cook_woman_config.id).peopleLevel;
        this.level_rich_text.string = "";
        this.coin_upgrade_rich_text.string = "";
        this.heart_upgrade_rich_text.string = "";
        for (let i = 1; i <= GamePlayConfig.cook_woman_max_level; i++) {
            if (i == this.cook_woman_level) {
                this.level_rich_text.string = this.level_rich_text.string + `<b>LV.${i}  </b>`;
                this.coin_upgrade_rich_text.string = this.coin_upgrade_rich_text.string + `<b>${this.cook_woman_config.cook_speed_accelerate[i - 1]}%  </b>`;
                this.heart_upgrade_rich_text.string = this.heart_upgrade_rich_text.string + `<b>${this.cook_woman_config.cook_gold_accelerate[i - 1]}%  </b>`;
            } else {
                this.level_rich_text.string = this.level_rich_text.string + `<b><color=#460B0D>LV.${i}  </c></b>`;
                this.coin_upgrade_rich_text.string = this.coin_upgrade_rich_text.string + `<b><color=#460B0D>${this.cook_woman_config.cook_speed_accelerate[i - 1]}%  </c></b>`;
                this.heart_upgrade_rich_text.string = this.heart_upgrade_rich_text.string + `<b><color=#460B0D>${this.cook_woman_config.cook_gold_accelerate[i - 1]}%  </c></b>`;
            }
        }
        if (this.cook_woman_level == 0) {
            this.level_label.string = "";
            this.upgrade_button_label.string = "解锁";
            this.green_sprite.active = false;
            this.cost_coin_label.string = this.cook_woman_config.upgrade_need_coin[this.cook_woman_level] + "";
        } else {
            this.level_label.string = `LV.${this.cook_woman_level}`;
            if (this.cook_woman_level == GamePlayConfig.cook_woman_max_level) {
                this.cost_coin_label.string = "";
                this.upgrade_button_label.string = "满级";
            } else {
                this.cost_coin_label.string = this.cook_woman_config.upgrade_need_coin[this.cook_woman_level] + "";
                this.upgrade_button_label.string = "升级";
            }
            this.green_sprite.active = true;
            this.green_sprite.x = this.level_rich_text.node.x + (this.level_rich_text.node.width / 5) * (this.cook_woman_level - 3) - 5;
        }


    }

    not_refresh_cook_woman_description() {
        this.title_label.string = this.cook_woman_config.chinese_name;
        Loader.load_texture(`GamePlay/GamePlayUI/CookWoman/texture/${this.cook_woman_config.picture_name}2`, (texture2d: cc.Texture2D) => {
            this.cook_woman_sprite.spriteFrame = new cc.SpriteFrame(texture2d);
        })
    }
}
