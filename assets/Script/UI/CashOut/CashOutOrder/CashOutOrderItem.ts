 
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
}


export default CashOutOrderItem;