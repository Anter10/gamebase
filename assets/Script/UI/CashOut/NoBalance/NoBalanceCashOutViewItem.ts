import BaseNode from "../../../Common/BaseNode";
import TouchButton from "../../../Common/TouchButton";
import Utils from "../../../Common/Utils";
import { CashOutViewItemInterface } from "../CashOutInterface";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NoBalanceCashOutViewItem extends BaseNode {

    @property(cc.Sprite)
    no_balance_cash_out_view_bottom: cc.Sprite = null;
    @property(cc.Sprite)
    cash_out_button: cc.Sprite = null;
    @property(cc.Sprite)
    left_cornoer_sign: cc.Sprite = null;

    
    @property(cc.Label)
    cash_out_money_label:cc.Label = null;
    @property(cc.Label)
    cash_out_condition_tip_label: cc.Label = null;
    @property(cc.Label)
    cash_out_button_text_label: cc.Label = null;
    @property(cc.Label)
    cornor_tip_label: cc.Label = null;

    onLoad () {
        super.onLoad();
        const touch_button: TouchButton = this.cash_out_button.node.addComponent(TouchButton);
        touch_button.register_touch(()=>{
            // 提现操作
            console.log("点击了提现操作");

       });
    }

    start () {
        super.start();

    }
    
    update_view(cash_out_item_interface: CashOutViewItemInterface){
        this.cash_out_money_label.string = `${Utils.money(cash_out_item_interface.money, 1) }元`;
    }

    // update (dt) {}
}
