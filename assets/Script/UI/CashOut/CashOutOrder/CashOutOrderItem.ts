import Utils from "../../../Common/Utils";
import { CashOutOrderInterface } from "../CashOutInterface";

 
const {ccclass, property} = cc._decorator;

@ccclass
class CashOutOrderItem extends cc.Component {
    @property(cc.Sprite)
    cash_out_order_item_bottom: cc.Sprite = null;

    @property(cc.Label)
    cash_out_order_money_label: cc.Label = null;
    @property(cc.Label)
    cash_out_order_date_label:  cc.Label = null;
    @property(cc.Label)
    cash_out_order_tip_label: cc.Label = null;

    start () {
       
    }

    update_view(cash_out_order_item_interface: CashOutOrderInterface){
        this.cash_out_order_money_label.string = `${Utils.money(cash_out_order_item_interface.money, 1)}`;
        this.cash_out_order_date_label.string = cash_out_order_item_interface.datetime;
    }
}


export default CashOutOrderItem;