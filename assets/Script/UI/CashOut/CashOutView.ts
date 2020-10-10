import BaseUI from "../Common/BaseUI";
import CashOutController from "./CashOutController";
import { CashOutViewInterface } from "./WithDrawInterface";

 
const {ccclass, property} = cc._decorator;

@ccclass
/**@description 用户的提现界面 */
class CashOutView extends BaseUI implements CashOutViewInterface {


    @property(cc.Label)
    moeny_label: cc.Label = null;


    public cash_out_controller: CashOutController = null;

    /**@description 刷新余额显示 */
    flush_money(money: number){
        this.moeny_label.string = `${money}`;
    }

    /**@description 提现调用 */
    cash_out_callback(){
        this.cash_out_controller.cash_out();
    }
    

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}


export default  CashOutView;