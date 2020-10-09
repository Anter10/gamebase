import UIParamInterface from "../UIManager/UIParamInterface";

 
const {ccclass, property} = cc._decorator;

@ccclass
class BaseUI extends cc.Component {
    public block_input_events: cc.BlockInputEvents = null;
    public ui_param_interface: UIParamInterface = null;
    
    onLoad () {
        this.block_input_events = this.addComponent(cc.BlockInputEvents);
    }

    show(ui_param_interface: UIParamInterface){
        this.ui_param_interface = ui_param_interface;
        this.node.active = true;
    }

    hide(){
        this.node.active = false;
    }

    start () {
       
    }

    // update (dt) {}
}


export default BaseUI;