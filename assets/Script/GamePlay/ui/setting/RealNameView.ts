import BaseUI from "../../../Common/BaseUI";
import TouchButton from "../../../Common/TouchButton";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RealNameView extends BaseUI {

    @property(cc.Node)
    close_button: cc.Node = null;

    @property(cc.Node)
    sure_button: cc.Node = null;

    @property(cc.Label)
    name_label: cc.Label = null;

    @property(cc.Label)
    people_id: cc.Label = null;

    onLoad() {
        // 点击关闭按钮
        const close_button: TouchButton = this.close_button.addComponent(TouchButton);
        close_button.register_touch(this.close_this_node.bind(this));

        // 点击提交按钮
        const sure_button: TouchButton = this.sure_button.addComponent(TouchButton);
        sure_button.register_touch(this.click_sure_button.bind(this));
    }

    close_this_node() {
        this.on_close_call();
    }

    click_sure_button() {

    }

    get_name_label() {
        //真实姓名
        this.name_label.string;
    }

    get_people_id_label() {
        //身份证号
        this.people_id.string;
    }
}
