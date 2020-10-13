import BaseUI from "../../Common/BaseUI";
import { BaseUIInterface } from "../../Common/CommonInterface";
import { CashOutViewInterface } from "./CashOutInterface";
import {CashOutType} from "./CashOutEnum";
import CashOutController from "./CashOutController";

 
const {ccclass, property} = cc._decorator;

@ccclass
/**@description 用户的提现界面 */
class CashOutView extends BaseUI implements CashOutViewInterface, BaseUIInterface {
    public cash_out_type: CashOutType = CashOutType.no_balance;
    public controller: CashOutController = null;

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
        this.controller.init_view();
        console.log(this.controller)
    }
    
    start () {
        super.start();
    }

    // update (dt) {}
}


export default  CashOutView;