/**@description 提现功能的控制器 */
import { BaseUIInterface, RouterInterface, UIParamInterface } from "../../Common/CommonInterface";
import Controller from "../../Common/Controller";
import CashOutView from "./CashOutView";
import { UserMoneyModel, WithDrawInterface } from "./CashOutInterface";
import { CashOutRouterPath } from "../../Common/CommonEnum";
import UIManager from "../UIManager/UIManager";

class CashOutController implements Controller {
    public name: string = "CashOutController";
    public view: CashOutView = null;
    
    public user_money_modal: UserMoneyModel = null;
    public with_draw_items: Array<WithDrawInterface> = [];
    

    static open(cash_out_router_path: CashOutRouterPath){
           const cash_out_router: RouterInterface = {
                 controller: CashOutController,
                 ui_config_name:"CashOutView",
                 paths:cash_out_router_path,
           }

           UIManager.nagivate_route(cash_out_router);
    }

    constructor(){

    }

    show(param: UIParamInterface){
        
    }


    get money(){
        return this.user_money_modal.money;
    }

    set_user_money_modal(user_money_modal: UserMoneyModel){
        this.user_money_modal = user_money_modal;
    }
    
    set_with_draw_items(with_draw_items: Array<WithDrawInterface>){
        this.with_draw_items = with_draw_items;
        this.view.flush_money(this.user_money_modal.money);
    }
    
    cash_out(){
        // 提现的逻辑

    }

}


export default CashOutController;