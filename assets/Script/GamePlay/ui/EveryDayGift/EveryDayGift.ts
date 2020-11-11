import BaseUI from "../../../Common/BaseUI";
import TouchButton from "../../../Common/TouchButton";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EveryDayGift extends BaseUI {
    @property(cc.Node)
    close_button: cc.Node = null;

    @property(cc.Node)
    get_gift_button: cc.Node = null;

    onLoad() {
        super.onLoad();
        this.close_button.addComponent(TouchButton).register_touch(() => {
            this.on_close_call();
        })

        //领取每日奖励
        const get_gift_button: TouchButton = this.get_gift_button.addComponent(TouchButton);
        get_gift_button.register_touch(this.click_get_gift_button.bind(this));
    }

    click_get_gift_button() {

    }

    // update (dt) {}
}
