import BaseUI from "../../Common/BaseUI";
import TouchButton from "../../Common/TouchButton";
import GameConfig from "../../GameConfig";
import {UserProtocolInterface } from "./UserProtocolAndPrivacyInterface";

 
const {ccclass, property} = cc._decorator;

@ccclass
class UserProtocolView extends BaseUI {
    
    @property(cc.WebView)
    web_view: cc.WebView = null;

    @property(cc.Sprite)
    close_button_image: cc.Sprite;

    @property(cc.Sprite)
    modal_bottom_image: cc.Sprite;

    @property(cc.Node)
    close_button_node: cc.Node;

    user_protocol_interface: UserProtocolInterface = {
        modal_bottom_image: "modal_bottom_image",
        close_button_image: "close_button_image",
    }

    onLoad () {
        super.onLoad();
        this.flush_ui_image(this.user_protocol_interface, "./UI/Common/texture/")
        // 注册关闭按钮的点击事件
        const touch_button: TouchButton = this.close_button_node.addComponent(TouchButton);
        touch_button.register_touch(this.on_close_call.bind(this));

    }

    start () {
        super.start();
        this.web_view.url = GameConfig.user_privacy_url;
    }

    // update (dt) {}
}


export default UserProtocolView;