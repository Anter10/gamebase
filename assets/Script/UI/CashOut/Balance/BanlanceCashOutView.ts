import BaseUI from "../../../Common/BaseUI";
import { UIParamInterface } from "../../../Common/CommonInterface";
import UIConfig from "../../UIManager/UIConfig";
import UIManager from "../../UIManager/UIManager";
import { CashOutViewItemInterface } from "../CashOutInterface";
import NoBalanceCashOutViewItem from "../NoBalance/NoBalanceCashOutViewItem";
import BalanceCashOutViewItem from "./BalanceCashOutViewItem";

const {ccclass, property} = cc._decorator;

@ccclass
class BanlanceCashOutView extends BaseUI {

    @property(cc.Node)
    container: cc.Node = null;

    @property(cc.Prefab)
    balance_cash_out_item_prefab: cc.Prefab = null;

    onLoad () {
        super.onLoad();
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
        let add_index = 0;
        for(const item of with_draw_items){
            const no_balance_node = cc.instantiate(this.balance_cash_out_item_prefab);
            const no_balance_node_script: BalanceCashOutViewItem = no_balance_node.getComponent(BalanceCashOutViewItem);
            no_balance_node_script.update_view(item);
            no_balance_node.parent = this.container;
            const row = Math.floor(add_index / 3);
            const column = add_index % 3;
            console.log(`row = ${row} column = ${column}`);
            no_balance_node.x =(no_balance_node.width / 2) + (column * no_balance_node.width) + ((column + 1) * 25);
            no_balance_node.y = -(row == 0 ? 20 : 0) -((no_balance_node.height / 2) + (row * no_balance_node.height)  + (row * 40)) ;
            add_index ++;
            this.container.height = (row + 1) * (no_balance_node.height + 30) + 40
        }
    }

    start () {
     
    }

    // update (dt) {}
}


export default BanlanceCashOutView;