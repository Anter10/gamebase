import { TouchButtonInterface } from "./CommonInterface";

 
const {ccclass, property} = cc._decorator;

@ccclass
export default class TouchButton extends cc.Component {
    // LIFE-CYCLE CALLBACKS:

    private touch_button_interface: TouchButtonInterface = null;

    onLoad () {
        this.node.on("touchend", ()=> {
            if(this.touch_button_interface.touch_end_call_back){
                this.touch_button_interface.touch_end_call_back();
            }
        }, this);
    }

    start () {

    }

    // update (dt) {}
}
