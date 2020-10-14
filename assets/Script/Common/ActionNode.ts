import { NagivatorActionInterface } from "./CommonInterface";
import TouchButton from "./TouchButton";

 
const {ccclass, property} = cc._decorator;

@ccclass
class ActionNode extends cc.Component {
    @property(cc.Label)
    action_title_label: cc.Label = null;

    public nagivator_action_interface: NagivatorActionInterface = null;

    set_title(title: string){
        this.action_title_label.string = title;
    }

    register_action(nagivator_action_interface: NagivatorActionInterface){
        this.nagivator_action_interface = nagivator_action_interface;
        const touch_button: TouchButton = this.node.addComponent(TouchButton);
        touch_button.register_touch(this.nagivator_action_interface.action);
    }
    
    // onLoad () {}

    start () {

    }

    // update (dt) {}
}


export default ActionNode;