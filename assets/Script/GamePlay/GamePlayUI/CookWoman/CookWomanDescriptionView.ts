import BaseUI from "../../../Common/BaseUI";
import TouchButton from "../../../Common/TouchButton";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CookWomanDescriptionView extends BaseUI {

    @property(cc.Label)
    title_label: cc.Label = null;

    @property(cc.Node)
    close_button: cc.Node = null;

    onLoad() {
        this.flush_view();
    }

    flush_view() {
        //关闭
        const cash_out_button: TouchButton = this.close_button.addComponent(TouchButton);
        cash_out_button.register_touch(this.on_close_call.bind(this));
    }

}
