
import BaseNode from "../../Common/BaseNode";
import { CashOutRouterPath } from "../../Common/CommonEnum";
import Loader from "../../Common/Loader";
import TouchButton from "../../Common/TouchButton";
import EventManager from "../../EventManager/EventManager";
import LinkGameBase from "../../GamePlay/LinkGameBase";
import CashOutController from "../CashOut/CashOutController";

const { ccclass, property } = cc._decorator;

@ccclass
class ClickOnViewItem extends BaseNode {

    @property(cc.Sprite)
    click_on_view_item_bottom: cc.Sprite = null;

    onLoad() { }

    start() {

    }

    init_item_data(data: any, checkInDay: number, todayDone: boolean) {
        const need_progress = data.day;
        let progress = todayDone ? checkInDay : (checkInDay - 1);
        if (progress > need_progress) progress = need_progress;

        const sprite_progress = this.click_on_view_item_bottom.node.getChildByName(`sprite_progress_bg`);
        sprite_progress.getChildByName(`sprite_progress_bar`).getComponent(cc.Sprite).fillRange = progress / need_progress;
        sprite_progress.getChildByName(`label_progress_lab`).getComponent(cc.Label).string = `${progress}/${need_progress}`;
        const label_day_num = this.click_on_view_item_bottom.node.getChildByName(`label_day_num`);
        label_day_num.getComponent(cc.Label).string = `${need_progress}日打卡提现`;

        const label_need_day_num = this.click_on_view_item_bottom.node.getChildByName(`label_need_day_num`);
        label_need_day_num.getComponent(cc.RichText).string = `<color=#8A8080>还差</c><color=#F10000> ${need_progress - progress}天 </c><color=#8A8080>可提现</color>`;

        const money = data.money / 100;
        const label_money = this.click_on_view_item_bottom.node.getChildByName(`label_money`);
        label_money.getComponent(cc.Label).string = `${money}元`;

        const label_money1 = this.click_on_view_item_bottom.node.getChildByName(`sprite_red`).getChildByName(`label_money`);
        label_money1.getComponent(cc.Label).string = `${money}元`;

        const btn_draw_cash = this.click_on_view_item_bottom.node.getChildByName(`btn_draw_cash`);
        if (data.received) {
            Loader.load_texture(`./UI/ClickOn/Normal/res/dakazpp_button_yitixian`, (texture: cc.Texture2D) => {
                btn_draw_cash.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            });

            const label_draw_cash = this.click_on_view_item_bottom.node.getChildByName(`btn_draw_cash`).getChildByName(`label_draw_cash`);
            label_draw_cash.getComponent(cc.Label).string = `已提现`;
        }
        else {
            const touch_button: TouchButton = btn_draw_cash.addComponent(TouchButton);
            touch_button.register_touch(() => {
                cc.log(`前往提现界面`);
                EventManager.get_instance().emit(LinkGameBase.game_play_event_config.close_click_on);
                CashOutController.open(CashOutRouterPath.no_balance);
            });
        }
    }

    // update (dt) {}
}


export default ClickOnViewItem;