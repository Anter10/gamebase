import UIManager from "../UI/UIManager/UIManager";
import UIParamInterface from "../UI/UIManager/UIParamInterface";
 
import Controller from "./Controller";

 
const {ccclass, property} = cc._decorator;

@ccclass
abstract class BaseUI extends cc.Component {
    public block_input_events: cc.BlockInputEvents = null;
    public ui_param_interface: UIParamInterface = null;
    public controller: Controller = null;
    public widget: cc.Widget = null;

    onLoad () {
        this.widget = this.node.getComponent(cc.Widget);
        this.block_input_events = this.addComponent(cc.BlockInputEvents);
    }

    show(ui_param_interface: UIParamInterface){
        this.ui_param_interface = ui_param_interface;
        this.node.active = true;
    }

    hide(){
        this.node.active = false;
    }

    on_close_call(){
        console.log("关闭界面",this.node.name);
        UIManager.close_ui(this.node.name);
    }

    start () {
       
    }

    // update (dt) {}
}


export default BaseUI;