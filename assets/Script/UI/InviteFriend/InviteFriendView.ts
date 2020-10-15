import BaseUI from "../../Common/BaseUI";
import InviteFriendViewController from "./InviteFriendViewController";

 
const {ccclass, property} = cc._decorator;

@ccclass
class InviteFriendView extends BaseUI {
    public controller: InviteFriendViewController = null;

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        super.onLoad();
        this.controller.init_view();
    }

    start () {
        super.start();

    }

    // update (dt) {}
}


export default InviteFriendView;