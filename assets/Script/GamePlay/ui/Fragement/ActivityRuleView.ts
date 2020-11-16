import BaseUI from "../../../Common/BaseUI";
import TouchButton from "../../../Common/TouchButton";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ActivityRuleView extends BaseUI {

    @property(cc.Node)
    close_button: cc.Node = null;

    onLoad() {
        this.close_button.addComponent(TouchButton).register_touch(() => {
            this.on_close_call();
        })
    }

}
