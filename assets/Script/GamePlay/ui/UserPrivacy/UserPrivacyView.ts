import BaseUI from "../../../Common/BaseUI";
import { UIParamInterface } from "../../../Common/CommonInterface";
import TouchButton from "../../../Common/TouchButton";

const { ccclass, property } = cc._decorator;

@ccclass
class UserPrivacyView extends BaseUI {

    @property(cc.WebView)
    web_view: cc.WebView = null;

    @property(cc.Sprite)
    close_button_image: cc.Sprite;

    @property(cc.Sprite)
    modal_bottom_image: cc.Sprite;

    @property(cc.Node)
    close_button_node: cc.Node;



    onLoad() {
        super.onLoad();
        // 注册关闭按钮的点击事件
        const touch_button: TouchButton = this.close_button_node.addComponent(TouchButton);
        touch_button.register_touch(this.on_close_call.bind(this));
    }

    show(ui_param_interface: UIParamInterface) {
        super.show(ui_param_interface)
        this.set_web_view_interface(<string>ui_param_interface.param);
    }

    set_web_view_interface(url: string) {
        this.web_view.url = url;
    }

}


export default UserPrivacyView;