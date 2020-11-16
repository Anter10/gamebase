import BaseUI from "../../../Common/BaseUI";
import TouchButton from "../../../Common/TouchButton";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShippingAddressView extends BaseUI {

    @property(cc.Node)
    close_button: cc.Node = null;

    @property(cc.Node)
    post_button: cc.Node = null;

    @property(cc.Label)
    name_label: cc.Label = null;

    @property(cc.Label)
    identity_id_label: cc.Label = null;

    @property(cc.Label)
    shipping_address_label: cc.Label = null;

    onLoad() {
        super.onLoad();
        this.close_button.addComponent(TouchButton).register_touch(() => {
            this.on_close_call();
        })

        //收货地址
        const post_button: TouchButton = this.post_button.addComponent(TouchButton);
        post_button.register_touch(this.click_posh_button.bind(this));
    }

    get_name_label() {
        return this.name_label.string;
    }

    get_identity_id() {
        return this.identity_id_label.string;
    }

    get_shipping_address() {
        return this.shipping_address_label.string;
    }

    click_posh_button() {
        //提交身份信息。
    }
}
