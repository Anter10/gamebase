import BaseUI from "../../Common/BaseUI";
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
    }

    start () {
        super.start();

    }

    // update (dt) {}
}

export default OpenRedEnvelopeView
