import BaseUI from "../../../Common/BaseUI";
import Loader from "../../../Common/Loader";
import TouchButton from "../../../Common/TouchButton";
import Native from "../../../Sdk/Native";
import { ShareInterface, StageInterface } from "../InviteFriendInterface";
import InviteFriendItem from "../InviteFriendItem";

const { ccclass, property } = cc._decorator;

@ccclass
class NormalInviteFriendView extends BaseUI {
    @property(cc.Sprite)
    rank_view_background: cc.Sprite = null;
    @property(cc.Sprite)
    copy_invite_code_button: cc.Sprite = null;

    @property(cc.Node)
    header_view: cc.Node = null;
    @property(cc.Node)
    container: cc.Node = null;

    @property(cc.Label)
    invite_code_tip_label: cc.Label = null;

    @property(cc.Prefab)
    invite_friend_item_prefab: cc.Prefab = null;
    @property(cc.Sprite)
    btn_invite_friend: cc.Sprite = null;
    @property(cc.Sprite)
    sprite_head_bg: cc.Sprite = null;
    @property(cc.Node)
    node_input_code: cc.Node = null;

    onLoad() {
        super.onLoad();
    }

    update_view(data: any) {
        const touch_button: TouchButton = this.copy_invite_code_button.addComponent(TouchButton);
        touch_button.register_touch(() => {
            Native.call_native({ func: "setCopyAndPaste", params: { code: data.code } }, () => { cc.log(`复制邀请码成功`) });
        });

        const btn_invite_friend: TouchButton = this.btn_invite_friend.addComponent(TouchButton);
        btn_invite_friend.register_touch(() => {
            Native.call_native({ func: "playShareGame", params: {} }, () => { cc.log(`分享成功`) });
        });

        if (data.masterName.length > 0) {
            this.sprite_head_bg.node.active = true;
            this.node_input_code.active = false;
            const user_name = this.sprite_head_bg.node.getChildByName(`label_name`);
            user_name.getComponent(cc.Label).string = data.masterName;
            const user_head = this.sprite_head_bg.node.getChildByName(`node_mask`).getChildByName(`sprite_head`);
            Loader.request_remote_image(data.masterPhotoUrl, (texture: cc.Texture2D) => {
                user_head.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            });
        }
        else {
            this.sprite_head_bg.node.active = false;
            this.node_input_code.active = true;
            const btn_input_code = this.node_input_code.getChildByName(`btn_input_code`);
            const btnInputCode: TouchButton = btn_input_code.addComponent(TouchButton);
            btnInputCode.register_touch(() => {
                cc.log(`输入邀请码`)
            });
        }

        this.add_nagivator([], {
            title: "",
            show_nagivator_bottom: true,
            invite_friend_num: data.friendNum,
            back_callback: () => {
                this.on_close_call("InviteFriendView");
            }
        });

        if (data.stages && data.stages.length > 0) {
            let rewardIndex = 0;
            let itemNodeList = [];
            for (let i = 0; i < data.stages.length; ++i) {
                const clone_invite_friend_item = cc.instantiate(this.invite_friend_item_prefab);
                clone_invite_friend_item.parent = this.container;
                const invite_friend_item_src = clone_invite_friend_item.getComponent(InviteFriendItem);
                rewardIndex = data.friendNum >= data.stages[i].num ? i : rewardIndex;
                invite_friend_item_src.update_view(data, i);
                itemNodeList.push(invite_friend_item_src);
            }
            if (itemNodeList[rewardIndex]) {
                if (!data.received) {
                    itemNodeList[rewardIndex].update_award_button(true, data.friendNum);
                    itemNodeList[rewardIndex].update_item_bg(1);
                }
                else {
                    itemNodeList[rewardIndex].update_item_bg(2, rewardIndex);
                }
            }
        }
    }

    start() {
        super.start();

    }

    // update (dt) {}
}

export default NormalInviteFriendView;
