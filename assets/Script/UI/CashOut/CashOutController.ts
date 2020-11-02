/**@description 提现功能的控制器 */
import { BaseUIInterface, RouterInterface, UIParamInterface } from "../../Common/CommonInterface";
import Controller from "../../Common/Controller";
import CashOutView from "./CashOutView";
import { UserMoneyModel, CashOutViewItemInterface, CashOutInterface, CashInterface } from "./CashOutInterface";
import { CashOutRouterPath } from "../../Common/CommonEnum";
import UIManager from "../UIManager/UIManager";
import Loader from "../../Common/Loader";
import NoBanlanceCashOutView from "./NoBalance/NoBanlanceCashOutView";
import CommonServerData from "../../GameServerData/CommonServerData";

class CashOutController implements Controller {
    public name: string = "CashOutController";
    public view: CashOutView = null;

    public user_money_modal: UserMoneyModel = null;
    public with_draw_items: Array<CashOutViewItemInterface> = [];
    
    public no_balance_cash_out_view: NoBanlanceCashOutView = null;

    static open(cash_out_router_path: CashOutRouterPath){
           const cash_out_router: RouterInterface = {
                 controller: CashOutController,
                 ui_config_name:"CashOutView",
                 path:cash_out_router_path,
           }

           UIManager.nagivate_route(cash_out_router);
    }
    
    init_view(){
        // 现金类型的提现模块
        if(this.view.ui_param_interface.router.path == CashOutRouterPath.no_balance){
            Loader.load_prefab("./UI/CashOut/NoBalance/NoBanlanceCashOutView", (prefab: cc.Prefab) => {
                const no_balance_cash_out_view = cc.instantiate(prefab);
                no_balance_cash_out_view.parent = this.view.node;
                this.no_balance_cash_out_view = no_balance_cash_out_view.getComponent(NoBanlanceCashOutView);
                this.update_cash_out_view();
            });
        }
    }

    get money(){
        return this.user_money_modal.money;
    }

    set_user_money_modal(user_money_modal: UserMoneyModel){
        this.user_money_modal = user_money_modal;
    }
    
    set_with_draw_items(with_draw_items: Array<CashOutViewItemInterface>){
        this.with_draw_items = with_draw_items;
        this.view.flush_money(this.user_money_modal.money);
    }

    /**
     * @description 更新视图
     */
    update_cash_out_view(){
        CommonServerData.get_withdraw((with_draw_data_interface: CashOutInterface)=>{
            console.log("当前的体现数据  = ", with_draw_data_interface);
            // console.log("this.view",this.view.ui_param_interface.router.path);
            // 现金类型的提现模块
            if(this.view.ui_param_interface.router.path == CashOutRouterPath.no_balance){
                if(this.no_balance_cash_out_view){
                    this.no_balance_cash_out_view.update_view(with_draw_data_interface.items);
                }      
            }
        })
    }
  
}


export default CashOutController;