import BaseNode from "../../Common/BaseNode";
import { UIParamInterface } from "../../Common/CommonInterface";
import Loader from "../../Common/Loader";
import TouchButton from "../../Common/TouchButton";
import Utils from "../../Common/Utils";
import ServerData from "../../GameServerData/ServerData";
import UIConfig from "../UIManager/UIConfig";
import UIManager from "../UIManager/UIManager";
import { StageInterface } from "./InviteFriendInterface";

const { ccclass, property } = cc._decorator;

@ccclass
class InviteFriendItem extends BaseNode {

    @property(cc.Sprite)
    invite_friend_item_bottom: cc.Sprite = null;
    @property(cc.Sprite)
    get_invite_friend_award_button: cc.Sprite = null;

    @property(cc.Label)
    award_money_label: cc.Label = null;
    @property(cc.Label)
    item_sub_message_label: cc.Label = null;
    @property(cc.Sprite)
    sprite_exchange: cc.Sprite = null;

    public item_bg_list: Array<cc.SpriteFrame> = [];
    public curIndex: number = 0;
    public curData: any = null;

    onLoad() {
        super.onLoad();
    }

    start() {
        super.start();

    }

    update_view(data: any, index: number) {
        this.curIndex = index;
        this.curData = data;
        const itemData = data.stages[index];
        this.award_money_label.string = `${Utils.money(itemData.money, 1)}`;
        this.item_sub_message_label.string = `您还可以领${data.leftDays}天`;
        Loader.load_texture(`./UI/InviteFriend/Normal/res/t1_share_${index + 1}`, (texture: cc.Texture2D) => {
            this.sprite_exchange.spriteFrame = new cc.SpriteFrame(texture);
        });
    }

    update_award_button(isShow: boolean ,friendNum?: number) {
        this.get_invite_friend_award_button.node.active = isShow;
        if (isShow) {
            const touch_button: TouchButton = this.get_invite_friend_award_button.addComponent(TouchButton);
            touch_button.register_touch(() => {
                ServerData.get_instance().sendOutSeverDataInviteFriendReward(friendNum ,(data: any) => {
                    cc.log(`领取分享好友奖励${JSON.stringify(data)}`);
                    this.update_item_bg(2 ,this.curIndex);
                    this.update_award_button(false);
                    const ui_param_interface: UIParamInterface = {
                        ui_config_path: UIConfig.Toast,
                        ui_config_name: "Toast",
                        param:{
                            text: `+${this.curData.stages[this.curIndex].money * 100}金币`;
                        }
                    }
                    UIManager.show_ui(ui_param_interface);
                });
            });
        }
    }

    update_item_bg(state: number ,index?: number) {
        if (this.item_bg_list[state]) {
            this.invite_friend_item_bottom.spriteFrame = this.item_bg_list[state];
            return;
        }
        Loader.load_texture(`./UI/InviteFriend/Normal/res/t1_share_list${state}`, (texture: cc.Texture2D) => {
            this.item_bg_list[state] = new cc.SpriteFrame(texture);
            this.invite_friend_item_bottom.spriteFrame = this.item_bg_list[state];
        });
        if (state == 2) {
            let color = cc.color(115 ,115 ,115);
            this.award_money_label.node.color = color;
            this.node.getChildByName(`label`).color = color;
            this.item_sub_message_label.node.color = color;
            Loader.load_texture(`./UI/InviteFriend/Normal/res/t1_share_${index + 1}_hui`, (texture: cc.Texture2D) => {
                this.sprite_exchange.spriteFrame = new cc.SpriteFrame(texture);
            });
        }
    }

    // update (dt) {}
}

export default InviteFriendItem
