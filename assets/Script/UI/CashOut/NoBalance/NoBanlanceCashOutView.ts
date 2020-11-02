import BaseUI from "../../../Common/BaseUI";
import { UIParamInterface } from "../../../Common/CommonInterface";
import Loader from "../../../Common/Loader";
import UIConfig from "../../UIManager/UIConfig";
import UIManager from "../../UIManager/UIManager";
import { CashOutViewItemInterface } from "../CashOutInterface";
import NoBalanceCashOutViewItem from "./NoBalanceCashOutViewItem";

const {ccclass, property} = cc._decorator;

@ccclass
class NoBanlanceCashOutView extends BaseUI {

    @property(cc.Node)
    container: cc.Node = null;

    @property(cc.Prefab)
    no_banlance_view_item_prefab: cc.Prefab = null;

    public cash_out_view_items_interface: Array<CashOutViewItemInterface> = [

    ];

    onLoad () {
        super.onLoad();
        this.cash_out_view_items_interface = [

        ];
        this.add_nagivator([{action_title: "提现记录",action: () =>{
            const ui_param_interface: UIParamInterface = {
                ui_config_path: UIConfig.CashOutOrderView,
                ui_config_name: "CashOutOrderView",
                param:{}
            }
            UIManager.show_ui(ui_param_interface);
        }}], 
        {
            title:"提现",
            back_callback:()=>{
                this.on_close_call("CashOutView");
            }
        })
    }

    update_view(with_draw_items: Array<CashOutViewItemInterface>){
        this.container.removeAllChildren(true);
        for(const item of with_draw_items){
            const no_balance_node = cc.instantiate(this.no_banlance_view_item_prefab);
            const no_balance_node_script: NoBalanceCashOutViewItem = no_balance_node.getComponent(NoBalanceCashOutViewItem);
            no_balance_node_script.update_view(item);
            no_balance_node.parent = this.container;
        }
    }

    start () {
    }

    update (dt) {
    }
}


export default NoBanlanceCashOutView;