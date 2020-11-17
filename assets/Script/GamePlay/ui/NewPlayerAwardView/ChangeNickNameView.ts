import BaseUI from "../../../Common/BaseUI";
import TouchButton from "../../../Common/TouchButton";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ChangeNickNameView extends BaseUI {

    @property(cc.Node)
    close_button: cc.Node = null;

    @property(cc.Node)
    sure_button: cc.Node = null;

    onLoad() {
        // 点击关闭按钮
        const close_button: TouchButton = this.close_button.addComponent(TouchButton);
        close_button.register_touch(this.close_this_node.bind(this));

        // 点击确定修改昵称
        const sure_button: TouchButton = this.sure_button.addComponent(TouchButton);
        sure_button.register_touch(this.click_sure_button.bind(this));
    }

    close_this_node() {
        this.on_close_call();
    }

    click_sure_button() {

    }
    
}
