import BaseUI from "../../../Common/BaseUI";
import { UIParamInterface } from "../../../Common/CommonInterface";
import Loader from "../../../Common/Loader";
import TouchButton from "../../../Common/TouchButton";
import GameLocalData from "../../../GameLocalData/GameLocalData";
import GamePlayBaseData from "../../../GameLocalData/GamePlayBaseData";
import UIConfig from "../../../UI/UIManager/UIConfig";
import UIManager from "../../../UI/UIManager/UIManager";
import GamePlayConfig from "../../GamePlayConfig/GamePlayConfig";
import StoreIconItem from "../Common/StoreIconItem/StoreIconItem";
import GameMainDecorationItem from "./GameMainDecorationItem";
import GameMainTableItem from "./GameMainTableItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameMainView extends BaseUI {

    @property(cc.Node)
    gold_coin_frame_node: cc.Node = null;

    @property(cc.Node)
    red_heart_frame_node: cc.Node = null;

    @property(cc.Node)
    cash_out_button: cc.Node = null;

    @property(cc.Node)
    cook_woman_button: cc.Node = null;

    @property(cc.Node)
    menu_button: cc.Node = null;

    @property(cc.Node)
    extension_button: cc.Node = null;

    @property(cc.Node)
    punch_clock_button: cc.Node = null;

    @property(cc.Node)
    attract_customer_button: cc.Node = null;

    @property(cc.Node)
    batch_attract_customer_button: cc.Node = null;

    @property(cc.Label)
    attract_customer_progress_label: cc.Label = null;

    @property(cc.Node)
    attract_customer_progress: cc.Node = null;

    @property(cc.Node)
    table_node_array: Array<cc.Node> = [];

    @property(cc.Node)
    decoration_array: cc.Node = null;

    @property(cc.Node)
    store_upgrade_button: cc.Node = null;

    @property(cc.Node)
    store_upgrade_node: cc.Node = null;

    onLoad() {
        this.flush_view();
    }

    start() {
        this.load_gold_and_heart_item();
        this.load_table_item();
        this.load_decoration_item();
        this.load_store();
    }

    load_store() {
        Loader.load_prefab("/GamePlay/GamePlayUI/Common/StoreIconItem/StoreIconItem", (prefab: cc.Prefab) => {
            const game_store_icon_item = cc.instantiate(prefab);
            game_store_icon_item.getComponent(StoreIconItem).open_refresh_icon();
            game_store_icon_item.parent = this.store_upgrade_node;
        });
    }

    flush_view() {
        //提现
        const cash_out_button: TouchButton = this.cash_out_button.addComponent(TouchButton);
        cash_out_button.register_touch(this.click_cash_out_button.bind(this));

        //店铺升级
        const store_upgrade_button: TouchButton = this.store_upgrade_button.addComponent(TouchButton);
        store_upgrade_button.register_touch(this.click_store_upgrade_button.bind(this));

        //厨娘
        const cook_woman_button: TouchButton = this.cook_woman_button.addComponent(TouchButton);
        cook_woman_button.register_touch(this.click_cook_woman_button.bind(this));

        //菜谱
        const menu_button: TouchButton = this.menu_button.addComponent(TouchButton);
        menu_button.register_touch(this.click_menu_button.bind(this));

        //扩建
        const extension_button: TouchButton = this.extension_button.addComponent(TouchButton);
        extension_button.register_touch(this.click_extension_button.bind(this));

        //打卡
        const punch_clock_button: TouchButton = this.punch_clock_button.addComponent(TouchButton);
        punch_clock_button.register_touch(this.click_punch_clock_button.bind(this));

        //招揽顾客
        const attract_customer_button: TouchButton = this.attract_customer_button.addComponent(TouchButton);
        attract_customer_button.register_touch(this.click_attract_customer_button.bind(this));

        //批量招揽顾客
        const batch_attract_customer_button: TouchButton = this.batch_attract_customer_button.addComponent(TouchButton);
        batch_attract_customer_button.register_touch(this.click_batch_attract_customer_button.bind(this));

        const game_play_base_data = GameLocalData.get_instance().get_data<GamePlayBaseData>(GamePlayBaseData);
        this.set_attract_customer_progress(game_play_base_data.attract_customer_number);

    }

    load_gold_and_heart_item() {
        Loader.load_prefab("/GamePlay/GamePlayUI/Common/GoldCoinFrame/GoldCoinFrameItem", (prefab: cc.Prefab) => {
            const gold_coin_frame_item = cc.instantiate(prefab);
            gold_coin_frame_item.parent = this.gold_coin_frame_node;
        });
        Loader.load_prefab("/GamePlay/GamePlayUI/Common/RedHeartFrame/RedHeartFrameItem", (prefab: cc.Prefab) => {
            const red_heart_frame_item = cc.instantiate(prefab);
            red_heart_frame_item.parent = this.red_heart_frame_node;
        });
    }

    load_table_item() {
        for (let i = 0; i < this.table_node_array.length; i++) {
            Loader.load_prefab("/GamePlay/GamePlayUI/Main/GameMainTableItem", (prefab: cc.Prefab) => {
                const game_main_table_item = cc.instantiate(prefab);
                game_main_table_item.getComponent(GameMainTableItem).set_table_number(i);
                game_main_table_item.parent = this.table_node_array[i];
            });
        }
    }

    load_decoration_item() {
        for (let i = 0; i < this.decoration_array.childrenCount; i++) {
            Loader.load_prefab("/GamePlay/GamePlayUI/Main/GameMainDecorationItem", (prefab: cc.Prefab) => {
                const game_main_table_item = cc.instantiate(prefab);
                game_main_table_item.getComponent(GameMainDecorationItem).set_decoration_number(i);
                game_main_table_item.parent = this.decoration_array.children[i];
            });
        }
    }

    click_cash_out_button() {

    }

    click_cook_woman_button() {
        const ui_cook_woman_param_interface: UIParamInterface = {
            ui_config_path: UIConfig.CookWomanView,
            ui_config_name: "CookWomanView",
        }
        UIManager.show_ui(ui_cook_woman_param_interface);
    }

    click_store_upgrade_button() {
        const ui_store_upgrade_param_interface: UIParamInterface = {
            ui_config_path: UIConfig.StoreUpgradeView,
            ui_config_name: "StoreUpgradeView",
        }
        UIManager.show_ui(ui_store_upgrade_param_interface);
    }

    click_menu_button() {
        const ui_menu_param_interface: UIParamInterface = {
            ui_config_path: UIConfig.MenuView,
            ui_config_name: "MenuView",
        }
        UIManager.show_ui(ui_menu_param_interface);
    }

    click_extension_button() {
        const ui_extension_param_interface: UIParamInterface = {
            ui_config_path: UIConfig.ExtensionTableView,
            ui_config_name: "ExtensionTableView",
        }
        UIManager.show_ui(ui_extension_param_interface);
    }

    click_punch_clock_button() {

    }

    click_attract_customer_button() {
        const game_play_base_data = GameLocalData.get_instance().get_data<GamePlayBaseData>(GamePlayBaseData);
        let total = game_play_base_data.attract_customer_number + GamePlayConfig.click_attract_customer_button_add;
        if (total <= 100) {
            game_play_base_data.attract_customer_number = game_play_base_data.attract_customer_number + GamePlayConfig.click_attract_customer_button_add;
            this.set_attract_customer_progress(game_play_base_data.attract_customer_number);
            if (total == 100) {
                this.scheduleOnce(() => {
                    game_play_base_data.attract_customer_number = 0;
                    this.set_attract_customer_progress(game_play_base_data.attract_customer_number);
                    //再招揽一位客人。
                }, 0.5);
            }
        }
    }

    click_batch_attract_customer_button() {

    }

    set_attract_customer_progress(progress_number: number) {
        this.attract_customer_progress_label.string = progress_number + "%";
        this.attract_customer_progress.scaleX = progress_number / 100;
    }

}
