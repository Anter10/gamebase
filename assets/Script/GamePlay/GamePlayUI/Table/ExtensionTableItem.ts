import BaseNode from "../../../Common/BaseNode";
import { UIParamInterface } from "../../../Common/CommonInterface";
import Loader from "../../../Common/Loader";
import TouchButton from "../../../Common/TouchButton";
import EventManager from "../../../EventManager/EventManager";
import { TableConfig } from "../../../GameDataConfig/ConfigInterface";
import GameDataConfig from "../../../GameDataConfig/GameDataConfig";
import GameLocalData from "../../../GameLocalData/GameLocalData";
import GamePlayBaseData from "../../../GameLocalData/GamePlayBaseData";
import GuideData from "../../../GameLocalData/GuideData";
import TableData from "../../../GameLocalData/TableData";
import UIConfig from "../../../UI/UIManager/UIConfig";
import UIManager from "../../../UI/UIManager/UIManager";
import LinkGameBase from "../../LinkGameBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ExtensionTableItem extends BaseNode {

    @property(cc.Sprite)
    table_sprite: cc.Sprite = null;

    @property(cc.Node)
    price: cc.Node = null;

    @property(cc.Node)
    get_mark: cc.Node = null;

    @property(cc.Label)
    price_label: cc.Label = null;

    @property(cc.Node)
    description_button: cc.Node = null;

    //桌子的等级
    private level_number = 0;
    //第几号桌子
    private mark_number = 0;

    private table_config: TableConfig = null;
    private table_data: TableData = null;

    onLoad() {
        this.flush_node();
    }
    start() {
        this.table_config = GameDataConfig.get_config_by_id("TableConfig", this.level_number);
        this.table_data = GameLocalData.get_instance().get_data<TableData>(TableData);
        this.set_table_sprite();
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.upgrade_table, this, this.upgrade_table);
    }

    onDestroy() {
        EventManager.get_instance().cancel_listen(LinkGameBase.game_play_event_config.upgrade_table, this, this.upgrade_table);
    }

    upgrade_table(event, table_number: number) {
        if (table_number == this.mark_number) {
            this.set_table_sprite();
        }
    }

    set_table_sprite() {
        //初始为0级，没有桌子。
        Loader.load_texture(`GamePlay/GamePlayUI/ExtensionTable/texture/extension_table_${this.level_number}`, (texture2d: cc.Texture2D) => {
            this.table_sprite.spriteFrame = new cc.SpriteFrame(texture2d);
        });

        if (this.table_data.get_table_data(this.mark_number).tableLevel >= this.level_number) {
            this.get_mark.active = true;
            this.price.active = false;
            this.table_sprite.node.color = cc.color(255, 255, 255, 255);
        } else {
            this.get_mark.active = false;
            this.price.active = true;
            this.table_sprite.node.color = cc.color(100, 100, 100, 255);
            this.price_label.string = this.table_config.upgrade + "金币";
        }
    }

    set_level_number(level_number: number, mark_number: number) {
        this.level_number = level_number;
        this.mark_number = mark_number;
    }

    flush_node() {
        //显示桌子的详细描述
        const show_table_button: TouchButton = this.description_button.addComponent(TouchButton);
        show_table_button.register_touch(this.click_show_table_button.bind(this));

        //购买新的桌子
        const buy_new_table_button: TouchButton = this.price.addComponent(TouchButton);
        buy_new_table_button.register_touch(this.click_buy_new_table_button.bind(this));
    }

    click_show_table_button() {
        const ui_table_description_param_interface: UIParamInterface = {
            ui_config_path: UIConfig.ShowTableDescriptionView,
            ui_config_name: "ShowTableDescriptionView",
            param: this.table_config,
        }
        UIManager.show_ui(ui_table_description_param_interface);
    }

    click_buy_new_table_button() {
        if (this.table_data.get_table_data(this.mark_number).tableLevel == this.level_number - 1) {
            const game_play_base_data = GameLocalData.get_instance().get_data<GamePlayBaseData>(GamePlayBaseData);
            if (game_play_base_data.change_gold_coin_number(-this.table_config.upgrade)) {
                this.table_data.change_table_level_data(this.mark_number, this.level_number);
                EventManager.get_instance().emit(LinkGameBase.game_play_event_config.upgrade_table, this.mark_number);
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
            const ui_unlock_param_interface: UIParamInterface = {
                ui_config_path: UIConfig.Toast,
                ui_config_name: "Toast",
                param: {
                    text: "请先解锁前面的桌子"
                }
            }
            UIManager.show_ui(ui_unlock_param_interface);
            // console.log("请先解锁前面的桌子");
        }
    }

}
