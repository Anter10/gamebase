import BaseUI from "../../../Common/BaseUI";
import { UIParamInterface } from "../../../Common/CommonInterface";
import Loader from "../../../Common/Loader";
import EventManager from "../../../EventManager/EventManager";
import LinkGameBase from "../../../GamePlay/LinkGameBase";
import UIConfig from "../../UIManager/UIConfig";
import UIManager from "../../UIManager/UIManager";
import { CashOutViewItemInterface } from "../CashOutInterface";
import NoBalanceCashOutViewItem from "./NoBalanceCashOutViewItem";

const { ccclass, property } = cc._decorator;

@ccclass
class NoBanlanceCashOutView extends BaseUI {

    @property(cc.Node)
    container: cc.Node = null;

    @property(cc.Prefab)
    no_banlance_view_item_prefab: cc.Prefab = null;

    public cash_out_view_items_interface: Array<CashOutViewItemInterface> = [

    ];

    onLoad() {
        super.onLoad();

        this.cash_out_view_items_interface = [
            {
                disable: false,
                goodsType: 0,
                id: 1,
                money: 30,
                needProcess: 0,
                process: 0,
                type: 1,
                goodsData: { name: "新手礼包", content: "Hello", image: "", money: 0.3 },
            },
            {
                disable: false,
                goodsType: 0,
                id: 1,
                money: 30,
                needProcess: 2,
                process: 0,
                type: 3,
                goodsData: { name: "2天打卡专享", content: "Hello", image: "", money: 0.3 },
            },
            {
                disable: false,
                goodsType: 0,
                id: 1,
                money: 50,
                needProcess: 10,
                process: 0,
                type: 3,
                goodsData: { name: "10天打卡专享", content: "Hello", image: "", money: 0.5 },
            },
            {
                disable: false,
                goodsType: 0,
                id: 1,
                money: 200,
                needProcess: 5,
                process: 0,
                type: 3,
                goodsData: { name: "18天打卡专享", content: "Hello", image: "", money: 2 },
            },

            {
                disable: false,
                goodsType: 0,
                id: 1,
                money: 300,
                needProcess: 8,
                process: 0,
                type: 4,
                goodsData: { name: "店铺LV.3专享", content: "Hello", image: "", money: 2 },
            },

            {
                disable: false,
                goodsType: 0,
                id: 1,
                money: 500,
                needProcess: 10,
                process: 0,
                type: 4,
                goodsData: { name: "店铺LV.3专享", content: "Hello", image: "", money: 2 },
            },
            {
                disable: false,
                goodsType: 0,
                id: 1,
                money: 1800,
                needProcess: 18,
                process: 0,
                type: 4,
                goodsData: { name: "店铺LV.3专享", content: "Hello", image: "", money: 2 },
            },



        ];

        this.add_nagivator(
            [
                // {
                //     action_title: "提现记录", action: () => {
                //         const ui_param_interface: UIParamInterface = {
                //             ui_config_path: UIConfig.CashOutOrderView,
                //             ui_config_name: "CashOutOrderView",
                //             param: {}
                //         }
                //         UIManager.show_ui(ui_param_interface);
                //     }
                // }
            ],
            {
                title: "提现",
                back_callback: () => {
                    this.on_close_call("CashOutView");
                }
            })
    }

    update_view(cash_out_view_items_interface: Array<CashOutViewItemInterface>) {
        const cashs = cash_out_view_items_interface ? cash_out_view_items_interface : this.cash_out_view_items_interface;
        this.container.removeAllChildren(true);
        for (const item of cashs) {
            const no_balance_node = cc.instantiate(this.no_banlance_view_item_prefab);
            const no_balance_node_script: NoBalanceCashOutViewItem = no_balance_node.getComponent(NoBalanceCashOutViewItem);
            no_balance_node_script.update_view(item);
            no_balance_node.parent = this.container;
        }
    }

    start() {

    }

    update(dt) {

    }
}


export default NoBanlanceCashOutView;