
import BaseNode from "../../../Common/BaseNode";
import Utils from "../../../Common/Utils";
import { CashOutViewItemInterface } from "../CashOutInterface";

const {ccclass, property} = cc._decorator;

@ccclass
class BalanceCashOutViewItem extends BaseNode {

    @property(cc.Sprite)
    balance_item_bottom:cc.Sprite = null;
    @property(cc.Sprite)
    cornor_type_bottom:cc.Sprite = null;

    @property(cc.Label)
    cash_out_money_label:cc.Label = null;    
    @property(cc.Label)
    cornor_type_tip_label:cc.Label = null;

    onLoad () {
        super.onLoad();

    }

    start () {
        super.start();
    }

    update_view(cash_out_item_interface: CashOutViewItemInterface){
        this.cash_out_money_label.string = `${Utils.money(cash_out_item_interface.money, 1) }元`;
    }

    // update (dt) {}
}

export default BalanceCashOutViewItem;
