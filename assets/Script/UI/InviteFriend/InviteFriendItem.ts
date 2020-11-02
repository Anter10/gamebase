import BaseNode from "../../Common/BaseNode";
import Utils from "../../Common/Utils";
import { StageInterface } from "./InviteFriendInterface";

const {ccclass, property} = cc._decorator;

@ccclass
class InviteFriendItem extends BaseNode {

    @property(cc.Sprite)
    invite_friend_item_bottom: cc.Sprite = null;
    @property(cc.Sprite)
    get_invite_friend_award_button: cc.Sprite = null;
    
    @property(cc.Label)
    award_money_label: cc.Label = null;
    @property(cc.Label)
    item_message_label: cc.Label = null;
    @property(cc.Label)
    item_sub_message_label: cc.Label = null;
    @property(cc.Label)
    get_invite_friend_award_button_label: cc.Label = null;
    
    onLoad () {
        super.onLoad();
    }

    start () {
        super.start();
        
    }

    update_view(stage_interface: StageInterface){
        this.award_money_label.string = `${Utils.money(stage_interface.money, 1)}`;
        this.item_message_label.string = `${stage_interface.num}位好友 = ${Utils.money(stage_interface.totalMoney, 1)} 元`;
        this.item_sub_message_label.string = `您还可以领${stage_interface.money}`;
    }

    // update (dt) {}
}

export default InviteFriendItem
