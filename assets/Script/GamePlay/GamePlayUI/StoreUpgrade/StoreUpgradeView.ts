import BaseUI from "../../../Common/BaseUI";
import { UIParamInterface } from "../../../Common/CommonInterface";
import Loader from "../../../Common/Loader";
import TouchButton from "../../../Common/TouchButton";
import EventManager from "../../../EventManager/EventManager";
import { StoreUpgradeConfig } from "../../../GameDataConfig/ConfigInterface";
import GameDataConfig from "../../../GameDataConfig/GameDataConfig";
import DecorationData from "../../../GameLocalData/DecorationData";
import GameLocalData from "../../../GameLocalData/GameLocalData";
import GamePlayBaseData from "../../../GameLocalData/GamePlayBaseData";
import PeopleData from "../../../GameLocalData/PeopleData";
import StoreUpgradeData from "../../../GameLocalData/StoreUpgradeData";
import TableData from "../../../GameLocalData/TableData";
import UIConfig from "../../../UI/UIManager/UIConfig";
import UIManager from "../../../UI/UIManager/UIManager";
import { StoreUpgradeConditionType } from "../../GamePlayEnum/GamePlayEnum";
import LinkGameBase from "../../LinkGameBase";
import StoreIconItem from "../Common/StoreIconItem/StoreIconItem";
import UpgradeConditionItem from "./UpgradeConditionItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class StoreUpgradeView extends BaseUI {

    @property(cc.Node)
    red_heart_frame_node: cc.Node = null;

    @property(cc.Label)
    title_label: cc.Label = null;

    @property(cc.Node)
    close_button: cc.Node = null;

    @property(cc.Node)
    cur_store_icon_sprite: cc.Node = null;

    @property(cc.Node)
    store_array_content: cc.Node = null;

    @property(cc.Node)
    upgrade_conditions_array: cc.Node = null;

    @property(cc.ScrollView)
    store_array_scroll_view: cc.ScrollView = null;

    @property(cc.Node)
    success_upgrade_sprite: cc.Node = null;

    @property(cc.Node)
    upgrade_conditions: cc.Node = null;

    @property(cc.Node)
    show_null: cc.Node = null;

    @property(cc.RichText)
    upgrade_description_label: cc.RichText = null;

    @property(cc.Node)
    cur_store_sprite: cc.Node = null;

    @property(cc.Node)
    upgrade_button: cc.Node = null;

    @property(cc.Label)
    cost_coin_label: cc.Label = null;

    @property(cc.Node)
    upgrade_label: cc.Node = null;

    @property(cc.Node)
    upgrade_frame: cc.Node = null;

    @property(cc.Node)
    congratulation_label: cc.Node = null;

    private store_upgrade_configs: Array<StoreUpgradeConfig> = [];
    private store_upgrade_data: StoreUpgradeData = null;
    private click_store_level: number = 0;
    private store_upgrade_data_level: number = 0;
    private condition_config: Array<number> = [];

    onLoad() {
        this.flush_view();
        this.store_upgrade_configs = GameDataConfig.get_config_array("StoreUpgradeConfig");
        this.store_upgrade_data = GameLocalData.get_instance().get_data<StoreUpgradeData>(StoreUpgradeData);
        this.store_upgrade_data_level = this.store_upgrade_data.get_store_level_data();
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.click_store_button, this, this.refresh_ui);
    }

    onEnable() {
        this.click_store_level = this.store_upgrade_data_level;
        EventManager.get_instance().emit(LinkGameBase.game_play_event_config.click_store_button, this.click_store_level);
    }

    onDestroy() {
        EventManager.get_instance().cancel_listen(LinkGameBase.game_play_event_config.click_store_button, this, this.refresh_ui);
    }

    start() {
        this.load_heart_item();
        this.un_refresh_ui();
    }

    load_heart_item() {
        Loader.load_prefab("/GamePlay/GamePlayUI/Common/RedHeartFrame/RedHeartFrameItem", (prefab: cc.Prefab) => {
            const red_heart_frame_item = cc.instantiate(prefab);
            red_heart_frame_item.parent = this.red_heart_frame_node;
        });
    }

    flush_view() {
        //关闭界面
        const close_button: TouchButton = this.close_button.addComponent(TouchButton);
        close_button.register_touch(this.on_close_call.bind(this));

        //点击升级按钮
        const upgrade_button: TouchButton = this.upgrade_button.addComponent(TouchButton);
        upgrade_button.register_touch(this.click_upgrade_button.bind(this));
    }

    click_upgrade_button() {
        const game_play_base_data = GameLocalData.get_instance().get_data<GamePlayBaseData>(GamePlayBaseData);
        if (this.refresh_progress()) {
            if (game_play_base_data.change_red_heart_number(-this.store_upgrade_configs[this.store_upgrade_data_level].heart_number)) {
                this.store_upgrade_data.change_store_level_data(this.click_store_level + 1);
                this.store_upgrade_data_level = this.store_upgrade_data.get_store_level_data();
                this.refresh_ui(0, this.click_store_level);
                const ui_param_interface: UIParamInterface = {
                    ui_config_path: UIConfig.Toast,
                    ui_config_name: "Toast",
                    param: {
                        text: "解锁成功"
                    }
                }
                UIManager.show_ui(ui_param_interface);
                // console.log("解锁成功", this.store_upgrade_data_level);
            } else {
                const ui_param_interface: UIParamInterface = {
                    ui_config_path: UIConfig.Toast,
                    ui_config_name: "Toast",
                    param: {
                        text: "红心不足，快去营业赚金币吧"
                    }
                }
                UIManager.show_ui(ui_param_interface);
                // console.log("红心不足，快去营业赚金币吧");
            }
        } else {
            const ui_param_interface: UIParamInterface = {
                ui_config_path: UIConfig.Toast,
                ui_config_name: "Toast",
                param: {
                    text: "必须达成所有条件哦"
                }
            }
            UIManager.show_ui(ui_param_interface);
            // console.log("必须达成所有条件哦");
        }
    }

    refresh_progress() {
        const table_data = GameLocalData.get_instance().get_data<TableData>(TableData);
        this.condition_config = this.store_upgrade_configs[this.click_store_level].upgrade_need_table;
        if (this.condition_config.length == 0) {
            return true;
        }
        let complete_number = 0;
        for (let i = 0; i < this.condition_config[0]; i++) {
            if (table_data.get_table_data(i).tableLevel >= this.condition_config[1]) {
                complete_number++;
            }
        }
        if (complete_number >= this.condition_config[0]) {
        } else {
            return false;
        }

        this.condition_config = this.store_upgrade_configs[this.click_store_level].upgrade_need_decoration;
        const cook_woman_data = GameLocalData.get_instance().get_data<PeopleData>(PeopleData);
        let cook_woman_complete_number = 0;
        for (let i = 0; i < this.condition_config[0]; i++) {
            if (cook_woman_data.get_people_data_by_people_config_id(i + 2).peopleLevel >= this.condition_config[1]) {
                cook_woman_complete_number++;
            }
        }
        if (cook_woman_complete_number >= this.condition_config[0]) {
        } else {
            return false;
        }

        this.condition_config = this.store_upgrade_configs[this.click_store_level].upgrade_need_cook_woman;
        const decoration_data = GameLocalData.get_instance().get_data<DecorationData>(DecorationData);
        let decoration_complete_number = 0;
        for (let i = 0; i < this.condition_config[0]; i++) {
            if (decoration_data.get_decoration_data(i).decorationLevel >= this.condition_config[1]) {
                decoration_complete_number++;
            }
        }
        if (decoration_complete_number >= this.condition_config[0]) {
        } else {
            return false;
        }
        return true;
    }

    refresh_ui(event, click_level_number: number) {
        if (click_level_number) {
            this.click_store_level = click_level_number;
        }
        if (this.click_store_level == this.store_upgrade_data_level) {
            if (this.store_upgrade_configs[this.click_store_level] && this.store_upgrade_configs[this.click_store_level].upgrade_need_cook_woman.length != 0) {
                this.upgrade_conditions_array.removeAllChildren();
                for (let i = 0; i < 3; i++) {
                    Loader.load_prefab("/GamePlay/GamePlayUI/StoreUpgrade/UpgradeConditionItem", (prefab: cc.Prefab) => {
                        const upgrade_condition_item = cc.instantiate(prefab);
                        switch (i) {
                            case StoreUpgradeConditionType.Table:
                                upgrade_condition_item.getComponent(UpgradeConditionItem).set_condition_config(i, this.store_upgrade_configs[this.click_store_level].upgrade_need_table);
                                break;
                            case StoreUpgradeConditionType.Decoration:
                                upgrade_condition_item.getComponent(UpgradeConditionItem).set_condition_config(i, this.store_upgrade_configs[this.click_store_level].upgrade_need_decoration);
                                break;
                            case StoreUpgradeConditionType.CookWoman:
                                upgrade_condition_item.getComponent(UpgradeConditionItem).set_condition_config(i, this.store_upgrade_configs[this.click_store_level].upgrade_need_cook_woman);
                                break;
                        }
                        upgrade_condition_item.y = -90 * i - upgrade_condition_item.height / 2;
                        upgrade_condition_item.parent = this.upgrade_conditions_array;
                    });
                    this.cost_coin_label.string = this.store_upgrade_configs[this.click_store_level].heart_number + "";
                }
                this.upgrade_label.y = 180;
                this.upgrade_frame.y = -160;
            } else {
                this.upgrade_label.y = 70;
                this.upgrade_frame.y = -60;
            }
            if (this.store_upgrade_data_level == this.store_upgrade_configs.length) {
                this.upgrade_label.active = false;
                this.upgrade_frame.active = false;
                this.congratulation_label.active = true;
            }
            this.success_upgrade_sprite.active = false;
            this.upgrade_conditions.active = true;
            this.show_null.active = false;
        } else if (this.click_store_level < this.store_upgrade_data_level) {
            this.success_upgrade_sprite.active = true;
            this.upgrade_conditions.active = false;
            this.show_null.active = false;
            EventManager.get_instance().emit(LinkGameBase.game_play_event_config.select_store_level, this.click_store_level);
        } else {
            this.success_upgrade_sprite.active = false;
            this.upgrade_conditions.active = false;
            this.show_null.active = true;
        }
        if (this.store_upgrade_data_level < 3) {
            this.upgrade_description_label.string = "<color=#460B0D>店铺升级到LV.3就可以</c><color=#DA0000>提现啦\n</c><color=#460B0D>快去升级吧</c>";
        } else if (this.store_upgrade_data_level == this.store_upgrade_configs.length) {
            this.upgrade_description_label.string = "<color=#460B0D>店铺升级到LV.10，每周</c><color=#DA0000>可提现888元啦</c>\n<color=#460B0D>快去提现吧</c>";
        } else {
            this.upgrade_description_label.string = `<color=#460B0D>店铺升级到LV.${this.store_upgrade_data_level + 1}，每周</c><color=#DA0000>可提现${this.store_upgrade_configs[this.store_upgrade_data_level].cash_number}元啦</c>\n<color=#460B0D>快去提现吧</c>`;
        }
    }

    un_refresh_ui() {
        this.title_label.string = "店铺升级";
        let click = this.click_store_level;
        if (click <= 2) {
            this.store_array_scroll_view.scrollTo(cc.v2(0, 0));
        } else if (click <= this.store_upgrade_configs.length) {
            this.store_array_scroll_view.scrollTo(cc.v2((click * 0.17 - 0.44), 0));
        }

        Loader.load_prefab("/GamePlay/GamePlayUI/Common/StoreIconItem/StoreIconItem", (prefab: cc.Prefab) => {
            const store_icon_item = cc.instantiate(prefab);
            store_icon_item.getComponent(StoreIconItem).open_refresh_icon();
            store_icon_item.parent = this.cur_store_icon_sprite;
        });
        Loader.load_prefab("/GamePlay/GamePlayUI/Common/StoreIconItem/StoreIconItem", (prefab: cc.Prefab) => {
            const store_icon_item = cc.instantiate(prefab);
            store_icon_item.getComponent(StoreIconItem).select_store_item();
            store_icon_item.parent = this.cur_store_sprite;
        });
        for (let i = 0; i < this.store_upgrade_configs.length; i++) {
            Loader.load_prefab("/GamePlay/GamePlayUI/Common/StoreIconItem/StoreIconItem", (prefab: cc.Prefab) => {
                const store_icon_item = cc.instantiate(prefab);
                let store_icon_item_script = store_icon_item.getComponent(StoreIconItem);
                store_icon_item_script.set_store_level(i + 1);
                store_icon_item_script.open_click_this_node();
                if (i == this.click_store_level - 1) {
                    store_icon_item_script.click_this_node();
                }
                store_icon_item.parent = this.store_array_content;
            });
        }
    }

}
