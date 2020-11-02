import BaseUI from "../../Common/BaseUI";
import { TouchButtonEffectType } from "../../Common/CommonEnum";
import TouchButton from "../../Common/TouchButton";
import OpenRedEnvelopeViewController from "./OpenRedEnvelopeViewController";

const {ccclass, property} = cc._decorator;

@ccclass
class OpenRedEnvelopeView extends BaseUI {
    public controller: OpenRedEnvelopeViewController = null;

    @property(cc.Node)
    red_pack_node: cc.Node = null;
    
    onLoad () {
        super.onLoad();
        this.controller.init_view();

        const touch_button: TouchButton = this.node.addComponent(TouchButton);
        touch_button.register_touch(()=>{
            this.on_close_call(this.node.name);
        },null,null, TouchButtonEffectType.none);
    }

    start () {
        super.start();

    }

    // update (dt) {}
}

export default OpenRedEnvelopeView
