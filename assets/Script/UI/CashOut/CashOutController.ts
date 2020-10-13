/**@description 提现功能的控制器 */
import { BaseUIInterface, RouterInterface, UIParamInterface } from "../../Common/CommonInterface";
import Controller from "../../Common/Controller";
import CashOutView from "./CashOutView";
import { UserMoneyModel, WithDrawInterface } from "./CashOutInterface";
import { CashOutRouterPath } from "../../Common/CommonEnum";
import UIManager from "../UIManager/UIManager";
import Loader from "../../Common/Loader";

class CashOutController implements Controller {
    public name: string = "CashOutController";
    public view: CashOutView = null;

    public user_money_modal: UserMoneyModel = null;
    public with_draw_items: Array<WithDrawInterface> = [];
    

    static open(cash_out_router_path: CashOutRouterPath){
           const cash_out_router: RouterInterface = {
                 controller: CashOutController,
                 ui_config_name:"CashOutView",
                 path:cash_out_router_path,
           }

           UIManager.nagivate_route(cash_out_router);
    }
    
    init_view(){

        console.log("this.view.ui_param_interface ", this.view.ui_param_interface);
        // 现金类型的提现模块
        if(this.view.ui_param_interface.router.path == CashOutRouterPath.balance){
           Loader.load_prefab("./UI/CashOut/Balance/BalanceCashOutViewBackground", (prefab: cc.Prefab) => {
                const balance_cash_out_background = cc.instantiate(prefab);
                balance_cash_out_background.parent = this.view.node;
                Loader.load_prefab("./UI/CashOut/Balance/BanlanceCashOutView", (prefab: cc.Prefab) => {
                    const balance_cash_out_view = cc.instantiate(prefab);
                    balance_cash_out_view.parent = this.view.node;
               });
           });
        }else if(this.view.ui_param_interface.router.path == CashOutRouterPath.no_balance){
            console.log("显示的红包界面2")
            Loader.load_prefab("./UI/CashOut/NoBalance/NoBanlanceCashOutView", (prefab: cc.Prefab) => {
                const no_balance_cash_out_view = cc.instantiate(prefab);
                no_balance_cash_out_view.parent = this.view.node;
            });
        }
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