import BaseNode from "../../Common/BaseNode";
import { StageInterface } from "./InviteFriendInterface";

const {ccclass, property} = cc._decorator;

@ccclass
class InviteFriendItem extends BaseNode {

    
    onLoad () {
        super.onLoad();
    }

    start () {
        super.start();
        
    }

    update_view(stage_interface: StageInterface){
        
    }

    // update (dt) {}
}

export default InviteFriendItem
