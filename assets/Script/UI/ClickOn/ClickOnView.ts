import BaseUI from "../../Common/BaseUI";
import { NagivatorInterface } from "../../Common/CommonInterface";
import Loader from "../../Common/Loader";
import Nagivator from "../../Common/Nagivator";
import EventManager from "../../EventManager/EventManager";
import LinkGameBase from "../../GamePlay/LinkGameBase";
import ClickOnController from "./ClickOnController";

const { ccclass, property } = cc._decorator;

@ccclass
class ClickOnView extends BaseUI {
    public controller: ClickOnController = null;

    onLoad() {
        super.onLoad();
        this.controller.init_view();
        const nagivator_interface: NagivatorInterface = {
            title: "",
            show_nagivator_bottom: false,
            /**@description 返回按钮的回调*/
            back_callback: () => {
                this.on_close_call();
            },
            hide_return_back_button: true,
        };

        this.add_nagivator([],nagivator_interface,(nagivator_script: Nagivator)=> {
            Loader.load_texture("./UI/ClickOn/Normal/res/commen_button_back",(texture: cc.Texture2D)=>{
                nagivator_script.set_back_arrow_sprite_frame(new cc.SpriteFrame(texture));
                nagivator_script.nagivator_back_arrow.node.x = nagivator_script.nagivator_back_arrow.node.x + 40;
            })
        });
    }

    start() {
        super.start();

    }

    onEnable() {
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.close_click_on, this, this.close_this_node);
    }

    onDisable() {
        super.onDisable();
        EventManager.get_instance().cancel_listen(LinkGameBase.game_play_event_config.close_click_on, this, this.close_this_node);
    }

    close_this_node() {
        this.on_close_call();
    }
    // update (dt) {}
}


export default ClickOnView;