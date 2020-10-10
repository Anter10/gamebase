import BaseUI from "../../Common/BaseUI";

 
const {ccclass, property} = cc._decorator;

@ccclass
export default class InviteFriendView extends BaseUI {

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
