import BaseUI from "../../Common/BaseUI";
import Loader from "../../Common/Loader";
import TouchButton from "../../Common/TouchButton";
import Utils from "../../Common/Utils";
import GameConfig from "../../GameConfig";
import { UserPrivacyInterface } from "./UserProtocolAndPrivacyInterface";

 
const {ccclass, property} = cc._decorator;

@ccclass
class UserProtocolView extends BaseUI {
    
    @property(cc.WebView)
    web_view: cc.WebView = null;

    @property(cc.Sprite)
    close_button_image: cc.Sprite;

    @property(cc.Sprite)
    model_bottom_image: cc.Sprite;

    @property(cc.Node)
    close_button_node: cc.Node;

    user_privacy_interface: UserPrivacyInterface = {
        close_button_image: "",
        model_bottom_image: "",
    }

    onLoad () {
        super.onLoad();
        const [all_need_update_sprite_name, all_need_load_sprite_frame_path] = Utils.get_ui_interface_sprite_path_and_sprite_name(this.user_privacy_interface,"./UI/UserProtocolAndPrivacy/");
        
        Loader.recursion_load_sprite_frame(all_need_load_sprite_frame_path, (sprite_frame: cc.SpriteFrame, loaded_index: number)=>{
            const sprite: cc.Sprite = this[all_need_update_sprite_name[loaded_index]];
            try{
                if(sprite){
                   sprite.spriteFrame = sprite_frame;
                }
            }catch(error: any){
                console.log("打卡信息报错", error);
            }
        });

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