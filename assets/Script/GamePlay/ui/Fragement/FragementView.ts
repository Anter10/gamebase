import BaseUI from "../../../Common/BaseUI";
import TouchButton from "../../../Common/TouchButton";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FragementView extends BaseUI {
    @property(cc.Node)
    close_button: cc.Node = null;

    @property(cc.Node)
    activity_rule_button: cc.Node = null;

    @property(cc.Node)
    shipping_address_button: cc.Node = null;

    onLoad() {
        super.onLoad();
        this.close_button.addComponent(TouchButton).register_touch(() => {
            this.on_close_call();
        })

        //收货地址
        const activity_rule_button: TouchButton = this.activity_rule_button.addComponent(TouchButton);
        activity_rule_button.register_touch(this.click_activity_rule_button.bind(this));

        //活动规则
        const shipping_address_button: TouchButton = this.shipping_address_button.addComponent(TouchButton);
        shipping_address_button.register_touch(this.click_shipping_address_button.bind(this));
    }

    click_activity_rule_button() {

    }

    click_shipping_address_button() {

    }

}
