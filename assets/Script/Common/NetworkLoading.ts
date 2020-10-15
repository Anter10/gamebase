 
import BaseUI from "./BaseUI";
import { UIParamInterface } from "./CommonInterface";

const {ccclass, property} = cc._decorator;

@ccclass
class NetworkLoading extends BaseUI {
 
    // onLoad () {}

    start () {

    }

    hide(){
        super.hide();
    }

    show(ui_param_interface: UIParamInterface){
        super.show(ui_param_interface);
        console.log("NETing show");
    }

    // update (dt) {}
}


export default NetworkLoading;