
import BaseNode from "../../Common/BaseNode";

const {ccclass, property} = cc._decorator;

@ccclass
class OpenRedEnvelopeViewItem extends BaseNode {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}


export default OpenRedEnvelopeViewItem;
