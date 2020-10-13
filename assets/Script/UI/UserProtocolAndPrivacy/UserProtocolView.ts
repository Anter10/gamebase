import BaseUI from "../../Common/BaseUI";
import Loader from "../../Common/Loader";
import TouchButton from "../../Common/TouchButton";
import Utils from "../../Common/Utils";
import GameConfig from "../../GameConfig";
import { UserPrivacyInterface, UserProtocolInterface } from "./UserProtocolAndPrivacyInterface";

 
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
        const [all_need_update_sprite_name, all_need_load_sprite_frame_path] = Utils.get_ui_interface_sprite_path_and_sprite_name(this.user_protocol_interface, "./UI/Common/texture/");
         
        this.flush_ui_image(this.user_protocol_interface, "./UI/Common/texture/")

        // 注册关闭按钮的点击事件
        const touch_button: TouchButton = this.close_button_node.addComponent(TouchButton);
        touch_button.register_touch(this.on_close_call.bind(this));

    }

    start () {
        super.start();
        this.web_view.url = GameConfig.user_protocol_url;
    }

    // update (dt) {}
}


export default UserProtocolView;