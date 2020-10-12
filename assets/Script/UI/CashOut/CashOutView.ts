import BaseUI from "../../Common/BaseUI";
import { BaseUIInterface } from "../../Common/CommonInterface";
import CashOutController from "./CashOutController";
import { CashOutViewInterface } from "./WithDrawInterface";

 
const {ccclass, property} = cc._decorator;

@ccclass
/**@description 用户的提现界面 */
class CashOutView extends BaseUI implements CashOutViewInterface, BaseUIInterface {


    @property(cc.Label)
    moeny_label: cc.Label = null;

    /**@description 刷新余额显示 */
    flush_money(money: number){
        this.moeny_label.string = `${money}`;
    }

    /**@description 提现调用 */
    cash_out_callback(){
        
    }
    

    onLoad () {
        super.onLoad();
    }
    
    start () {
        super.start();
    }

    // update (dt) {}
}


export default  CashOutView;