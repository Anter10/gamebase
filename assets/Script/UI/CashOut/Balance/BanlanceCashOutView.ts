import BaseUI from "../../../Common/BaseUI";
import { UIParamInterface } from "../../../Common/CommonInterface";
import UIConfig from "../../UIManager/UIConfig";
import UIManager from "../../UIManager/UIManager";

const {ccclass, property} = cc._decorator;

@ccclass
class BanlanceCashOutView extends BaseUI {

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        super.onLoad();

        console.log("CashOutOrderView ");
        this.add_nagivator([{action_title: "提现记录",action: () =>{
            const ui_param_interface: UIParamInterface = {
                ui_config_path: UIConfig.CashOutOrderView,
                ui_config_name: "CashOutOrderView",
                param:{}
            }
            UIManager.show_ui(ui_param_interface);
        }}], 
        {
            title:"提现",
            back_callback:()=>{
                this.on_close_call("CashOutView");
            }
        })
    }

    start () {
     
    }

    // update (dt) {}
}


export default BanlanceCashOutView;