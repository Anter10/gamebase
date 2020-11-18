import BaseUI from "../../../Common/BaseUI";
import { UIParamInterface } from "../../../Common/CommonInterface";
import Loader from "../../../Common/Loader";
import TouchButton from "../../../Common/TouchButton";
import EventManager from "../../../EventManager/EventManager";
import { TableConfig } from "../../../GameDataConfig/ConfigInterface";
import GameLocalData from "../../../GameLocalData/GameLocalData";
import GamePlayBaseData from "../../../GameLocalData/GamePlayBaseData";
import StoreUpgradeData from "../../../GameLocalData/StoreUpgradeData";
import TableData from "../../../GameLocalData/TableData";
import { Ad } from "../../../Sdk/Ad";
import { NativeSupportStatueCode } from "../../../Sdk/SdkEnum";
import { StaticImageAdInterface } from "../../../Sdk/SdkInterface";
import UIConfig from "../../../UI/UIManager/UIConfig";
import UIManager from "../../../UI/UIManager/UIManager";
import GamePlayConfig from "../../GamePlayConfig/GamePlayConfig";
import LinkGameBase from "../../LinkGameBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UnlockTableDescriptionView extends BaseUI {
    @property(cc.Label)
    title_label: cc.Label = null;

    @property(cc.Label)
    level_number_title: cc.Label = null;

    @property(cc.Label)
    description_label: cc.Label = null;

    @property(cc.Label)
    growth_label: cc.Label = null;

    @property(cc.Sprite)
    table_sprite: cc.Sprite = null;

    @property(cc.Node)
    close_button: cc.Node = null;

    @property(cc.Label)
    upgrade_button_label: cc.Label = null;

    @property(cc.Label)
    cost_coin_label: cc.Label = null;

    @property(cc.Node)
    bg: cc.Node = null;

    @property(cc.Node)
    upgrade_button: cc.Node = null;

    private table_config: TableConfig = null;

    //第几号桌子
    private table_number: number = 0;
    private table_data: TableData = null;

    show(ui_param_interface: UIParamInterface) {
        super.show(ui_param_interface)
        this.set_modal_interface(ui_param_interface.param.table_config, ui_param_interface.param.table_number);
    }

    set_modal_interface(table_config: TableConfig, table_number: number) {
        this.table_config = table_config;
        this.table_number = table_number;
        this.table_data = GameLocalData.get_instance().get_data<TableData>(TableData);
        this.set_table_description();
    }

    onLoad() {
        this.flush_view();

        //点击升级
        const upgrade_button: TouchButton = this.upgrade_button.addComponent(TouchButton);
        upgrade_button.register_touch(this.click_buy_button.bind(this));
    }

    flush_view() {
        //关闭界面
        const close_button: TouchButton = this.close_button.addComponent(TouchButton);
        close_button.register_touch(this.on_close_call.bind(this));
    }

    set_table_description() {
        this.title_label.string = this.table_config.chinese_name;
        this.level_number_title.string = (this.table_number + 1) + "号桌";
        this.description_label.string = this.table_config.description;
        if (this.table_config.id != 1) {
            this.growth_label.string = "金币总收益增加" + this.table_config.growth + "%";
        } else {
            this.growth_label.string = "扩建桌椅招揽更多客人赚钱啦";
        }
        Loader.load_texture(`GamePlay/GamePlayUI/Main/texture/${this.table_config.name}`, (texture2d: cc.Texture2D) => {
            this.table_sprite.spriteFrame = new cc.SpriteFrame(texture2d);
        })

        console.log(this.table_data.get_table_data(this.table_number));
        if (this.table_data.get_table_data(this.table_number).tableLevel == 0) {
            this.upgrade_button_label.string = "解锁";
            this.cost_coin_label.string = this.table_config.upgrade + "";
        } else {
            if (this.table_config.id == GamePlayConfig.table_max_level) {
                this.cost_coin_label.string = "";
                this.upgrade_button_label.string = "满级";
            } else {
                this.cost_coin_label.string = this.table_config.upgrade + "";
                this.upgrade_button_label.string = "升级";
            }
        }
    }

    click_buy_button() {
        const store_level = GameLocalData.get_instance().get_data<StoreUpgradeData>(StoreUpgradeData).get_store_level_data();
        if (this.table_config.upgrade_need_store_level <= store_level) {
            const game_play_base_data = GameLocalData.get_instance().get_data<GamePlayBaseData>(GamePlayBaseData);
            if (this.table_number == 0 || this.table_data.get_table_data(this.table_number - 1).tableLevel > 0) {
                if (game_play_base_data.change_gold_coin_number(-this.table_config.upgrade)) {
                    this.table_data.change_table_level_data(this.table_number, this.table_config.id);
                    EventManager.get_instance().emit(LinkGameBase.game_play_event_config.fly_heart, this.table_number);
                    EventManager.get_instance().emit(LinkGameBase.game_play_event_config.delay_add_heart, 2);
                    this.set_table_description();
                    EventManager.get_instance().emit(LinkGameBase.game_play_event_config.upgrade_table, this.table_number);
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
                    const ui_gold_param_interface: UIParamInterface = {
                        ui_config_path: UIConfig.Toast,
                        ui_config_name: "Toast",
                        param: {
                            text: "金币不足，快去营业赚金币吧"
                        }
                    }
                    UIManager.show_ui(ui_gold_param_interface);
                    // console.log("金币不足，快去营业赚金币吧");
                }
            } else {
                const ui_success_param_interface: UIParamInterface = {
                    ui_config_path: UIConfig.Toast,
                    ui_config_name: "Toast",
                    param: {
                        text: `请先解锁${this.table_data.get_max_table() + 1}号桌`
                    }
                }
                UIManager.show_ui(ui_success_param_interface);
            }
        } else {
            const ui_gold_param_interface: UIParamInterface = {
                ui_config_path: UIConfig.Toast,
                ui_config_name: "Toast",
                param: {
                    text: `${this.table_config.upgrade_need_store_level}级店铺可解锁`
                }
            }
            UIManager.show_ui(ui_gold_param_interface);
        }
    }
}
