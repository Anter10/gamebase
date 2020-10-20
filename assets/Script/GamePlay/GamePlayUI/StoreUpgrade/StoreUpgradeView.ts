import BaseUI from "../../../Common/BaseUI";
import Loader from "../../../Common/Loader";
import TouchButton from "../../../Common/TouchButton";
import EventManager from "../../../EventManager/EventManager";
import { StoreUpgradeConfig } from "../../../GameDataConfig/ConfigInterface";
import GameDataConfig from "../../../GameDataConfig/GameDataConfig";
import GameLocalData from "../../../GameLocalData/GameLocalData";
import StoreUpgradeData from "../../../GameLocalData/StoreUpgradeData";
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

    private store_upgrade_configs: Array<StoreUpgradeConfig> = [];
    private store_upgrade_data: StoreUpgradeData = null;
    private click_store_level: number = 0;
    private store_upgrade_data_level: number = 0;

    onLoad() {
        this.flush_view();
    }

    onEnable() {
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.click_store_button, this, this.refresh_ui);
    }

    onDisable() {
        EventManager.get_instance().cancel_listen(LinkGameBase.game_play_event_config.click_store_button, this, this.refresh_ui);
    }

    start() {
        this.store_upgrade_configs = GameDataConfig.get_config_array("StoreUpgradeConfig");
        this.store_upgrade_data = GameLocalData.get_instance().get_data<StoreUpgradeData>(StoreUpgradeData);
        this.store_upgrade_data_level = this.store_upgrade_data.get_store_level_data();;
        this.click_store_level = this.store_upgrade_data_level;
        this.load_heart_item();
        this.refresh_ui();
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
    }

    refresh_ui(event, click_level_number: number) {
        this.upgrade_conditions_array.removeAllChildren();
        if(click_level_number){
            this.click_store_level = click_level_number;
        }
        if (this.store_upgrade_configs[this.click_store_level].upgrade_need_cook_woman.length != 0) {
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
            }
        }
    }

    un_refresh_ui() {
        this.title_label.string = "店铺升级";
        Loader.load_prefab("/GamePlay/GamePlayUI/Common/StoreIconItem/StoreIconItem", (prefab: cc.Prefab) => {
            const store_icon_item = cc.instantiate(prefab);
            store_icon_item.getComponent(StoreIconItem).open_refresh_icon();
            store_icon_item.parent = this.cur_store_icon_sprite;
        });

        for (let i = 0; i < this.store_upgrade_configs.length; i++) {
            Loader.load_prefab("/GamePlay/GamePlayUI/Common/StoreIconItem/StoreIconItem", (prefab: cc.Prefab) => {
                const store_icon_item = cc.instantiate(prefab);
                let store_icon_item_script = store_icon_item.getComponent(StoreIconItem);
                store_icon_item_script.set_store_level(i + 1);
                store_icon_item_script.open_click_this_node();
                store_icon_item.parent = this.store_array_content;
            });
        }
    }

}
