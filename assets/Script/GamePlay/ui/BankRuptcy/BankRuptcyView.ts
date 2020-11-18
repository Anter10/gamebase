import BaseUI from "../../../Common/BaseUI";
import { TouchButtonEffectType } from "../../../Common/CommonEnum";
import TouchButton from "../../../Common/TouchButton";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BankRuptcyView extends BaseUI {

    @property(cc.Node)
    get_button: cc.Node = null;

    @property(cc.Node)
    close_button: cc.Node = null;

    @property(cc.Node)
    no_click_button: cc.Node = null;

    onLoad() {
        super.onLoad();
        this.close_button.addComponent(TouchButton).register_touch(() => {
            this.on_close_call();
        })

        //领取破产奖励
        const get_button: TouchButton = this.get_button.addComponent(TouchButton);
        get_button.register_touch(this.click_get_button.bind(this));

        //屏蔽点击任意区域关闭
        const no_click_button: TouchButton = this.no_click_button.addComponent(TouchButton);
        no_click_button.register_touch(this.click_no_click_button.bind(this), 2, null, TouchButtonEffectType.none);

    }

    click_get_button() {

    }

    click_no_click_button() {

    }
}
