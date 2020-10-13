import BaseUI from "../../Common/BaseUI";
import Loader from "../../Common/Loader";
import TouchButton from "../../Common/TouchButton";
import Utils from "../../Common/Utils";
import GameConfig from "../../GameConfig";
import { UserPrivacyInterface } from "./UserProtocolAndPrivacyInterface";


const {ccclass, property} = cc._decorator;

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

    user_privacy_interface: UserPrivacyInterface = {
        modal_bottom_image: "modal_bottom_image",
        close_button_image: "close_button_image",
    }

    onLoad () {
        super.onLoad();
        this.flush_ui_image(this.user_privacy_interface);
        // 注册关闭按钮的点击事件
        const touch_button: TouchButton = this.close_button_node.addComponent(TouchButton);
        touch_button.register_touch(this.on_close_call.bind(this));
    }

    start () {
        this.web_view.url = GameConfig.user_privacy_url;
    }

}


export default UserPrivacyView;