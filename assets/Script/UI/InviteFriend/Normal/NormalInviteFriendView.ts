import BaseUI from "../../../Common/BaseUI";
import { ShareInterface, StageInterface } from "../InviteFriendInterface";
import InviteFriendItem from "../InviteFriendItem";

const {ccclass, property} = cc._decorator;

@ccclass
class NormalInviteFriendView extends BaseUI {
    @property(cc.Sprite)
    rank_view_background: cc.Sprite = null;
    @property(cc.Sprite)
    invite_header_bottom: cc.Sprite = null;
    @property(cc.Sprite)
    copy_invite_code_button: cc.Sprite = null;

    @property(cc.Node)
    header_view: cc.Node = null;
    @property(cc.Node)
    container: cc.Node = null;

    @property(cc.Label)
    invite_code_tip_label: cc.Label = null;
    @property(cc.Label)
    copy_invite_code_button_abel: cc.Label = null;

    @property(cc.Prefab)
    invite_friend_item_prefab: cc.Prefab = null;
    

    onLoad () {
        super.onLoad();
        this.add_nagivator([],{
            title:"邀请好友",
            back_callback:()=>{
                this.on_close_call("InviteFriendView");
            }
        })
    }

    update_view(stages: Array<StageInterface>){
        for(const stage of stages){
            const invite_friend_item: cc.Node = cc.instantiate(this.invite_friend_item_prefab);
            const invite_friend_item_script:InviteFriendItem = invite_friend_item.getComponent(InviteFriendItem);
            invite_friend_item.parent = this.container;
            invite_friend_item_script.update_view(stage);
        }
    }

    start () {
        super.start();

    }

    // update (dt) {}
}

export default NormalInviteFriendView;
